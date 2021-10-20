import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../../models/VendorData';
import {Types} from 'mongoose';
import {SppInput} from '../Spp';
import {PersonInfoInput} from '../PersonInfoInput';


@InputType()
export class PhotographerDetailsInput {
    @Field(() => SppInput, {nullable: true})
    pricing?: SppInput;

    @Field(() => PersonInfoInput, {nullable: true})
    personInfo?: PersonInfoInput;

    validate(_?: VendorDataDoc) {
        //todo: validate venue type and venue settings

        this.pricing?.validate();
        this.personInfo?.validate();
    }

    async fillVendorData(vData: VendorDataDoc) {
        this.pricing?.fillVendorData(vData);
        await this.personInfo?.fillVendorData(vData)
    }
}
