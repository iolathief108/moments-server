import {prop} from '@typegoose/typegoose';
import {ImageSchema} from './objects/Image';


export class VideoUrlSchema {
    @prop({required: false, type: () => String})
    vimeoUrl?: string;

    @prop({required: false, type: () => String})
    youtubeUrl?: string;

    //todo:
    @prop({required: false, type: () => String})
    videoTitle?: string;

    @prop({required: false, type: () => String})
    videoType?: string;

    @prop({ required: false, type: () => ImageSchema })
    customThumbnail?: ImageSchema
}
