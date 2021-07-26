import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class SocialMedia {
    @Field(() => String, {nullable: true})
    facebook?: string;

    @Field(() => String, {nullable: true})
    instagram?: string;

    @Field(() => String, {nullable: true})
    pinterest?: string;

    @Field(() => String, {nullable: true})
    website?: string;
}

