// noinspection JSUnusedGlobalSymbols, JSUnusedLocalSymbols

import 'react-select-search/style.css';
import {SearchInput} from '../../widgets/search/search-input';
import {NextPage} from 'next';
import {client} from '../../http/sdk';
import {VendorSearchDocument, VendorSearchQuery, VendorSearchQueryVariables, VendorType} from '../../http/generated';
import {SearchResult} from '../../widgets/search/search-result';
import {useEffect, useState} from 'react';
import {searchState} from '../../state';
import {isServer} from '../../utils/pageUtils';

type Props = {
    initialData?: VendorSearchQuery[]
    searchQuery?: string
    vendorType?: VendorType
    districtKey?: string
    districtId?: string
    isServer: boolean
}

const SearchPage: NextPage<Props> = (props: Props) => {
    // const [h, setH] = useState<VendorSearchQueryVariables>({});
    const [, setVType] = searchState.useGlobalState('vendorType');
    const [, setDistrictId] = searchState.useGlobalState('districtId');

    useEffect(() => {
        if (props.isServer) {
            setVType(props.vendorType || null);
            setDistrictId(props.districtId || null);
        }
    }, []);

    return (
        <div>
            <SearchInput districtKey={props.districtKey} vType={props.vendorType} />
            <SearchResult initialData={props.initialData}/>
        </div>
    );
};

SearchPage.getInitialProps = async ({query}) => {
    // if (isServer()) {
    //     const searchQuery: string = typeof query.id === 'string' ? query.id ?? '' : '';
    //     const data = await client.request<VendorSearchQuery, VendorSearchQueryVariables>(VendorSearchDocument, {
    //         searchQuery: searchQuery,
    //     });
    //     return {
    //         initialData: [data],
    //         searchQuery: searchQuery,
    //         vendorType: data.vendorSearchWithExtra.vendor_type ?? undefined,
    //         districtKey: data.vendorSearchWithExtra.district_key ?? undefined,
    //         districtId: data.vendorSearchWithExtra.district_id ?? undefined,
    //         isServer: true,
    //     };
    // }
    return {
        isServer: false
    };
};

export default SearchPage;














