export enum VendorType {
    venue = "venue",
    photographer = "photographer",
    caterer = "caterer",
    videographer = "videographer",
    florist = "florist",
    bands_dj = "bands_dj",
    beauty_professional = "beauty_professional",
    cakes_dessert = "cakes_dessert",
}

export function resolveCategorySlug(slug: string): VendorType | undefined {
    if (slug.includes('venue')) {
        return VendorType.venue;
    }
    if (slug.includes('caterer')) {
        return VendorType.caterer;
    }
    if (slug.includes('photo')) {
        return VendorType.photographer;
    }
    if (slug.includes('florist')) {
        return VendorType.florist;
    }
    if (slug.includes('cakes') || slug.includes('dessert')) {
        return VendorType.cakes_dessert;
    }
    if (slug.includes('beauty')) {
        return VendorType.beauty_professional;
    }
    if (slug.includes('band') || slug.includes('musician')) {
        return VendorType.bands_dj;
    }
    if (slug.includes('video')) {
        return VendorType.videographer;
    }
    return undefined;
}

export enum SubscriptionType {
    extend = "extend",
    renew = "renew",
}

export enum Roles {
    VENDOR,
    VENDOR_CATERER,
    VENDOR_PHOTOGRAPHER,
    VENDOR_VENUE,
    ADMIN,
}

export const TEMP_PATH = process.env.TEMP_PATH;
export const IMAGE_PATH = process.env.IMAGE_PATH;

if (!TEMP_PATH && !IMAGE_PATH) throw new Error("TEMP_PATH and IMAGE_PATH env is undefined");
