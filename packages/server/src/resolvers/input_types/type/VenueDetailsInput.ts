import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../../models/VendorData';
import {SppInput} from '../Spp';


@InputType()
export class VenueDetailsInput {
    @Field(() => SppInput, {nullable: true})
    pricing?: SppInput;

    validate(_?: VendorDataDoc) {
        //todo: validate venue type and venue settings
        this.pricing.validate();
    }

    fillVendorData(vData: VendorDataDoc) {
        this.pricing.fillVendorData(vData);
    }
}
