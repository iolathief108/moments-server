import {Field, InputType} from "type-graphql";
import {VendorDataDoc} from "../../../models/VendorData";

@InputType()
export class VenueDetailsInput {
    // @Field(() => [String], {nullable: true})
    // venue_type?: string[];
    //
    // @Field(() => [String], {nullable: true})
    // venue_setting?: string[];

    @Field(() => String, {nullable: true})
    sample?: string

    validate(vData: VendorDataDoc) {
        //todo: validate venue type and venue settings
    }

    fillVendorData(vData: VendorDataDoc) {

        // if (this.venue_setting) {
        //     vData.venue_data.venue_settings = this.venue_setting
        // }
        // if (this.venue_type) {
        //     vData.venue_data.venue_types = this.venue_type
        // }
    }

}
