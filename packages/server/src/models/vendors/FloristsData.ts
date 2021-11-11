import {DocumentType, prop} from "@typegoose/typegoose";
import {SppSchema} from '../Spp';
import {PersonInfoSchema} from '../PersonInfo';
import {ServicePricing} from '../ServicePricing';

export class FloristsDataSchema {
    @prop({required: false, type: () => SppSchema})
    pricing?: SppSchema;

    @prop({required: false, type: () => PersonInfoSchema})
    person_info?: PersonInfoSchema;

    @prop({required: false, type: () => [ ServicePricing ]})
    service_pricing?: ServicePricing[];

}

export type PhotographerDataDoc = DocumentType<FloristsDataSchema>;
