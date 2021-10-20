import SelectSearch, {fuzzySearch} from 'react-select-search/dist/cjs';
import {getDistrictId, getVendorTypeInfo, localVendorTypes} from '../../../utils/other';
import {useState} from 'react';
import {VendorType} from '../../../http/generated';
import sdk from '../../../http/sdk';
import {useRouter} from 'next/router';
import {searchState} from '../../../state';
import 'react-select-search/style.css';
import {CarouselMulti} from '../common/carousel-multi';


const SearchThing = () => {
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
        <div className="search-form" style={{maxWidth: '750px', backgroundColor: 'transparent', margin: 'unset'}}>
            <div className="row">
                <div className="pb-2 col-12 col-sm-6 col-md-4 pr-sm-0">
                    <SelectSearch
                        options={localVendorTypes.map(value => ({
                            name: value.displayName,
                            value: value.vendorType,
                        })) || []}
                        value={vType || undefined}
                        onChange={(v: any) => setVType(v)}
                        filterOptions={fuzzySearch}
                        placeholder="What vendor are your looking for?"
                        search={true}
                    />
                </div>
                <div className="pb-2 col-12 col-sm-6 col-md-4">
                    <SelectSearch
                        options={locHook.data?.districts?.map(value => ({
                            name: value.name,
                            value: value.key,
                        })) || []}
                        filterOptions={fuzzySearch}
                        onChange={(v: any) => setDistrictKey(v)}
                        value={districtKey}
                        placeholder="Where are you getting married?"
                        search={true}
                    />
                </div>
                <div className="pb-2 col-12 col-md-4">
                    <button className="p-0 btn btn-default btn-block" style={{height: '100%', width: '100%'}} onClick={onSearchClick}>Search</button>
                </div>
            </div>
        </div>
    );
};

export const LocationCarousel = () => {
    return (
        <div>
            <div className={'mb-3'}></div>
            <CarouselMulti urls={[
                {
                    url: 'https://timesofaddu.com/wp-content/uploads/2020/10/Colombo-Sri-Lanka.jpg',
                    name: 'Colombo',
                    link: '/search/colombo-1-15/'
                },
                {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Nuwara-Eliya.jpg',
                    name: 'Nuwara Eliya',
                    link: '/search/nuwara-eliya/'
                },
                {
                    url: 'https://d50rehgej3zfq.cloudfront.net/static/img/blog/lk/galle.jpg',
                    name: 'Galle',
                    link: '/search/galle/'
                },
                {
                    url: 'https://www.wetwaterresort.com/wp-content/uploads/2019/10/lake-chalets-wetwater-resort.jpg',
                    name: 'Gampaha',
                    link: '/search/gampaha/'
                },
                {
                    url: 'https://www.royalholidayssrilanka.com/resources/24/Anuradhapura.jpg',
                    name: 'Anuradhapura',
                    link: '/search/anuradhapura/'
                },
                {
                    url: 'https://bkkaruncloud.b-cdn.net/wp-content/uploads/2019/09/colombo-to-trincomalee.jpg',
                    name: 'Trincomalee',
                    link: '/search/trincomalee/'
                },
                {
                    url: 'https://whc.unesco.org/uploads/thumbs/site_0450_0020-1200-630-20151105154018.jpg',
                    name: 'Kandy',
                    link: '/search/kandy/'
                },
            ]}/>
            <div className={'mb-4'}></div>
        </div>
    );
};

type Props = {
    url: string
    img: string
    name: string
};

export function Damn(props: Props) {
    return (
        <a style={{
            display: 'inline-flex',
            borderRadius: '40px',
            backgroundColor: '#fff',
            color: '#555f',
            margin: '4px',
            paddingLeft: '8px',
            paddingRight: '14px',
            fontWeight: 500,
            fontSize: '14px',
            fontFamily: 'roboto, sans-serif'
        }} href={props.url}
           target={'_blank'}
        >
            <img
                src={props.img}
                height="35px"
                width="35px"
                style={{marginRight: '3px'}}
            />
            <span style={{alignSelf: 'center'}}>{props.name}</span>
        </a>
    );
}

const Hello = () => {
    return (
        <div>
            <div className="vendor-chips">
                <h5 className="sub-hed mb-4">Our Vendor Types</h5>
                <Damn url={'/search/wedding-venues'} name={'Venues'}
                      img={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/agnostic_venue.5d386156.svg'}/>
                <Damn url={'/search/wedding-photographers'} name={'Photographers'}
                      img={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/camera.ed2453b0.svg'}/>
                <Damn url={'/search/wedding-videographers'} name={'Videographers'}
                      img={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/video.a10c29da.svg'}/>
                <Damn url={'/search/wedding-florists'} name={'Florists'}
                      img={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/bouquet.042d7ec1.svg'}/>
                <Damn url={'/search/wedding-bands-djs'} name={'Bands & DJs'}
                      img={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/bands_dj.3ef941c6.svg'}/>
                <Damn url={'/search/wedding-beauty-professionals'} name={'Beauty Professionals'}
                      img={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/hair_makeup.4a45a7cd.svg'}/>
                <Damn url={'/search/wedding-caterer'} name={'Caterers'}
                      img={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/mixer.e1323459.svg'}/>
                <Damn url={'/search/wedding-cakes-desserts'} name={'Cakes & Desserts'}
                      img={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/wedding_cake.72922602.svg'}/>
            </div>
        </div>
    );
};

export const Search = () => {
    return (
        <div style={{
            backgroundColor: '#ecf7f9',
            paddingBottom: '65px',
            paddingTop: '45px'
        }}>
            <div className={'container'}>
                <div className={'row'}>
                    <div className="col">
                        <h3 className={'text-center text-md-left serif pb-2'}>Browse Vendors by Location</h3>
                        <SearchThing/>
                        <LocationCarousel/>
                        <Hello/>
                    </div>
                </div>
            </div>
        </div>
    );
};
