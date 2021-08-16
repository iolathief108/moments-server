import {DocumentType, prop} from "@typegoose/typegoose";

export class BeautyProfessionalDataSChema {
    @prop({required: false, type: () => String})
    sample?: string;
}

export type PhotographerDataDoc = DocumentType<BeautyProfessionalDataSChema>;