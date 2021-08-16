import {DocumentType, prop} from "@typegoose/typegoose";

export class BandDjsDataSchema {
    @prop({required: false, type: () => String})
    sample?: string;
}

export type PhotographerDataDoc = DocumentType<BandDjsDataSchema>;