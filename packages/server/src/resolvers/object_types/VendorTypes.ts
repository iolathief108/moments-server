import {Field, ObjectType} from 'type-graphql';
import {CatererDataType} from './type/CatererDetails';
import {VenueDataType} from './type/VenueDetails';
import {PhotographerDataType} from './type/PhotographerDetails';
import {VendorDataDoc} from '../../models/VendorData';
import {VendorType} from '../../common/const';
import {BandDjsDataType} from './type/BandDjsDetails';
import {BeautyProfessionalDataType} from './type/BeautyProfessionalDetails';
import {CakesDessertsDataType} from './type/CakesDessertsDetails';
import {FloristsDataType} from './type/FloristsDetails';
import {VideographerDataType} from './type/VideographerDetails';


@ObjectType()
export class VendorTypes {
    @Field(() => CatererDataType, {nullable: true})
    caterer_type?: CatererDataType;

    @Field(() => VenueDataType, {nullable: true})
    venue_type?: VenueDataType;

    @Field(() => PhotographerDataType, {nullable: true})
    photographer_type?: PhotographerDataType;

    @Field(() => BandDjsDataType, {nullable: true})
    band_djs_type?: BandDjsDataType;

    @Field(() => BeautyProfessionalDataType, {nullable: true})
    beauty_professionals_type?: BeautyProfessionalDataType;

    @Field(() => CakesDessertsDataType, {nullable: true})
    cakes_desserts_type?: CakesDessertsDataType;

    @Field(() => FloristsDataType, {nullable: true})
    florists_type?: FloristsDataType;

    @Field(() => VideographerDataType, {nullable: true})
    videographer_type?: VideographerDataType;

    static async getInstanceFromVendorData(
        vData: VendorDataDoc,
    ): Promise<VendorTypes> {
        const vTypes = new VendorTypes();
        if (!vData.vendor_type) return null;
        switch (vData.vendor_type) {
            case VendorType.caterer:
                vTypes.caterer_type = {
                    pricing: vData.caterer?.pricing,
                    personInfo: vData.caterer?.person_info
                };
                break;

            case VendorType.venue:
                vTypes.venue_type = {
                    pricing: vData.venue?.pricing,
                };
                break;

            case VendorType.photographer:
                vTypes.photographer_type = {
                    pricing: vData.photographer?.pricing,
                    personInfo: vData.photographer?.person_info,
                };
                break;

            case VendorType.bands_dj:
                vTypes.band_djs_type = {
                    pricing: vData.bandDjs?.pricing,
                    personInfo: vData.beautyProfessional?.person_info,
                };
                break;

            case VendorType.beauty_professional:
                vTypes.beauty_professionals_type = {
                    pricing: vData.beautyProfessional?.pricing,
                    personInfo: vData.beautyProfessional?.person_info,
                };
                break;

            case VendorType.cakes_dessert:
                vTypes.cakes_desserts_type = {
                    pricing: vData.cakesDesserts?.pricing,
                    personInfo: vData.cakesDesserts?.person_info,
                };
                break;

            case VendorType.florist:
                vTypes.florists_type = {
                    pricing: vData.florists?.pricing,
                    personInfo: vData.florists?.person_info,
                };
                break;

            case VendorType.videographer:
                vTypes.videographer_type = {
                    pricing: vData.videographer?.pricing,
                    personInfo: vData.videographer?.person_info,
                };
                break;
        }
        return vTypes;
    }
}
