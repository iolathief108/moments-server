import SelectSearch, {fuzzySearch} from 'react-select-search/dist/cjs';
import {getDistrictId, getVendorTypeInfo, localVendorTypes} from '../../utils/other';
import {useState} from 'react';
import {VendorType} from '../../http/generated';
import sdk from '../../http/sdk';
import {searchState} from '../../state';
import Router, {useRouter} from 'next/router';
import 'react-select-search/style.css';


export function Hero() {
    const [vType, setVType] = useState<VendorType | null>(null);
    const locHook = sdk.useLocations();
    const [districtKey, setDistrictKey] = useState<string>('');

    const router = useRouter();

    async function onSearchClick() {
        let searchString: string = getVendorTypeInfo(vType)?.key ?? '';
        searchString = searchString + (districtKey ? (vType ? '--' : '' + districtKey) : '');
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
        <div className="hero-section">
            <div className="container">
                <div className="row">
                    <div className="offset-xl-1 col-xl-10 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12">
                        <div className="">
                            <div className="text-center search-head">
                                <h1 className="search-head-title">Find Local Wedding Vendors</h1>
                                <p className="d-none d-xl-block d-lg-block d-sm-block text-white">Browse the best
                                    wedding vendors in
                                    your area — from venues and photographers, to wedding planners, caterers, florists
                                    and
                                    more.</p>
                            </div>
                            <div className="search-form">
                                <div className="form-row">
                                    <div className="col-xl-5 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <SelectSearch
                                            options={localVendorTypes.map(value => ({
                                                name: value.displayName,
                                                value: value.vendorType,
                                            })) ?? []}
                                            value={vType ?? undefined}
                                            onChange={(v: any) => setVType(v)}
                                            filterOptions={fuzzySearch}
                                            placeholder="What vendor are your looking for?"
                                            search={true}
                                        />
                                    </div>
                                    <div className="col-xl-5 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <SelectSearch
                                            options={locHook.data?.districts?.map(value => ({
                                                name: value.name,
                                                value: value.key,
                                            })) ?? []}
                                            filterOptions={fuzzySearch}
                                            onChange={(v: any) => setDistrictKey(v)}
                                            value={districtKey}
                                            placeholder="Where are you getting married?"
                                            search={true}
                                        />
                                        {/*<select className="wide">*/}
                                        {/*    <option value="Ahmedabad" data-display="Ahmedabad">Ahmedabad</option>*/}
                                        {/*    <option value="Surat">Surat</option>*/}
                                        {/*    <option value="Rajkot">Rajkot</option>*/}
                                        {/*    <option value="Vadodara">Vadodara</option>*/}
                                        {/*    <option value="Vapi">Vapi</option>*/}
                                        {/*    <option value="Bhavnagar">Bhavnagar</option>*/}
                                        {/*</select>*/}
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12 col-12">
                                        <button className="btn btn-default btn-block" onClick={onSearchClick}>Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}