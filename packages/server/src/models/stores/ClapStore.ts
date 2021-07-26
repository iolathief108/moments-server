import {getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {VendorType} from '../../common/const';

@modelOptions({options: {customName: 'clap_store'}})
export class ClapStoreSchema {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: true, type: () => String})
    key: string;

    @prop({required: true, type: () => [String]})
    values: string[];

    @prop({required: true, type: () => String, enum: Object.values(VendorType)})
    vendor_type: VendorType;
}

export const ClapStoreModel = getModelForClass(
    ClapStoreSchema,
);
