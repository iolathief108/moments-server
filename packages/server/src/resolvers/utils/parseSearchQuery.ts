import {resolveCategorySlug, VendorType} from "../../common/const";
import {getDistrictFromKey} from "../../models/Location";

type Fields = {
    vendorType?: VendorType;
    districtID?: string;
    districtKey?: string;
};

async function resolveThing(singleQuery: string, fields: Fields) {
    const vType = resolveCategorySlug(singleQuery);
    if (vType && !fields.vendorType) {
        fields.vendorType = vType;
    } else if (!fields.districtID) {
        const districtId = await getDistrictFromKey(singleQuery);
        if (districtId) {
            fields.districtKey = singleQuery;
            fields.districtID = districtId.id;
        }
    }
}

export default async function (searchQuery: string): Promise<Fields | null> {
    if (!searchQuery) return null;
    let words: string[] = [];
    const fields: Fields = {};
    if (searchQuery.includes("--")) {
        words = searchQuery.split("--").filter((value) => value);
    } else {
        words[0] = searchQuery ?? null;
    }
    if (!words[0]) return null;
    await resolveThing(words[0], fields);
    if (words[1]) await resolveThing(words[1], fields);
    if (fields.districtID || fields.vendorType) return fields;
    return null;
}
