import {Field, ObjectType} from 'type-graphql';
import { PersonInfo } from '../PersonInfo';
import {Spp} from '../Spp';
import {ServicePricings} from '../ServicePricings';


@ObjectType()
export class CakesDessertsDataType {
    @Field(() => Spp, {nullable: true})
    pricing?: Spp;

    @Field(() => ServicePricings, {nullable: true})
    servicePricing?: ServicePricings;

    @Field(() => PersonInfo, {nullable: true})
    personInfo?: PersonInfo;
}
