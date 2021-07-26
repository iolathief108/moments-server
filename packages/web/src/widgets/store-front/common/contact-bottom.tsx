import ContactBottomStyle from '../../../styles/store-front-comps/ContactBottom.module.scss'
import {contactPopupState} from '../../../state';

export function ContactBottom() {


    return (
        <div id="sticky-btn" className="sticky-btn hidden-lg hidden-md">
            <div className={ContactBottomStyle.storefrontListing}>

                <div className={ContactBottomStyle.vendorInfo}>
                    <div className={ContactBottomStyle.vendorName}>Montalvo Arts Center</div>
                    <div className={ContactBottomStyle.vendorLocation}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="GeoPin1" role="img"
                             className="zui-svg-icon location-pin-icon" viewBox="0 0 18 23" fill="currentColor"
                             style={{width: '11px', height: '20px'}}><title id="GeoPin1">GeoPin</title>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M9.25.507C4.456.507.583 4.475.583 9.352c0 3.22 2.585 7.357 7.683 12.633.538.556 1.43.556 1.968 0l.437-.456c4.809-5.059 7.246-9.05 7.246-12.177 0-4.877-3.873-8.845-8.667-8.845zm0 2.737c3.268 0 5.93 2.727 5.93 6.108l-.002.103c-.06 2.047-1.887 5.15-5.53 9.155l-.398.433-.014-.015C5.273 14.75 3.32 11.467 3.32 9.352c0-3.381 2.663-6.108 5.93-6.108zm0 1.368a4.105 4.105 0 100 8.21 4.105 4.105 0 000-8.21zm0 2.737a1.368 1.368 0 110 2.737 1.368 1.368 0 010-2.737z"/>
                        </svg>
                        <span className="location-label">Saratoga, CA</span></div>
                </div>

                <div className={ContactBottomStyle.stickyBtns}>
                    <button className="v2-button primary-button footer-button" type="button" role="button"
                            style={{visibility: 'visible'}}
                            onClick={()=>contactPopupState.setGlobalState('contactPopupActive', true)}
                    >Learn More &amp; Inquire
                    </button>
                </div>

            </div>
        </div>
    );
}