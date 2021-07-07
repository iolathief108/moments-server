import {DocumentType, prop} from "@typegoose/typegoose";

export class PhotographerDataSchema {
    @prop({required: false, type: () => [String]})
    services?: string[];

    @prop({required: false, type: () => [String]})
    deliverables?: string[];
}

export type PhotographerDataDoc = DocumentType<PhotographerDataSchema>