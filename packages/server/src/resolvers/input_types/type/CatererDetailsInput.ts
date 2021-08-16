import {Field, InputType} from "type-graphql";
import {VendorDataDoc} from "../../../models/VendorData";

@InputType()
export class CatererDetailsInput {
    @Field(() => String, {nullable: true})
    sample?: string

    validate(vData: VendorDataDoc) {
        //todo: validate venue type and venue settings
    }

    fillVendorData(vData: VendorDataDoc) { }
}
