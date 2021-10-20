import {Field, ObjectType, registerEnumType} from 'type-graphql';
import {getListingStatus, ListingStatus, LIVE_UNPAID, VendorType, VerifyStatus} from '../../common/const';
import {SocialMedia} from './SocialMedia';
import {FrequentQuestion} from './FrequentQuestion';
import {VendorTypes} from './VendorTypes';
import {Geo} from './Geo';
import {VendorDataDoc} from '../../models/VendorData';
import {Image} from './Image';
import {Clap} from './Clap';
import {District} from './District';


@ObjectType()
export class VendorDetails {
    @Field(() => String, {nullable: true})
    phone?: string;

    @Field(() => String, {nullable: true})
    address?: string;

    @Field(() => [District], {nullable: true})
    searchLocations?: District[];

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


        vendorDetails.searchLocations = await District.get(vData.search_city_ids || [], vData.search_district_ids || []);
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

        const vType = await VendorTypes.getInstanceFromVendorData(vData);
        vendorDetails.vendorTypes = vType;
        return vendorDetails;
    }
}

registerEnumType(ListingStatus, {
    name: 'ListingStatus',
});


@ObjectType()
export class VendorDetailsExtra extends VendorDetails {

    @Field(() => Boolean, {nullable: true})
    isComplete?: boolean;

    @Field(() => ListingStatus, {nullable: true})
    listingStatus?: ListingStatus;

    @Field(() => Boolean, {nullable: true})
    isLive?: boolean;

    @Field(() => String, {nullable: true})
    reason?: string;

    static async getInstanceFromVendorData(
        vData: VendorDataDoc,
    ): Promise<VendorDetailsExtra> {

        const vendorDetailsExtra: VendorDetailsExtra = await super.getInstanceFromVendorData(vData);

        vendorDetailsExtra.isComplete = !!vData.isComplete;
        vendorDetailsExtra.isLive =
            !((!vData.isComplete || !vData.verifyStatus || vData.verifyStatus === VerifyStatus.pending || vData.verifyStatus === VerifyStatus.unverified) ||
                (vData.isSuspended) ||
                (!LIVE_UNPAID && !vData.isRegPaid));
        vendorDetailsExtra.listingStatus = getListingStatus(vData)[0];
        vendorDetailsExtra.reason = getListingStatus(vData)[1];

        return vendorDetailsExtra;
    }
}
