import {DocumentType, modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({options: {customName: "caterer_data"}})
export class CatererDataSchema {
    @prop({required: false, type: () => [String]})
    services?: string[];

    @prop({required: false, type: () => [String]})
    type_of_meal_services?: string[];
}

export type CatererDataDoc = DocumentType<CatererDataSchema>;
