import { VendorModel, VendorSchema } from '../models/Vendor';
import bcrypt from 'bcryptjs';
import {
    chooseOne,
    coinToss,
    createRandomImage,
    getAddress,
    getBusinessName,
    getClapData,
    getDescr,
    getFaqs,
    getGeoLocation,
    getPhoneNumber,
    getRandomLocation,
    getSingleName,
    getUniqueEmail,
    getUniqueUsername,
    getWebAddress,
    selectRandom,
} from './utils';
import { VendorDataModel, VendorDataSchema } from '../models/VendorData';
import { VendorType } from '../common/const';
import { Types } from 'mongoose';
import { CatererDataSchema } from '../models/vendors/CatererData';
import { VenueDataSchema } from '../models/vendors/VenueData';
import { PhotographerDataSchema } from '../models/vendors/PhotographerData';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { ClapStoreModel, ClapStoreSchema } from '../models/stores/ClapStore';

export async function createVendors(count: number) {
    const getVendorParam = (): VendorSchema => {
        const first_name = getSingleName();
        const last_name = getSingleName();
        // const email = getUniqueEmail(first_name, last_name);
        const phone = getPhoneNumber();

        const hashedPassword = bcrypt.hashSync('00000000', 12);

        return {
            first_name,
            last_name,
            email: undefined,
            address: '91/16 dematagoda road, colombo - 10.',
            password: hashedPassword,
            phone,
            // email_verified: !!coinToss(),
            email_verified: false,
            verified: !!coinToss(),
            created_at: new Date(),
            updated_at: new Date(),
        };
    };

    let mixed_districts = [...(await getRandomLocation('district', 12)).map(item => item.id)];
    // remove duplicates
    mixed_districts = mixed_districts.filter(function (item, pos) {
        return mixed_districts.indexOf(item) == pos;
    });

    const getVendorDataParam = async (
        index: number,
    ): Promise<VendorDataSchema> => {
        const address = await getAddress();
        const phone = getPhoneNumber();
        const vendor_type: VendorType = chooseOne([
            VendorType.caterer,
            VendorType.photographer,
            VendorType.venue,
        ]);
        const business_name = await getBusinessName();
        const business_usernames = business_name.split(' ');
        const social_media_username = getUniqueUsername(
            business_usernames[0],
            business_usernames[1],
        );
        const webAddress = await getWebAddress(business_name);
        const geo = getGeoLocation();

        const vType: {
            caterer_data?: CatererDataSchema,
            venue_data?: VenueDataSchema,
            photographer_data?: PhotographerDataSchema;
        } = {};

        switch (vendor_type) {
            case VendorType.caterer:
                const cDataParam = await getCatererDataParam();
                vType.caterer_data = cDataParam;
                break;
            case VendorType.venue:
                const venueDataParam = await getVenueDataParam();
                vType.venue_data = venueDataParam;
                break;
            case VendorType.photographer:
                const photographerDataParam = await getPhotographerDataParam();
                vType.photographer_data = photographerDataParam;
                break;
        }

        return {
            business_name,
            vendor_type,
            claps: await getClapData(vendor_type),
            phone,
            address,
            isComplete: true,
            frequent_questions: getFaqs(vendor_type),
            description: getDescr(vendor_type),
            links: {
                facebook: `https://www.facebook.com/${social_media_username}/`,
                instagram: `https://www.instagram.com/${social_media_username}/`,
                pinterest: `https://www.pinterest.com/${social_media_username}/`,
                website: webAddress,
            },
            geo: {
                latitude: geo[0],
                longitude: geo[1],
            },
            search_district_ids: selectRandom(mixed_districts).map(item =>
                Types.ObjectId(item),
            ),
            gallery_photos: createRandomImage(
                coinToss(9) + 1,
                vendor_type,
                'gallery',
            ),
            venue_data: vType.venue_data,
            photographer_data: vType.photographer_data,
            caterer_data: vType.caterer_data,
        };
    };

    const getCatererDataParam = async (): Promise<CatererDataSchema> => {
        return {
            // type_of_meal_services: selectRandom(
            //     (await getSFMVStoreData()).caterer.find(
            //         (item) => item.name === 'Types of Meal Service',
            //     ).values,
            // ),
            // services: selectRandom(
            //     (await getSFMVStoreData()).caterer.find(
            //         (item) => item.name === 'Services',
            //     ).values,
            // ),
        };
    };

    const getVenueDataParam = async (): Promise<VenueDataSchema> => {
        return {
            // venue_types: selectRandom(
            //     (await getSFMVStoreData()).venue.find(
            //         (item) => item.name === 'Venue Type',
            //     ).values,
            // ),
            // venue_settings: selectRandom(
            //     (await getSFMVStoreData()).venue.find(
            //         (item) => item.name === 'Venue Setting',
            //     ).values,
            // ),
        };
    };

    const getPhotographerDataParam =
        async (): Promise<PhotographerDataSchema> => {
            return {
                // services: selectRandom(
                //     (await getSFMVStoreData()).photographer.find(
                //         (item) => item.name === 'Services',
                //     ).values,
                // ),
                // deliverables: selectRandom(
                //     (await getSFMVStoreData()).photographer.find(
                //         (item) => item.name === 'Deliverables',
                //     ).values,
                // ),
            };
        };

    while (count--) {
        const vendor = await VendorModel.create<VendorSchema>(getVendorParam());
        console.log(count + '. ' + vendor.first_name + ' ' + vendor.last_name);
        const vendorData = await VendorDataModel.create<VendorDataSchema>(
            await getVendorDataParam(count),
        );
        vendor.vendor_data_id = vendorData.id;


        await vendorData.save();
        await vendor.save();
    }
}

export async function create_sfmv_store() {
    // let dasf = await getSFMVStoreData();
    // console.log('started');
    // for (const value of dasf.caterer) {
    //     await FilterOptionsModel.create<FilterOptionsSchema>(
    //         {
    //             name: value.name,
    //             vendor_type: VendorType.caterer,
    //             values: value.values.map((value, index) => {
    //                 return {
    //                     name: value,
    //                     priority: index,
    //                 };
    //             }),
    //         },
    //     );
    // }
    //
    // for (const value of dasf.venue) {
    //     await FilterOptionsModel.create<FilterOptionsSchema>(
    //         {
    //             name: value.name,
    //             vendor_type: VendorType.venue,
    //             values: value.values.map((value, index) => {
    //                 return {
    //                     name: value,
    //                     priority: index,
    //                 };
    //             }),
    //         },
    //     );
    // }
    //
    // for (const value of dasf.photographer) {
    //     await FilterOptionsModel.create<FilterOptionsSchema>(
    //         {
    //             name: value.name,
    //             vendor_type: VendorType.photographer,
    //             values: value.values.map((value, index) => {
    //                 return {
    //                     name: value,
    //                     priority: index,
    //                 };
    //             }),
    //         },
    //     );
    // }

}

export async function createClapStore() {
    interface clapStoreObject {
        name: string;
        key: string;
        values: string[];
    }

    interface ClapStore {
        venue: clapStoreObject[];
        caterer: clapStoreObject[];
        photographer: clapStoreObject[];
    }

    const clapStore: ClapStore = yaml.load(
        readFileSync('./src/gen/static/clap-store.yml').toString(),
    ) as any;

    for (let clapStoreObject of clapStore.venue) {
        await ClapStoreModel.create<ClapStoreSchema>({
            name: clapStoreObject.name,
            values: clapStoreObject.values,
            key: clapStoreObject.key,
            vendor_type: VendorType.venue,
        });
    }
    for (let clapStoreObject of clapStore.photographer) {
        await ClapStoreModel.create<ClapStoreSchema>({
            name: clapStoreObject.name,
            values: clapStoreObject.values,
            key: clapStoreObject.key,
            vendor_type: VendorType.photographer,
        });
    }
    for (let clapStoreObject of clapStore.caterer) {
        await ClapStoreModel.create<ClapStoreSchema>({
            name: clapStoreObject.name,
            values: clapStoreObject.values,
            key: clapStoreObject.key,
            vendor_type: VendorType.caterer,
        });
    }
}
