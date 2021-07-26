import {createGlobalState} from 'react-hooks-global-state';
import {VendorType} from '@mara/shared';


type State = {
    category?: VendorType
}

const initialState: State = {
    category: undefined,
};

export const {useGlobalState, setGlobalState, getGlobalState} = createGlobalState<State>(initialState);
