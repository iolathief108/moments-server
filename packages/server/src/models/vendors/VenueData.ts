import {DocumentType, prop} from "@typegoose/typegoose";
import {SppSchema} from '../Spp';
import {VideoUrlSchema} from '../VideoUrl';
import {ServicePricing} from '../ServicePricing';

export class VenueDataSchema {
    @prop({required: false, type: () => SppSchema})
    pricing?: SppSchema;

    @prop({required: false, type: () => VideoUrlSchema})
    highlight_video?: VideoUrlSchema;

    @prop({required: false, type: () => [ ServicePricing ]})
    service_pricing?: ServicePricing[];

    @prop({required: false, type: () => Number})
    guest_capacity?: number;
}

export type VenueDataDoc = DocumentType<VenueDataSchema>;
