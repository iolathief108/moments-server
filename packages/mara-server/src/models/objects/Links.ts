import {modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({ options: {customName: 'link_object'}})
export class LinkObjectSchema {
    @prop({required: false, type: () => String})
    facebook?: string;

    @prop({required: false, type: () => String})
    instagram?: string;

    @prop({required: false, type: () => String})
    pinterest?: string;

    @prop({required: false, type: () => String})
    website?: string;
}
