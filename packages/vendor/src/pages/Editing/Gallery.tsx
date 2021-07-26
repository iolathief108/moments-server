import RUG from 'react-upload-gallery';
import axios from 'axios';
import 'react-upload-gallery/dist/style.css';
import React, {useEffect, useState} from 'react';
import {sdk} from '@mara/shared';
import {Alert, Button, Card, CardBody, Col, Row} from 'reactstrap';
import SingleCard from './Layout/SingleCard'; // or scss

interface Image {
    done: boolean
    error: boolean
    file: File
    name: string
    progress: number
    size: string
    source: string
    uid: string
    uploading: boolean
    id?: string
}

const Gallery = () => {
    const [editImages, setEditImage] = useState<Image[]>(undefined);
    const [CloudImages, setCloudImages] = useState<Image[]>(undefined);
    const [pendings, setPendings] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>(null);


    useEffect(() => {
        sdk().getVendorDetailsExtra().then(res => {
            let sources = [];
            res.data.vendorDetailsExtra.galleryPhoto.forEach(i => {

                sources.push({source: '/p/' + i.id + '_q95.webp', id: i.id, progress: 100});
            });
            setEditImage(sources);
            setCloudImages(sources);
        }).catch(e => console.log(e));
    }, []);

    const onSubmit = () => {
        setLoading(true);
        if (!editImages || !editImages.length) return;
        let thing: {
            token?: string
            id?: string
        }[] = [];
        for (const image of editImages) {
            const token = image.source.includes('api') && image.source.match(/^\/api\/tmp-img\/(\S+)\.(jpg|jpeg|png|webp|whatever)$/)[1];
            if (token) {
                thing.push({token});
                continue;
            }
            const id = image?.id;
            if (id) {
                thing.push({id});
            }
        }
        sdk().editVendorDetails({
            galleryPhotos: thing,
        }).then(() => {
            setCloudImages(editImages);
            setLoading(false);
            setEditMode(false);
            window.location.reload();
        }).catch(e => {
            setError(e.response?.errors[0]?.message ?? 'Something went wrong!');
            setLoading(false);
        });
    };

    const addImage = (e) => {

        setPendings(p => p + 1);
        const form = new FormData();
        form.append('image', e.file);

        axios.post('/api/upload_cache_image/', form, e.headers)
            .then(function (res) {
                e.onProgress(e.uid, res.data);
                e.onSuccess(e.uid, res.data);
                setPendings(p => p - 1);
            })
            .catch(function (err) {
                e.onError(e.uid, {
                    action: e.action,
                    response: err,
                });
                setPendings(p => p - 1);
            });

        return {
            abort() {
            },
        };
    };

    if (editImages === undefined) return (<div><h1>Gallery</h1></div>);

    return (
        <SingleCard title={'Gallery'} full>
            <Card>
                <CardBody>
                    {/*<h4 className="card-title mb-4">Contact Details</h4>*/}
                    {
                        editMode &&
                        <p className="card-title-desc">
                            Make sure the extension of your photos is jpg. Currently only image with jpg extension is
                            supported.
                        </p>
                    }
                    {
                        !editMode ?
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
                                                            justifyContent: 'center'
                                                        }}>
                                                            <img src={image.source} width='100%' style={{
                                                                borderRadius: '4px',
                                                                boxShadow: '#00000014 1px 1px 6px 0px'
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </Row>
                                <br/>
                                <Button onClick={() => setEditMode(true)}>Edit</Button>
                            </div> :
                            <div>
                                {error ? (
                                    <Alert color="danger">{error}</Alert>
                                ) : null}
                                <RUG
                                    initialState={editImages}
                                    accept={['jpg', 'jpeg']}
                                    customRequest={addImage}
                                    onChange={e => setEditImage(e)}
                                    source={response => {
                                        return '/api/tmp-img/' + response.token + '.jpg';
                                    }}
                                />
                                <div>
                                    <Button className="mr-3" onClick={() => {
                                        setEditMode(false);
                                        window.location.reload();
                                    }}>Cancel</Button>
                                    <Button onClick={onSubmit} color="primary" className="mr-1"
                                            disabled={pendings > 0 || loading}>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                    }
                </CardBody>
            </Card>
        </SingleCard>
    );
};

export default Gallery;