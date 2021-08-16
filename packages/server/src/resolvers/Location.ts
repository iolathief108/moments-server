import {Arg, Field, ObjectType, Query, Resolver} from "type-graphql";
import {
    CityModel,
    DistrictModel,
    ProvinceModel,
} from "../models/Location";

@ObjectType()
class LocationNode {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    key: string;

    @Field({nullable: true})
    parent_id?: string;
}

@Resolver()
export class LocationResolver {
    @Query(() => [LocationNode])
    async provinces(): Promise<LocationNode[]> {
        return (await ProvinceModel.find()).map((item) => ({
            name: item.name,
            id: item.id,
            key: item.key
        }));
    }

    @Query(()=>[LocationNode])
    async districts(
        @Arg("province_id", {nullable: true}) province_id?: string,
    ): Promise<LocationNode[]> {
        if (province_id)
            return (
                await DistrictModel.find({
                    province_id,
                })
            ).map((item) => ({
                name: item.name,
                id: item.id,
                key: item.key,
                parent_id: item.province_id.toHexString(),
            }));
        return (await DistrictModel.find()).map((item) => ({
            name: item.name,
            id: item.id,
            key: item.key,
            parent_id: item.province_id.toHexString(),
        }));
    }

    @Query(()=>[LocationNode])
    async cities(
        @Arg("districts_id", {nullable: true}) district_id?: string,
    ): Promise<LocationNode[]> {
        if (district_id) {
            return (await CityModel.find({district_id})).map((item) => ({
                name: item.name,
                id: item.id,
                key: item.key,
                parent_id: item.district_id.toHexString(),
            }));
        }
        return (await CityModel.find()).map((item) => ({
            name: item.name,
            id: item.id,
            key: item.key,
            parent_id: item.district_id.toHexString(),
        }));
    }
}
