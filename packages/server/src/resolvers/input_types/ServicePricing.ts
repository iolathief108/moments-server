import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../models/VendorData';
import {VendorType} from '../../common/const';
import {ServicePriceType} from '../../models/ServicePricing';
import {FixedInput, RangeInput, StartingInput} from './Spp';
import {IsOptional, Max, MaxLength, Min, MinLength, validateOrReject, validateSync} from 'class-validator';
import {plainToClass} from 'class-transformer';


@InputType()
class ServicePriceInput {
    @Field(() => ServicePriceType, {nullable: false})
    price_type: ServicePriceType;

    @Field(() => String, {nullable: true})
    product?: string;

    @Field(() => FixedInput, {nullable: true})
    fixed?: FixedInput;

    @Field(() => RangeInput, {nullable: true})
    range?: RangeInput;

    @Field(() => StartingInput, {nullable: true})
    starting?: StartingInput;

    @Field(() => String, {nullable: true})
    class?: string;

    @Field(() => String, {nullable: true})
    unit?: string;
}

@InputType()
class ServicePricingInput {
    @Field(() => String, {nullable: false})
    @MinLength(4)
    @MaxLength(60)
    name: string;

    @Field(() => [ServicePriceInput], {nullable: true})
    service_prices: ServicePriceInput[];

    @Field(() => Number, {nullable: true})
    @IsOptional()
    @Min(300)
    min_spend?: number;

    validate() {
        const dd = validateSync(plainToClass(ServicePricingInput, this))
        if (dd.length) {
            throw new Error(dd[0].constraints[Object.keys(dd[0].constraints)[0]])
        }

        if (!this.service_prices || !this.service_prices.length ) {
            throw new Error('One or more service price is required');
        }
        for (let servicePrice of this.service_prices) {
            if (servicePrice.unit && servicePrice.unit.length > 40) {
                throw new Error('price unit should be less than 40 characters');
            }

            switch (servicePrice.price_type) {
                case ServicePriceType.Fixed:
                    if (!servicePrice?.fixed?.price || servicePrice.fixed.price < 100) {
                        throw new Error('price is must');
                    }
                    break;
                case ServicePriceType.Range:
                    if (!servicePrice?.range?.from_price || servicePrice.range.from_price < 100) {
                        throw new Error('from price is must');
                    }
                    if (!servicePrice?.range?.to_price || servicePrice.range.to_price < 100) {
                        throw new Error('to price is must');
                    }
                    break;
                case ServicePriceType.Starting:
                    if (!servicePrice?.starting?.price || servicePrice.starting.price < 100) {
                        throw new Error('price is must');
                    }
                    break;
                default:
                    throw new Error('price type is must');
            }
        }

    }
}

@InputType()
export class ServicePricingsInput {

    @Field(() => [ServicePricingInput], {nullable: true})
    pricings?: ServicePricingInput[];

    validate() {
        if (!this.pricings) return;
        for (let pricing of this.pricings) {
            pricing.validate();
        }
    }

    fillVendorData(vData: VendorDataDoc) {
        if (this.pricings === undefined) return;
        switch (vData.vendor_type) {
            case VendorType.bands_dj:
                vData.bandDjs = {
                    ...vData.bandDjs,
                };
                vData.bandDjs.service_pricing = this.pricings;
                break;
            case VendorType.beauty_professional:
                vData.beautyProfessional = {
                    ...vData.beautyProfessional,
                };
                vData.beautyProfessional.service_pricing = this.pricings;
                break;
            case VendorType.cakes_dessert:
                vData.cakesDesserts = {
                    ...vData.cakesDesserts,
                };
                vData.cakesDesserts.service_pricing = this.pricings;
                break;
            case VendorType.caterer:
                vData.caterer = {
                    ...vData.caterer,
                };
                vData.caterer.service_pricing = this.pricings;
                break;
            case VendorType.florist:
                vData.florists = {
                    ...vData.florists,
                };
                vData.florists.service_pricing = this.pricings;
                break;
            case VendorType.photographer:
                vData.photographer = {
                    ...vData.photographer,
                };
                vData.photographer.service_pricing = this.pricings;
                break;
            case VendorType.venue:
                vData.venue = {
                    ...vData.venue,
                };
                vData.venue.service_pricing = this.pricings;
                break;
            case VendorType.videographer:
                vData.videographer = {
                    ...vData.videographer,
                };
                vData.videographer.service_pricing = this.pricings;
                break;
            default:
                throw new Error('Vendor type is missing');
        }
    }
}
