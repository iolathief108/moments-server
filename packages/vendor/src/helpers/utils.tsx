import {ListingStatus, VendorDetailsExtra} from '@mara/shared';


export function makeID(length: number): string {
    let result = '';
    // noinspection SpellCheckingInspection
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }
    return result;
}

export function getListingStatusLabel(vDetails: VendorDetailsExtra): any {

    if (!vDetails.isComplete) {
        return 'Information Incomplete';
    }

    switch (vDetails.listingStatus) {
        case ListingStatus.PaymentPending:
            return 'Payment Pending';
        case ListingStatus.Pending:
            return 'Pending';
        case ListingStatus.Suspended:
            return <span className={'text-danger'}>Suspended</span>;
        case ListingStatus.Unverified:
            return <span className={'text-danger'}>Unverified</span>;
        case ListingStatus.Verified:
            return <span className={'text-success'}>Verified</span>;
        default:
            return 'Verified';
    }
}

export function isEnableReason(vDetails: VendorDetailsExtra): boolean {
    if (!vDetails || !vDetails.isComplete) {
        return false;
    }

    switch (vDetails.listingStatus) {
        case ListingStatus.PaymentPending:
        case ListingStatus.Pending:
        case ListingStatus.Verified:
            return false;
        case ListingStatus.Unverified:
        case ListingStatus.Suspended:
            return true;
        default:
            return false;
    }
}
