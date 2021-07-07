import {contactPopupState} from '../../../state';
import {VendorDetailsBQuery} from '../../../http/generated';


export function ContactPopup({data}:{data: VendorDetailsBQuery}) {
    return (
        <div style={{
            position: 'fixed',
            width: '80%',
            backgroundColor: 'white',
            height: '70%',
            zIndex: 20,
            top: '15%',
            left: '10%',
            borderRadius: 13,
            boxShadow: '0px 0px 12px 3px #00000030',
        }}>
            <div style={{
                position: 'absolute',
                marginTop: '12px',
                width: '100%',
            }}>
                <button
                    style={{
                        marginLeft: '83%',
                        fontWeight: 400,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={() => contactPopupState.setGlobalState('contactPopupActive', false)}>
                    Close
                </button>
            </div>
            <div className={'container'}>
                <h1>Address</h1>
                <p>{data.vendorDetailsB?.address}</p>
            </div>
            <div className={'container'}>
                <h1>Phone</h1>
                <p>{data.vendorDetailsB?.phone}</p>
            </div>
        </div>
    );
}