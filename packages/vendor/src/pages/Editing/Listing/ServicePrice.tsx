import Template, {ViewProps} from '../Layout/Template';
import React, {useState} from 'react';
import {
    EditVendorDetailsMutationVariables,
    isNumeric,
    PriceType,
    ServicePriceType,
    ServicePricing,
    VendorDetailsExtra,
    VendorType,
} from '@mara/shared';
import {getGlobalState} from '../../../state';
import {Button} from 'reactstrap';


const getServicePricing = (vDetails: VendorDetailsExtra): ServicePricing[] => {
    if (!vDetails || !vDetails.vendor_type) return [];
    switch (vDetails.vendor_type) {
        case VendorType.Videographer:
            return vDetails.vendorTypes.videographer_type.servicePricing.pricings;
        case VendorType.BandsDj:
            return vDetails.vendorTypes.band_djs_type.servicePricing.pricings;
        case VendorType.Photographer:
            return vDetails.vendorTypes.photographer_type.servicePricing.pricings;
        case VendorType.Venue:
            return vDetails.vendorTypes.venue_type.servicePricing.pricings;
        case VendorType.Florist:
            return vDetails.vendorTypes.florists_type.servicePricing.pricings;
        case VendorType.Caterer:
            return vDetails.vendorTypes.caterer_type.servicePricing.pricings;
        case VendorType.CakesDessert:
            return vDetails.vendorTypes.cakes_desserts_type.servicePricing.pricings;
        case VendorType.BeautyProfessional:
            return vDetails.vendorTypes.beauty_professionals_type.servicePricing.pricings;
    }
    return [];
};

function getPrice(price: number) {
    return '' + price + 'Rs';
    // return 'Rs.' + price + 'Rs'
}

function testFunction(duma: ServicePricing, _?: VendorType) {
    let thing = '';
    for (let i = 0; i < duma.service_prices.length; i++) {
        const sp = duma.service_prices[i];

        if (thing && !thing.endsWith(' '))
            thing += ' ';
        if (sp.product)
            thing += sp.product;
        else {
            if (!thing) {
                thing += 'Pricing';
            }
        }

        switch (sp.price_type) {
            case ServicePriceType.Fixed:
                thing += (thing ? ' ' : '') + 'at ' + getPrice(sp.fixed.price);
                break;
            case ServicePriceType.Starting:
                thing += (thing ? ' ' : '') + 'start at ' + getPrice(sp.starting.price);
                break;
            case ServicePriceType.Range:
                if (i !== 0)
                    thing += (thing ? ' ' : '');
                if (i === 0 || sp.product) thing += ' at ';
                thing += getPrice(sp.range.from_price) + '-' + getPrice(sp.range.to_price);
                break;
        }
        if (sp.unit) {
            thing += ' per ' + sp.unit;
        }
        if (sp.class) {
            thing += ' for ' + sp.class;
        }
        if ((i + 1) < duma.service_prices.length) {
            thing += ' and';
        }
    }
    thing += '.';
    if (duma.min_spend)
        thing += ' The minimum spend is ' + getPrice(duma.min_spend) + ' Total.';
    thing = thing.replace(/ +/g, ' ');
    return thing;
}

const ServicePricingComp = ({s}: {s: ServicePricing}) => {
    return (
        <div>
            <p>Name: {s.name}</p>
            <p>{testFunction(s)}</p>
        </div>
    );
};

const View = (props: ViewProps) => {
    return (
        <div>
            {
                getServicePricing(props.vDetails)?.map((value, index) => <ServicePricingComp key={index} s={value}/>)
            }
        </div>
    );
};

const ServicePrice = () => {
    const [servicePrice, setServicePrice] = useState<ServicePricing[]>([]);

    const onEditMode = (vDetails: VendorDetailsExtra) => {
        setServicePrice(getServicePricing(vDetails));
    };

    const EditPrice = ({a, b}: {a: number, b: number}) => {
        const getB = (t?: ServicePricing[]) => {
            if (t) {
                return t[a].service_prices[b];
            }
            return servicePrice[a].service_prices[b];
        };
        return (
            <div style={{
                backgroundColor: '#eee',
                margin: '4px'
            }}>
                <label>
                    Product Name:{' '}
                    <input type="text"
                           value={getB().product || ''}
                           onChange={val => {
                               let newSP = servicePrice;
                               getB(newSP).product = val.target.value;
                               setServicePrice([...newSP]);
                           }}
                    />
                </label>

                <label>
                    Class:{' '}
                    <input type="text"
                           value={getB().class || ''}
                           onChange={val => {
                               let newSP = servicePrice;
                               getB(newSP).class = val.target.value;
                               setServicePrice([...newSP]);
                           }}
                    />
                </label>

                <label>
                    Unit :{' '}
                    <input type="text"
                           value={getB().unit || ''}
                           onChange={val => {
                               let newSP = servicePrice;
                               getB(newSP).unit = val.target.value;
                               setServicePrice([...newSP]);
                           }}
                    />
                </label>


                <div>
                    <select value={getB().price_type}
                            onChange={e => {
                                console.log(e.target.value);
                                let newSpp = servicePrice;
                                if (e.target.value === ServicePriceType.Fixed) {
                                    getB(newSpp).price_type = ServicePriceType.Fixed;
                                }
                                if (e.target.value === ServicePriceType.Range) {
                                    getB(newSpp).price_type = ServicePriceType.Range;
                                }
                                if (e.target.value === ServicePriceType.Starting) {
                                    getB(newSpp).price_type = ServicePriceType.Starting;
                                }

                                setServicePrice([...newSpp]);
                            }}>
                        <option value={ServicePriceType.Fixed}>Fixed Price</option>
                        <option value={ServicePriceType.Range}>Range Price</option>
                        <option value={ServicePriceType.Starting}>Starting Price</option>
                    </select>
                </div>
                {
                    getB().price_type === ServicePriceType.Range &&
                    <>
                        <label>
                            From Price:{' '}
                            <input type="text"
                                   value={(getB()?.range?.from_price || getB()?.range?.from_price === 0) ? getB()?.range?.from_price : ''}
                                   onChange={val => {
                                       let newSpp = servicePrice;

                                       if (isNumeric(val.target.value)) {
                                           getB(newSpp).range = {
                                               ...getB(newSpp).range,
                                               from_price: parseInt(val.target.value),
                                           };
                                           setServicePrice([...newSpp]);
                                       }
                                       if (val.target.value === '') {
                                           getB(newSpp).range = {
                                               ...getB(newSpp).range,
                                               from_price: 0,
                                           };
                                           setServicePrice([...newSpp]);
                                       }
                                   }}
                            />
                        </label>
                        <br/>
                        <label>
                            To Price:{' '}
                            <input type="text"
                                   value={(getB()?.range?.to_price || getB()?.range?.to_price === 0) ? getB()?.range?.to_price : ''}
                                   onChange={val => {
                                       let newSpp = servicePrice;

                                       if (isNumeric(val.target.value)) {
                                           getB(newSpp).range = {
                                               ...getB(newSpp).range,
                                               to_price: parseInt(val.target.value),
                                           };
                                           setServicePrice([...newSpp]);
                                       }
                                       if (val.target.value === '') {
                                           getB(newSpp).range = {
                                               ...getB(newSpp).range,
                                               to_price: 0,
                                           };
                                           setServicePrice([...newSpp]);
                                       }

                                   }}
                            />
                        </label>
                    </>
                }
                {
                    getB().price_type === ServicePriceType.Fixed &&
                    <label>
                        Fixed:{' '}
                        <input type="text"
                               value={(getB()?.fixed?.price || getB()?.fixed?.price === 0) ? getB().fixed.price : ''}
                               onChange={val => {
                                   let newSpp = servicePrice;

                                   if (isNumeric(val.target.value)) {
                                       getB(newSpp).fixed = {price: parseInt(val.target.value)};
                                       setServicePrice([...newSpp]);
                                   }
                                   if (val.target.value === '') {
                                       getB(newSpp).fixed = {price: 0};
                                       setServicePrice([...newSpp]);
                                   }
                               }}
                        />
                    </label>
                }
                {
                    getB().price_type === ServicePriceType.Starting &&
                    <label>
                        Starting Price:{' '}
                        <input type="text"
                               value={(getB()?.starting?.price || getB()?.starting?.price === 0) ? getB().starting.price : ''}
                               onChange={val => {
                                   let newSpp = servicePrice;

                                   if (isNumeric(val.target.value)) {
                                       getB(newSpp).starting = {price: parseInt(val.target.value)};
                                       setServicePrice([...newSpp]);
                                   }
                                   if (val.target.value === '') {
                                       getB(newSpp).starting = {price: 0};
                                       setServicePrice([...newSpp]);
                                   }
                               }}
                        />
                    </label>
                }
                <br/>
                <Button className={'btn-danger'} onClick={() => {
                    let newS = servicePrice;
                    newS[a].service_prices.splice(b, 1)
                    setServicePrice([...newS])
                }}>Delete</Button>
            </div>
        );
    };

    const Editor = ({i}: {i: number}) => {
        const getSP = (t?: ServicePricing[]) => {
            if (t) {
                return t[i];
            }
            return servicePrice[i];
        };
        return (
            <div style={{
                backgroundColor: '#ddd',
                margin: '10px'
            }}>
                <label>
                    Name:{' '}
                    <input type="text"
                           value={getSP().name}
                           onChange={val => {
                               let newSP = servicePrice;
                               newSP[i].name = val.target.value;
                               setServicePrice([...newSP]);
                           }}
                    />
                </label>
                {
                    getSP().service_prices.map((value, index) => (
                        <div key={index}>
                            {EditPrice({a: i, b: index})}
                        </div>
                    ))
                }
                {!getSP().service_prices.length && <br/>}
                <Button className={'mt-1 mb-4'} onClick={() => {
                    let newS = servicePrice;
                    newS[i].service_prices.push({
                        unit: undefined,
                        class: undefined,
                        product: undefined,
                        price_type: ServicePriceType.Starting,
                        range: {to_price: 0, from_price: 0},
                        starting: {price: 0},
                        fixed: {price: 0}
                    })
                    setServicePrice([...newS])
                }}>Add Detail</Button><br/>
                <label>
                    Min Price:{' '}
                    <input type="text"
                           value={getSP().min_spend || ''}
                           onChange={val => {
                               let newSP = servicePrice;
                               if (val.target.value === '') {
                                   newSP[i].min_spend = undefined;
                               } else if (isNumeric(val.target.value)) {
                                   newSP[i].min_spend = parseInt(val.target.value);
                               }
                               setServicePrice([...newSP]);
                           }}
                    />
                </label>
                <br/>

                <Button className={'btn-danger'} onClick={() => {
                    let newS = servicePrice;
                    newS.splice(i, 1)
                    setServicePrice([...newS])
                }}>Delete</Button>
            </div>
        );
    };

    const Edit = () => {
        return (
            <div>
                {
                    servicePrice?.map((_, index) => (
                        <div key={index}>
                            {Editor({i: index})}
                        </div>
                    ))
                }
                <div className={'mb-3'}/>
                <Button onClick={() => setServicePrice([...servicePrice, {
                    name: '',
                    min_spend: null,
                    service_prices: []
                }])}>Add</Button>
            </div>
        );
    };

    const onSubmit = () => {
        let viva: EditVendorDetailsMutationVariables = {};
        switch (getGlobalState('category')) {
            case VendorType.BandsDj:
                viva.bandDjsDetails = {
                    servicePricing: {
                        pricings: servicePrice
                    }
                };
                break;
            case VendorType.BeautyProfessional:
                viva.beautyProfessionalsDetails = {
                    servicePricing: {
                        pricings: servicePrice
                    }
                };
                break;
            case VendorType.CakesDessert:
                viva.cakesDessertsDetails = {
                    servicePricing: {
                        pricings: servicePrice
                    }
                };
                break;
            case VendorType.Caterer:
                viva.catererDetails = {
                    servicePricing: {
                        pricings: servicePrice
                    }
                };
                break;
            case VendorType.Florist:
                viva.floristsDetails = {
                    servicePricing: {
                        pricings: servicePrice
                    }
                };
                break;
            case VendorType.Photographer:
                viva.photographerDetails = {
                    servicePricing: {
                        pricings: servicePrice
                    }
                };
                break;
            case VendorType.Venue:
                viva.venueDetails = {
                    servicePricing: {
                        pricings: servicePrice
                    }
                };
                break;
            case VendorType.Videographer:
                viva.videographerDetails = {
                    servicePricing: {
                        pricings: servicePrice
                    }
                };
                break;
        }
        return viva;
    };

    return (
        <Template onEditMode={onEditMode} title={'Service Pricing'} View={View} onSubmitVariables={onSubmit}>
            {Edit()}
        </Template>
    );
};

export default ServicePrice;
