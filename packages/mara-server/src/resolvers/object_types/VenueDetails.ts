import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class VenueDataType {
    @Field(() => [String], {nullable: true})
    venue_types?: string[]

    @Field(() => [String], {nullable: true})
    venue_settings?: string[]
}

