import {DocumentType, prop} from "@typegoose/typegoose";
import {SppSchema} from '../Spp';
import {PersonInfoSchema} from '../PersonInfo';

export class FloristsDataSchema {
    @prop({required: false, type: () => SppSchema})
    pricing?: SppSchema;

    @prop({required: false, type: () => PersonInfoSchema})
    person_info?: PersonInfoSchema;
}

export type PhotographerDataDoc = DocumentType<FloristsDataSchema>;
