import {VendorDetailsBQuery} from '../../../http/generated';
import OverviewStyle from '../../../styles/store-front-comps/OverviewSection.module.scss';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import {getVendorTypeInfo} from '../../../utils/other';

export function OverviewSection({data}: {data: VendorDetailsBQuery}) {
    return (
        <div>
            <div className={'container'}>
                <div className="row" style={{marginBottom: '70px'}}>
                    <div className="col-md-8 col-sm-12">
                        <h6 style={{
                            marginBottom: 0,
                        }}>{getVendorTypeInfo(data.vendorDetailsB?.vendor_type).displayName}</h6>
                        <h1 className="h1"
                            style={{marginBottom: 0, marginTop: 0}}>{data.vendorDetailsB?.business_name}</h1>
                        <h6 className="location" style={{fontWeight: 400, marginTop: '7px'}}>
                            Based in {data.vendorDetailsB?.searchLocations[0].name}
                            {
                                (data.vendorDetailsB?.searchLocations.length || 0) > 1 ?
                                    <Tooltip
                                        placement="top"
                                        trigger={['click', 'hover']}
                                        overlay={
                                            <span>
                                                {
                                                    (data.vendorDetailsB?.searchLocations.slice(1) ?? []).map(item => (
                                                        <span key={item.name}>
                                                            <span>{item.name}</span><br/>
                                                        </span>),
                                                    )
                                                }
                                            </span>
                                        }
                                        arrowContent={<div className="rc-tooltip-arrow-inner"/>}
                                    >
                                        <a> +{(data.vendorDetailsB?.searchLocations.length || 0) - 1} locations</a>
                                    </Tooltip> : null
                            }
                        </h6>
                        {/*<div>Pricing starts at $150 per person</div>*/}
                    </div>
                    <div className="col-md-4 hidden-sm hidden-xs">
                        <div className={OverviewStyle.overview__inquiry}>
                            <div style={{
                                textAlign: 'left'
                            }}>
                                <h5>Contact Details</h5>
                                <div><span style={{fontWeight: 'bold'}}>Phone:</span> {data.vendorDetailsB?.phone.replace('+94','0')}</div>
                                <div><span style={{fontWeight: 'bold'}}>Address:</span> {data.vendorDetailsB?.address}</div>
                            </div>
                        {/*    <div style={{marginBottom: '12px'}}>Want this vendor to be part of your wedding?</div>*/}
                        {/*    <button className={OverviewStyle.overview__button} type="button" role="button"*/}
                        {/*            style={{visibility: 'visible'}}*/}
                        {/*            onClick={() => contactPopupState.setGlobalState('contactPopupActive', true)}*/}
                        {/*    >Learn More & Inquire*/}
                        {/*    </button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
