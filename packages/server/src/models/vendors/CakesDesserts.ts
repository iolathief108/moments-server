import {DocumentType, prop} from "@typegoose/typegoose";

export class CakesDessertsDataSchema {
    @prop({required: false, type: () => String})
    sample?: string;
}

export type PhotographerDataDoc = DocumentType<CakesDessertsDataSchema>;