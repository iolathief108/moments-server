import {contactPopupState} from '../../../state';
import {VendorDetailsBQuery} from '../../../http/generated';
import {isMobile} from 'react-device-detect';


type propsThing = {
    iconClassName: string,
    title: string, val: any
}

function Thing(props: propsThing) {
    return (
        <div className="dbox mb-3 w-100 d-flex align-items-start">
            <div className="icon d-flex align-items-center justify-content-center" style={{
                marginTop: '6px',
            }}>
                <span className={props.iconClassName}></span>
            </div>
            <div className="text pl-3">
                <p className={'font-weight-normal'} style={{}}>
                    <span className={'font-weight-bold'}>{props.title}:</span> {props.val}
                </p>
            </div>
        </div>
    );
}

const Content = ({data}: {data: VendorDetailsBQuery}) => {
    return (
        <div style={{}}>
            <div style={{fontSize: '1.1rem', fontFamily: 'sans-serif,Roboto'}}>
                {/*<Thing iconClassName={'fa fa-map-marker'} title={'Address'}*/}
                {/*       val={'91/16, Dematagoda Road, Colombo-10.'}/>*/}
                <Thing iconClassName={'fa fa-phone'} title={'Phone'}
                       val={<a style={{color: 'rgb(34 124 255 / 91%)'}} href="tel://+94775737981">+94 77 5737 981</a>}/>
                <Thing iconClassName={'fa fa-paper-plane'}
                       title={'Email'}
                       val={
                           <a style={{color: 'rgb(34 124 255 / 91%)'}}
                              href="mailto:momentslk21@gmail.com">momentslk21@gmail.com</a>
                       }/>
                {/*<Thing iconClassName={'fa fa-globe'} title={'Website'} val={<a href="#">yoursite.com</a>}/>*/}
            </div>
        </div>
    );
};

const CloseButton = () => {
    return (
        <button
            style={{
                marginLeft: '83%',
                fontWeight: 400,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
            }}
            onClick={() => contactPopupState.setGlobalState('contactPopupActive', false)}>
            <a href="#" className="my-close-btn"/>
        </button>
    );
};

export function ContactPopup({data}: {data: VendorDetailsBQuery}) {
    return (
        <div>
            <div style={{
                position: 'fixed',
                maxWidth: isMobile ? '100%' : '80%',
                minWidth: isMobile ? '100%' : '65%',
                backgroundColor: 'white',
                maxHeight: isMobile ? '100%' : '70%',
                height: isMobile ? '100%' : undefined,
                paddingBottom: '30px',
                zIndex: 20,
                top: isMobile ? '0px' : '100px',
                transform: 'translateX(-50%)',
                left: '50%',
                boxShadow: '0px 0px 12px 3px #00000030',
            }}>
                <div style={{
                    position: 'relative',
                    marginTop: '12px',
                    width: '100%',
                }}>
                    <CloseButton/>
                    <div style={{
                        borderBottom: '2px solid #0003',
                        marginTop: '23px',
                    }}/>
                </div>
                <div className={''} style={{
                    marginTop: '15px',
                    padding: '10px 40px 10px 40px',
                }}>
                    <h4>Contact Us</h4>
                    <p style={{
                        color: '#0009',
                    }}>You can contact us in any of the following ways</p>
                    <Content data={data}/>
                </div>
            </div>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 19,
                backgroundColor: '#0004',
            }} onClick={() => contactPopupState.setGlobalState('contactPopupActive', false)}/>
        </div>
    );
}
