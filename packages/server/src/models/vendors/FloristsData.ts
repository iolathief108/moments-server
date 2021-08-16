import {DocumentType, prop} from "@typegoose/typegoose";

export class FloristsDataSchema {
    @prop({required: false, type: () => String})
    sample?: string;
}

export type PhotographerDataDoc = DocumentType<FloristsDataSchema>;