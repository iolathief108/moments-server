import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Document } from "mongoose";
import { VendorType } from "../common/const";

@modelOptions({ schemaOptions: { _id: true } })
class struct_value extends Document {
    @prop({ required: true, type: () => String })
    name: string;

    @prop({ required: true, type: () => Boolean })
    main_filter: boolean;

    @prop({ required: true, type: () => Boolean })
    can_filter: boolean;

    @prop({ required: true, type: () => Boolean })
    approved: boolean;
}

class info_struct {

    @prop({ required: true, type: () => String })
    name: string;

    @prop({ required: true, type: () => [struct_value] })
    available_values: struct_value[];

    @prop({ required: true, type: () => String, enum: Object.values(VendorType) })
    vendor_type: VendorType;
    
    @prop({ required: true, type: () => Boolean })
    main: boolean;
}

export const InfoStruct = getModelForClass(info_struct);
