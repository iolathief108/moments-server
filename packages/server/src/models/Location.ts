import {
    DocumentType,
    getModelForClass,
    modelOptions,
    prop,
} from '@typegoose/typegoose';
import {Types} from 'mongoose';

@modelOptions({options: {customName: 'province'}})
export class ProvinceSchema {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: true, type: () => String})
    key: string;

    @prop({required: true, type: () => String})
    display_name: string;
}

@modelOptions({options: {customName: 'district'}})
export class DistrictSchema {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: true, type: () => Types.ObjectId})
    province_id: Types.ObjectId;

    @prop({required: true, type: () => String})
    key: string;

    @prop({required: true, type: () => String})
    display_name: string;
}

@modelOptions({options: {customName: 'city'}})
export class CitySchema {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: true, type: () => Types.ObjectId})
    district_id: Types.ObjectId;

    @prop({required: true, type: () => String})
    key: string;

    @prop({required: true, type: () => String})
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



    const res = await CityModel.find({
            _id: {
                $in: Array.isArray(districtIds) ? districtIds : [districtIds],
            },
        })

    return (
        res
    ).map((item) => item.display_name);
}

export async function getDistrictFromKey(districtKey: string): Promise<DistrictDoc | null> {
    return await DistrictModel.findOne({key: districtKey});
}

export async function getDistrictsByCities(cityIds: Types.ObjectId[]): Promise<DistrictDoc[]> {
    let districtIds: Types.ObjectId[] = [];

    for (let cityId of cityIds) {
        // because ids are already checked
        // if (!Types.ObjectId.isValid(cityId)) {
        //     throw new Error('not a valid city ID');
        // }

        const districtId = (await CityModel.findById(cityId))?.district_id;
        if (!districtId) throw new Error('not a valid ID');
        if (districtIds.find(r => r.toHexString() === districtId.toHexString())) {
            continue;
        }
        districtIds.push(districtId);
    }

    let districts = []
    for (let i = 0; i < districtIds.length; i++) {
        const districtId = districtIds[i]
        const district = await DistrictModel.findById(districtId)
        districts.push(district)
    }

    return districts
}
