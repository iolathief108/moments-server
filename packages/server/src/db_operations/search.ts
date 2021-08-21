import {VendorDataModel} from '../models/VendorData';
import {LIVE_UNPAID, VendorType, VerifyStatus} from '../common/const';
import {Types} from 'mongoose';


// verifyStatus?: VerifyStatus;
//
// @prop({ type: () => Boolean, required: false, default: false})
// isRegPaid?: boolean;
//
// @prop({ type: () => Boolean, required: false, default: false})
// isSuspended?: boolean;
//
type Sandanam = {
    search_district_ids?: {
        $in: Types.ObjectId[];
    };
    vendor_type?: VendorType;
    isComplete: boolean;
    verifyStatus: {
        $in: VerifyStatus[]
    };
    isRegPaid?: boolean;
    isSuspended: boolean;
};

type optionals = {

    isComplete: boolean;
    verifyStatus: {
        $in: VerifyStatus[]
    };
    isRegPaid?: boolean;
    isSuspended: boolean;
}

function getOptionals(): optionals {
    let thing: optionals = {
        isComplete: true,
        verifyStatus: {
            $in: [
                VerifyStatus.verifiedPending,
                VerifyStatus.verified,
            ],
        },
        // isRegPaid: LIVE_UNPAID ? undefined : true,
        isSuspended: false,
    };
    !LIVE_UNPAID && (thing['isRegPaid'] = true);
    return thing;
}

type LocationInput = {
    districtID?: string;
};

function getThanos(lInput?: LocationInput, vType?: VendorType): Sandanam[] {
    let rSandanam: Sandanam[] = [];

    // if dis vType
    if (lInput.districtID && vType) {
        rSandanam.push({
            ...getOptionals(),
            search_district_ids: {
                $in: [Types.ObjectId(lInput.districtID)],
            },
            vendor_type: vType,
        });
        return rSandanam;
    }

    // if district
    if (lInput.districtID) {
        rSandanam.push({
            ...getOptionals(),
            search_district_ids: {
                $in: [Types.ObjectId(lInput.districtID)],
            },
        });
        return rSandanam;
    }

    if (vType) {
        rSandanam.push({
            ...getOptionals(),
            vendor_type: vType,
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
        : await VendorDataModel.find({...getOptionals()}, null, {
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
            isComplete: true,
        });
}
