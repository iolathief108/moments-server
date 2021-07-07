import 'reflect-metadata';
import { makeID, makePin } from '../lib/makeID';
import readFileAsync from '../utils/readFileAsync';
import { VendorDataModel } from '../models/VendorData';
import { CityModel, DistrictModel } from '../models/Location';
import { VendorType } from '../common/const';
import { createImage, DirNames } from './sample-image';
import { Types } from 'mongoose';
import { FrequentQuestionSchema } from '../models/objects/FrequentQuestion';
import { readFileSync } from 'fs';
import {Image} from '../resolvers/object_types/Image';

const {
    uniqueNamesGenerator,
    names,
    animals,
    starWars,
    languages,
    colors,
    adjectives,
} = require('unique-names-generator');

export function getSingleName() {
    return uniqueNamesGenerator({
        dictionaries: [names, animals],
        length: 1,
    });
}

export function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export async function getBusinessName(): Promise<string> {
    let firstName = uniqueNamesGenerator({
        dictionaries: [animals, languages],
        length: 1,
    });
    firstName = toTitleCase(firstName);

    let secondName = uniqueNamesGenerator({
        dictionaries: [starWars, colors],
        length: 1,
    });
    secondName = toTitleCase(secondName);

    let thirdName = uniqueNamesGenerator({
        dictionaries: [colors, adjectives],
        length: 1,
    });
    thirdName = toTitleCase(thirdName);
    let bName = firstName + ' ' + secondName;
    if (coinToss()) bName = bName + thirdName;

    if (!(await VendorDataModel.findOne({ business_name: bName }))) return bName;
    else return getBusinessName();
}

/**
 * cointToss(4) -> 0 | 1 | 2 | 3
 * cointToss()  -> 0 | 1
 * coinToss("head") -> same as coinToss(), but more 1 then 0
 * */
export function coinToss(arg?: number | 'head'): number {
    if (typeof arg === 'number' && arg < 1) return 0;
    let head_chance = 0;
    let count = 2;
    if (arg === 'head') {
        head_chance = 0.13;
    } else if (arg) count = arg;
    return Math.round(Math.random() * (count - 1) + head_chance);
}

export function chooseOne<T>(items: T[]): T {
    if (items.length === 1) return items[0];
    if (items.length < 5) {
        items = [...items, ...items, ...items, ...items, ...items];
    } else if (items.length < 10) {
        items = [...items, ...items, ...items, ...items];
    } else if (items.length < 20) {
        items = [...items, ...items, ...items];
    }
    items = mix_it(items);

    return items[coinToss(items.length)];
}

export function getGalleryPhotoId() {
    return makeID(10, false);
}

export function createRandomImage(
    ...args:
        | [number | string[]]
        | [number | string[], VendorType]
        | [number | string[], VendorType, 'gallery' | 'card']
) {
    const getKeywords = (
        vType?: VendorType,
        t?: 'gallery' | 'card',
    ): DirNames => {
        if (!vType) return ['default'];
        if (!t) t = coinToss() ? 'gallery' : 'card';
        switch (vType) {
            case VendorType.caterer:
                return ['caterer', t];
            case VendorType.photographer:
                return ['photographer', t];
            case VendorType.venue:
                return ['venue', t];
        }
    };

    const imageFileNames = Array.isArray(args[0])
        ? args[0]
        : callMultipleTimes(getGalleryPhotoId, args[0]);

    let images: Image[] = []

    for (const imagename of imageFileNames) {
        const d = createImage(imagename, ...getKeywords(args[1], args[2]));
        images.push({
            ht: d.height,
            wd: d.width,
            id: imagename
        })
    }
    return images;
}

export function callMultipleTimes<G, T>(fn: () => T, count: number): Array<T> {
    let data: T[] = [];
    while (count--) {
        data.push(fn());
    }
    return data;
}

/*
 * mix_it(items) returns the unique items lenght of items (just the mix of items)
 * mix_it(items, count) if the count is less then items.lenght then the return items is unique (if each object is unique in items)
 * mix_it(items, count) if the count is greater then item.lenght then the return items is could not be unique
 * */
export function mix_it<T>(items: T[], return_max_length?: number) {
    // if (items.length === 1) {
    // }
    if (!return_max_length || return_max_length <= items.length) {
        let result = [];
        let count = !return_max_length ? items.length : return_max_length;
        while (count--) {
            let wow = coinToss(items.length);
            result.push(items[wow]);
            items.splice(wow, 1);
        }
        return result;
    }
    if (return_max_length > items.length) {
        let result = [];
        while (return_max_length--) {
            result.push(items[coinToss(items.length)]);
        }
        return result;
    }
    return [];
}

export function selectRandom<T>(items: T[], lenLimit?: number) {
    if (!lenLimit && items.length < 2) return items;
    return mix_it(items, coinToss(lenLimit ?? (items.length - 1)) + 1);
}

export function getUniqueEmail(first_name?: string, last_name?: string) {
    return getUniqueUsername(first_name, last_name) + 'gmail.com';
}

export function getUniqueUsername(first_name?: string, last_name?: string) {
    if (!first_name) first_name = getSingleName();
    const e = coinToss() ? '' : '_';
    const isSingle = last_name ? coinToss() : true;
    return isSingle
        ? first_name.toLowerCase().replace(' ', '') + makePin(3)
        : first_name.toLowerCase().replace(' ', '') +
        e +
        last_name.toLowerCase().replace(' ', '') +
        makePin(2);
}

export function getPhoneNumber() {
    return '+9477' + makePin(7);
}

export async function getAddress() {
    const district = await getRandomLocation('district', 1);
    const city = await getRandomLocation('city', 1, district[0].id);

    return `${coinToss(150)}/${coinToss(100)}, ${city[0].name}, ${district[0].name
        }.`;
}

export async function getWebAddress(business_name?: string) {
    if (!business_name) business_name = await getBusinessName();
    let names = business_name.split(' ');
    for (let i = 0; i < names.length; i++) {
        names[i] = names[i].toLowerCase();
    }
    const word_count = coinToss(names.length);
    let web_address = '';
    const e = !coinToss('head');
    for (let i = 0; i < word_count - 1; i++) {
        web_address += names[i];
        if (e) web_address += '-';
    }
    web_address += names[word_count];
    return `https://www.${web_address}.${coinToss() ? 'lk' : 'com'}/`;
}

export function getGeoLocation(): [number, number] {
    const getGeo = () => Number((Math.random() * 360 - 180).toFixed(3));
    return [getGeo(), getGeo()];
}

export type NodeType = 'city' | 'district';
type selectedNode = {
    parent: string;
    id: string;
    name: string;
}[];
// let selected_cities: selectedNode = undefined;
// let selected_districts: selectedNode = undefined;

export async function getRandomLocation(
    nodeType: NodeType,
    count: number,
    parent?: string,
): Promise<selectedNode> {
    //todo: also exeeded count should work
    if (nodeType === 'city') {
        if ((await CityModel.count()) < 2 * count) {
            let all = parent
                ? await CityModel.find({ district_id: Types.ObjectId(parent) })
                : await CityModel.find();
            all = mix_it(all, count);
            return all.map((item) => ({
                id: item.id,
                name: item.name,
                parent: item.district_id.toHexString(),
            }));
        } else {
            let all = parent
                ? await CityModel.find(
                    { district_id: Types.ObjectId(parent) },
                    null,
                    {
                        limit: count * 2,
                    },
                )
                : await CityModel.find({}, null, {
                    limit: count * 2,
                });
            all = mix_it(all, count);
            return all.map((item) => ({
                id: item.id,
                name: item.name,
                parent: item.district_id.toHexString(),
            }));
        }
    }
    if (nodeType === 'district') {
        if ((await DistrictModel.count()) < 2 * count) {
            let all = parent
                ? await DistrictModel.find({
                    province_id: Types.ObjectId(parent),
                })
                : await DistrictModel.find();
            all = mix_it(all, count);
            return all.map((item) => ({
                id: item.id,
                name: item.name,
                parent: item.province_id.toHexString(),
            }));
        } else {
            let all = parent
                ? await DistrictModel.find(
                    { province_id: Types.ObjectId(parent) },
                    null,
                    {
                        limit: count * 2,
                    },
                )
                : await DistrictModel.find({}, null, {
                    limit: count * 2,
                });
            all = mix_it(all, count);
            return all.map((item) => ({
                id: item.id,
                name: item.name,
                parent: item.province_id.toHexString(),
            }));
        }
    }
    return [];
}

export type ddd = {
    name: string;
    values: string[];
};
export type thing = {
    venue: ddd[];
    caterer: ddd[];
    photographer: ddd[];
};

export async function getSFMVStoreData(): Promise<thing> {
    const file = await readFileAsync(
        './src/sample_data/static/sfmv_store.json',
    );
    return JSON.parse(file.toString());
}

export async function getSMVData(): Promise<thing> {
    const file = await readFileAsync(
        './src/sample_data/static/sample_SMVs.json',
    );
    return JSON.parse(file.toString());
}

type Faq = {
    question: string;
    answer: string;
};
type faqs = Faq[];

export function getFaqs(vType?: VendorType): FrequentQuestionSchema[] {
    if (!coinToss()) return [];
    type wow = {
        qn: string;
        ans: string[];
    };

    type jsonFormat = {
        common: wow[];
        venue: wow[];
        caterer: wow[];
        photographer: wow[];
    };
    const thing: jsonFormat = JSON.parse(
        readFileSync('./src/sample_data/static/faqs.json').toString(),
    );

    let wowList: wow[];
    let choosenLint: FrequentQuestionSchema[] = [];

    switch (vType) {
        case VendorType.photographer:
            wowList = thing.photographer;
            break;
        case VendorType.caterer:
            wowList = thing.caterer;
            break;
        case VendorType.venue:
            wowList = thing.venue;
            break;
        default:
            wowList = thing.common;
            break;
    }

    let a = selectRandom(wowList, 8);

    for (const wow of a) {
        choosenLint.push({
            question: wow.qn,
            answer: chooseOne(wow.ans),
        });
    }
    return choosenLint;
}

export function getDescr(vType: VendorType): string {
    let descr: string;
    type jsonType = {
        common: string[];
        venue: string[];
        photographer: string[];
        caterer: string[];
        videographer: string[];
        beautician: string[];
        florist: string[];
        musician: string[];
        baker: string[];
    };

    let file: jsonType = JSON.parse(
        readFileSync('./src/sample_data/static/descr.json').toString(),
    );

    switch (vType) {
        case VendorType.venue:
            descr = chooseOne(file.venue);
            break;
        case VendorType.photographer:
            descr = chooseOne(file.photographer);
            break;
        case VendorType.caterer:
            descr = chooseOne(file.caterer);
            break;
        default:
            descr = chooseOne(file.common);
            break;
    }
    return descr;
}
