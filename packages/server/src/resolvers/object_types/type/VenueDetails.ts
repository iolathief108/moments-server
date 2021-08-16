import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class VenueDataType {
    @Field(() => String, {nullable: true})
    sample?: string
}

