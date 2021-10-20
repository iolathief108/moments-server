import VendorIntroStyle from '../../../styles/store-front-comps/VendorIntro.module.scss';
import {PersonInfo, VendorDetailsBQuery, VendorType} from '../../../http/generated';
import {contactPopupState} from '../../../state';


type Weapon = {
    name: string
    tings: string[]
}

type Weapons = Weapon[]

function getOptions(data: VendorDetailsBQuery) {
    let thanosWeapons: Weapons = [];

    for (const clap of data.vendorDetailsB?.claps || []) {
        thanosWeapons.push({
            name: clap.name,
            tings: clap.values,
        });
    }
    return thanosWeapons;
}


export function VendorIntro({data}: {data: VendorDetailsBQuery}) {


    const Options = () => {
        return (
            <div className={VendorIntroStyle.vIntro2} style={{
                marginTop: !getPersonInfo() ? '27px' : '40px',
            }}>
                {
                    getOptions(data).map((item, index) => (
                        <div className="services-section__service-block" key={index}>
                            <h6 className="services-section__heading h6">{item.name}</h6>
                            <ul className="services-section__list">
                                {
                                    item.tings.map((item, index) => (
                                        <li style={{
                                            fontFamily: 'proxima-nova,Helvetica,Arial,sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 400,
                                            lineHeight: 1.8,
                                            color: '#21201f',
                                        }} className="mt-quaternary" key={index}>{item}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        );
    };

    const getDescription = () => {
        if (!data?.vendorDetailsB.description) {
            return null;
        }
        let wow = data?.vendorDetailsB.description;
        wow = wow.replace('\n\n\n', '\n\n');
        const sep = wow.split('\n');
        let final: string[][] = [[]];
        for (let ss of sep) {
            if (ss !== '') {
                final[final.length - 1].push(ss);
            } else {
                final.push([]);
            }
        }
        return (
            final.map((i, index) => (
                <span key={index}>
                    {
                        i.map(
                            (r, index) =>
                                <span key={index}>
                                    {r}
                                    <br/>
                                </span>,
                        )
                    }
                </span>
            ))
        );
    };

    const getPersonInfo = (): PersonInfo => {
        switch (data.vendorDetailsB.vendor_type) {
            case VendorType.Caterer:
                return data.vendorDetailsB.vendorTypes.caterer_type.personInfo;
            case VendorType.Photographer:
                return data.vendorDetailsB.vendorTypes.photographer_type.personInfo;
            case VendorType.BeautyProfessional:
                return data.vendorDetailsB.vendorTypes.beauty_professionals_type.personInfo;
            case VendorType.CakesDessert:
                return data.vendorDetailsB.vendorTypes.cakes_desserts_type.personInfo;
            case VendorType.Florist:
                return data.vendorDetailsB.vendorTypes.florists_type.personInfo;
            case VendorType.BandsDj:
                return data.vendorDetailsB.vendorTypes.band_djs_type.personInfo;
            case VendorType.Videographer:
                return data.vendorDetailsB.vendorTypes.videographer_type.personInfo;
        }
    };

    const isVenue = (): boolean => {
        return data.vendorDetailsB?.vendor_type === VendorType.Venue;
    };

    return (
        <div className={VendorIntroStyle.vIntroTop}>
            <div className={'container'}>
                <div className="row" style={{
                    marginTop: '50px',
                }}>
                    {
                        getPersonInfo() &&
                        <div className={'col-xs-12 col-sm-4 text-center'}>
                            <div style={{
                                backgroundImage: 'url("/p/' + getPersonInfo().person_photo.id + '_q95.jpg")',
                                backgroundSize: 'cover',
                                borderRadius: '50%',
                                width: '180px',
                                height: '180px',
                                margin: 'auto',
                            }}></div>
                            <h3 className={'mt-2 mb-0'}>{getPersonInfo().name}</h3>
                            <div><span>{getPersonInfo().position}</span></div>
                            <button className="mt-3 mb-4 v2-button primary-button footer-button" type="button"
                                    role="button"
                                    style={{visibility: 'visible'}}
                                    onClick={() => contactPopupState.setGlobalState('contactPopupActive', true)}
                            >Learn More &amp; Inquire
                            </button>
                        </div>
                    }
                    <div className={`col-xs-12 col-sm-${!getPersonInfo() ? '6' : '8'}`}>
                        <div className="vendor-intro-section__container ml-secondary">
                            <h2 style={{
                                fontFamily: 'serif',
                                fontSize: '36px',
                            }}
                                className="marketplace__h2">About{isVenue() && ' This Venue'} {!isVenue() && data.vendorDetailsB?.business_name}</h2>
                            <div style={{
                                color: 'rgb(0 0 0 / 70%)',
                                paddingRight: '18px',
                            }} className="vendor-intro-section__body">
                                <p className="mt-tertiary" style={{
                                    fontFamily: 'proxima-nova,Helvetica,Arial,sans-serif',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: 1.8,
                                    color: '#505050',
                                }}>{getDescription()}</p>
                                {
                                    !getPersonInfo() &&
                                    <button className="mt-3 v2-button primary-button footer-button" type="button"
                                            role="button"
                                            style={{visibility: 'visible'}}
                                            onClick={() => contactPopupState.setGlobalState('contactPopupActive', true)}
                                    >Learn More &amp; Inquire
                                    </button>
                                }
                            </div>
                            {
                                getPersonInfo() &&
                                <Options/>
                            }
                        </div>
                    </div>
                    {
                        !getPersonInfo() &&
                        <div className="col-xs-12 col-sm-6">
                            <Options/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
