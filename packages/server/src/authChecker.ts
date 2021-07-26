import {AuthChecker} from "type-graphql";
import {GQLContext} from "./types";
import {Roles, VendorType} from "./common/const";
import {VendorModel} from "./models/Vendor";
import { VendorDataModel } from "./models/VendorData";

export default (async ({root, args, context, info}, roles) => {
    for (let i = 0; i < roles.length; i++) {
        const value = roles[i];
        if (value === Roles.VENDOR || value === Roles.VENDOR_CATERER || value === Roles.VENDOR_PHOTOGRAPHER || value === Roles.VENDOR_VENUE) {
            if (!context.request.session.vendorID) return false;
        }
        if (value === Roles.VENDOR_CATERER) {
            let vendor = await VendorModel.findById(
                context.request.session.vendorID,
            );
            if (!vendor.vendor_data_id) return false;
            let vData = await VendorDataModel.findById(vendor.vendor_data_id)
            if (vData.vendor_type !== VendorType.caterer) return false;
        }
        if (value === Roles.VENDOR_PHOTOGRAPHER) {
            let vendor = await VendorModel.findById(
                context.request.session.vendorID,
            );
            if (!vendor.vendor_data_id) return false;
            let vData = await VendorDataModel.findById(vendor.vendor_data_id)
            if (vData.vendor_type !== VendorType.photographer) return false;
        }
        if (value === Roles.VENDOR_VENUE) {
            let vendor = await VendorModel.findById(
                context.request.session.vendorID,
            );
            if (!vendor.vendor_data_id) return false;
            let vData = await VendorDataModel.findById(vendor.vendor_data_id)
            if (vData.vendor_type !== VendorType.venue) return false;
        }
    }
    return true;
}) as AuthChecker<GQLContext, Roles>;
