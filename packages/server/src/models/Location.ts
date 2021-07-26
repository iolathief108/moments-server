import {
    DocumentType,
    getModelForClass,
    modelOptions,
    prop,
} from "@typegoose/typegoose";
import { Types } from "mongoose";

@modelOptions({ options: { customName: "province" } })
export class ProvinceSchema {
    @prop({ required: true, type: () => String })
    name: string;

    @prop({ required: true, type: () => String })
    key: string;

    @prop({ required: true, type: () => String })
    display_name: string;
}

@modelOptions({ options: { customName: "district" } })
export class DistrictSchema {
    @prop({ required: true, type: () => String })
    name: string;

    @prop({ required: true, type: () => Types.ObjectId })
    province_id: Types.ObjectId;

    @prop({ required: true, type: () => String })
    key: string;

    @prop({ required: true, type: () => String })
    display_name: string;
}

@modelOptions({ options: { customName: "city" } })
export class CitySchema {
    @prop({ required: true, type: () => String })
    name: string;

    @prop({ required: true, type: () => Types.ObjectId })
    district_id: Types.ObjectId;

    @prop({ required: true, type: () => String })
    key: string;

    @prop({ required: true, type: () => String })
    display_name: string;
}

export type ProvinceDoc = DocumentType<ProvinceSchema>;
export type DistrictDoc = DocumentType<DistrictSchema>;
export type CityDoc = DocumentType<CitySchema>;

export const ProvinceModel = getModelForClass(ProvinceSchema);
export const DistrictModel = getModelForClass(DistrictSchema);
export const CityModel = getModelForClass(CitySchema);

export async function getDistrictNames(
    districtIds: Types.ObjectId[] | Types.ObjectId,
): Promise<string[]> {
    return (
        await DistrictModel.find({
            _id: {
                $in: Array.isArray(districtIds) ? districtIds : [districtIds],
            },
        })
    ).map((item) => item.display_name);
}

export async function getDistrictFromKey(districtKey: string): Promise<DistrictDoc | null> {
    return await DistrictModel.findOne({ key: districtKey });
}