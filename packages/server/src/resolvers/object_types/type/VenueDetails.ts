import {Field, ObjectType} from "type-graphql";
import {Spp} from '../Spp';
@ObjectType()
export class VenueDataType {
    @Field(() => Spp, {nullable: true})
    pricing?: Spp
}

