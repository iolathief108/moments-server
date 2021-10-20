import {PackageObject, PriceObject, PriceType, Spp, VendorDetailsBQuery, VendorType} from '../../http/generated';
import {isMobile} from 'react-device-detect';


export default function SppView({data}: {data: VendorDetailsBQuery}) {

    return (
        <div>
            {
                data.vendorDetailsB.vendor_type === VendorType.BeautyProfessional &&
                SppPricing(data.vendorDetailsB.vendorTypes.beauty_professionals_type.pricing)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Photographer&&
                SppPricing(data.vendorDetailsB.vendorTypes.photographer_type.pricing)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Caterer &&
                SppPricing(data.vendorDetailsB.vendorTypes.caterer_type.pricing)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Videographer &&
                SppPricing(data.vendorDetailsB.vendorTypes.videographer_type.pricing)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.BandsDj&&
                SppPricing(data.vendorDetailsB.vendorTypes.band_djs_type.pricing)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Florist&&
                SppPricing(data.vendorDetailsB.vendorTypes.florists_type.pricing)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.CakesDessert&&
                SppPricing(data.vendorDetailsB.vendorTypes.cakes_desserts_type.pricing)
            }
            {
                data.vendorDetailsB.vendor_type === VendorType.Venue&&
                SppPricing(data.vendorDetailsB.vendorTypes.venue_type.pricing)
            }
        </div>
    );
}

const sppPriceView = (sppPrice: PriceObject) => {
    return (
        <div>
            <p>
                {
                    sppPrice.name &&
                    <span className={'font-weight-bold'}>{sppPrice.name}: {' '}</span>
                }
                {
                    sppPrice.price_type === PriceType.Starting &&
                    <span className={'font-weight-bold'}>starting at Rs.{sppPrice.starting.price.toLocaleString()} Rs. {sppPrice.unit}</span>
                }
                {
                    sppPrice.price_type === PriceType.Fixed &&
                    <span className={'font-weight-bold'}>Rs.{sppPrice.fixed.price.toLocaleString()} {sppPrice.unit}</span>
                }
                {
                    sppPrice.price_type === PriceType.Range &&
                    <span className={'font-weight-bold'}> Rs.{sppPrice.range.from_price.toLocaleString()}-Rs.{sppPrice.range.to_price.toLocaleString()} {sppPrice.unit}</span>
                }
            </p>
        </div>
    );
};

function createHex(){
    const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    let hexColor = '#';

    for(let i = 1; i<=6; i++){
        let random = Math.floor(Math.random()*hexValues.length);
        hexColor += hexValues[random];
    }
    return hexColor;
}

const SppPackage = (sppPackage: PackageObject) => {
    return (
        <div className={'rounded p-2 mb-4 mr-4 p-4 pr-5'} style={{
            // backgroundColor: '#fff',
            backgroundColor: createHex()+'06',
            // boxShadow: '1px 1px 4px 0px #00000033',
            boxShadow: 'rgb(0 0 0 / 10%) 1px 2px 5px 0px',
            maxWidth: '300px'
        }}>
            <h4 style={{
                fontFamily: 'serif'
            }}>{sppPackage.name}</h4>
            {
                sppPackage.short &&
                <h6 style={{
                    color: '#000000aa'
                }}>{sppPackage.short}</h6>
            }
            {
                sppPackage.description &&
                <p style={{
                    color: '#000000aa',
                    marginTop: '20px',
                    fontWeight: 'normal',
                    marginBottom: '10px'
                }} dangerouslySetInnerHTML={{__html: sppPackage.description.replaceAll('\n', '<br/>')}}/>
            }
            {
                !!sppPackage.min_price &&
                sppPackage.min_price > 200 &&
                <p>Minimum Spend Rs.{sppPackage.min_price.toLocaleString()}</p>
            }
            <div>
                {sppPackage.price.map((value, index) => <div key={index}>{sppPriceView(value)}</div>)}
            </div>
        </div>
    );
};

const SppPricing = (pricing: Spp) => {
    if (!pricing) {
        return null;
    }
    return (
        <div className={'mt-5'}>
            <div className={'container'}>
                <div className="row" style={{marginBottom: isMobile? '20px':'70px'}}>
                    <div className="col-sm-12">
                        <h3 style={{
                            fontFamily: 'sans-serif',
                            color: '#000000dd',
                            marginBottom: '34px'
                        }}>Pricing Packages</h3>
                        <div className={'d-flex flex-wrap'}>
                            {
                                pricing.packages.map(((value, index) => (
                                    <div key={index}>{SppPackage(value)}</div>
                                )))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
