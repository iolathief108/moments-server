import Template, {EditProps, ViewProps} from '../Layout/Template';
import {AvField} from 'availity-reactstrap-validation';
import React, {useEffect, useState} from 'react';
import {EditVendorDetailsMutationVariables, VendorDetailsExtra, VendorType, VideoUrlInput} from '@mara/shared';
import {VideoUrl} from '../../../../../shared/src';
import {Button} from 'reactstrap';
import {getGlobalState} from '../../../state';
import axios from 'axios';


function ytVidId(url) {
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return !!(url?.match(p));
}

function vimeoVid(url) {
    let d = /^(http:\/\/|https:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)(\/?)$/;
    return !!(url?.match(d));
}

const linkValidator = (text: string) => {
    if (!text) return true;
    return vimeoVid(text) || ytVidId(text);
};


const Video = function () {
    const [vType, setVType] = useState<VendorType>();
    const [hello, setHello] = useState<{
        id: string,
        token: string
    }[]>([]);
    useEffect(() => setVType(getGlobalState('category')), []);

    const isSampleAvailable = () => {
        return vType === VendorType.BandsDj || vType === VendorType.Videographer;

    };

    const getHighlight = (vDetails: VendorDetailsExtra): VideoUrl => {
        if (!vType) return {};
        switch (vType) {
            case VendorType.Venue:
                return vDetails?.vendorTypes?.venue_type?.hightlight;
            case VendorType.BandsDj:
                return vDetails?.vendorTypes?.band_djs_type?.hightlight;
            case VendorType.Videographer:
                return vDetails?.vendorTypes?.videographer_type?.hightlight;
        }
        return {};
    };

    const getSamples = (vDetails: VendorDetailsExtra): VideoUrl[] => {
        if (!vType) return null;
        switch (vType) {
            case VendorType.Videographer:
                return vDetails?.vendorTypes?.videographer_type?.videoSample;
            case VendorType.BandsDj:
                return vDetails?.vendorTypes?.band_djs_type?.videoSample;
        }
        return [];
    };

    const View = (props: ViewProps) => {
        return (
            <div>
                <dl className="row">
                    <dt className="col-sm-3">Highlight</dt>
                    <dd className="col-sm-9">
                        {
                            getHighlight(props.vDetails)?.youtubeUrl || getHighlight(props.vDetails)?.vimeoUrl ||
                            <span className={'text-danger'}>Not set</span>
                        }
                    </dd>
                    {
                        isSampleAvailable() &&
                        <div>
                            <h5 className={'mt-3'}>Samples</h5>
                            {
                                getSamples(props.vDetails)?.map((value, index) =>
                                    <div key={index}>
                                        <div>Reel Url: {value?.vimeoUrl || value?.youtubeUrl}</div>
                                        <div>title: {value?.videoTitle}</div>
                                        <div>type: {value?.videoType}</div>
                                        <div>thumbnail</div>
                                        <div style={{
                                            overflow: 'hidden',
                                            borderRadius: '10px',
                                            display: 'inline-block',
                                            boxShadow: '0px 1px 3px 0px',
                                            marginBottom: '10px',
                                        }}>
                                            <img src={'/p/' + value?.customThumbnail?.id + '_q95.jpg'} width={'200px'}/>
                                        </div>
                                    </div>,
                                ) || <p className={'text-danger'}>No Samples</p>
                            }
                        </div>
                    }
                </dl>
            </div>
        );
    };

    const Highlight = (props: EditProps) => {
        return (
            <div>
                <AvField
                    name="highlight-url"
                    label="Highlight Video Url"
                    placeholder="Enter your highlight Reel Video (Youtube or Vimeo)"
                    type="text"
                    disabled={props.globalLoading}
                    validate={{myValidation: linkValidator, required: {value: true}}}
                    value={getHighlight(props.vDetails)?.youtubeUrl || getHighlight(props.vDetails)?.vimeoUrl || undefined}
                />
            </div>
        );
    };

    const Sample = (props: EditProps) => {
        const [all, setAll] = useState<VideoUrlInput[]>([]);
        const [removedIndex, setRemIndex] = useState<number[]>([]);


        useEffect(() => {
            setAll(getSamples(props.vDetails) || []);
        }, []);

        const onadd = () => {
            setAll([...all, {}]);
        };
        const _handleImageChange = async (e, index) => {
            let file = e.target.files[0];

            const form = new FormData();
            form.append('image', file);

            const response = await axios.post('/api/upload_cache_image/', form, e.headers);
            const token = response.data.token;
            let newSet = all;
            newSet[index].customThumbnail = {
                token,
                id: newSet[index].customThumbnail?.id,
            };
            setAll([...newSet]);
        };

        const onDelete = (index: number) => {
            setRemIndex([...removedIndex, index]);
        };

        return (
            <div>
                <h5>Sample Video</h5>
                {
                    all?.map((value, index) => (
                        !removedIndex.includes(index) &&
                        <div key={index}>
                            <AvField
                                name={`sample-url-${index}`}
                                label="Youtube or Vimeo Url"
                                placeholder="Youtube or vimeo url"
                                type="text"
                                disabled={props.globalLoading}
                                validate={{myValidation: linkValidator, required: {value: true}}}
                                value={value.youtubeUrl || value.vimeoUrl || undefined}
                            />
                            <AvField
                                name={`sample-title-${index}`}
                                label="Video title"
                                placeholder="e.g. todo Sample video"
                                type="text"
                                disabled={props.globalLoading}
                                validate={{
                                    myValidation: v => v.length > 7 || 'should a longer than 7 charactors',
                                    required: {value: true},
                                }}
                                value={value.videoTitle || undefined}
                            />
                            <AvField
                                name={`sample-type-${index}`}
                                label="Video Type"
                                placeholder="e.g. Highlight Reel | Trailer"
                                type="text"
                                disabled={props.globalLoading}
                                validate={{
                                    myValidation: v => v.length > 3 || 'should longer than 3 characters',
                                    required: {value: true},
                                }}
                                value={value.videoType || 'Highlight Reel'}
                            />
                            {
                                value?.customThumbnail?.token &&
                                <div style={{
                                    overflow: 'hidden',
                                    borderRadius: '10px',
                                    display: 'inline-block',
                                    boxShadow: '0px 1px 3px 0px',
                                    marginBottom: '10px',
                                }}>
                                    <img src={'/api/tmp-img/' + value.customThumbnail?.token} width={'200px'}/>
                                </div>
                            }
                            {
                                !value.customThumbnail?.token && value.customThumbnail?.id &&
                                <div style={{
                                    overflow: 'hidden',
                                    borderRadius: '10px',
                                    display: 'inline-block',
                                    boxShadow: '0px 1px 3px 0px',
                                    marginBottom: '10px',
                                }}>
                                    <img src={'/p/' + value.customThumbnail?.id + '_q95.jpg'} width={'200px'}/>
                                </div>
                            }
                            <br/>
                            <input className="fileInput"
                                   type="file"
                                   onChange={(e) => _handleImageChange(e, index)}/>
                            <br/>

                            <AvField style={{display: 'none'}} value={value.customThumbnail?.token}
                                   name={`sample-token-${index}`}/>
                            <AvField style={{display: 'none'}} value={value.customThumbnail?.id}
                                   name={`sample-id-${index}`}/>
                            <Button className={'btn-danger'} onClick={() => onDelete(index)}>Delete</Button>
                        </div>
                    ))
                }
                <Button onClick={onadd}>Add</Button>
            </div>
        );
    };

    const Edit = (props: EditProps) => {

        return (
            <div>
                <Highlight {...props}/>
                {
                    (vType === VendorType.Videographer || vType === VendorType.BandsDj) &&
                    <Sample {...props}/>
                }
            </div>
        );
    };

    const onSubmit = (_event: any, values: any): EditVendorDetailsMutationVariables => {
        let hi: VideoUrlInput = {};
        let samples: VideoUrlInput[] = [];

        const highlightUrl = values['highlight-url'];
        if (highlightUrl) {
            if (vimeoVid(highlightUrl)) {
                hi = {
                    vimeoUrl: highlightUrl,
                };
            } else {
                hi = {
                    youtubeUrl: highlightUrl,
                };
            }
        }

        console.log(values);
        for (let key of Object.keys(values)) {
            if (!key.includes('sample-url'))
                continue;
            const i = parseInt(key.slice(-1));
            const url = values[`sample-url-${i}`];
            const title = values[`sample-title-${i}`];
            const type = values[`sample-type-${i}`];
            const id = values[`sample-id-${i}`];
            const token = values[`sample-token-${i}`];

            samples.push({
                youtubeUrl: vimeoVid(url) ? undefined : url,
                vimeoUrl: vimeoVid(url) ? url : undefined,
                videoTitle: title,
                videoType: type,
                customThumbnail: {
                    token: token,
                    id: id,

                },
            });
        }

        switch (vType) {
            case VendorType.Venue:
                return {
                    venueDetails: {
                        highlight: hi,
                    },
                };
            case VendorType.BandsDj:
                return {
                    bandDjsDetails: {
                        highlight: hi,
                        videoSample: samples,
                    },
                };
            case VendorType.Videographer:
                return {
                    videographerDetails: {
                        highlight: hi,
                        videoSample: samples,
                    },
                };
            default:
                return {};
        }
    };

    const shouldActive = () => {
        switch (vType) {
            case VendorType.Videographer:
            case VendorType.BandsDj:
            case VendorType.Venue:
                return true;
        }
        return false;
    };
    if (!shouldActive()) return null;

    return (
        <Template title={'Video'} View={View} Edit={Edit} onSubmitVariables={onSubmit}/>
    );
};

export default Video;
