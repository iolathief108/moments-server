import {Field, ObjectType} from 'type-graphql';
import { PersonInfo } from '../PersonInfo';
import {Spp} from '../Spp';

@ObjectType()
export class BeautyProfessionalDataType {
    @Field(() => Spp, {nullable: true})
    pricing?: Spp

    @Field(() => PersonInfo, {nullable: true})
    personInfo?: PersonInfo
}
