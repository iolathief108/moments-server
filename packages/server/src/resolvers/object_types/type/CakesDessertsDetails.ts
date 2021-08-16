import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class CakesDessertsDataType {
    @Field(() => String, {nullable: true})
    sample?: string
}
