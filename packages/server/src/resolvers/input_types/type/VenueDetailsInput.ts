import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../../models/VendorData';
import {SppInput} from '../Spp';
import {VideoUrlInput} from '../VideoUrlInput';
import {ServicePricingsInput} from '../ServicePricing';


@InputType()
export class VenueDetailsInput {
    @Field(() => SppInput, {nullable: true})
    pricing?: SppInput;

    @Field(() => ServicePricingsInput, {nullable: true})
    servicePricing?: ServicePricingsInput;

    @Field(() => VideoUrlInput, {nullable: true})
    highlight?: VideoUrlInput;

    @Field(() => Number, {nullable: true})
    guestCapacity?: number;

    validate(_?: VendorDataDoc) {
        //todo: validate venue type and venue settings
        this.pricing?.validate();
        this.highlight?.validate();
        this.servicePricing?.validate();
        if (this.guestCapacity && this.guestCapacity < 0 && this.guestCapacity > 2500) {
            throw new Error('Guest capacity should be greater than 0 and less than 2000');
        }
    }

    fillVendorData(vData: VendorDataDoc) {
        if (this.highlight)
            vData.venue.highlight_video = this.highlight;
        if (this.guestCapacity)
            vData.venue.guest_capacity = this.guestCapacity;

        this.servicePricing?.fillVendorData(vData);
        this.pricing?.fillVendorData(vData);
    }
}
