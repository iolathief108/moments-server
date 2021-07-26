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
            description: values.description,
        }).then(res => {
            if (res.data.vendorEditDetails) {
                setTimeout(() => {
                    if (error) {
                        setError(null);
                    }
                }, 800);
                setEditMode(false);
                setDescription(values.description);
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
    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-4">Desctiption</h4>
                {
                    !editMode ?
                        // preview mode
                        <div>
                            <p>{description}</p>
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
                                    name="description"
                                    // label="Description"
                                    placeholder="Enter your description"
                                    type="textarea"
                                    style={{height: '100px'}}
                                    disabled={loading}
                                    validate={{validatea: validateDescription, required: {value: true}}}
                                    value={description || undefined}
                                />

                                <FormGroup className="mb-0">
                                    <div>
                                        <Button className="mr-3" onClick={() => setEditMode(false)}>Cancel</Button>
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