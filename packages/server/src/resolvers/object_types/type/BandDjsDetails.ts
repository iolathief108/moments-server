import {Field, ObjectType} from 'type-graphql';
import {Spp} from '../Spp';
import {PersonInfo} from '../PersonInfo';
import {VideoUrl} from '../VideoUrl';
import {ServicePricings} from '../ServicePricings';


@ObjectType()
export class BandDjsDataType {
    @Field(() => Spp, {nullable: true})
    pricing?: Spp;

    @Field(() => ServicePricings, {nullable: true})
    servicePricing?: ServicePricings;

    @Field(() => PersonInfo, {nullable: true})
    personInfo?: PersonInfo;

    @Field(() => VideoUrl, {nullable: true})
    hightlight?: VideoUrl;

    @Field(() => [VideoUrl], {nullable: true})
    videoSample?: VideoUrl[];
}
