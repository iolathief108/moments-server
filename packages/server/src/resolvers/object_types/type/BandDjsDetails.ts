import {Field, ObjectType} from "type-graphql";
import {Spp} from '../Spp';
import {PersonInfo} from '../PersonInfo';

@ObjectType()
export class BandDjsDataType{
    @Field(() => Spp, {nullable: true})
    pricing?: Spp

    @Field(() => PersonInfo, {nullable: true})
    personInfo?: PersonInfo
}
