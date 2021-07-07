import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {VendorType} from "../../common/const";

export class simple_recommend_value {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: true, type: () => Number, unique: true})
    priority: number;
}

export class simple_recommend_multi_value_store {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: true, type: () => [simple_recommend_value]})
    values: simple_recommend_value[];

    @prop({required: true, type: () => VendorType})
    vendor_type: VendorType;

    @prop({required: true, type: () => Number, unique: true})
    priority: number;
}

export const SimpleRecommendMultiValueStoreModel = getModelForClass(simple_recommend_multi_value_store);
