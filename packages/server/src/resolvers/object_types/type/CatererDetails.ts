import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class CatererDataType {
    @Field(() => String, {nullable: true})
    sample?: string
}

