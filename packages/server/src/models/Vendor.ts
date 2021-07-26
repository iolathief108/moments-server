import {
    DocumentType,
    getModelForClass,
    modelOptions,
    prop,
} from "@typegoose/typegoose";

@modelOptions({options: {customName: "vendor"}})
export class VendorSchema {
    @prop({type: () => String, required: true})
    first_name: string;

    @prop({type: () => String, required: true})
    last_name: string;

    @prop({type: () => String, required: false, sparse: true, unique: true})
    email?: string;

    @prop({type: () => String, required: true, unique: true})
    phone: string;

    @prop({type: () => String, required: false})
    address?: string;

    @prop({type: () => Boolean, required: true, default: false})
    verified: boolean;

    @prop({type: () => String, required: true})
    password: string;

    @prop({type: () => String, required: false})
    vendor_data_id?: string;

    @prop({type: () => Date, required: true})
    created_at: Date;

    @prop({type: () => Date, required: true})
    updated_at: Date;

    @prop({type: () => Boolean, required: false})
    email_verified?: boolean;
}

export const VendorModel = getModelForClass(VendorSchema);

export type VendorDoc = DocumentType<VendorSchema>;
