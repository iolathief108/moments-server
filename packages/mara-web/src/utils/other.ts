import {LocationsQuery, VendorType} from '../http/generated';


type LocalVendorTypes = {
    key: string
    vendorType: VendorType
    displayName: string
    slug: string
}

export const localVendorTypes: LocalVendorTypes[] = [
    {
        key: 'wedding-caterer',
        displayName: 'Wedding Caterer',
        vendorType: VendorType.Caterer,
        slug: 'wedding-catering',
    },
    {
        key: 'wedding-venue',
        displayName: 'Wedding Venue',
        vendorType: VendorType.Venue,
        slug: 'wedding-venue',
    },
    {
        key: 'wedding-photographer',
        displayName: 'Wedding Photographer',
        vendorType: VendorType.Photographer,
        slug: 'wedding-photographer',
    },
];

export function getVendorTypeInfo(vType?: VendorType | null): LocalVendorTypes | null {
    return localVendorTypes.find(value => value.vendorType === vType) ?? null;
}

export function getDistrictId(l: LocationsQuery, key: string): string | null {
    for (const district of l.districts) {
        if (district.key === key) return district.id;
    }
    return null;
}

export function getImageUrl(
    ...args:
        | [string, boolean?]
        | [string, number, boolean?]
        | [string, number, number, boolean?]
        | [string, number, number, number, boolean?]
) {
    let urlStr = args[0];
    urlStr = 'https://www.zola.lk/image01/' + urlStr;
    if (typeof args[1] === 'number') {
        if (typeof args[2] === 'number') {
            urlStr += '_' + args[1] + 'x' + args[2];
            if (typeof args[3] === 'number') {
                urlStr += 'q' + args[3];
            }
        } else {
            urlStr += 'q' + args[1];
        }
    }

    if (typeof args[args.length - 1] === 'boolean') {
        if (args[args.length - 1]) {
            return urlStr + '.webp';
        }
    }
    return urlStr + '.jpg';
}

export function getCategoryUrl(cat: VendorType) {
    return `https://www.zola.lk/search/${getVendorTypeInfo(cat)?.key}`;
}

export function getProductUrl(businessName: string, vType: VendorType, vid?: string) {
    return `https://www.zola.lk/wedding-vendors/${getVendorTypeInfo(vType)?.slug}/${businessName}?vid=${vid}`;
}

export function getPlaceholder(vType: VendorType): string {
    if (vType === VendorType.Venue) {
        return 'Behind the Venue';
    }
    if (vType === VendorType.Photographer) {
        return 'Behind the Photo';
    }
    if (vType === VendorType.Caterer) {
        return 'Behind the Cook';
    }
    return '';
}












