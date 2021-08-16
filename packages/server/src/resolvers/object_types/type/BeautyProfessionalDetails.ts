import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class BeautyProfessionalDataType {
    @Field(() => String, {nullable: true})
    sample?: string
}
