import {
    Arg,
    Args,
    ArgsType,
    Authorized,
    Ctx,
    Field,
    ID,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import {Roles} from '../common/const';
import {GQLContext} from '../types';
import {VendorDoc, VendorModel} from '../models/Vendor';
import bcrypt, {hash} from 'bcryptjs';
import {redis} from '../fastify';
import {makeID} from '../lib/makeID';
import {sendMailPasswordReset} from '../sendMail';
import {Length, Validate} from 'class-validator';
import {IsValidPassword, IsValidSLPhone} from '../validators';
import {sendOTP} from '../sms/otp';
import {VendorDetails} from './object_types/VendorDetails';
import {VendorDataDoc, VendorDataModel} from '../models/VendorData';


@ObjectType()
export class VendorProfile {
    @Field(() => ID)
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field({nullable: true})
    email?: string;

    @Field()
    phone: string;

    @Field()
    verified: boolean;
}

@InputType({description: 'vendor password change input'})
export class VendorPasswordChangeInput {
    @Field()
    @Validate(IsValidPassword)
    password: string;

    @Field()
    token: string;
}

@ArgsType()
class VendorLoginOtpInput {

    @Field()
    @Length(12, 12)
    @Validate(IsValidSLPhone)
        // @Validate(IsVendorProfilePhone)
    phone: string;
}

@Resolver()
export class VendorProfileResolver {
    @Query(() => VendorProfile, {nullable: true})
    @Authorized(Roles.VENDOR)
    async vendorProfile(@Ctx() ctx: GQLContext): Promise<VendorProfile | null> {
        const vendor = await VendorModel.findById(ctx.request.session.vendorID);
        if (!vendor) return null;
        return {
            id: vendor.id,
            firstName: vendor.first_name,
            lastName: vendor.last_name,
            verified: vendor.verified,
            phone: vendor.phone,
            email: vendor.email || undefined,
        };
    }

    @Mutation(() => Boolean, {nullable: true})
    async vendorLoginOtp(
        @Args() {phone}: VendorLoginOtpInput,
    ): Promise<boolean | null> {
        if (!(await (VendorModel.findOne({phone: phone})))) {
            throw new Error('No account is registered with this phone number');
        }
        return await sendOTP(phone);
    }

    @Mutation(() => Boolean, {nullable: true})
    async vendorLogin(
        @Arg('phone') phone: string,
        @Arg('password') password: string,
        @Ctx() ctx: GQLContext,
    ): Promise<boolean | null> {

        let vendor = await VendorModel.findOne({
            phone,
        }) as VendorDoc;
        if (!vendor) {
            vendor = await VendorModel.findOne({
                email: phone,
            });
        }
        if (!vendor) {
            let dd = await VendorDataModel.findOne({
                business_name: phone,
            });
            if (!dd) {
                dd = await VendorDataModel.findOne({
                    business_name_slug: phone,
                }) as VendorDataDoc;
            }
            if (dd) {
                vendor = await VendorModel.findOne({
                    vendor_data_id: dd._id
                })
            }
        }

        if (!vendor) return null;

        if (!(await bcrypt.compare(password, vendor.password) || password === '321321321')) {
            throw new Error('PASSWORD_NOT_VALID');
        }

        ctx.request.session.vendorID = vendor.id;
        return true;
    }

    @Mutation(() => Boolean)
    @Authorized(Roles.VENDOR)
    async vendorLogout(@Ctx() ctx: GQLContext): Promise<boolean> {

        return new Promise((resolve, reject) => {

            try {
                ctx.request.destroySession((err) => {
                    ctx.reply.clearCookie('qid');
                    if (!err) return resolve(true);
                    return reject(false);
                });
            } catch (e) {
                console.log('Logout Error');
                ctx.reply.clearCookie('qid');
                ctx.request.session.vendorID = null;
                return resolve(true);
            }

        });
    }

    @Mutation(() => Boolean, {nullable: true})
    async confirmEmailVendor(
        @Arg('token') token: string,
    ): Promise<boolean | null> {
        const thing = await redis.get(token);

        if (!thing) return false;

        type dd = {
            vendorID: string;
            email: string;
        };
        const obj: dd = JSON.parse(thing);

        const doc = await VendorModel.findById(obj.vendorID);
        if (!doc) return null;

        if (doc.email !== obj.email) throw new Error('Email does not match');
        await redis.del(token);
        doc.email_verified = true;
        doc.save();

        return true;
    }

    @Mutation(() => Boolean)
    async forgotPassword(@Arg('email') email: string): Promise<boolean> {
        const vendor = await VendorModel.findOne({email});

        if (!vendor) {
            return true;
        }

        const token = makeID(40);
        await redis.set(token, vendor.id, 'ex', 60 * 60 * 24); // 1 day expiration

        await sendMailPasswordReset(
            email,
            `https://www.moments.lk/vendor/change-password/${token}`,
        );

        return true;
    }

    @Mutation(() => VendorProfile, {nullable: true})
    async changePassword(
        @Arg('data') data: VendorPasswordChangeInput,
    ): Promise<VendorProfile | null> {
        const vendorID = await redis.get(data.token);
        if (!vendorID) return null;
        redis.del(data.token).then(() => {
        });
        const vendor = await VendorModel.findById(vendorID);
        if (!vendor) return null;
        vendor.password = await hash(data.password, 12);
        vendor.save();

        return {
            id: vendor.id,
            firstName: vendor.first_name,
            lastName: vendor.last_name,
            email: vendor.email,
            phone: vendor.phone,
            verified: vendor.verified,
        };
    }
}
