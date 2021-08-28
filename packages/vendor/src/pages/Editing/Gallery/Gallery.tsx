import RUG from 'react-upload-gallery';
import axios from 'axios';
import 'react-upload-gallery/dist/style.css';
import React, {useState} from 'react';
import {VendorDetailsExtra} from '@mara/shared';
import {Col, Row} from 'reactstrap';
import SingleCard from '../Layout/SingleCard';
import Template, {SubmitType, ViewProps} from '../Layout/Template'; // or scss

interface Image {
    done?: boolean;
    error?: boolean;
    file?: File;
    name?: string;
    progress: number;
    size?: string;
    source: string;
    uid?: string;
    uploading?: boolean;
    id?: string;
}

const getCloudImages = (vDetails: VendorDetailsExtra):Image[] => {
    return vDetails?.galleryPhoto?.map(i => ({
        source: '/p/' + i.id + '_q95.webp',
        id: i.id,
        progress: 100,
    })) || [];
};

const Gallery = () => {

    const [pending, setPending] = useState(0);
    const [editImages, setEditImage] = useState<Image[]>(undefined);

    const onEditMode = (vDetails: VendorDetailsExtra) => {
        setEditImage(getCloudImages(vDetails))
    }

    const onViewMode = () => {
        window.location.reload()
    }

    const onSubmit:SubmitType = () => {

        if (!editImages || !editImages.length) return;
        let thing: {
            token?: string
            id?: string
        }[] = [];
        for (const image of editImages) {
            const token = image.source.includes('api') && image.source.match(/^\/api\/tmp-img\/(\S+)$/)[1];
            if (token) {
                thing.push({token});
                continue;
            }
            const id = image?.id;
            if (id) {
                thing.push({id});
            }
        }
        return {
            galleryPhotos: thing
        }
    }

    const addImage = (e) => {

        setPending(p => p + 1);
        const form = new FormData();
        form.append('image', e.file);

        axios.post('/api/upload_cache_image/', form, e.headers)
            .then(function (res) {
                e.onProgress(e.uid, res.data);
                e.onSuccess(e.uid, res.data);
                setPending(p => p - 1);
            })
            .catch(function (err) {
                e.onError(e.uid, {
                    action: e.action,
                    response: err,
                });
                setPending(p => p - 1);
            });

        return {
            abort() {
            },
        };
    };

    const View = (props: ViewProps) => {
        let CloudImages = getCloudImages(props.vDetails);

        return (
            <div>
                <Row>
                    {
                        CloudImages && CloudImages.map(image => (
                            <Col key={image.source} xl={3} lg={4} md={6} sm={12}>
                                <div className="project-item"
                                >
                                    <div className="overlay-container">
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                        }}>
                                            <img src={image.source} width="100%" style={{
                                                borderRadius: '4px',
                                                boxShadow: '#00000014 1px 1px 6px 0px',
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
                {
                    CloudImages?.length ? null : <p className={'text-danger'}>No Images</p>
                }
                <br/>
            </div>
        );
    }

    const Edit = () => {
        return (
            <div>
                {
                    editImages &&
                    <RUG
                        initialState={editImages}
                        accept={['jpg', 'jpeg', 'webp', 'png']}
                        customRequest={addImage}
                        onChange={e => setEditImage(e)}
                        source={response => {
                            return '/api/tmp-img/' + response.token;
                        }}
                    />
                }
            </div>
        )
    }

    return (
        <SingleCard title={'Gallery'}>
            <Template View={View} onSubmitVariables={onSubmit} submitLoading={!!pending} onViewMode={onViewMode} onEditMode={onEditMode}>
                {Edit()}
            </Template>
        </SingleCard>
    );
};

export default Gallery;
