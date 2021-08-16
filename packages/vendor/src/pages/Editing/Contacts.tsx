import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, CardBody, FormGroup} from 'reactstrap';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {isValidBusinessAddress, parseSLPhone, sdk, validateStandardSLPhone} from '@mara/shared';
// import SingleCard from './Layout/SingleCard';


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

function nullItPussy(val?: string | null) {
    if (!val) return null;
    if (val === '') return null;
    return val;
}

const Links = function () {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);
    const [loading, setLoadiing] = useState<boolean>(true);

    const [facebook, setFacebook] = useState<string>(null);
    const [instagram, setIntagram] = useState<string>(null);
    const [pinterest, setPinterest] = useState<string>(null);
    const [website, setWebsite] = useState<string>(null);

    useEffect(() => {
        sdk().getVendorDetailsExtra().then(res => {
            if (res.data.vendorDetailsExtra?.links.facebook) {
                setFacebook(res.data.vendorDetailsExtra.links.facebook);
            }
            if (res.data.vendorDetailsExtra?.links.instagram) {
                setIntagram(res.data.vendorDetailsExtra.links.instagram);
            }
            if (res.data.vendorDetailsExtra?.links.pinterest) {
                setPinterest(res.data.vendorDetailsExtra.links.pinterest);
            }
            if (res.data.vendorDetailsExtra?.links.website) {
                setWebsite(res.data.vendorDetailsExtra.links.website);
            }
            setLoadiing(false);
        }).catch(() => setError('Something went wrong!'));
    }, []);

    interface Vs {
        facebook?: string;
        instagram?: string;
        pinterest?: string;
        website?: string;
    }

    function onSubmit(_event: any, values: Vs) {

        setLoadiing(true);
        if (values.facebook)
            values.facebook = values.facebook.startsWith('http') ? values.facebook : 'https://' + values.facebook;
        if (values.instagram)
            values.instagram = values.instagram.startsWith('http') ? values.instagram : 'https://' + values.instagram;
        if (values.pinterest)
            values.pinterest = values.pinterest.startsWith('http') ? values.pinterest : 'https://' + values.pinterest;

        sdk().editVendorDetails({
            facebook: nullItPussy(values.facebook),
            instagram: nullItPussy(values.instagram),
            pinterest: nullItPussy(values.pinterest),
            website: nullItPussy(values.website),
        }).then(res => {
            if (res.data.vendorEditDetails) {
                setTimeout(() => {
                    if (error) {
                        setError(null);
                    }
                }, 1300);
                setEditMode(false);
                setFacebook(nullItPussy(values.facebook));
                setIntagram(nullItPussy(values.instagram));
                setPinterest(nullItPussy(values.pinterest));
                setWebsite(nullItPussy(values.website));
            } else {
                setError('Something went wrong!');
            }
            setLoadiing(false);
        }).catch(e => {
            setError(e.response?.errors[0]?.message ?? 'Something went wrong! Maybe given number is already Exists');
            setLoadiing(false);
        });
    }

    const linkValidator = type => (value: string) => {

        let temp: any = value
            .replace(/ +/g, '');
        if (!temp) {
            return true;
        }

        if (type === 'facebook') {
            const pattern = /^(?:https:\/\/)?(?:www\.)?facebook\.com\/[a-z0-9-_]{1,255}\/?$/i;
            if (!pattern.test(value)) {
                return false;
            }
        }

        if (type === 'instagram') {
            const pattern = /^(?:https:\/\/)?(?:www\.)?instagram\.com\/[a-z0-9-_]{1,255}\/?$/i;
            if (!pattern.test(value)) {
                return false;
            }
        }
        if (type === 'pinterest') {
            const pattern = /^(?:https:\/\/)?(?:www\.)?pinterest\.(?:co\.uk|com)\/[a-z0-9-_]{1,255}(?:\/|\/[a-z0-9-_]{1,255}\/?)?$/i;
            if (!pattern.test(value)) {
                return false;
            }
        }
        if (type === 'website') {
            const pattern = /^(?:https?:\/\/)(:?www\.)?[a-z0-9-_]{1,255}\.(com|lk)\/?$/;
            if (!pattern.test(value)) {
                return false;
            }
        }
        return true;
    };

    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-4">Links</h4>
                {
                    !editMode ?
                        // Preview Mode
                        <div>
                            <dl className="row">
                                <dt className="col-sm-3">Facebook</dt>
                                <dd className="col-sm-9">{facebook ?? <span className={'text-danger'}>Not set</span>}</dd>

                                <dt className="col-sm-3">Instagram</dt>
                                <dd className="col-sm-9">{instagram ?? <span className={'text-danger'}>Not set</span>}</dd>

                                <dt className="col-sm-3">Pinterest</dt>
                                <dd className="col-sm-9">{pinterest ?? <span className={'text-danger'}>Not set</span>}</dd>

                                <dt className="col-sm-3">Website</dt>
                                <dd className="col-sm-9">{website ?? <span className={'text-danger'}>Not set</span>}</dd>
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
                                    name="instagram"
                                    label="Instagram"
                                    placeholder="your Instagram Account"
                                    type="text"
                                    disabled={loading}
                                    validate={{myValidation: linkValidator('instagram'), required: {value: false}}}
                                    value={instagram ?? undefined}
                                />
                                <AvField
                                    name="facebook"
                                    label="Facebook"
                                    placeholder="Facebook Page Url"
                                    type="text"
                                    disabled={loading}
                                    value={facebook ?? undefined}
                                    validate={{myValidation: linkValidator('facebook'), required: {value: false}}}
                                />
                                <AvField
                                    name="pinterest"
                                    label="Pinterest"
                                    placeholder="Pinterest Page Url"
                                    type="text"
                                    disabled={loading}
                                    value={pinterest ?? undefined}
                                    validate={{myValidation: linkValidator('pinterest'), required: {value: false}}}
                                />
                                <AvField
                                    name="website"
                                    label="Website"
                                    placeholder="Website"
                                    type="text"
                                    disabled={loading}
                                    value={website ?? undefined}
                                    validate={{myValidation: linkValidator('website'), required: {value: false}}}
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

const Contacts = function () {

    return (
        // <SingleCard title="Contacts">
        <React.Fragment>
            <Contact/>
            <Links/>
        </React.Fragment>
        // </SingleCard>
    );
};

export default Contacts;
