import {DocumentType, prop} from "@typegoose/typegoose";

export class PhotographerDataSchema {
    @prop({required: false, type: () => String})
    sample?: string;
}

export type PhotographerDataDoc = DocumentType<PhotographerDataSchema>