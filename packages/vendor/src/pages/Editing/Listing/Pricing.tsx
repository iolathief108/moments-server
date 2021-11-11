import {
    EditVendorDetailsMutationVariables,
    isNumeric,
    PackageObject,
    PriceObject,
    PriceType,
    Spp,
    VendorDetailsExtra,
    VendorType,
} from '@mara/shared';
import {useState} from 'react';
import Template, {ViewProps} from '../Layout/Template';
import {Button} from 'reactstrap';


function View(props: ViewProps) {
    const sppPriceView = (sppPrice: PriceObject) => {
        return (
            <div>
                <p>
                    <span className={'font-weight-bold'}>{sppPrice.name}: {' '}</span>
                    {
                        sppPrice.price_type === PriceType.Starting &&
                        <span>starting at Rs.{sppPrice.starting.price.toLocaleString()} Rs. {sppPrice.unit}</span>
                    }
                    {
                        sppPrice.price_type === PriceType.Fixed &&
                        <span>Rs.{sppPrice.fixed.price.toLocaleString()} {sppPrice.unit}</span>
                    }
                    {
                        sppPrice.price_type === PriceType.Range &&
                        <span>Rs.{sppPrice.range.from_price.toLocaleString()} - Rs.{sppPrice.range.to_price.toLocaleString()} {sppPrice.unit}</span>
                    }
                </p>
            </div>
        );
    };

    const sppPackageView = (sppPackage: PackageObject, index: number) => {
        return (
            <div className={'rounded p-2 mb-2 mr-2'} style={{
                backgroundColor: '#BD5C7588',
                color: 'black',
            }}>
                <span>Package {index+1}</span>
                <h5>{sppPackage.name}</h5>
                <p className={'font-weight-bold'}>{sppPackage.short}</p>
                {
                    sppPackage.description &&
                    <p dangerouslySetInnerHTML={{__html: sppPackage.description.replaceAll('\n', '<br/>')}}/>
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

    const sppView = (spp?: Spp) => {
        if (!spp) {
            return (
                <p>No Price or Loading</p>
            );
        }
        return (
            <div>
                <p>
                    <span className={'font-weight-bold'}>Minimum Spend </span>
                    Rs.{spp?.min_price?.toLocaleString()}
                </p>
                <h4>Packages</h4>
                {
                    !spp.packages || !spp.packages?.length ?
                    <div><p className="text-danger">No Packages Available</p></div>:
                <div className={'d-flex'}>
                    {
                        spp.packages?.map(((value, index) => (
                            <div key={index}>{sppPackageView(value, index)}</div>
                        )))
                    }
                </div>

                }
            </div>
        );
    };

    return (
        <div>
            {
                props.vDetails?.vendor_type === VendorType.Videographer &&
                sppView(props.vDetails?.vendorTypes?.videographer_type?.pricing)
            }
            {
                props.vDetails?.vendor_type === VendorType.Photographer &&
                sppView(props.vDetails?.vendorTypes?.photographer_type?.pricing)
            }
            {
                props.vDetails?.vendor_type === VendorType.BandsDj &&
                sppView(props.vDetails?.vendorTypes?.band_djs_type?.pricing)
            }
            {
                props.vDetails?.vendor_type === VendorType.Florist &&
                sppView(props.vDetails?.vendorTypes?.florists_type?.pricing)
            }
            {
                props.vDetails?.vendor_type === VendorType.CakesDessert &&
                sppView(props.vDetails?.vendorTypes?.cakes_desserts_type?.pricing)
            }
            {
                props.vDetails?.vendor_type === VendorType.Caterer &&
                sppView(props.vDetails?.vendorTypes?.caterer_type?.pricing)
            }
            {
                props.vDetails?.vendor_type === VendorType.Venue &&
                sppView(props.vDetails?.vendorTypes?.venue_type?.pricing)
            }
            {
                props.vDetails?.vendor_type === VendorType.BeautyProfessional &&
                sppView(props.vDetails?.vendorTypes?.beauty_professionals_type?.pricing)
            }
        </div>
    );
}


export default function Pricing() {

    const [spp, setSpp] = useState<Spp>(undefined);
    const [vType, setVType] = useState<VendorType>(undefined);

    const onEditMode = (vDetails: VendorDetailsExtra) => {
        setVType(vDetails.vendor_type);
        switch (vDetails.vendor_type) {
            case VendorType.BandsDj:
                setSpp(vDetails.vendorTypes?.band_djs_type?.pricing || undefined);
                break;
            case VendorType.BeautyProfessional:
                setSpp(vDetails.vendorTypes?.beauty_professionals_type?.pricing || undefined);
                break;
            case VendorType.CakesDessert:
                setSpp(vDetails.vendorTypes?.cakes_desserts_type?.pricing || undefined);
                break;
            case VendorType.Caterer:
                setSpp(vDetails.vendorTypes?.caterer_type?.pricing || undefined);
                break;
            case VendorType.Florist:
                setSpp(vDetails.vendorTypes?.florists_type?.pricing || undefined);
                break;
            case VendorType.Photographer:
                setSpp(vDetails.vendorTypes?.photographer_type?.pricing || undefined);
                break;
            case VendorType.Venue:
                setSpp(vDetails.vendorTypes?.venue_type?.pricing || undefined);
                break;
            case VendorType.Videographer:
                setSpp(vDetails.vendorTypes?.videographer_type?.pricing || undefined);
                break;
            default:
                setSpp(undefined);
                break;
        }
    };

    const onSubmit = (): EditVendorDetailsMutationVariables => {
        let viva: EditVendorDetailsMutationVariables = {};
        switch (vType) {
            case VendorType.BandsDj:
                viva.bandDjsDetails = {
                    pricing: spp,
                };
                break;
            case VendorType.BeautyProfessional:
                viva.beautyProfessionalsDetails = {
                    pricing: spp,
                };
                break;
            case VendorType.CakesDessert:
                viva.cakesDessertsDetails = {
                    pricing: spp,
                };
                break;
            case VendorType.Caterer:
                viva.catererDetails = {
                    pricing: spp,
                };
                break;
            case VendorType.Florist:
                viva.floristsDetails = {
                    pricing: spp,
                };
                break;
            case VendorType.Photographer:
                viva.photographerDetails = {
                    pricing: spp,
                };
                break;
            case VendorType.Venue:
                viva.venueDetails = {
                    pricing: spp,
                };
                break;
            case VendorType.Videographer:
                viva.videographerDetails = {
                    pricing: spp,
                };
                break;
        }
        return viva;
    };

    const onAddPrice = (packageIndex: number) => {
        let newSpp = spp;
        if (!newSpp) {
            newSpp = {};
        }
        if (!newSpp?.packages) {
            newSpp.packages = [];
        }
        if (!newSpp.packages[packageIndex]?.price) {
            newSpp.packages[packageIndex].price = [];
        }
        newSpp.packages[packageIndex].price = [...newSpp.packages[packageIndex].price, {price_type: PriceType.Fixed}];
        setSpp({...newSpp});
    };

    const onPriceDelete = (packageIndex: number, priceIndex: number) => {
        let newSpp = spp;
        let array = newSpp.packages[packageIndex].price;
        array.splice(priceIndex, 1);
        setSpp({...newSpp});
    };

    const onPackageDelete = (packageIndex: number) => {
        let newSpp = spp;
        let array = newSpp.packages;
        array.splice(packageIndex, 1);
        setSpp({...newSpp});
    };

    type PriceProps = {
        packageIndex: number
        priceIndex: number
    }
    const Price = (props: PriceProps) => {
        const getPrice = () => {
            return spp.packages[props.packageIndex]?.price[props.priceIndex];
        };
        return (
            <div className={'bg-light rounded p-2 mb-2'}>
                <label>
                    Name:{' '}
                    <input type="text"
                           value={spp.packages[props.packageIndex]?.price[props.priceIndex].name ? spp.packages[props.packageIndex].price[props.priceIndex].name : ''}
                           onChange={val => {
                               let newSpp = spp;
                               newSpp.packages[props.packageIndex].price[props.priceIndex].name = val.target.value;
                               setSpp({...newSpp});
                           }}
                    />
                </label>
                <div>
                    <select value={spp.packages[props.packageIndex]?.price[props.priceIndex].price_type}
                            onChange={e => {
                                let newSpp = spp;
                                if (e.target.value === PriceType.Fixed) {
                                    newSpp.packages[props.packageIndex].price[props.priceIndex].price_type = PriceType.Fixed;
                                }
                                if (e.target.value === PriceType.Range) {
                                    newSpp.packages[props.packageIndex].price[props.priceIndex].price_type = PriceType.Range;
                                }
                                if (e.target.value === PriceType.Starting) {
                                    newSpp.packages[props.packageIndex].price[props.priceIndex].price_type = PriceType.Starting;
                                }

                                setSpp({...newSpp});
                            }}>
                        <option value={PriceType.Fixed}>Fixed Price</option>
                        <option value={PriceType.Range}>Range Price</option>
                        <option value={PriceType.Starting}>Starting Price</option>
                    </select>
                </div>
                {
                    getPrice().price_type === PriceType.Range &&
                    <>
                        <label>
                            From Price:{' '}
                            <input type="text"
                                   value={(getPrice()?.range?.from_price || getPrice()?.range?.from_price === 0) ? getPrice().range.from_price : ''}
                                   onChange={val => {
                                       let newSpp = spp;

                                       if (isNumeric(val.target.value)) {
                                           newSpp.packages[props.packageIndex].price[props.priceIndex].range = {
                                               ...newSpp.packages[props.packageIndex].price[props.priceIndex].range,
                                               from_price: parseInt(val.target.value),
                                           };

                                           setSpp({...newSpp});
                                       }
                                       if (val.target.value === '') {
                                           newSpp.packages[props.packageIndex].price[props.priceIndex].range = {
                                               ...newSpp.packages[props.packageIndex].price[props.priceIndex].range,
                                               from_price: 0,
                                           };
                                           setSpp({...newSpp});
                                       }
                                   }}
                            />
                        </label>
                        <br/>
                        <label>
                            To Price:{' '}
                            <input type="text"
                                   value={(getPrice()?.range?.to_price || getPrice()?.range?.to_price === 0) ? getPrice().range.to_price : ''}
                                   onChange={val => {
                                       let newSpp = spp;

                                       if (isNumeric(val.target.value)) {
                                           newSpp.packages[props.packageIndex].price[props.priceIndex].range = {
                                               ...newSpp.packages[props.packageIndex].price[props.priceIndex].range,
                                               to_price: parseInt(val.target.value),
                                           };
                                           setSpp({...newSpp});
                                       }
                                       if (val.target.value === '') {
                                           newSpp.packages[props.packageIndex].price[props.priceIndex].range = {
                                               ...newSpp.packages[props.packageIndex].price[props.priceIndex].range,
                                               to_price: 0,
                                           };
                                           setSpp({...newSpp});
                                       }
                                   }}
                            />
                        </label>
                    </>
                }
                {
                    getPrice().price_type === PriceType.Fixed &&
                    <label>
                        Fixed:{' '}
                        <input type="text"
                               value={(getPrice()?.fixed?.price || getPrice()?.fixed?.price === 0) ? getPrice().fixed.price : ''}
                               onChange={val => {
                                   let newSpp = spp;

                                   if (isNumeric(val.target.value)) {
                                       newSpp.packages[props.packageIndex].price[props.priceIndex].fixed = {
                                           price: parseInt(val.target.value),
                                       };
                                       setSpp({...newSpp});
                                   }
                                   if (val.target.value === '') {
                                       newSpp.packages[props.packageIndex].price[props.priceIndex].fixed = {price: 0};
                                       setSpp({...newSpp});
                                   }
                               }}
                        />
                    </label>
                }
                {
                    getPrice().price_type === PriceType.Starting &&
                    <label>
                        Starting:{' '}
                        <input type="text"
                               value={(getPrice()?.starting?.price || getPrice()?.starting?.price === 0) ? getPrice().starting.price : ''}
                               onChange={val => {
                                   let newSpp = spp;

                                   if (isNumeric(val.target.value)) {
                                       newSpp.packages[props.packageIndex].price[props.priceIndex].starting = {price: parseInt(val.target.value)};
                                       setSpp({...newSpp});
                                   }
                                   if (val.target.value === '') {
                                       newSpp.packages[props.packageIndex].price[props.priceIndex].starting = {price: 0};
                                       setSpp({...newSpp});
                                   }
                               }}
                        />
                    </label>
                }
                <label>
                    Unit:{' '}
                    <input type="text"
                           value={spp.packages[props.packageIndex]?.price[props.priceIndex].unit ? spp.packages[props.packageIndex].price[props.priceIndex].unit : ''}
                           onChange={val => {
                               let newSpp = spp;
                               newSpp.packages[props.packageIndex].price[props.priceIndex].unit = val.target.value;
                               setSpp({...newSpp});
                           }}
                    />
                </label>
                <br/>
                <a className={'text-danger font-weight-bold'} style={{cursor: 'pointer'}}
                   onClick={() => onPriceDelete(props.packageIndex, props.priceIndex)}>Delete</a>
            </div>
        );
    };

    type PackageProps = {
        index: number
    }
    const Package = (props: PackageProps) => {
        return (
            <div className={'bg-secondary p-2 pl-4 mb-3 rounded'} style={{margin: '0px 10px 6px 0px'}}>
                <label>
                    Name:{' '}
                    <input type="text" value={spp.packages[props.index]?.name ? spp.packages[props.index].name : ''}
                           onChange={val => {
                               let newSpp = spp;
                               newSpp.packages[props.index].name = val.target.value;
                               setSpp({...newSpp});
                           }}
                    />
                </label>
                <br/>
                <label>
                    Short:{' '}
                    <input type="text" value={spp.packages[props.index]?.short ? spp.packages[props.index].short : ''}
                           onChange={val => {
                               let newSpp = spp;
                               newSpp.packages[props.index].short = val.target.value;
                               setSpp({...newSpp});
                           }}
                    />
                </label>
                <br/>
                <label>
                    Min Price:{' '}
                    <input type="text"
                           value={(spp.packages[props.index]?.min_price || spp.packages[props.index].min_price === 0) ? spp.packages[props.index].min_price : ''}
                           onChange={val => {
                               let newSpp = spp;

                               if (isNumeric(val.target.value)) {
                                   newSpp.packages[props.index].min_price = parseInt(val.target.value);
                                   setSpp({...newSpp});
                               }
                               if (val.target.value === '') {
                                   newSpp.packages[props.index].min_price = 0;
                                   setSpp({...newSpp});
                               }
                           }}
                    />
                </label>
                <br/>
                <label className={'align-top'}>
                    Description:{' '}
                </label>
                <textarea
                    value={spp.packages[props.index]?.description ? spp.packages[props.index].description : ''}
                    onChange={val => {
                        let newSpp = spp;
                        newSpp.packages[props.index].description = val.target.value;
                        setSpp({...newSpp});
                    }}
                />

                <div>
                    <Button className={'btn-info'} onClick={() => onAddPrice(props.index)}>Add</Button>
                    {
                        spp.packages[props.index]?.price.map(((value, index) =>
                                <div key={index}>
                                    {
                                        Price({packageIndex: props.index, priceIndex: index})
                                    }
                                </div>
                        ))
                    }
                </div>
                <a className={'text-danger font-weight-bold'} style={{cursor: 'pointer'}}
                   onClick={() => onPackageDelete(props.index)}>Delete Package</a>
            </div>
        );
    };

    const onAddPackage = () => {
        let newSpp = spp;
        if (!newSpp) {
            newSpp = {};
        }
        if (!newSpp?.packages) {
            newSpp.packages = [];
        }
        newSpp.packages = [...newSpp.packages, {
            name: 'Package Name',
            price: [{name: 'dd', price_type: PriceType.Fixed}],
        }];
        setSpp({...newSpp});
    };

    const Edit = () => {
        return (
            <>
                <label>
                    Min Price:{' '}
                    <input type="text" value={(spp?.min_price || spp?.min_price === 0) ? spp.min_price : ''}
                           onChange={val => {
                               if (isNumeric(val.target.value)) {
                                   setSpp({...spp, min_price: parseInt(val.target.value)});
                               }
                               if (val.target.value === '') {
                                   setSpp({...spp, min_price: 0});
                               }
                           }}/>
                </label>
                <br/>
                <label>
                    Packages
                </label>
                <br/>
                <Button onClick={onAddPackage}>Add</Button>
                <div className={'mt-2 d-flex flex-wrap'}>
                    {
                        // spp?.packages.map((value, index) => <Package package={value} index={index} key={index}/>)
                        spp?.packages?.map((value, index) =>
                            <div key={index}>
                                {Package({
                                    index: index,
                                })}
                            </div>,
                        )
                    }
                </div>
            </>
        );
    };

    return (
        <Template title={'Pricing (Starndard Package Pricing)'} onEditMode={onEditMode} View={View}
                  onSubmitVariables={onSubmit}>
            {Edit()}
        </Template>
    );
}
