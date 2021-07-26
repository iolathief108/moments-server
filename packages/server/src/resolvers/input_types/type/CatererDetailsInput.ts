import {Field, InputType} from "type-graphql";
import {VendorDataDoc} from "../../../models/VendorData";
import {Types} from "mongoose";

@InputType()
export class CatererDetailsInput {
    // @Field(() => [String], {nullable: true})
    // services?: string[];
    //
    // @Field(() => [String], {nullable: true})
    // types_of_meal_services?: string[];

    @Field(() => String, {nullable: true})
    sample?: string

    validate(vData: VendorDataDoc) {
        //todo: validate venue type and venue settings
    }

    fillVendorData(vData: VendorDataDoc) {

        // if (this.types_of_meal_services) {
        //     vData.caterer_data.type_of_meal_services = this.types_of_meal_services
        // }
        // if (this.services) {
        //     vData.caterer_data.services = this.services
        // }
    }

}
