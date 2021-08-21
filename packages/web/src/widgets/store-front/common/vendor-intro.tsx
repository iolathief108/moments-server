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

    for (const clap of data.vendorDetailsB?.claps || []) {
        thanosWeapons.push({
            name: clap.name,
            tings: clap.values,
        });
    }
    return thanosWeapons;
}

export function VendorIntro({data}: {data: VendorDetailsBQuery}) {

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
                <p key={index}>
                    {
                        i.map(
                            (r, index) =>
                                <span key={index}>
                                    {r}
                                    <br/>
                                </span>,
                        )
                    }
                </p>
            ))
        );
    };

    return (
        <div className={VendorIntroStyle.vIntroTop}>
            <div className={'container'}>
                <div className="row" style={{
                    marginTop: '50px',
                }}>
                    <div className="col-xs-12 col-sm-12 col-md-11 col-xl-9">
                        <div className="vendor-intro-section__container ml-secondary">
                            {/*{*/}
                            {/*    data.vendorDetailsB?.vendor_type &&*/}
                            {/*    <h6 className="mb-tertiary">{getPlaceholder(data.vendorDetailsB?.vendor_type)}</h6>*/}
                            {/*}*/}
                            <h2 className="marketplace__h2">About {data.vendorDetailsB?.business_name}</h2>
                            <div className="vendor-intro-section__body">
                                <p className="mt-tertiary">{getDescription()}</p>
                            </div>

                            <div className={VendorIntroStyle.vIntro2}>
                                {
                                    getting(data).map((item, index) => (
                                        <div className="services-section__service-block" key={index}>
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
