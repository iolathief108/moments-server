import {DocumentType, modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({options: {customName: "caterer_data"}})
export class CatererDataSchema {
    @prop({required: false, type: () => String})
    sample?: string;
}

export type CatererDataDoc = DocumentType<CatererDataSchema>;
