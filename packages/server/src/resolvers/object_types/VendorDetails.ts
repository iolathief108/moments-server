import {Field, ObjectType} from 'type-graphql';
import {VendorType} from '../../common/const';
import {SocialMedia} from './SocialMedia';
import {FrequentQuestion} from './FrequentQuestion';
import {VendorTypes} from './VendorTypes';
import {Geo} from './Geo';
import {VendorDataDoc} from '../../models/VendorData';
import {getDistrictNames} from '../../models/Location';
import {PhotographerDataType} from './type/PhotographerDetails';
import {CatererDataType} from './type/CatererDetails';
import {VenueDataType} from './type/VenueDetails';
import {Image} from './Image';
import {Clap} from './Clap';

@ObjectType()
export class VendorDetails {
    @Field(() => String, {nullable: true})
    phone?: string;

    @Field(() => String, {nullable: true})
    address?: string;

    @Field(() => [String], {nullable: true})
    search_districts?: string[];

    @Field(() => VendorType, {nullable: true})
    vendor_type?: VendorType;

    @Field(() => SocialMedia, {nullable: true})
    links?: SocialMedia;

    @Field(() => String, {nullable: true})
    business_name?: string;

    @Field(() => [FrequentQuestion], {nullable: true})
    frequent_questions?: FrequentQuestion[];

    @Field(() => VendorTypes, {nullable: true})
    vendorTypes?: VendorTypes;

    @Field(() => [Image], {nullable: true})
    galleryPhoto?: Image[];

    @Field(() => Geo, {nullable: true})
    geo?: Geo;

    @Field(() => String, {nullable: true})
    description?: string;

    @Field(() => [Clap], {nullable: true})
    claps?: Clap[];

    static async getInstanceFromVendorData(
        vData: VendorDataDoc,
    ): Promise<VendorDetails> {
        const vendorDetails = new VendorDetails();
        vendorDetails.business_name = vData.business_name;
        vendorDetails.frequent_questions = vData.frequent_questions;
        vendorDetails.geo = vData.geo;
        vendorDetails.address = vData.address;
        vendorDetails.galleryPhoto = vData.gallery_photos;
        vendorDetails.search_districts = await getDistrictNames(
            vData.search_district_ids,
        );
        vendorDetails.phone = vData.phone;
        vendorDetails.claps = vData.claps;
        vendorDetails.vendor_type = vData.vendor_type;
        vendorDetails.links = {
            facebook: vData.links?.facebook,
            instagram: vData.links?.instagram,
            pinterest: vData.links?.pinterest,
            website: vData.links?.website,
        };

        vendorDetails.description = vData.description || null;

        const typeSpecific = await VendorTypes.getInstanceFromVendorData(vData);
        vendorDetails.vendorTypes = typeSpecific;
        return vendorDetails;
    }
}

@ObjectType()
export class VendorDetailsExtra extends VendorDetails {

    @Field(() => Boolean, {nullable: true})
    isComplete?: boolean;

    static async getInstanceFromVendorData(
        vData: VendorDataDoc,
    ): Promise<VendorDetails> {
        const vendorDetailsExtra = new VendorDetailsExtra();
        vendorDetailsExtra.business_name = vData.business_name;
        vendorDetailsExtra.frequent_questions = vData.frequent_questions;
        vendorDetailsExtra.geo = vData.geo;
        vendorDetailsExtra.address = vData.address;
        vendorDetailsExtra.galleryPhoto = vData.gallery_photos;
        vendorDetailsExtra.search_districts = await getDistrictNames(
            vData.search_district_ids,
        );
        vendorDetailsExtra.phone = vData.phone;
        vendorDetailsExtra.claps = vData.claps;
        vendorDetailsExtra.vendor_type = vData.vendor_type;
        vendorDetailsExtra.links = {
            facebook: vData.links?.facebook,
            instagram: vData.links?.instagram,
            pinterest: vData.links?.pinterest,
            website: vData.links?.website,
        };
        vendorDetailsExtra.isComplete = !!vData.isComplete;
        vendorDetailsExtra.description = vData.description || null;

        const typeSpecific = await VendorTypes.getInstanceFromVendorData(vData);
        vendorDetailsExtra.vendorTypes = typeSpecific;
        return vendorDetailsExtra;
    }
}
