import Template, {ViewProps} from '../Layout/Template';
import {useState} from 'react';
import {
    EditVendorDetailsMutationVariables,
    PersonInfo,
    PersonInfoInput,
    VendorDetailsExtra,
    VendorType,
} from '@mara/shared';
import axios from 'axios';


function View(props: ViewProps) {
    return (
        <div>
            {
                props.vDetails?.vendorTypes?.photographer_type?.personInfo?.person_photo?.id &&
                <img src={'/p/'+props.vDetails?.vendorTypes?.photographer_type?.personInfo?.person_photo?.id+'_q95.jpg'} width={'240px'}/>
            }
            <p>
                {props.vDetails?.vendorTypes?.photographer_type?.personInfo?.name}
            </p>
            <p>
                {props.vDetails?.vendorTypes?.photographer_type?.personInfo?.position}
            </p>
        </div>
    );
}


export default function PersonInfoView() {

    const [personInfo, setPersonInfo] = useState<Partial<PersonInfoInput>>(undefined);
    const [id, setId] = useState(undefined)
    const [vType, setVType] = useState<VendorType>(undefined);


    const onEditMode = (vDetails: VendorDetailsExtra) => {
        setVType(vDetails.vendor_type);
        switch (vDetails.vendor_type) {
            case VendorType.BandsDj:
                setPersonInfo({
                    name: vDetails.vendorTypes?.band_djs_type?.personInfo?.name,
                    position: vDetails.vendorTypes?.band_djs_type?.personInfo?.position,
                } || undefined);
                setId(vDetails.vendorTypes?.band_djs_type?.personInfo?.person_photo?.id)
                break;
            case VendorType.BeautyProfessional:
                setPersonInfo({
                    name: vDetails.vendorTypes?.beauty_professionals_type?.personInfo?.name,
                    position: vDetails.vendorTypes?.beauty_professionals_type?.personInfo?.position,
                } || undefined);
                setId(vDetails.vendorTypes?.beauty_professionals_type?.personInfo?.person_photo?.id)
                break;
            case VendorType.CakesDessert:
                setPersonInfo({
                    name: vDetails.vendorTypes?.cakes_desserts_type?.personInfo?.name,
                    position: vDetails.vendorTypes?.cakes_desserts_type?.personInfo?.position,
                } || undefined);
                setId(vDetails.vendorTypes?.cakes_desserts_type?.personInfo?.person_photo?.id)
                break;
            case VendorType.Caterer:
                setPersonInfo({
                    name: vDetails.vendorTypes?.caterer_type?.personInfo?.name,
                    position: vDetails.vendorTypes?.caterer_type?.personInfo?.position,
                } || undefined);
                setId(vDetails.vendorTypes?.caterer_type?.personInfo?.person_photo?.id)
                break;
            case VendorType.Florist:
                setPersonInfo({
                    name: vDetails.vendorTypes?.florists_type?.personInfo?.name,
                    position: vDetails.vendorTypes?.florists_type?.personInfo?.position,
                } || undefined);
                setId(vDetails.vendorTypes?.florists_type?.personInfo?.person_photo?.id)
                break;
            case VendorType.Photographer:
                setPersonInfo({
                    name: vDetails.vendorTypes?.photographer_type?.personInfo?.name,
                    position: vDetails.vendorTypes?.photographer_type?.personInfo?.position,
                } || undefined);
                setId(vDetails.vendorTypes?.photographer_type?.personInfo?.person_photo?.id)
                break;
            case VendorType.Videographer:
                setPersonInfo({
                    name: vDetails.vendorTypes?.videographer_type?.personInfo?.name,
                    position: vDetails.vendorTypes?.videographer_type?.personInfo?.position,
                } || undefined);
                setId(vDetails.vendorTypes?.videographer_type?.personInfo?.person_photo?.id)
                break;
            default:
                setPersonInfo(undefined);
                break;
        }
    };

    const _handleImageChange = async (e) => {
        let file = e.target.files[0];

        const form = new FormData();
        form.append('image', file);

        const response = await axios.post('/api/upload_cache_image/', form, e.headers);
        let newSpp = personInfo;
        newSpp.personPhoto= {token: response.data.token};
        setPersonInfo({...personInfo})
        // setPersonInfo(response.data.token);
    };

    const Edit = () => {
        return (
            <div>
                {
                    personInfo?.personPhoto?.token &&
                    <div style={{
                        overflow: 'hidden',
                        borderRadius: '10px',
                        display: 'inline-block',
                        boxShadow: '0px 1px 3px 0px',
                        marginBottom: '10px',
                    }}>
                        <img src={'/api/tmp-img/' + personInfo.personPhoto.token} width={'200px'}/>
                    </div>
                }
                {
                    !personInfo?.personPhoto?.token && id &&
                    <div style={{
                        overflow: 'hidden',
                        borderRadius: '10px',
                        display: 'inline-block',
                        boxShadow: '0px 1px 3px 0px',
                        marginBottom: '10px',
                    }}>
                        <img src={'/p/' + id + '_q95.jpg'} width={'200px'}/>
                    </div>
                }
                <br/>
                <input className="fileInput"
                       type="file"
                       onChange={(e) => _handleImageChange(e)}/>
                <br/>
                <label>
                    Name:{' '}
                    <input type="text"
                           value={personInfo?.name ? personInfo.name : ''}
                           onChange={val => {
                               let newSpp = personInfo;
                               newSpp.name = val.target.value;
                               setPersonInfo({...newSpp});
                           }}
                    />
                </label>
                <br/>
                <label>
                    Position:{' '}
                    <input type="text"
                           value={personInfo?.position ? personInfo.position : ''}
                           onChange={val => {
                               let newSpp = personInfo;
                               newSpp.position = val.target.value;
                               setPersonInfo({...newSpp});
                           }}
                    />
                </label>
            </div>
        );
    };

    const onSubmit = () => {
        let viva: EditVendorDetailsMutationVariables = {};
        switch (vType) {
            case VendorType.BandsDj:
                viva.bandDjsDetails = {
                    personInfo: {
                        name: personInfo.name,
                        position: personInfo.position,
                        personPhoto: {
                            token: personInfo?.personPhoto?.token || undefined
                        },
                    },
                };
                break;
            case VendorType.BeautyProfessional:
                viva.beautyProfessionalsDetails = {
                    personInfo: {
                    	name: personInfo.name,
                    	position: personInfo.position,
                    	personPhoto: {
                    		token: personInfo?.personPhoto?.token || undefined
                    	}
                    },
                };
                break;
            case VendorType.CakesDessert:
                viva.cakesDessertsDetails = {
                    personInfo: {
                    	name: personInfo.name,
                    	position: personInfo.position,
                    	personPhoto: {
                    		token: personInfo?.personPhoto?.token || undefined
                    	}
                    },
                };
                break;
            case VendorType.Caterer:
                viva.catererDetails = {
                    personInfo: {
                    	name: personInfo.name,
                    	position: personInfo.position,
                    	personPhoto: {
                    		token: personInfo?.personPhoto?.token || undefined
                    	}
                    },
                };
                break;
            case VendorType.Florist:
                viva.floristsDetails = {
                    personInfo: {
                    	name: personInfo.name,
                    	position: personInfo.position,
                    	personPhoto: {
                    		token: personInfo?.personPhoto?.token || undefined
                    	}
                    },
                };
                break;
            case VendorType.Photographer:
                viva.photographerDetails = {
                    personInfo: {
                    	name: personInfo.name,
                    	position: personInfo.position,
                    	personPhoto: {
                    		token: personInfo?.personPhoto?.token || undefined
                    	}
                    },
                };
                break;
            case VendorType.Videographer:
                viva.videographerDetails = {
                    personInfo: {
                    	name: personInfo.name,
                    	position: personInfo.position,
                    	personPhoto: {
                    		token: personInfo?.personPhoto?.token || undefined
                    	}
                    },
                };
                break;
        }
        return viva;
    };

    return (
        <Template title={'Profile Information'} onEditMode={onEditMode} View={View}
                  onSubmitVariables={onSubmit}>
            {Edit()}
        </Template>
    );
}
