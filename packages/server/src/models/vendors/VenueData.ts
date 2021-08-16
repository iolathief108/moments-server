import {DocumentType, prop} from "@typegoose/typegoose";

export class VenueDataSchema {
    @prop({required: false, type: () => String})
    sample?: string;
}

export type PhotographerDataDoc = DocumentType<VenueDataSchema>;