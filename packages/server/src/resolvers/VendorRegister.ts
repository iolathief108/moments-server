import {
    Args,
    ArgsType,
    Field,
    Mutation,
    registerEnumType,
    Resolver,
    Ctx,
    Query
} from 'type-graphql';
import bcrypt from 'bcryptjs';
import { VendorType } from '../common/const';
import { VendorModel, VendorSchema } from '../models/Vendor';
import { IsEmail, IsNumberString, Length, Validate } from 'class-validator';
import { IsEmailExist, IsPhoneNotExist, IsValidPassword, IsValidSLPhone } from '../validators';
import { sendOTP, verifyOTP } from '../sms/otp';
import { VendorProfile } from './VendorProfile';
import { makeID } from '../lib/makeID';
import { redis } from '../fastify';
import { sendMailEmailConfirmation } from '../sendMail';
import { GQLContext } from "../types";

registerEnumType(VendorType, {
    name: 'VendorType',
});

@ArgsType()
class VendorRegisterInput implements Partial<VendorProfile> {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field({ nullable: true })
    @IsEmail()
    @Validate(IsEmailExist)
    email?: string;

    @Field({ nullable: true })
    address?: string;

    @Field()
    @Length(12)
    @Validate(IsValidSLPhone)
    @Validate(IsPhoneNotExist)
    phone: string;

    @Field()
    @Validate(IsValidPassword)
    password: string;

    @Field()
    @IsNumberString()
    @Length(6)
    otp: string;
}

@ArgsType()
class VendorRegisterOtpInput {
    @Field()
    @Length(12, 12)
    @Validate(IsValidSLPhone)
    @Validate(IsPhoneNotExist)
    phone: string;
}
@ArgsType()
class VendorCheckPhoneInput {

    @Field()
    @Validate(IsValidSLPhone)
    phone: string;
}

@Resolver()
export class VendorRegisterResolver {

    @Mutation(() => Boolean)
    async vendorRegisterOtp(@Args() { phone }: VendorRegisterOtpInput): Promise<boolean> {
        return await sendOTP(phone);
    }

    @Mutation(() => Boolean)
    async vendorRegister(@Args() data: VendorRegisterInput, @Ctx() ctx: GQLContext): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(data.password, 12);

        if (!verifyOTP(data.phone, data.otp)) {
            throw new Error('otp verification failed');
        }

        const document = await VendorModel.create<VendorSchema>({
            email: data.email || undefined,
            password: hashedPassword,
            last_name: data.lastName,
            first_name: data.firstName,
            phone: data.phone,
            verified: false,
            created_at: new Date(),
            updated_at: new Date(),
            email_verified: false,
        });

        if (data.email) {
            sendMailEmailConfirmation(
                document.email,
                await createConfirmationUrl(document.id, document.email),
            );
        }

        ctx.request.session.vendorID = document.id;

        return true;
    }

    @Query(() => Boolean)
    async isVendorPhoneExist(@Args() { phone }: VendorCheckPhoneInput): Promise<boolean> {
        const v = await VendorModel.findOne({ phone });
        if (v) {
            return true;
        }
        return false;
    }
}

export async function createConfirmationUrl(
    vendorID: string,
    email: string,
): Promise<string> {
    const token = makeID(40);
    const val = JSON.stringify({
        vendorID,
        email,
    });
    await redis.set(token, val, 'EX', 60 * 60 * 24);

    return `https://www.zola.lk/vendor/emailConfirm/${token}/`;
}
