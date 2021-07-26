import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class CatererDataType {
    // @Field(() => [String], {nullable: true})
    // services?: string[]
    //
    // @Field(() => [String], {nullable: true})
    // types_of_meal_service?: string[]

    @Field(() => String, {nullable: true})
    sample?: string
}

