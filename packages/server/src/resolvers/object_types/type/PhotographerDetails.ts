import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class PhotographerDataType {
    // @Field(() => [String], {nullable: true})
    // services?: string[]
    //
    // @Field(() => [String], {nullable: true})
    // deliverables?: string[]

    @Field(() => String, {nullable: true})
    sample?: string
}

