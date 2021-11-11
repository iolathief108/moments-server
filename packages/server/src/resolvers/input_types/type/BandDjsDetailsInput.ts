import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../../models/VendorData';
import {SppInput} from '../Spp';
import {PersonInfoInput} from '../PersonInfoInput';
import {VideoUrlInput} from '../VideoUrlInput';
import {ServicePricingsInput} from '../ServicePricing';


@InputType()
export class BandDjsDetailsInput {
    @Field(() => SppInput, {nullable: true})
    pricing?: SppInput;

    @Field(() => ServicePricingsInput, {nullable: true})
    servicePricing?: ServicePricingsInput;

    @Field(() => PersonInfoInput, {nullable: true})
    personInfo?: PersonInfoInput;

    @Field(() => VideoUrlInput, {nullable: true})
    highlight?: VideoUrlInput;

    @Field(() => [VideoUrlInput], {nullable: true})
    videoSample?: VideoUrlInput[];

    validate(_?: VendorDataDoc) {
        //todo: validate venue type and venue settings
        this.pricing?.validate();
        this.personInfo?.validate();
        this.servicePricing?.validate();
        this.highlight?.validate();
        this.videoSample?.forEach(value => value?.validate());
    }

    async fillVendorData(vData: VendorDataDoc) {
        this.pricing?.fillVendorData(vData);
        await this.personInfo?.fillVendorData(vData);
        if (this.highlight) {
            vData.bandDjs.highlight_video = this.highlight;
        }
        if (this.videoSample) {
            //below will fill the field wd ht id
            for (let vid of this.videoSample) {
                vid.customThumbnail?.token ? await vid.customThumbnail.getCommitDetail() : vid.customThumbnail?.id;
            }
            // then we can just assign it to vdata
            vData.videographer.video_sample = this.videoSample;
        }

        this.servicePricing?.fillVendorData(vData)
    }
}
