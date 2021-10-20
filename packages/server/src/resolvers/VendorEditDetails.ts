import {Arg, Authorized, Ctx, Mutation, Resolver} from "type-graphql";
import {Roles} from "../common/const";
import {GQLContext} from "../types";
import {VendorModel} from "../models/Vendor";
import {Types} from "mongoose";
import {createVendorData, VendorDataModel} from "../models/VendorData";
import {VendorDetailsInput} from "./input_types/VendorDetailsInput";

@Resolver()
export class VendorEditDetailsResolver {
    @Mutation(() => Boolean)
    @Authorized(Roles.VENDOR)
    async vendorEditDetails(
        @Ctx() ctx: GQLContext,
        @Arg("data") data: VendorDetailsInput,
    ): Promise<boolean> {
        const vendor = await VendorModel.findById(ctx.request.session.vendorID);
        const vendorData = vendor?.vendor_data_id
            ? await VendorDataModel.findById(
                  new Types.ObjectId(vendor.vendor_data_id),
              )
            : await createVendorData(vendor);

        await data.validate(vendorData);
        await data.fillVendorData(vendorData);
        await vendorData.save();
        return true;
    }
}
