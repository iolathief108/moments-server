import {Field, ObjectType} from 'type-graphql';
import {VendorType} from '../../common/const';
import {SocialMedia} from './SocialMedia';
import {FrequentQuestion} from './FrequentQuestion';
import {VendorTypes} from './VendorTypes';
import {Geo} from './Geo';
import {VendorDataDoc} from '../../models/VendorData';
import {getDistrictNames} from '../../models/Location';
import {PhotographerDataType} from './PhotographerDetails';
import {CatererDataType} from './CatererDetails';
import {VenueDataType} from './VenueDetails';
import {Image} from './Image';

@ObjectType()
export class VendorDetails {
    @Field(() => String)
    phone: string;

    @Field(() => String)
    address: string;

    @Field(() => [String])
    search_districts?: string[];

    @Field(() => VendorType)
    vendor_type?: VendorType;

    @Field(() => SocialMedia)
    links: SocialMedia;

    @Field(() => String)
    business_name: string;

    @Field(() => [FrequentQuestion])
    frequent_questions: FrequentQuestion[];

    @Field(() => VendorTypes)
    vendorTypes: VendorTypes;

    @Field(() => [Image])
    galleryPhoto?: Image[];

    @Field(() => Geo, {nullable: true})
    geo?: Geo;

    @Field(() => PhotographerDataType, {nullable: true})
    photographerData?: PhotographerDataType;

    @Field(() => CatererDataType, {nullable: true})
    catererData?: CatererDataType;

    @Field(() => VenueDataType, {nullable: true})
    venueData?: VenueDataType;

    @Field(() => String, {nullable: true})
    description?: string;

    static async getInstanceFromVendorData(
        vData: VendorDataDoc,
    ): Promise<VendorDetails> {
        const vendorDetails = new VendorDetails();
        vendorDetails.business_name = vData.business_name;
        vendorDetails.frequent_questions = vData.frequent_questions;
        vendorDetails.geo = vData.geo;
        vendorDetails.address = vData.address;
        vendorDetails.galleryPhoto = vData.gallery_photos
        vendorDetails.search_districts = await getDistrictNames(
            vData.search_district_ids,
        );
        vendorDetails.phone = vData.phone;
        vendorDetails.vendor_type = vData.vendor_type;
        vendorDetails.links = {
            facebook: vData.links.facebook,
            instagram: vData.links.instagram,
            pinterest: vData.links.pinterest,
            website: vData.links.website,
        };

        vendorDetails.description = vData.description ?? null;

        if (vData.vendor_type) {
            if (vData.vendor_type === VendorType.caterer) {
                vendorDetails.catererData = vData.caterer_data;
            }

            if (vData.vendor_type === VendorType.venue) {
                vendorDetails.venueData = vData.venue_data;
            }

            if (vData.vendor_type === VendorType.photographer) {
                vendorDetails.photographerData = vData.photographer_data;
            }
        }

        const typeSpecific = await VendorTypes.getInstanceFromVendorData(vData);
        vendorDetails.vendorTypes = typeSpecific;
        return vendorDetails;
    }
}

@ObjectType()
export class VendorDetailsExtra extends VendorDetails {}
