import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Image {
    @Field()
    ht: number;

    @Field()
    wd: number;

    @Field()
    id: string;
}
