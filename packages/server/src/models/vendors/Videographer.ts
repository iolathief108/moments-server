import {DocumentType, prop} from "@typegoose/typegoose";

export class VideographerDataSchema {
    @prop({required: false, type: () => String})
    sample?: string;
}

export type PhotographerDataDoc = DocumentType<VideographerDataSchema>;