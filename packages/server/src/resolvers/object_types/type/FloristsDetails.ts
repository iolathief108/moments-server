import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class FloristsDataType {
    @Field(() => String, {nullable: true})
    sample?: string
}
