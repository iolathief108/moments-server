import {Field, InputType} from "type-graphql";
import {VendorDataDoc} from "../../../models/VendorData";
import {Types} from "mongoose";

@InputType()
export class PhotographerDetailsInput {
    // @Field(() => [String], {nullable: true})
    // services?: string[];
    //
    // @Field(() => [String], {nullable: true})
    // deliverables?: string[];

    @Field(() => String, {nullable: true})
    sample?: string

    validate(vData: VendorDataDoc) {
        //todo: validate venue type and venue settings
    }

    fillVendorData(vData: VendorDataDoc) {

        // if (this.deliverables) {
        //     vData.photographer_data.deliverables = this.deliverables
        // }
        // if (this.services) {
        //     vData.photographer_data.services = this.services
        // }
    }
}
