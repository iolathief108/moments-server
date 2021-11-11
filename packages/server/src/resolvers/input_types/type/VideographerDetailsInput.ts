import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../../models/VendorData';
import {SppInput} from '../Spp';
import {PersonInfoInput} from '../PersonInfoInput';
import {VideoUrlInput} from '../VideoUrlInput';
import {ValidateNested} from 'class-validator';
import {ServicePricingsInput} from '../ServicePricing';


@InputType()
export class VideographerDetailsInput {
    @Field(() => SppInput, {nullable: true})
    pricing?: SppInput;

    @Field(() => ServicePricingsInput, {nullable: true})
    servicePricing?: ServicePricingsInput;

    @Field(() => PersonInfoInput, {nullable: true})
    personInfo?: PersonInfoInput;

    @Field(() => VideoUrlInput, {nullable: true})
    highlight?: VideoUrlInput;

    @Field(() => [VideoUrlInput], {nullable: true})
    @ValidateNested()
    videoSample?: VideoUrlInput[];

    validate(_?: VendorDataDoc) {
        //todo: validate venue type and venue settings
        this.pricing?.validate();
        this.personInfo?.validate();
        this.highlight?.validate();
        this.videoSample?.forEach(value => value?.validate());
        this.servicePricing?.validate();
    }

    async fillVendorData(vData: VendorDataDoc) {
        this.pricing?.fillVendorData(vData);
        await this.personInfo?.fillVendorData(vData);
        if (this.highlight) {
            vData.videographer.highlight_video = this.highlight;
        }

        if (this.videoSample) {
            //below will fill the field wd ht id
            for (let vid of this.videoSample) {
                vid.customThumbnail?.token && await vid.customThumbnail.getCommitDetail()
                if (vid.customThumbnail?.id) {
                    for (let vidSample of vData.videographer.video_sample) {
                        if (vidSample.customThumbnail?.id === vid.customThumbnail?.id) {
                            vid.customThumbnail.ht = vidSample.customThumbnail.ht
                            vid.customThumbnail.wd = vidSample.customThumbnail.wd
                        }
                    }
                    if (!vid.customThumbnail?.ht || !vid.customThumbnail?.wd) {
                        throw new Error('invalid id')
                    }
                }
            }
            // then we can just assign it to vdata
            vData.videographer.video_sample = this.videoSample;
        }
        this.servicePricing?.fillVendorData(vData);
    }
}
