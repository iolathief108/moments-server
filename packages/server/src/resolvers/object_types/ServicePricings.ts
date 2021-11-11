import {Field, ObjectType} from 'type-graphql';
import {ServicePriceType} from '../../models/ServicePricing';


@ObjectType()
class Fixed {
    @Field(() => Number, {nullable: false})
    price: number;
}

@ObjectType()
class Starting {
    @Field(() => Number, {nullable: false})
    price: number;
}

@ObjectType()
class Range {
    @Field(() => Number, {nullable: false})
    from_price: number;

    @Field(() => Number, {nullable: false})
    to_price: number;
}


@ObjectType()
class ServicePrice {

    @Field(() => ServicePriceType, {nullable: false})
    price_type: ServicePriceType;

    @Field(() => String, {nullable: true})
    product?: string;

    @Field(() => Fixed, {nullable: true})
    fixed?: Fixed;

    @Field(() => Range, {nullable: true})
    range?: Range;

    @Field(() => Starting, {nullable: true})
    starting?: Starting;

    @Field(() => String, {nullable: true})
    class?: string;

    @Field(() => String, {nullable: true})
    unit?: string;
}

@ObjectType()
class ServicePricing {
    @Field(() => String, {nullable: false})
    name: string;

    @Field(() => [ServicePrice], {nullable: false})
    service_prices: ServicePrice[];

    @Field(() => Number, {nullable: true})
    min_spend?: number;
}

@ObjectType()
export class ServicePricings {

    @Field(() => [ServicePricing], {nullable: true})
    pricings?: ServicePricing[];
}
