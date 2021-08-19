import {Field, InputType} from 'type-graphql';
import {ArrayMinSize, IsPhoneNumber, IsUrl, Length, MinLength, Validate, ValidateNested} from 'class-validator';
import {IsBusinessNameExist, IsCityID, IsObjectID, IsPhoneNotExist, IsValidBusinessName} from '../../validators';
import {FrequentQuestionInput} from './FrequentQuestionInput';
import {VendorType} from '../../common/const';
import {GeoInput} from './GeoInput';
import {isVendorDataComplete, VendorDataDoc} from '../../models/VendorData';
import {Types} from 'mongoose';
import {VenueDetailsInput} from './type/VenueDetailsInput';
import {GalleryPhotoInput} from '../utils/GalleryPhoto';
import {PhotographerDetailsInput} from './type/PhotographerDetailsInput';
import {CatererDetailsInput} from './type/CatererDetailsInput';
import {ClapInput} from './Clap';
import {BandDjsDetailsInput} from './type/BandDjsDetailsInput';
import {BeautyProfessionalDetailsInput} from './type/BeautyProfessionalDetailsInput';
import {CakesDessertsDetailsInput} from './type/CakesDessertsDetailsInput';
import {FloristsDetailsInput} from './type/FloristsDetailsInput';
import {VideographerDetailsInput} from './type/VideographerDetailsInput';
import {getDistrictsByCities} from '../../models/Location';

@InputType({description: 'Edit common vendor details'})
export class VendorDetailsInput {
    @Field({nullable: true})
    @Length(7, 225)
    address?: string;

    @Field(() => [String], {nullable: true})
    @Validate(IsCityID, {message: 'not a valid city id', each: true})
    @Validate(IsObjectID, {message: 'not a valid object id', each: true})
    cityIDs?: string[];

    @Field({nullable: true})
    @Validate(IsPhoneNotExist)
    @IsPhoneNumber('en-SL' as any)
    phone?: string;

    @Field(() => [FrequentQuestionInput], {nullable: true})
    frequentQuestion?: FrequentQuestionInput[];

    @Field(() => VendorType, {nullable: true})
    vendorType?: VendorType;

    @Field({nullable: true})
    @Length(1, 255)
    @Validate(IsBusinessNameExist)
    @Validate(IsValidBusinessName)
    businessName?: string;

    // LINKS
    @Field({nullable: true})
    @MinLength(18 + 8, {message: 'it must be valid facebook page'})
    @IsUrl({host_whitelist: ['www.facebook.com'], protocols: ['https']})
    facebook?: string;

    @Field({nullable: true})
    @MinLength(19 + 8, {message: 'it must be valid instagram account'})
    @IsUrl({host_whitelist: ['www.instagram.com'], protocols: ['https']})
    instagram?: string;

    @Field({nullable: true})
    @MinLength(19 + 8, {message: 'it must be valid pinterest account'})
    @IsUrl({host_whitelist: ['www.pinterest.com'], protocols: ['https']})
    pinterest?: string;

    @Field({nullable: true})
    @IsUrl({protocols: ['https', 'http']})
    website?: string;

    @Field({nullable: true})
    description?: string;

    // GEO
    @Field(() => GeoInput, {nullable: true})
    geo?: GeoInput;

    @Field(() => [GalleryPhotoInput], {nullable: true})
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    gallery_photos?: GalleryPhotoInput[];

    @Field(() => VenueDetailsInput, {nullable: true})
    venueDetails?: VenueDetailsInput;

    @Field(() => PhotographerDetailsInput, {nullable: true})
    photographerDetails?: PhotographerDetailsInput;

    @Field(() => CatererDetailsInput, {nullable: true})
    catererDetails?: CatererDetailsInput;

    @Field(() => BandDjsDetailsInput, {nullable: true})
    bandDjsDetails?: BandDjsDetailsInput;

    @Field(() => BeautyProfessionalDetailsInput, {nullable: true})
    beautyProfessionalDetails?: BeautyProfessionalDetailsInput;

    @Field(() => CakesDessertsDetailsInput, {nullable: true})
    cakesDessertsDetails?: CakesDessertsDetailsInput;

    @Field(() => FloristsDetailsInput, {nullable: true})
    floristsDetails?: FloristsDetailsInput;

    @Field(() => VideographerDetailsInput, {nullable: true})
    videographerDetails?: VideographerDetailsInput;

    @Field(() => [ClapInput], {nullable: true})
    claps?: ClapInput[];

    async validate(vData: VendorDataDoc) {
        // validate business name
        if (vData.business_name && this.businessName) {
            throw new Error('business name cannot be changed');
        }

        // velidate vendor type
        if (vData.vendor_type && this.vendorType) {
            throw new Error('change vendor type is not allowed');
        }

        if (this.gallery_photos) {
            for (const gallery_photo of this.gallery_photos) {
                gallery_photo.validate(vData);
            }
        }

        this.venueDetails?.validate(vData);
        this.photographerDetails?.validate(vData);
        this.catererDetails?.validate(vData);

        if (this.cityIDs) {
            if (this.vendorType === VendorType.venue && this.cityIDs.length > 1) {
                throw new Error('Venues should have only one city ID');
            }
        }

        //todo: validate claps

        //todo: check if data.phone is verified
    }

    async _fillUrls(vData: VendorDataDoc) {
        for (let galleryPhoto of this.gallery_photos) {
            await galleryPhoto.fillUrl(vData);
        }
    }

    async fillVendorData(vData: VendorDataDoc) {
        if (!vData.links)
            vData.links = {};
        if (this.facebook)
            vData.links.facebook = this.facebook;
        if (this.instagram)
            vData.links.instagram = this.instagram;
        if (this.pinterest)
            vData.links.pinterest = this.pinterest;
        if (this.website)
            vData.links.website = this.website;
        if (this.description)
            vData.description = this.description;

        if (this.phone) {
            vData.phone = this.phone;
        }
        if (this.businessName) {
            vData.business_name = this.businessName;
        }
        if (this.geo) {
            vData.geo = this.geo;
        }
        if (this.address) {
            vData.address = this.address;
        }
        if (this.vendorType) {
            vData.vendor_type = this.vendorType;
        }
        if (this.cityIDs) {
            vData.search_city_ids = this.cityIDs.map(value => {
                return new Types.ObjectId(value);
            });

            const districts = await getDistrictsByCities(this.cityIDs)
            vData.search_district_ids = districts.map(district => district.id)
        }
        if (this.frequentQuestion) {
            vData.frequent_questions = this.frequentQuestion;
        }
        if (this.gallery_photos) {
            await this._fillUrls(vData);
            vData.gallery_photos = this.gallery_photos.map(item => item.getImageDetail());
        }
        // Vendor Type
        if (this.venueDetails) {
            this.venueDetails.fillVendorData(vData);
        }
        if (this.catererDetails) {
            this.catererDetails.fillVendorData(vData);
        }
        if (this.photographerDetails) {
            this.photographerDetails.fillVendorData(vData);
        }
        if (this.bandDjsDetails) {
            this.bandDjsDetails.fillVendorData(vData);
        }
        if (this.beautyProfessionalDetails) {
            this.beautyProfessionalDetails.fillVendorData(vData);
        }
        if (this.cakesDessertsDetails) {
            this.cakesDessertsDetails.fillVendorData(vData);
        }
        if (this.floristsDetails) {
            this.floristsDetails.fillVendorData(vData);
        }
        if (this.videographerDetails) {
            this.videographerDetails.fillVendorData(vData);
        }
        if (this.claps) {
            let tClaps: ClapInput[] = [];
            this.claps.forEach(i => {
                if (i.values.length) {
                    tClaps.push(i);
                }
            });
            vData.claps = tClaps;
        }
        //

        if (isVendorDataComplete(vData)) {
            vData.isComplete = true;
        } else {
            vData.isComplete = undefined;
        }

        await vData.save();
    }
}
