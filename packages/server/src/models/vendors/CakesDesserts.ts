import {DocumentType, prop} from "@typegoose/typegoose";
import {SppSchema} from '../Spp';
import {PersonInfoSchema} from '../PersonInfo';

export class CakesDessertsDataSchema {
    @prop({required: false, type: () => SppSchema})
    pricing?: SppSchema;

    @prop({required: false, type: () => PersonInfoSchema})
    person_info?: PersonInfoSchema;
}

export type PhotographerDataDoc = DocumentType<CakesDessertsDataSchema>;
