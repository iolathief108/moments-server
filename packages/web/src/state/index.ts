import {createGlobalState} from 'react-hooks-global-state';
import {VendorType} from '../http/generated';


type wow = {
    districtKey: string | null
    vendorType: VendorType | null
    districtId: string | null
    disKeySec: string | null
    vTypeSec: VendorType | null
}

export const searchState = createGlobalState<wow>({
    districtId: null,
    districtKey: null,
    vendorType: null,
    disKeySec: null,
    vTypeSec: null
});

type damn = {
    contactPopupActive: boolean
}
export const contactPopupState = createGlobalState<damn>({
    contactPopupActive: false,
});

