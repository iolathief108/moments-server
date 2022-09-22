import React, { Component } from 'react';
import { deAuthorize, sdk } from '@mara/shared';
import { Link, withRouter } from 'react-router-dom';
import { Card, CardBody, Col, Button, Row } from 'reactstrap';
import { getListingStatusLabel, isEnableReason } from '../../helpers/utils';
function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    let from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    let to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

function getUrl(bName) {
    const hostname = typeof window !== 'undefined' && window.location && window.location.hostname || '';
    if (hostname === 'localhost'){
        return `http://localhost/${slugify(bName)}`
    }
    return `https://moments.lk/${slugify(bName)}`

}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.unmounted = false;
        this.state = {};

        this.initialize = this.initialize.bind(this);
        this.initialize();
    }

    async initialize() {
        try {
            const res = await sdk('/api/').getVendorProfile();
            if (!this.unmounted) {
                this.setState({
                    vProfile: res.data.vendorProfile,
                });
            }
            const ny = await sdk().getVendorDetailsExtra();
            this.setState({
                vendorDetailsExtra: ny.data.vendorDetailsExtra,
            });

        } catch (e) {
            console.log(e);
            deAuthorize();
            this.props.history.push('/login');
        }
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    render() {
        if (!this.state.vProfile) {
            return <div />;
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="page-title-box">
                                <h4 className="font-size-18">Profile</h4>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="col-12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title mb-4">Profile
                                        Details</h4>
                                    <div>
                                        <dl className="row">
                                            <dt className="col-sm-3">First &
                                            Last Name
                                            </dt>
                                            <dd className="col-sm-9">{this.state.vProfile?.firstName} {this.state.vProfile?.lastName}</dd>

                                            <dt className="col-sm-3">Phone</dt>
                                            <dd className="col-sm-9">{this.state.vProfile?.phone}</dd>

                                            <dt className="col-sm-3">Business
                                            Name
                                            </dt>
                                            <dd className="col-sm-9">{this.state.vendorDetailsExtra?.business_name}</dd>

                                            <dt className="col-sm-3">Vendor Type
                                            </dt>
                                            <dd style={{textTransform: 'capitalize'}} className="col-sm-9">{this.state.vendorDetailsExtra?.vendor_type}</dd>

                                            <dt className="col-sm-3">Link</dt>
                                            <dd className="col-sm-9">
                                                <a target={'_blank'} href={getUrl(this.state.vendorDetailsExtra?.business_name || '')}>
                                                    {getUrl(this.state.vendorDetailsExtra?.business_name || '')}
                                                </a>
                                            </dd>

                                            <dt className="col-sm-3">Account Status
                                            </dt>
                                            {/*<dd className="col-sm-9">{this.state.vendorDetailsExtra?.isComplete ? 'Complete' : <span className={'text-danger'}>Not complete</span>}</dd>*/}
                                            <dd className="col-sm-9">{this.state.vendorDetailsExtra && getListingStatusLabel(this.state.vendorDetailsExtra)}</dd>
                                            {
                                                isEnableReason(this.state.vendorDetailsExtra) && this.state.vendorDetailsExtra?.reason &&
                                                <span className={'ml-2'}>Reason: {this.state.vendorDetailsExtra.reason}</span> ||
                                                (this.state.vendorDetailsExtra?.isLive && <span className="text-success">Your account is Live</span>)
                                            }

                                            {/*<dt className="col-sm-3">Email</dt>*/}
                                            {/*{*/}
                                            {/*    this.state.vProfile?.email ?*/}
                                            {/*        <dd className="col-sm-9">{this.state.vProfile?.email}</dd> :*/}
                                            {/*        <dd className="col-sm-9 text-danger">No Email</dd>*/}
                                            {/*}*/}
                                        </dl>
                                        {/* <Button color="success">Edit Profile</Button> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Profile);
