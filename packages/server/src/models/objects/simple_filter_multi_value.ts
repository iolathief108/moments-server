import {prop} from "@typegoose/typegoose";
import {Types} from "mongoose";

/*
* todo: need a breaf explanation of the concept
* */

export class simple_filter_value {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: false, type: () => Types.ObjectId})
    ref_id?: Types.ObjectId;
}

export class simple_filter_multi_value { @prop({required: true, type: () => String})

    @prop({required: true, type: () => String})
    cache_name: string;

    @prop({required: true, type: () => Types.ObjectId})
    sfmv_store_id: Types.ObjectId;

    @prop({required: true, type: () => [simple_filter_value]})
    simple_filter_values: simple_filter_value[];
}

