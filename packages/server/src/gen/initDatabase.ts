import {Types} from "mongoose";
import fs from "fs";
import {
    CityModel,
    CitySchema,
    DistrictModel,
    DistrictSchema,
    ProvinceModel,
    ProvinceSchema,
} from "../models/Location";

type provinces = {
    id: string;
    name: string;
    key: string;
    displayName: string;
}[];

type districts = {
    id: string;
    name: string;
    parent: string;
    key: string;
    displayName: string;
}[];

type cities = {
    id: string;
    name: string;
    parent: string;
    key: string;
    displayName: string;
}[];
export async function InitDatabase() {

    let provinceMap: {id: string; dbid: string}[] = [];
    try {
        let data = fs.readFileSync("./src/gen/static/provinces.json", "utf8");
        const provinces: provinces = JSON.parse(data);
        for (let i = 0; i < provinces.length; i++) {
            const province = provinces[i];
            let db = await ProvinceModel.create<ProvinceSchema>({
                name: province.name,
                key: province.key,
                display_name: province.displayName,
            });
            // console.log(province);
            await db.save();
            provinceMap.push({
                id: province.id,
                dbid: db.id,
            });
        }
        console.log("province operation success!");
    } catch (err) {
        console.error(err);
    }

    let districtMap: {id: string; dbid: string}[] = [];
    try {
        let data = fs.readFileSync("./src/gen/static/district.json", "utf8");
        // console.log(data)
        const districs: districts = JSON.parse(data);
        for (let i = 0; i < districs.length; i++) {
            const district = districs[i];
            let el = provinceMap.find((value) => {
                return value.id === district.parent;
            });

            if (!el) {
                console.error("ID not found");
                return;
            }

            let db = await DistrictModel.create<DistrictSchema>({
                name: district.name,
                province_id: Types.ObjectId(el.dbid),
                key: district.key,
                display_name: district.displayName,
            });
            await db.save();
            districtMap.push({
                id: district.id,
                dbid: db.id,
            });
        }
        console.log("district operation success!");
    } catch (err) {
        console.error(err);
    }

    try {
        let data = fs.readFileSync("./src/gen/static/cities.json", "utf8");
        const cities: cities = JSON.parse(data);
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            let district_ID_DB = districtMap.find((value) => {
                return value.id === city.parent;
            });
            if (!district_ID_DB) {
                console.error("ID not found");
                return;
            }

            let db = await CityModel.create<CitySchema>({
                name: city.name,
                district_id: Types.ObjectId(district_ID_DB.dbid),
                key: city.key,
                display_name: city.displayName,
            });
            await db.save();
        }
        console.log("city operation success!");
    } catch (err) {
        console.error(err);
    }
    console.log("finish");
    process.exit();
}
