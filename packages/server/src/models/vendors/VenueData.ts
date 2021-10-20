import {DocumentType, prop} from "@typegoose/typegoose";
import {SppSchema} from '../Spp';

export class VenueDataSchema {
    @prop({required: false, type: () => SppSchema})
    pricing?: SppSchema;
}

export type PhotographerDataDoc = DocumentType<VenueDataSchema>;
