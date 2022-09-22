import {Args, ArgsType, Ctx, Field, Mutation, Query, Resolver} from 'type-graphql';
import bcrypt from 'bcryptjs';
import {VendorModel, VendorSchema} from '../models/Vendor';
import {IsEmail, Length, Validate} from 'class-validator';
import {IsEmailExist, IsPhoneNotExist, IsValidPassword, IsValidSLPhone} from '../validators';
import {sendOTP} from '../sms/otp';
import {VendorProfile} from './VendorProfile';
import {makeID} from '../lib/makeID';
import {redis} from '../fastify';
import {sendMailEmailConfirmation} from '../sendMail';
import {GQLContext} from '../types';


@ArgsType()
class VendorRegisterInput implements Partial<VendorProfile> {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field({nullable: true})
    @IsEmail()
    @Validate(IsEmailExist)
    email?: string;

    @Field({nullable: true})
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
    authCode: string;

    // @Field()
    // @IsNumberString()
    // @Length(6)
    // otp: string;
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

    /**
     * @deprecated
     * */
    @Mutation(() => Boolean)
    async vendorRegisterOtp(@Args() {phone}: VendorRegisterOtpInput): Promise<boolean> {
        return await sendOTP(phone);
    }

    @Mutation(() => Boolean)
    async vendorRegister(@Args() data: VendorRegisterInput, @Ctx() ctx: GQLContext): Promise<boolean> {

        if (data.authCode !== '321321321') {
            throw new Error('INVALID_AUTHCODE');
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        // if (!verifyOTP(data.phone, data.otp)) {
        //     throw new Error('Invalid OTP, expired or not found');
        // }

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

    /**
     * @deprecated
     * */
    @Query(() => Boolean)
    async isVendorPhoneExist(@Args() {phone}: VendorCheckPhoneInput): Promise<boolean> {
        const v = await VendorModel.findOne({phone});
        return !!v;

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
