import {VendorDataDoc} from '../models/VendorData';
import {registerEnumType} from 'type-graphql';


export enum VendorType {
    venue = 'venue',
    photographer = 'photographer',
    caterer = 'caterer',
    videographer = 'videographer',
    florist = 'florist',
    bands_dj = 'bands_dj',
    beauty_professional = 'beauty_professional',
    cakes_dessert = 'cakes_dessert',
}

registerEnumType(VendorType, {
    name: 'VendorType',
});

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

export enum VerifyStatus {
    verified = 'verified',
    unverified = 'unverified',
    pending = 'pending',
    verifiedPending = 'verifiedPending'
}

export enum ListingStatus {
    verified = 'verified',
    unverified = 'unverified',
    suspended = 'suspended',
    pending = 'pending',
    paymentPending = 'paymentPending',
}

export function getListingStatus(vData: VendorDataDoc): [ListingStatus, string | undefined] {
    if (vData.verifyStatus === VerifyStatus.unverified) {
        if (vData.isSuspended) {
            return [ListingStatus.suspended, vData.suspensionReason];
        }
        return [ListingStatus.unverified, vData.unverifiedReason];
    }
    if (vData.verifyStatus === VerifyStatus.verified) {
        if (vData.isSuspended) {
            return [ListingStatus.suspended, vData.suspensionReason];
        }
        if (!vData.isRegPaid) {
            return [ListingStatus.paymentPending, 'The listing of your accounts is complete but you must pay the registration fee to complete the registration process'];
        }
        return [ListingStatus.verified, undefined];
    }
    if (vData.verifyStatus === VerifyStatus.pending || vData.verifyStatus === VerifyStatus.verifiedPending || !vData.verifyStatus || !vData.isComplete) {
        return [ListingStatus.pending, undefined];
    }
    if (vData.isSuspended) {
        return [ListingStatus.suspended, vData.suspensionReason];
    }
    // if (!vData.isRegPaid) {
    //     return [ListingStatus.paymentPending, 'The listing of your accounts is complete but you must pay the registration fee to complete the registration process'];
    // }
    return [ListingStatus.verified, undefined];
}

export enum SubscriptionType {
    extend = 'extend',
    renew = 'renew',
}

export const SuspensionReasons = [
    'The registration fee has not been paid',
    'Abusing the site',
];

export enum Roles {
    VENDOR,
    VENDOR_CATERER,
    VENDOR_PHOTOGRAPHER,
    VENDOR_VENUE,
    ADMIN,
}

export const LIVE_UNPAID = true;

export const TEMP_PATH = process.env.TEMP_PATH;
export const IMAGE_PATH = process.env.IMAGE_PATH;

if (!TEMP_PATH && !IMAGE_PATH) throw new Error('TEMP_PATH and IMAGE_PATH env is undefined');
