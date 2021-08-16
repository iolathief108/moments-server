import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, CardBody, FormGroup} from 'reactstrap';
import {sdk} from '@mara/shared';
import {AvForm, AvField} from 'availity-reactstrap-validation';


const Description = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [description, setDescription] = useState<string>(null);

    useEffect(() => {
        sdk().getVendorDetailsExtra().then(res => {
            if (res.data.vendorDetailsExtra?.description) {
                setDescription(res.data.vendorDetailsExtra.description);
            }
            setLoading(false)
        }).catch(e => {
            console.log(e);
            setError('Ooops! Something went wrong!');
            setLoading(false)
        });
    }, []);

    function onSubmit(_event: any, values: any) {
        setLoading(true);

        sdk().editVendorDetails({
            description: values.About,
        }).then(res => {
            if (res.data.vendorEditDetails) {
                setTimeout(() => {
                    if (error) {
                        setError(null);
                    }
                }, 800);
                setEditMode(false);
                setDescription(values.About);
            } else {
                setError('Ooops! Something went wrong!');
            }
            setLoading(false);
        }).catch(e => {
            setError(e.response?.errors[0]?.message || 'Oops! Somthing went wrong');
            setLoading(false);
        });
    }

    const validateDescription = (value) => {
        if (value?.length < 10) {
            return 'should be more that 10 characters';
        }
        return true;
    };

    const getDescription = () => {
        if (!description) {
            return null
        }
        let wow = description;
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
            final.map(i => (
                <p>
                    {
                        i.map(
                            r =>
                                <>
                                    {r}
                                    <br/>
                                </>
                        )
                    }
                </p>
            ))
        );
    };



    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">About</h4>
                <p className="card-title-desc">
                    Briefly describe your offering
                </p>
                {
                    !editMode ?
                        <div>
                            <p>{getDescription() || <span className={'text-danger'}>No data has been added yet</span>}</p>
                            <Button onClick={() => setEditMode(true)}>Edit</Button>
                        </div> :
                        <div>
                            <AvForm
                                onValidSubmit={onSubmit}
                            >
                                {error ? (
                                    <Alert color="danger">{error}</Alert>
                                ) : null}
                                <AvField
                                    name="About"
                                    placeholder="Type your description here"
                                    type="textarea"
                                    style={{height: '100px'}}
                                    disabled={loading}
                                    validate={{validatea: validateDescription, required: {value: true}}}
                                    value={description || undefined}
                                />

                                <FormGroup className="mb-0">
                                    <div>
                                        <Button className="mr-2" onClick={() => setEditMode(false)}>Cancel</Button>
                                        <Button type="submit" color="primary" className="mr-1" disabled={loading}>
                                            Submit
                                        </Button>
                                    </div>
                                </FormGroup>
                            </AvForm>
                        </div>
                }
            </CardBody>
        </Card>
    );
};

export default Description;
