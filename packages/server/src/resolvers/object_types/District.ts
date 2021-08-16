import {Field, ObjectType} from 'type-graphql';
import {Types} from 'mongoose';
import {CityDoc, CityModel, DistrictDoc, DistrictModel} from '../../models/Location';

@ObjectType()
export class City {
    @Field(() => String)
    name: string;

    @Field(() => String)
    key: string;
}

@ObjectType()
export class District {

    @Field(() => String)
    name: string;

    @Field(() => String)
    key: string;

    @Field(() => [City])
    cities: City[];

    static async get(cityIds: Types.ObjectId[], districtIds: Types.ObjectId[]): Promise<District[]> {
        const districts: DistrictDoc[] = [];
        for (let districtId of districtIds) {
            const district = await DistrictModel.findById(districtId);
            districts.push(district);
        }
        const cities: CityDoc[] = [];
        for (let cityId of cityIds) {
            const city = await CityModel.findById(cityId);
            cities.push(city);
        }

        let result: District[] = [];

        for (let district of districts) {
            result.push({
                name: district.name,
                key: district.key,
                cities: cities.filter(city => city.district_id.toHexString() === district.id).map(city => ({
                    name: city.name,
                    key: city.key,
                })),
            });
        }
        return result;
    }
}
