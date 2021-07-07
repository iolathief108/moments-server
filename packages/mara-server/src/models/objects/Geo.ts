import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({ options: {customName: 'geo'}})
export class GeoSchema {
    @prop({required: false, type: () => Number})
    latitude: number;

    @prop({required: false, type: () => Number})
    longitude: number;
}