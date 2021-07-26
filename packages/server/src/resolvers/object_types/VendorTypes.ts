import {Field, ObjectType} from "type-graphql";
import {CatererDataType} from "./type/CatererDetails";
import {VenueDataType} from "./type/VenueDetails";
import {PhotographerDataType} from "./type/PhotographerDetails";
import {VendorDataDoc} from "../../models/VendorData";
import {VendorType} from "../../common/const";

@ObjectType()
export class VendorTypes {
    @Field(() => CatererDataType, {nullable: true})
    caterer_type?: CatererDataType;

    @Field(() => VenueDataType, {nullable: true})
    venue_type?: VenueDataType;

    @Field(() => PhotographerDataType, {nullable: true})
    photographer_type?: PhotographerDataType;

    static async getInstanceFromVendorData(
        vData: VendorDataDoc,
    ): Promise<VendorTypes> {
        const typeSpecific = new VendorTypes();
        if (!vData.vendor_type) return null;
        switch (vData.vendor_type) {
            case VendorType.caterer:

                // vData.caterer_data.service_ids
                typeSpecific.caterer_type = {
                    // services: vData.caterer_data?.services,
                    // types_of_meal_service: vData.caterer_data?.type_of_meal_services
                };
                break;

            case VendorType.venue:
                typeSpecific.venue_type = {
                    // venue_settings: vData.venue_data?.venue_settings,
                    // venue_types: vData.venue_data?.venue_types
                };
                break;

            case VendorType.photographer:
                typeSpecific.photographer_type = {
                    // deliverables: vData.photographer_data?.deliverables,
                    // services: vData.photographer_data?.services
                };
                break;
        }
        return typeSpecific;
    }
}
