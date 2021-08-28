import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, CardBody, FormGroup} from 'reactstrap';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {isValidBusinessAddress, parseSLPhone, sdk, validateStandardSLPhone} from '@mara/shared';


const Contact = function () {
    const [phone, setPhone] = useState<string>(null);
    const [address, setAddress] = useState<string>(null);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);
    const [loading, setLoadiing] = useState<boolean>(true);

    useEffect(() => {
        sdk().getVendorDetailsExtra().then(res => {
            if (res.data.vendorDetailsExtra?.phone) {
                setPhone(res.data.vendorDetailsExtra.phone);
            }
            if (res.data.vendorDetailsExtra?.address) {
                setAddress(res.data.vendorDetailsExtra.address);
            }
            setLoadiing(false);
        }).catch(e => {
            console.log(e);
            setError('oops! Something went wrong')
            setLoadiing(false)
        });
    }, []);

    function onSubmit(_event: any, values: {address?: string, phone?: string;}) {
        const parsedPhone = parseSLPhone(values.phone);
        if (!parsedPhone || typeof parsedPhone !== 'string') {
            setError('Phone is not phone');
            return;
        }
        setLoadiing(true);
        sdk().editVendorDetails({
            address: values.address || undefined,
            phone: parsedPhone,
        }).then(res => {
            if (res.data.vendorEditDetails) {
                setTimeout(() => {
                    if (error) {
                        setError(null);
                    }
                }, 1300);
                setEditMode(false);
                setAddress(values.address);
                setPhone(parsedPhone);
            } else {
                setError('Something went wrong!');
            }
            setLoadiing(false);
        }).catch(e => {
            setError(e.response?.errors[0]?.message ?? 'Something went wrong! Maybe given number is already Exists');
            setLoadiing(false);
        });
    }

    const phoneValidator = (value) => {

        const parsed = parseSLPhone(value);
        if (!parsed) {
            return 'Not a valid phone';
        }
        if (!validateStandardSLPhone(parsed)) {
            return 'Please enter valid phone number';
        }
        return true;
    };

    const addressValidator = (value) => {

        if (!value) return true;
        if (!isValidBusinessAddress(value)) {
            return 'Please enter valid address';
        }
        return true;
    };

    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-4">Contact Details</h4>
                {
                    !editMode ?
                        // Preview Mode
                        <div>
                            <dl className="row">
                                <dt className="col-sm-3">Phone</dt>
                                <dd className="col-sm-9">{phone || <span className={'text-danger'}>No Phone</span>}</dd>

                                <dt className="col-sm-3">Business Address</dt>
                                <dd className="col-sm-9">{address || <span className={'text-danger'}>No Address</span>}</dd>
                            </dl>
                            <Button onClick={() => setEditMode(true)}>Edit</Button>
                        </div> :
                        // Edit Mode
                        <div>
                            <AvForm
                                onValidSubmit={onSubmit}
                            >
                                {error ? (
                                    <Alert color="danger">{error}</Alert>
                                ) : null}
                                <AvField
                                    name="address"
                                    label="Business Address"
                                    placeholder="your business address"
                                    type="text"
                                    disabled={loading}
                                    validate={{myValidation: addressValidator}}
                                    value={address ?? undefined}
                                />
                                <AvField
                                    name="phone"
                                    label="Business Phone"
                                    placeholder="Your Business Phone"
                                    type="text"
                                    disabled={loading}
                                    value={phone ?? undefined}
                                    validate={{myValidation: phoneValidator}}
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

export default Contact;
