import {modelOptions, prop} from '@typegoose/typegoose';

@modelOptions({options: {customName: 'image'}})
export class ImageSchema {
    @prop({required: true, type: () => Number})
    ht: number;

    @prop({required: true, type: () => Number})
    wd: number;

    @prop({required: true, type: () => String})
    id: string;
}
