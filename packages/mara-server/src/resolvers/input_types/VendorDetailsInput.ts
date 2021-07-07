import {Field, InputType} from "type-graphql";
import {
    ArrayMinSize,
    IsPhoneNumber,
    IsUrl,
    Length,
    MinLength,
    Validate,
    ValidateNested,
} from "class-validator";
import {
    IsBusinessNameExist,
    IsDistrictID,
    IsObjectID,
    IsPhoneExist,
    IsValidBusinessName,
} from "../../validators";
import {FrequentQuestionInput} from "./FrequentQuestionInput";
import {VendorType} from "../../common/const";
import {GeoInput} from "./GeoInput";
import {VendorDataDoc} from "../../models/VendorData";
import {Types} from "mongoose";
import {VenueDetailsInput} from "./vendors/VenueDetailsInput";
import {GalleryPhotoInput} from "../utils/GalleryPhoto";
import {PhotographerDetailsInput} from "./vendors/PhotographerDetailsInput";
import {CatererDetailsInput} from "./vendors/CatererDetailsInput";

@InputType({description: "Edit common vendor details"})
export class VendorDetailsInput {
    @Field({nullable: true})
    @Length(7, 225)
    address?: string;

    @Field(() => [String], {nullable: true})
    @Validate(IsDistrictID)
    @Validate(IsObjectID)
    searchDistrictIDs?: string[];

    @Field({nullable: true})
    @Validate(IsPhoneExist)
    @IsPhoneNumber("en-SL" as any)
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

    @Field({nullable: true})
    @MinLength(18 + 8, {message: "it must be valid facebook page"})
    @IsUrl({host_whitelist: ["www.facebook.com"], protocols: ["https"]})
    facebook?: string;

    @Field({nullable: true})
    @MinLength(19 + 8, {message: "it must be valid instagram account"})
    @IsUrl({host_whitelist: ["www.instagram.com"], protocols: ["https"]})
    instagram?: string;

    @Field({nullable: true})
    @MinLength(19 + 8, {message: "it must be valid pinterest account"})
    @IsUrl({host_whitelist: ["www.pinterest.com"], protocols: ["https"]})
    pinterest?: string;

    @Field({nullable: true})
    @IsUrl({protocols: ["https", "http"]})
    website?: string;

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

    validate(vData: VendorDataDoc) {
        // validate business name
        if (vData.business_name && this.businessName) {
            throw new Error("business name cannot be changed");
        }

        // velidate vendor type
        if (vData.vendor_type && this.vendorType) {
            throw new Error("change vendor type is not allowed");
        }

        if (this.gallery_photos) {
            for (const gallery_photo of this.gallery_photos) {
                gallery_photo.validate(vData);
            }
        }

        this.venueDetails.validate(vData);
        this.photographerDetails.validate(vData);
        this.catererDetails.validate(vData);
        //todo: check if data.phone is verified
    }

    _fillUrls(vData: VendorDataDoc) {
        for (let galleryPhoto of this.gallery_photos) {
            galleryPhoto.fillUrl(vData);
        }
    }

    async fillVendorData(vData: VendorDataDoc) {
        if (this.facebook) {
            vData.links.facebook = this.facebook;
        }
        if (this.instagram) {
            vData.links.instagram = this.instagram;
        }
        if (this.pinterest) {
            vData.links.pinterest = this.pinterest;
        }
        if (this.phone) {
            vData.phone = this.phone;
        }
        if (this.businessName) {
            vData.business_name = this.businessName;
        }
        if (this.geo) {
            vData.geo = this.geo;
        }
        if (this.website) {
            vData.links.website = this.website;
        }
        if (this.address) {
            vData.address = this.address;
        }
        if (this.vendorType) {
            vData.vendor_type = this.vendorType;
        }
        if (this.searchDistrictIDs) {
            vData.search_district_ids = this.searchDistrictIDs.map((value) => {
                return new Types.ObjectId(value);
            });
        }
        if (this.frequentQuestion) {
            vData.frequent_questions = this.frequentQuestion;
        }
        if (this.gallery_photos) {
            this._fillUrls(vData);
            vData.gallery_photos = this.gallery_photos.map(item => item.getImageDetail())
        }
        if (this.venueDetails) {
            this.venueDetails.fillVendorData(vData);
        }
        if (this.catererDetails) {
            this.catererDetails.fillVendorData(vData);
        }
        if (this.photographerDetails) {
            this.photographerDetails.fillVendorData(vData);
        }

        await vData.save();
    }
}
