export enum VendorType {
    venue = "venue",
    photographer = "photographer",
    caterer = "caterer",
    // videographer = "videographer",
    // florist = "florist",
    // bands_dj = "bands_dj",
    // beauty_professional = "beauty_professional",
    // cakes_dessert = "cakes_dessert",
}

export function resolveCategorySlug(slug: string): VendorType | undefined {
    switch (slug) {
        case "wedding-venue":
            return VendorType.venue;
        case "wedding-caterer":
            return VendorType.caterer;
        case "wedding-photographer":
            return VendorType.photographer;
        default:
            return undefined;
    }
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

export const temp_file_location = "./static/temp/";
export const permanent_file_location = "./static/perm/";
