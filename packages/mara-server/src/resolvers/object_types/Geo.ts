import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Geo {
    @Field()
    latitude: number;

    @Field()
    longitude: number;
}

