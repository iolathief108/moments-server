import SelectSearch, {fuzzySearch} from 'react-select-search/dist/cjs';
import {getDistrictId, getVendorTypeInfo, localVendorTypes} from '../../utils/other';
import sdk from '../../http/sdk';
import {useRouter} from 'next/router';
import {VendorType} from '../../http/generated';
import {useEffect, useState} from 'react';
import {searchState} from '../../state';


type Props = {
    vType?: VendorType
    districtKey?: string
}

export function SearchInput(props: Props) {

    const locHook = sdk.useLocations();
    const [vType, setVType] = useState<VendorType | null>(props.vType ?? searchState.getGlobalState('vendorType') ?? null);
    const [districtKey, setDistrictKey] = useState<string>(searchState.getGlobalState('districtKey') ?? '');

    const [vTypeSec] = searchState.useGlobalState('vTypeSec')
    const [disKeySec] = searchState.useGlobalState('disKeySec')

    useEffect(() => {
        setDistrictKey(locHook.data?.districts.length ? props.districtKey ?? searchState.getGlobalState('districtKey') ?? '' : '');
    }, [locHook.data, props.districtKey]);

    const router = useRouter();

    async function onSearchClick() {

        let searchString: string = getVendorTypeInfo(vType)?.key ?? '';
        searchString = searchString + (searchString && districtKey ? '--' + districtKey : '');
        if (vType)
            searchState.setGlobalState('vendorType', vType);
        else
            searchState.setGlobalState('vendorType', null);

        if (districtKey && locHook.data) {
            searchState.setGlobalState('districtKey', districtKey);
            searchState.setGlobalState('districtId', getDistrictId(locHook.data, districtKey));
        } else {
            searchState.setGlobalState('districtKey', null);
            searchState.setGlobalState('districtId', null);
        }
        await router.push('/search/' + searchString);

    }

    return (
        <div>
            <div className="filter-form">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="form-row">
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <SelectSearch
                                        options={localVendorTypes.map(value => ({
                                            name: value.displayName,
                                            value: value.vendorType,
                                        })) ?? []}
                                        value={vType ?? vTypeSec ?? undefined}
                                        onChange={(v: any) => setVType(v)}
                                        filterOptions={fuzzySearch}
                                        placeholder="What vendor are your looking for?"
                                        search={true}
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                                    <SelectSearch
                                        options={locHook.data?.districts?.map(value => ({
                                            name: value.name,
                                            value: value.key,
                                        })) ?? []}
                                        filterOptions={fuzzySearch}
                                        onChange={(v: any) => setDistrictKey(v)}
                                        value={districtKey ?? disKeySec}
                                        placeholder="Where are you getting married?"
                                        search={true}
                                    />
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 ">
                                    <button className="btn btn-default btn-block" onClick={onSearchClick}>Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}