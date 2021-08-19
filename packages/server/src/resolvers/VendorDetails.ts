import {
    Args,
    ArgsType,
    Authorized,
    Ctx,
    Field,
    Query,
    Resolver,
} from 'type-graphql';
import {VendorDataDoc, VendorDataModel} from '../models/VendorData';
import {VendorDetails, VendorDetailsExtra} from './object_types/VendorDetails';
import {GQLContext} from '../types';
import {VendorModel} from '../models/Vendor';
import {Roles} from '../common/const';

@ArgsType()
class VendorDetailsArgs {
    @Field()
    vendorDataId: string;
}

@ArgsType()
class VendorDetailsArgsB {
    @Field()
    businessName: string;

    @Field({nullable: true})
    vendorDataId: string;
}

@Resolver()
export class VendorDetailsResolver {
    @Query(() => VendorDetails, {nullable: true})
    async vendorDetails(
        @Args() {vendorDataId}: VendorDetailsArgs,
    ): Promise<VendorDetails | null> {
        const vData = await VendorDataModel.findById(vendorDataId);
        if (!vData) return null;
        return await VendorDetails.getInstanceFromVendorData(vData);
    }

    @Query(() => VendorDetails, {nullable: true})
    async vendorDetailsB(
        @Args() {businessName, vendorDataId}: VendorDetailsArgsB,
    ): Promise<VendorDetails | null> {
        let vData : VendorDataDoc;
        if (vendorDataId) {
            vData = await VendorDataModel.findById(vendorDataId);
            if (!vData)
                vData = await VendorDataModel.findOne({
                    business_name: businessName,
                });
        } else {
            vData = await VendorDataModel.findOne({
                business_name: businessName,
            });
        }
        if (!vData) return null;
        return await VendorDetails.getInstanceFromVendorData(vData);
    }

    @Query(() => VendorDetailsExtra, {nullable: true})
    @Authorized(Roles.VENDOR)
    async vendorDetailsExtra(
        @Ctx() ctx: GQLContext,
    ): Promise<VendorDetailsExtra | null> {
        const vProfile = await VendorModel.findById(
            ctx.request.session.vendorID,
        );
        if (!vProfile?.vendor_data_id) return null;
        const vData = await VendorDataModel.findById(vProfile.vendor_data_id);
        return await VendorDetailsExtra.getInstanceFromVendorData(vData);
    }
}
