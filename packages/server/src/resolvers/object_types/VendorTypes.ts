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
                    servicePricing: {
                        pricings: vData.caterer?.service_pricing
                    },
                    personInfo: vData.caterer?.person_info
                };
                break;

            case VendorType.venue:
                vTypes.venue_type = {
                    pricing: vData.venue?.pricing,
                    servicePricing: {
                        pricings: vData.venue?.service_pricing
                    },
                    hightlight: vData.venue?.highlight_video,
                    guestCapacity: vData.venue?.guest_capacity
                };
                break;

            case VendorType.photographer:
                vTypes.photographer_type = {
                    pricing: vData.photographer?.pricing,
                    servicePricing: {
                        pricings: vData.photographer?.service_pricing
                    },
                    personInfo: vData.photographer?.person_info,
                };
                break;

            case VendorType.bands_dj:
                vTypes.band_djs_type = {
                    pricing: vData.bandDjs?.pricing,
                    servicePricing: {
                        pricings: vData.bandDjs?.service_pricing
                    },
                    personInfo: vData.bandDjs?.person_info,
                    hightlight: vData.bandDjs?.highlight_video,
                    videoSample: vData.bandDjs?.video_sample
                };
                break;

            case VendorType.beauty_professional:
                vTypes.beauty_professionals_type = {
                    pricing: vData.beautyProfessional?.pricing,
                    servicePricing: {
                        pricings: vData.beautyProfessional?.service_pricing
                    },
                    personInfo: vData.beautyProfessional?.person_info,
                };
                break;

            case VendorType.cakes_dessert:
                vTypes.cakes_desserts_type = {
                    pricing: vData.cakesDesserts?.pricing,
                    servicePricing: {
                        pricings: vData.cakesDesserts?.service_pricing
                    },
                    personInfo: vData.cakesDesserts?.person_info,
                };
                break;

            case VendorType.florist:
                vTypes.florists_type = {
                    pricing: vData.florists?.pricing,
                    servicePricing: {
                        pricings: vData.florists?.service_pricing
                    },
                    personInfo: vData.florists?.person_info,
                };
                break;

            case VendorType.videographer:
                vTypes.videographer_type = {
                    pricing: vData.videographer?.pricing,
                    servicePricing: {
                        pricings: vData.videographer?.service_pricing
                    },
                    personInfo: vData.videographer?.person_info,
                    hightlight: vData.videographer?.highlight_video,
                    videoSample: vData.videographer?.video_sample
                };
                break;
        }
        return vTypes;
    }
}
