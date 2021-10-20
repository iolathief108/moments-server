// noinspection RedundantIfStatementJS

import {
    DocumentType,
    getModelForClass,
    modelOptions,
    prop,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import {VendorType, VerifyStatus} from '../common/const';
import { VenueDataSchema } from './vendors/VenueData';
import { CatererDataSchema } from './vendors/CatererData';
import { PhotographerDataSchema } from './vendors/PhotographerData';
import { GeoSchema } from './objects/Geo';
import { FrequentQuestionSchema } from './objects/FrequentQuestion';
import { VendorDoc } from './Vendor';
import { LinkObjectSchema } from './objects/Links';
import { ImageSchema } from './objects/Image';
import { ClapSchema } from './objects/Clap';
import { BandDjsDataSchema } from './vendors/BandDjsData';
import { BeautyProfessionalDataSChema } from './vendors/BeautyProfessional';
import { CakesDessertsDataSchema } from './vendors/CakesDesserts';
import { FloristsDataSchema } from './vendors/FloristsData';
import { VideographerDataSchema } from './vendors/Videographer';

@modelOptions({ options: { customName: 'vendor_data' } })
export class VendorDataSchema {
    @prop({ required: false, type: () => String })
    address?: string;

    @prop({ required: false, type: () => [Types.ObjectId], default: [] })
    search_city_ids?: Types.ObjectId[];

    @prop({ required: false, type: () => [Types.ObjectId], default: [] })
    search_district_ids?: Types.ObjectId[];

    @prop({ required: false, type: () => String })
    phone?: string;

    @prop({ required: false, type: () => [FrequentQuestionSchema] })
    frequent_questions?: FrequentQuestionSchema[];

    @prop({
        type: () => String,
        required: false,
        enum: Object.values(VendorType),
    })
    vendor_type?: VendorType;

    @prop({ type: () => String, required: false, unique: true })
    business_name?: string;

    @prop({ type: () => String, required: false })
    description?: string;

    @prop({ type: () => Boolean, required: false })
    isComplete?: boolean;

    // optional
    @prop({ required: false, type: () => LinkObjectSchema })
    links?: LinkObjectSchema;

    @prop({ required: false, type: () => GeoSchema })
    geo?: GeoSchema;

    @prop({ required: false, type: () => [ImageSchema] })
    gallery_photos?: ImageSchema[];

    // depends on category
    @prop({ required: false, type: () => [ClapSchema] })
    claps?: ClapSchema[];

    // verifying things
    @prop({
        type: () => String,
        required: false,
        enum: Object.values(VerifyStatus),
    })
    verifyStatus?: VerifyStatus;

    @prop({ type: () => Boolean, required: false, default: false})
    isRegPaid?: boolean;

    @prop({ type: () => Boolean, required: false, default: false})
    isSuspended?: boolean;

    @prop({ type: () => String, required: false})
    suspensionReason?: string;

    @prop({ type: () => String, required: false})
    unverifiedReason?: string;

    // Vendor Type
    @prop({ required: false, type: () => VenueDataSchema })
    venue?: VenueDataSchema;

    @prop({ required: false, type: () => CatererDataSchema })
    caterer?: CatererDataSchema;

    @prop({ required: false, type: () => PhotographerDataSchema })
    photographer?: PhotographerDataSchema;

    @prop({ required: false, type: () => BandDjsDataSchema })
    bandDjs?: BandDjsDataSchema;

    @prop({ required: false, type: () => BeautyProfessionalDataSChema })
    beautyProfessional?: BeautyProfessionalDataSChema;

    @prop({ required: false, type: () => CakesDessertsDataSchema })
    cakesDesserts?: CakesDessertsDataSchema;

    @prop({ required: false, type: () => FloristsDataSchema })
    florists?: FloristsDataSchema;

    @prop({ required: false, type: () => VideographerDataSchema })
    videographer?: VideographerDataSchema;
}

export const VendorDataModel = getModelForClass(VendorDataSchema);

export type VendorDataDoc = DocumentType<VendorDataSchema>;

function validateGalleryComplete(vData: VendorDataDoc): boolean {
    const galleryExist = vData.gallery_photos && vData.gallery_photos.length > 0;
    switch (vData.vendor_type) {
        case VendorType.venue:
        case VendorType.photographer:
        case VendorType.caterer:
        case VendorType.beauty_professional:
        case VendorType.cakes_dessert:
        case VendorType.florist:
            return galleryExist;
        case VendorType.bands_dj:
        case VendorType.videographer:
            return true;
        default:
            throw new Error('Vendor Data must have a Category Before Gallery Complete Thing');
    }
}

function validateDescriptionComplete(vData: VendorDataDoc): boolean {
    const descriptionExist = !!vData.description;
    switch (vData.vendor_type) {
        case VendorType.venue:
        case VendorType.photographer:
        case VendorType.caterer:
        case VendorType.beauty_professional:
        case VendorType.cakes_dessert:
        case VendorType.florist:
            return descriptionExist;
        case VendorType.videographer:
        case VendorType.bands_dj:
            return true;
        default:
            throw new Error('Vendor Data must have a Category Before Gallery Complete Thing');
    }
}

export function isVendorDataComplete(vData: VendorDataDoc) {
    if (!vData.vendor_type) {
        return false;
    }

    if (!vData.business_name) {
        return false;
    }
    if (!vData.address) {
        return false;
    }

    if (!vData.search_city_ids || vData.search_city_ids.length < 1) {
        return false;
    }

    if (!validateGalleryComplete(vData)) {
        return false;
    }

    if (!vData.phone) {
        return false;
    }

    if (!validateDescriptionComplete(vData)) {
        return false;
    }
    return true;
}

export async function createVendorData(
    vendor: VendorDoc,
): Promise<VendorDataDoc> {
    const vData = await VendorDataModel.create<VendorDataSchema>({});
    vendor.vendor_data_id = vData.id;
    await vendor.save();
    return vData;
}
