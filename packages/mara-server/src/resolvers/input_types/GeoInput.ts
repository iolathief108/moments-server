import { IsLatitude, IsLongitude } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class GeoInput {
    @Field()
    @IsLatitude()
    latitude: number;

    @Field()
    @IsLongitude()
    longitude: number;
}
