import {VendorDataModel} from '../models/VendorData';
import initDb from '../init-db';

export const businessNameExcludeWords = [
    'contact',
    'become-a-vendor',
    'vendor',
    'dev',
    'terms',
    'search'
]
export function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    let from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    let to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

export async function generateBusinessNameSlug(businessName: string) {
    async function isExist(slug: string) {
        for (let exclude of businessNameExcludeWords) {
            if (slug.includes(exclude)) {
                return false;
            }
        }
        return !!await VendorDataModel.findOne({business_name_slug: slug});
    }

    await initDb();
    let slugName = slugify(businessName);
    if (await isExist(slugName)) {
        slugName += '-1';
        let cur = 1;
        while (await isExist(slugName)) {
            cur++;
            slugName = slugName.substring(0, slugName.length - 1);
            slugName += cur;
        }
    }
    return slugName;
}

export function isSlug(str) {
    return str.length > 0 &&
        /^[\x61-\x7A0-9-_]*$/.test(str) &&
        !/[-_]{2,}/.test(str);
}
