import {VendorDataModel} from "../models/VendorData";
import {VendorType} from "../common/const";
import {Types} from "mongoose";

type Sandanam = {
    search_district_ids?: {
        $in: Types.ObjectId[];
    };
    vendor_type?: VendorType;
    isComplete: boolean;
};

type LocationInput = {
    districtID?: string;
};

function getThanos(lInput?: LocationInput, vType?: VendorType):Sandanam[] {
    let rSandanam: Sandanam[] = [];

    // if dis vType
    if (lInput.districtID && vType) {
        rSandanam.push({
            search_district_ids: {
                $in: [Types.ObjectId(lInput.districtID)],
            },
            vendor_type: vType,
            isComplete: true
        });
        return rSandanam;
    }

    // if district
    if (lInput.districtID) {
        rSandanam.push({
            search_district_ids: {
                $in: [Types.ObjectId(lInput.districtID)],
            },
            isComplete: true
        });
        return rSandanam;
    }

    if (vType) {
        rSandanam.push({
            vendor_type: vType,
            isComplete: true
        });
        return rSandanam;
    }

    return rSandanam;
}

export async function search(
    filters: {
        districtID?: string;
        vendorType?: VendorType;
    },
    options: {
        limit: number;
        offset: number;
    },
) {
    return filters.districtID || filters.vendorType
        ? await VendorDataModel.find(
              {
                  $or: getThanos(
                      {districtID: filters.districtID},
                      filters.vendorType,
                  ),
              },
              null,
              {
                  limit: options.limit,
                  skip: options.offset,
              },
          ).exec()
        : await VendorDataModel.find({isComplete: true}, null, {
              limit: options.limit,
              skip: options.offset,
          }).exec();
}

export async function searchResultCount(filters: {
    districtID?: string;
    vendorType?: VendorType;
}) {
    return filters.districtID || filters.vendorType
        ? await VendorDataModel.countDocuments({
              $or: getThanos(
                  {districtID: filters.districtID},
                  filters.vendorType,
              ),
          })
        : await VendorDataModel.countDocuments({
            isComplete: true
        });
}
