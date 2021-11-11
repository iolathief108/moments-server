import {Field, InputType} from 'type-graphql';
import {PriceType} from '../../models/Spp';
import {VendorDataDoc} from '../../models/VendorData';
import {VendorType} from '../../common/const';


@InputType()
export class FixedInput {
    @Field(() => Number, {nullable: true})
    price: number;
}

@InputType()
export class StartingInput {
    @Field(() => Number, {nullable: true})
    price: number;
}

@InputType()
export class RangeInput {
    @Field(() => Number, {nullable: true})
    from_price: number;

    @Field(() => Number, {nullable: true})
    to_price: number;
}

@InputType()
export class PriceInput {
    @Field(() => String, {nullable: true})
    name: string;

    @Field(() => PriceType, {nullable: false})
    price_type: PriceType;

    @Field(() => FixedInput, {nullable: true})
    fixed: FixedInput;

    @Field(() => RangeInput, {nullable: true})
    range: RangeInput;

    @Field(() => StartingInput, {nullable: true})
    starting: StartingInput;

    @Field(() => String, {nullable: true})
    unit: string;
}

@InputType()
export class PackageInput {
    @Field(() => String, {nullable: true})
    name: string;

    @Field(() => String, {nullable: true})
    short: string;

    @Field(() => Number, {nullable: true})
    min_price: number;

    @Field(() => String, {nullable: true})
    description: string;

    @Field(() => [PriceInput], {nullable: true})
    price: PriceInput[];
}

@InputType()
export class SppInput {
    @Field(() => Number, {nullable: true})
    min_price: number;

    @Field(() => [PackageInput], {nullable: true})
    packages: PackageInput[];

    validate() {
        if (this.min_price && this.min_price < 10) {
            throw new Error('invalid min price');
        }
        for (const pkg of this.packages) {

            if (pkg.name && pkg.name.length > 50) {
                throw new Error('package name should be less than 50 characters');
            }

            if (pkg.short && pkg.short.length > 35) {
                throw new Error('Package short should be less than 35 characters');
            }

            if (pkg.min_price && pkg.min_price < 100) {
                throw new Error('invalid min price');
            }

            for (const price of pkg.price) {
                if (pkg.price.length > 1 && !price.name) {
                    throw new Error('price name is must if you have more than one price');
                }
                if (price.name && price.name.length > 35) {
                    throw new Error('price name should be less than 35 characters');
                }
                if (price.unit && price.unit.length > 40) {
                    throw new Error('price unit should be less than 40 characters');
                }
                switch (price.price_type) {
                    case PriceType.fixed:
                        if (!price?.fixed?.price || price.fixed.price < 20) {
                            throw new Error('price is must');
                        }
                        break;
                    case PriceType.range:
                        if (!price?.range?.from_price || price.range.from_price < 20) {
                            throw new Error('from price is must');
                        }
                        if (!price?.range?.to_price || price.range.to_price < 20) {
                            throw new Error('to price is must');
                        }
                        break;
                    case PriceType.starting:
                        if (!price?.starting?.price || price.starting.price < 20) {
                            throw new Error('price is must');
                        }
                        break;
                    default:
                        throw new Error('price type is must');
                }
            }
        }

    }

    fillVendorData(vData: VendorDataDoc) {
        switch (vData.vendor_type) {
            case VendorType.bands_dj:
                vData.bandDjs = {
                	...vData.bandDjs
                };
                vData.bandDjs.pricing = this;
                break;
            case VendorType.beauty_professional:
                vData.beautyProfessional = {
                	...vData.beautyProfessional
                };
                vData.beautyProfessional.pricing = this;
                break;
            case VendorType.cakes_dessert:
                vData.cakesDesserts = {
                	...vData.cakesDesserts
                };
                vData.cakesDesserts.pricing = this;
                break;
            case VendorType.caterer:
                vData.caterer = {
                	...vData.caterer
                };
                vData.caterer.pricing = this;
                break;
            case VendorType.florist:
                vData.florists = {
                	...vData.florists
                };
                vData.florists.pricing = this;
                break;
            case VendorType.photographer:
                vData.photographer = {
                	...vData.photographer,
                };
                vData.photographer.pricing = this
                break;
            case VendorType.venue:
                vData.venue = {
                	...vData.venue
                };
                vData.venue.pricing = this;
                break;
            case VendorType.videographer:
                vData.videographer = {
                	...vData.videographer
                };
                vData.videographer.pricing = this;
                break;
            default:
                throw new Error('Vendor type is missing');
        }
    }
}
