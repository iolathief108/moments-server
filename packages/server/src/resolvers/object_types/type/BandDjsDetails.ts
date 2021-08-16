import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class BandDjsDataType{
    @Field(() => String, {nullable: true})
    sample?: string
}
