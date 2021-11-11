import {DocumentType, prop} from "@typegoose/typegoose";
import {SppSchema} from '../Spp';
import {PersonInfoSchema} from '../PersonInfo';
import {VideoUrlSchema} from '../VideoUrl';
import {ServicePricing} from '../ServicePricing';

export class BandDjsDataSchema {
    @prop({required: false, type: () => SppSchema})
    pricing?: SppSchema;

    @prop({required: false, type: () => [ ServicePricing ]})
    service_pricing?: ServicePricing[];

    @prop({required: false, type: () => PersonInfoSchema})
    person_info?: PersonInfoSchema;

    @prop({required: false, type: () => VideoUrlSchema})
    highlight_video?: VideoUrlSchema;

    @prop({required: false, type: () => [ VideoUrlSchema ]})
    video_sample?: VideoUrlSchema[];
}

export type PhotographerDataDoc = DocumentType<BandDjsDataSchema>;
