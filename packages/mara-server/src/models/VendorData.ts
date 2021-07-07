import {
    DocumentType,
    getModelForClass,
    modelOptions,
    prop,
} from '@typegoose/typegoose';
import {Types} from 'mongoose';
import {VendorType} from '../common/const';
import {VenueDataSchema} from './vendors/VenueData';
import {CatererDataSchema} from './vendors/CatererData';
import {PhotographerDataSchema} from './vendors/PhotographerData';
import {GeoSchema} from './objects/Geo';
import {FrequentQuestionSchema} from './objects/FrequentQuestion';
import {VendorDoc} from './Vendor';
import {LinkObjectSchema} from './objects/Links';
import {ImageSchema} from './objects/Image';

@modelOptions({options: {customName: 'vendor_data'}})
export class VendorDataSchema {
    @prop({required: false, type: () => String})
    address?: string;

    @prop({required: false, type: () => [Types.ObjectId], default: []})
    search_district_ids?: Types.ObjectId[];

    @prop({required: false, type: () => String})
    phone?: string;

    @prop({required: false, type: () => [FrequentQuestionSchema]})
    frequent_questions?: FrequentQuestionSchema[];

    @prop({
        type: () => String,
        required: false,
        enum: Object.values(VendorType),
    })
    vendor_type?: VendorType;

    @prop({type: () => String, required: false, unique: true})
    business_name?: string;

    @prop({type: () => String, required: false})
    description?: string;

    // optional
    @prop({required: false, type: () => LinkObjectSchema})
    links?: LinkObjectSchema;

    @prop({required: false, type: () => GeoSchema})
    geo?: GeoSchema;

    @prop({required: false, type: () => [ImageSchema]})
    gallery_photos?: ImageSchema[];

    // depends on category
    @prop({required: false, type: () => VenueDataSchema})
    venue_data?: VenueDataSchema;

    @prop({required: false, type: () => CatererDataSchema})
    caterer_data?: CatererDataSchema;

    @prop({required: false, type: () => PhotographerDataSchema})
    photographer_data?: PhotographerDataSchema;
}

export const VendorDataModel = getModelForClass(VendorDataSchema);

export type VendorDataDoc = DocumentType<VendorDataSchema>;

export function isVendorDataComplete(vData: DocumentType<VendorDataSchema>) {
    if (!vData.business_name) {
        return false;
    }
    // todo: main like above complete the rest
}

export async function createVendorData(
    vendor: VendorDoc,
): Promise<VendorDataDoc> {
    const vData = await VendorDataModel.create<VendorDataSchema>({});
    vendor.vendor_data_id = vData.id;
    await vendor.save();
    return vData;
}
