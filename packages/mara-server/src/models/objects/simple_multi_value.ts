import {prop} from "@typegoose/typegoose";

export class simple_multi_value {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: true, type: () => [String]})
    values: string[];
}
