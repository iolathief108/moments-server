import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {VendorType} from "../../common/const";

@modelOptions({schemaOptions: {_id: true}})
export class FilterOptionSchema {
    id?: string;

    @prop({required: true, type: () => String})
    name: string;

    @prop({type: () => Number})
    priority?: number;
}

@modelOptions({options: {customName: 'filter_option'}})
export class FilterOptionsSchema {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: true, type: () => [FilterOptionSchema]})
    values: FilterOptionSchema[];

    @prop({required: true, type: () => String, enum: Object.values(VendorType)})
    vendor_type: VendorType;

    @prop({type: () => Number})
    priority?: number;
}

export const FilterOptionsModel = getModelForClass(
    FilterOptionsSchema,
);
