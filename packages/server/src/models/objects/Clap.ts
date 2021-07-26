import {DocumentType, modelOptions, prop} from '@typegoose/typegoose';

@modelOptions({options: {customName: 'clap'}})
export class ClapSchema {
    // @prop({required: false, type: () => [String]})
    // services?: string[];
    //
    // @prop({required: false, type: () => [String]})
    // deliverables?: string[];
    @prop({required: true, type: () => String})
    name: string

    @prop({required: true, type: () => String})
    key: string

    @prop({required: true, type: () => [String]})
    values: string[]
}

export type PhotographerDataDoc = DocumentType<ClapSchema>
