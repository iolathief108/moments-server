import VendorIntroStyle from '../../../styles/store-front-comps/VendorIntro.module.scss';
import {VendorDetailsBQuery, VendorType} from '../../../http/generated';
import {getPlaceholder} from '../../../utils/other';


type Weapon = {
    name: string
    tings: string[]
}

type Weapons = Weapon[]

function getting(data: VendorDetailsBQuery) {
    let thanosWeapons: Weapons = [];
    const vDetails = data.vendorDetailsB;
    if (vDetails && vDetails.vendor_type === VendorType.Caterer) {
        if (vDetails.catererData?.services) {
            const weapon: Weapon = {
                name: 'Services',
                tings: vDetails.catererData.services,
            };
            thanosWeapons.push(weapon);
        }
        if (vDetails.catererData?.types_of_meal_service) {
            const weapon: Weapon = {
                name: 'Types of Meal Services',
                tings: vDetails.catererData.types_of_meal_service,
            };
            thanosWeapons.push(weapon);
        }
    }

    if (vDetails && vDetails.vendor_type === VendorType.Photographer) {
        if (vDetails.photographerData?.services) {
            const weapon: Weapon = {
                name: 'Services',
                tings: vDetails.photographerData.services,
            };
            thanosWeapons.push(weapon);
        }
        if (vDetails.photographerData?.deliverables) {
            const weapon: Weapon = {
                name: 'Deliverables',
                tings: vDetails.photographerData.deliverables,
            };
            thanosWeapons.push(weapon);
        }
    }

    if (vDetails && vDetails.vendor_type === VendorType.Venue) {
        if (vDetails.venueData?.venue_settings) {
            const weapon: Weapon = {
                name: 'Venue Setting',
                tings: vDetails.venueData.venue_settings,
            };
            thanosWeapons.push(weapon);
        }
        if (vDetails.venueData?.venue_types) {
            const weapon: Weapon = {
                name: 'Venue Types',
                tings: vDetails.venueData.venue_types,
            };
            thanosWeapons.push(weapon);
        }
    }
    return thanosWeapons;
}

export function VendorIntro({data}: {data: VendorDetailsBQuery}) {
    return (
        <div className={VendorIntroStyle.vIntroTop}>
            <div className={'container'}>
                <div className="row" style={{
                    marginTop: '80px',
                }}>
                    <div className="col-xs-12 col-sm-12 col-md-11 col-xl-9">
                        <div className="vendor-intro-section__container ml-secondary">
                            {
                                data.vendorDetailsB?.vendor_type &&
                                <h6 className="mb-tertiary">{getPlaceholder(data.vendorDetailsB?.vendor_type)}</h6>
                            }
                            <h2 className="marketplace__h2">{data.vendorDetailsB?.business_name}</h2>
                            <div className="vendor-intro-section__body">
                                <p className="mt-tertiary">{data.vendorDetailsB?.description}</p>
                            </div>

                            <div className={VendorIntroStyle.vIntro2}>
                                {
                                    getting(data).map(item => (
                                        <div className="services-section__service-block" key={item.name}>
                                            <h6 className="services-section__heading h6">{item.name}</h6>
                                            <ul className="services-section__list">
                                                {
                                                    item.tings.map((item, index) => (
                                                        <li className="mt-quaternary" key={index}>{item}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}