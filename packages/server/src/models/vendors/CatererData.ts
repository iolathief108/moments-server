import {DocumentType, modelOptions, prop} from "@typegoose/typegoose";
import {SppSchema} from '../Spp';
import {PersonInfoSchema} from '../PersonInfo';

@modelOptions({options: {customName: "caterer_data"}})
export class CatererDataSchema {
    @prop({required: false, type: () => SppSchema})
    pricing?: SppSchema;

    @prop({required: false, type: () => PersonInfoSchema})
    person_info?: PersonInfoSchema;
}

export type CatererDataDoc = DocumentType<CatererDataSchema>;
