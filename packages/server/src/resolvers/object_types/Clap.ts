import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Clap {
    @Field(() => String, {nullable: false})
    name: string;

    @Field(() => String, {nullable: false})
    key: string;

    @Field(() => [String], {nullable: false})
    values: string[];
}
