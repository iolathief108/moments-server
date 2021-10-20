import {modelOptions, prop} from '@typegoose/typegoose';
import {ImageSchema} from './objects/Image';


@modelOptions({options: {customName: 'person_info'}})
export class PersonInfoSchema {
    @prop({ required: false, type: () => ImageSchema })
    person_photo: ImageSchema

    @prop({required: true, type: () => String})
    name: string;

    @prop({required: false, type: () => String})
    position?: string;
}
