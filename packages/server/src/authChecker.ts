import {AuthChecker} from "type-graphql";
import {GQLContext} from "./types";
import {Roles, VendorType} from "./common/const";
import {VendorModel} from "./models/Vendor";
import { VendorDataModel } from "./models/VendorData";

export default (async ({root, args, context, info}, roles) => {

    for (let i = 0; i < roles.length; i++) {
        const value = roles[i];
        let vendor = null
        if (value === Roles.VENDOR || value === Roles.VENDOR_CATERER || value === Roles.VENDOR_PHOTOGRAPHER || value === Roles.VENDOR_VENUE) {
            if (!context.request.session.vendorID) return false;
            vendor = await VendorModel.findById(
                context.request.session.vendorID,
            );
            if (!vendor) return false;
        }
        if (value === Roles.VENDOR_CATERER) {
            if (!vendor.vendor_data_id) return false;
            let vData = await VendorDataModel.findById(vendor.vendor_data_id)
            if (vData.vendor_type !== VendorType.caterer) return false;
        }
        if (value === Roles.VENDOR_PHOTOGRAPHER) {
            if (!vendor.vendor_data_id) return false;
            let vData = await VendorDataModel.findById(vendor.vendor_data_id)
            if (vData.vendor_type !== VendorType.photographer) return false;
        }
        if (value === Roles.VENDOR_VENUE) {
            if (!vendor.vendor_data_id) return false;
            let vData = await VendorDataModel.findById(vendor.vendor_data_id)
            if (vData.vendor_type !== VendorType.venue) return false;
        }
    }
    return true;
}) as AuthChecker<GQLContext, Roles>;
