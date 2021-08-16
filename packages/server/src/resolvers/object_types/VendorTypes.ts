import { Field, ObjectType } from "type-graphql";
import { CatererDataType } from "./type/CatererDetails";
import { VenueDataType } from "./type/VenueDetails";
import { PhotographerDataType } from "./type/PhotographerDetails";
import { VendorDataDoc } from "../../models/VendorData";
import { VendorType } from "../../common/const";
import { BandDjsDataType } from "./type/BandDjsDetails";
import { BeautyProfessionalDataType } from "./type/BeautyProfessionalDetails";
import { CakesDessertsDataType } from "./type/CakesDessertsDetails";
import { FloristsDataType } from "./type/FloristsDetails";
import { VideographerDataType } from "./type/VideographerDetails";

@ObjectType()
export class VendorTypes {
    @Field(() => CatererDataType, { nullable: true })
    caterer_type?: CatererDataType;

    @Field(() => VenueDataType, { nullable: true })
    venue_type?: VenueDataType;

    @Field(() => PhotographerDataType, { nullable: true })
    photographer_type?: PhotographerDataType;

    @Field(() => BandDjsDataType, { nullable: true })
    band_djs_type?: BandDjsDataType;

    @Field(() => BeautyProfessionalDataType, { nullable: true })
    beauty_professionals_type?: BeautyProfessionalDataType;

    @Field(() => CakesDessertsDataType, { nullable: true })
    cakes_desserts_type?: CakesDessertsDataType;

    @Field(() => FloristsDataType, { nullable: true })
    florists_type?: FloristsDataType;

    @Field(() => VideographerDataType, { nullable: true })
    videographer_type?: VideographerDataType;

    static async getInstanceFromVendorData(
        vData: VendorDataDoc,
    ): Promise<VendorTypes> {
        const typeSpecific = new VendorTypes();
        if (!vData.vendor_type) return null;
        switch (vData.vendor_type) {
            case VendorType.caterer:
                typeSpecific.caterer_type = {};
                break;

            case VendorType.venue:
                typeSpecific.venue_type = {};
                break;

            case VendorType.photographer:
                typeSpecific.photographer_type = {};
                break;

            case VendorType.bands_dj:
                typeSpecific.band_djs_type = {};
                break;

            case VendorType.beauty_professional:
                typeSpecific.beauty_professionals_type= {};
                break;

            case VendorType.cakes_dessert:
                typeSpecific.cakes_desserts_type = {};
                break;

            case VendorType.florist:
                typeSpecific.florists_type= {};
                break;

            case VendorType.videographer:
                typeSpecific.videographer_type = {};
                break;
        }
        return typeSpecific;
    }
}
