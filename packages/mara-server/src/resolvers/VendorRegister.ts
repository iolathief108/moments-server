import {
    Arg,
    Field,
    ID,
    InputType,
    Mutation,
    ObjectType,
    PubSub,
    PubSubEngine,
    registerEnumType,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import bcrypt from 'bcryptjs';
import {VendorType} from '../common/const';
import {VendorModel, VendorSchema} from '../models/Vendor';
import {IsEmail, IsNumberString, Length, Validate} from 'class-validator';
import {IsEmailExist, IsPhoneExist, IsValidPassword} from '../validators';
import {createLKD, sendOTP} from '../sms';
import {VendorProfile} from './VendorProfile';
import {makeID} from '../lib/makeID';
import {redis} from '../fastify';
import {sendMailEmailConfirmation} from '../sendMail';

registerEnumType(VendorType, {
    name: 'VendorType', // this one is mandatory
    description: 'All vendor types', // this one is optional
});

@InputType({ description: "Register new vendor data" })
class VendorRegisterInput implements Partial<VendorProfile> {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @Validate(IsEmailExist)
    email: string;

    @Field({ nullable: true })
    address?: string;

    // @Field(() => VendorType)
    // vendorType: VendorType;

    // @Field()
    // @Length(1, 255)
    // @Validate(IsBusinessNameExist)
    // businessName: string;

    @Field()
    @Length(9)
    @Validate(IsPhoneExist)
    phone: string;

    @Field()
    @Validate(IsValidPassword)
    password: string;

    @Field()
    @Length(40)
    registerID: string;

    @Field()
    @IsNumberString()
    @Length(6)
    otp: string;
}

@InputType({ description: "otp input" })
class SendOTPInput {
    @Field()
    @Length(40)
    id: string;

    @Field()
    // @Length(12,12)
    // @Validate(IsPhoneExist)
    // @IsMobilePhone("en-SL" as any, {
    //     strictMode: true,
    // })
    phone: string;
}

@ObjectType()
class Notification {
    @Field(type => ID)
    id: number;

    @Field({ nullable: true })
    message?: string;

    @Field(type => Date)
    date: Date;
}

interface NotificationPayload {
    id: number;
    message?: string;
}

@Resolver()
export class VendorRegisterResolver {
    @Mutation(() => String)
    createNewOtpId(@Arg("pin") pin: string) {
        return createLKD(pin);
    }

    @Mutation(() => Boolean)
    async sendOtp(@Arg("data") data: SendOTPInput) {
        return await sendOTP(data.id, data.phone);
    }

    @Mutation(() => VendorProfile)
    async register(
        @Arg("data") data: VendorRegisterInput,
        @PubSub() pubSub: PubSubEngine
    ): Promise<VendorProfile> {
        const hashedPassword = await bcrypt.hash(data.password, 12);

        //todo: important uncomment this
        // if (!verifyOTP(data.registerID, data.phone, Number(data.otp)))
        //     throw new Error("OPT failed");

        const document = await VendorModel.create<VendorSchema>({
            email: data.email,
            password: hashedPassword,
            last_name: data.lastName,
            first_name: data.firstName,
            phone: data.phone,
            verified: false,
            created_at: new Date(),
            updated_at: new Date(),
            email_verified: false,
        });

        const payload: NotificationPayload = { message: document.first_name, id: document.id };
        await pubSub.publish("NOTIFICATIONS", payload);

        sendMailEmailConfirmation(
            document.email,
            await createConfirmationUrl(document.id, document.email),
        ).then(() => { });

        return {
            id: document.id,
            firstName: document.first_name,
            lastName: document.last_name,
            email: document.email,
            phone: document.phone,
            verified: document.verified,
        };
    }

    @Subscription(() => Notification, {
        topics: "NOTIFICATIONS"
    })
    newVendorRegistered(
        @Root() notificationPayload: NotificationPayload,
    ): Notification {
        console.log('registered...')
        return {
            ...notificationPayload,
            date: new Date(),
        };
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
    await redis.set(token, val, "EX", 60 * 60 * 24);

    return `https://www.zola.lk/vendor/emailConfirm/${token}/`;
}
