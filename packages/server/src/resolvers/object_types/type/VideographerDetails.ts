import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class VideographerDataType {
    @Field(() => String, {nullable: true})
    sample?: string
}
