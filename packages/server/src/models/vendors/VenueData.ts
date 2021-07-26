import {prop} from "@typegoose/typegoose";

export class VenueDataSchema {
    // @prop({required: false, type: () => [String]})
    // venue_types?: string[];
    //
    // @prop({required: false, type: () => [String]})
    // venue_settings?: string[];

    @prop({required: false, type: () => String})
    sample?: string;
}

