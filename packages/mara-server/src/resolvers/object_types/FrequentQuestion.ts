import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class FrequentQuestion {
    @Field()
    question?: string;

    @Field()
    answer?: string;
}

