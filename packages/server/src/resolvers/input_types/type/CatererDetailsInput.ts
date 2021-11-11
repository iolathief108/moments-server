import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../../models/VendorData';
import {SppInput} from '../Spp';
import {PersonInfoInput} from '../PersonInfoInput';
import {ServicePricingsInput} from '../ServicePricing';


@InputType()
export class CatererDetailsInput {
    @Field(() => SppInput, {nullable: true})
    pricing?: SppInput;

    @Field(() => ServicePricingsInput, {nullable: true})
    servicePricing?: ServicePricingsInput;

    @Field(() => PersonInfoInput, {nullable: true})
    personInfo?: PersonInfoInput;

    validate(_?: VendorDataDoc) {
        //todo: validate venue type and venue settings
        this.pricing?.validate();
        this.personInfo?.validate();
        this.servicePricing?.validate();
    }

    async fillVendorData(vData: VendorDataDoc) {
        this.pricing?.fillVendorData(vData);
        await this.personInfo?.fillVendorData(vData)
        this.servicePricing?.fillVendorData(vData)
    }
}
