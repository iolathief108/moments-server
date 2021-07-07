import {VendorModel, VendorSchema} from '../models/Vendor';
import bcrypt from 'bcryptjs';
import {
    chooseOne,
    coinToss,
    createRandomImage,
    getAddress,
    getBusinessName, getDescr, getFaqs,
    getGeoLocation,
    getPhoneNumber,
    getRandomLocation,
    getSFMVStoreData,
    getSingleName,
    getUniqueEmail,
    getUniqueUsername,
    getWebAddress,
    selectRandom,
} from './utils';
import {VendorDataModel, VendorDataSchema} from '../models/VendorData';
import {VendorType} from '../common/const';
import {Types} from 'mongoose';
import {
    FilterOptionsModel,
    FilterOptionsSchema,
} from '../models/stores/SimpleFilterMultiValueStore';
import {CatererDataSchema} from '../models/vendors/CatererData';
import {VenueDataSchema} from '../models/vendors/VenueData';
import {PhotographerDataSchema} from '../models/vendors/PhotographerData';

export async function createVendors(count: number) {
    const getVendorParam = (): VendorSchema => {
        const first_name = getSingleName();
        const last_name = getSingleName();
        const email = getUniqueEmail(first_name, last_name);
        const phone = getPhoneNumber();

        const hashedPassword = bcrypt.hashSync('00000000', 12);

        return {
            first_name,
            last_name,
            email,
            address: '91/16 dematagoda road, colombo - 10.',
            password: hashedPassword,
            phone,
            email_verified: !!coinToss(),
            verified: !!coinToss(),
            created_at: new Date(),
            updated_at: new Date(),
        };
    };

    const mixed_districts = [...(await getRandomLocation('district', 12))];

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

        return {
            business_name,
            vendor_type,
            phone,
            address,
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
            search_district_ids: selectRandom(mixed_districts).map((item) =>
                Types.ObjectId(item.id),
            ),
            gallery_photos: createRandomImage(
                coinToss(9) + 1,
                vendor_type,
                'gallery',
            ),
        };
    };

    const getCatererDataParam = async (): Promise<CatererDataSchema> => {
        return {
            type_of_meal_services: selectRandom(
                (await getSFMVStoreData()).caterer.find(
                    (item) => item.name === 'Types of Meal Service',
                ).values,
            ),
            services: selectRandom(
                (await getSFMVStoreData()).caterer.find(
                    (item) => item.name === 'Services',
                ).values,
            ),
        };
    };

    const getVenueDataParam = async (): Promise<VenueDataSchema> => {
        return {
            venue_types: selectRandom(
                (await getSFMVStoreData()).venue.find(
                    (item) => item.name === 'Venue Type',
                ).values,
            ),
            venue_settings: selectRandom(
                (await getSFMVStoreData()).venue.find(
                    (item) => item.name === 'Venue Setting',
                ).values,
            ),
        };
    };

    const getPhotographerDataParam =
        async (): Promise<PhotographerDataSchema> => {
            return {
                services: selectRandom(
                    (await getSFMVStoreData()).photographer.find(
                        (item) => item.name === 'Services',
                    ).values,
                ),
                deliverables: selectRandom(
                    (await getSFMVStoreData()).photographer.find(
                        (item) => item.name === 'Deliverables',
                    ).values,
                ),
            };
        };

    while (count--) {
        const vendor = await VendorModel.create<VendorSchema>(getVendorParam());
        console.log(count + '. ' + vendor.first_name + ' ' + vendor.last_name);
        const vendorData = await VendorDataModel.create<VendorDataSchema>(
            await getVendorDataParam(count),
        );
        vendor.vendor_data_id = vendorData.id;

        switch (vendorData.vendor_type) {
            case VendorType.caterer:
                const cDataParam = await getCatererDataParam();
                vendorData.caterer_data = cDataParam;
                break;
            case VendorType.venue:
                const venueDataParam = await getVenueDataParam();
                vendorData.venue_data = venueDataParam;
                break;
            case VendorType.photographer:
                const photographerDataParam = await getPhotographerDataParam();
                vendorData.photographer_data = photographerDataParam;
                break;
        }
        await vendorData.save();
        await vendor.save();
    }
}

export async function create_sfmv_store() {
    let dasf = await getSFMVStoreData();
    console.log("started");
    for (const value of dasf.caterer) {
        await FilterOptionsModel.create<FilterOptionsSchema>(
            {
                name: value.name,
                vendor_type: VendorType.caterer,
                values: value.values.map((value, index) => {
                    return {
                        name: value,
                        priority: index,
                    };
                }),
            },
        );
    }

    for (const value of dasf.venue) {
        await FilterOptionsModel.create<FilterOptionsSchema>(
            {
                name: value.name,
                vendor_type: VendorType.venue,
                values: value.values.map((value, index) => {
                    return {
                        name: value,
                        priority: index,
                    };
                }),
            },
        );
    }

    for (const value of dasf.photographer) {
        await FilterOptionsModel.create<FilterOptionsSchema>(
            {
                name: value.name,
                vendor_type: VendorType.photographer,
                values: value.values.map((value, index) => {
                    return {
                        name: value,
                        priority: index,
                    };
                }),
            },
        );
    }
}
