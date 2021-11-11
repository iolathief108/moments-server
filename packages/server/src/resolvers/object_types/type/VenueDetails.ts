import {Field, ObjectType} from 'type-graphql';
import {Spp} from '../Spp';
import {VideoUrl} from '../VideoUrl';
import {ServicePricings} from '../ServicePricings';


@ObjectType()
export class VenueDataType {
    @Field(() => Spp, {nullable: true})
    pricing?: Spp;

    @Field(() => ServicePricings, {nullable: true})
    servicePricing?: ServicePricings;

    @Field(() => VideoUrl, {nullable: true})
    hightlight?: VideoUrl;

    @Field(() => Number, {nullable: true})
    guestCapacity?: number;
}

