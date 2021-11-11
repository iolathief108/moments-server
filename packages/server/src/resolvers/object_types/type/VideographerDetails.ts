import {Field, ObjectType} from 'type-graphql';
import {PersonInfo} from '../PersonInfo';
import {Spp} from '../Spp';
import {VideoUrl} from '../VideoUrl';
import {ServicePricings} from '../ServicePricings';


@ObjectType()
export class VideographerDataType {
    @Field(() => Spp, {nullable: true})
    pricing?: Spp;

    @Field(() => ServicePricings, {nullable: true})
    servicePricing?: ServicePricings;

    @Field(() => PersonInfo, {nullable: true})
    personInfo?: PersonInfo;

    @Field(() => VideoUrl, {nullable: true})
    hightlight?: VideoUrl

    @Field(() => [VideoUrl], {nullable: true})
    videoSample?: VideoUrl[]
}
