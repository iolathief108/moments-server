import {sdk} from './http/sdk';


let isLoggedIn: boolean | undefined = undefined;

export async function initAuthorization(): Promise<boolean> {
    isLoggedIn = await someName();
    return isLoggedIn
}

export function authorize() {
    isLoggedIn = true;
}

export function isAuthorized(): boolean {
    return !!isLoggedIn;
}

export function deAuthorize() {
    isLoggedIn = false;
}

async function someName(): Promise<boolean> {
    try {
        return !!(await sdk('/api/').getVendorProfileId()).data?.vendorProfile?.id;
    } catch {
        return false;
    }
}
