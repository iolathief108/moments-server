import {sdk, VendorDetailsExtra, VendorType} from '@mara/shared';
import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {Button, Card, CardBody, FormGroup, Row} from 'reactstrap';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {getGlobalState, setGlobalState} from '../../state';
import {paths} from '../../routes';


interface IState {
    data?: VendorDetailsExtra | null,
    redirect?: boolean
}

const optionData = [
    {
        name: 'Caterer',
        vType: VendorType.Caterer,
    },
    {
        name: 'Photographer',
        vType: VendorType.Photographer,
    },
    {
        name: 'Venue',
        vType: VendorType.Venue,
    },
];

class Initialize extends Component<{}, IState> {

    constructor(props) {
        super(props);
        this.state = {};

        setTimeout(()=>{
            if (getGlobalState('category')) this.setState({redirect: true});
        }, 1000)
        sdk().getVendorDetailsExtra().then(res => {
            this.setState({
                data: res.data?.vendorDetailsExtra,
            });
        }).catch(e => console.log(e));
        this.submit = this.submit.bind(this);
    }

    submit(event, values: {businessName: string, vendorType: VendorType}) {

        function d1(v) {
            for (let value of Object.values(VendorType)) {
                if (value === v) {
                    return true;
                }
            }
            return false;
        }

        if (!values.businessName || !values.vendorType || !d1(values.vendorType)) {
            return;
        }

        sdk().editVendorDetails({
            businessName: values.businessName,
            vendorType: values.vendorType,
        }).then(res => {
            if (!res.data?.vendorEditDetails) return;
            setGlobalState('category', values.vendorType);
            this.setState({
                redirect: res.data.vendorEditDetails,
            });
        }).catch(e => console.log('error'));
    }

    render() {

        //@ts-ignore
        if (this.state?.redirect) {
            return (
                <Redirect to={paths.dashboard()}/>
            );
        }

        if (this.state.data === undefined) {
            return (
                <React.Fragment/>
            );
        }

        return (
            <React.Fragment>
                <div className="container-fluid">
                    {/*<Row className="align-items-center">*/}
                    {/*    <Col sm={6}>*/}
                    {/*        <div className="page-title-box">*/}
                    {/*            <h4 className="font-size-18">Form Editors</h4>*/}
                    {/*            <ol className="breadcrumb mb-0">*/}
                    {/*                <li className="breadcrumb-item">*/}
                    {/*                    <Link to="#">Veltrix</Link>*/}
                    {/*                </li>*/}
                    {/*                <li className="breadcrumb-item">*/}
                    {/*                    <Link to="#">Forms</Link>*/}
                    {/*                </li>*/}
                    {/*                <li className="breadcrumb-item active">Form Editors</li>*/}
                    {/*            </ol>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                    <Row>
                        <div className="col-12">
                            <Card>
                                <CardBody>
                                    <h4 className="card-title">What is your business type?</h4>
                                    <p className="card-title-desc">
                                        Choose your business type carefully. Changing the type of business is a long
                                        process.
                                    </p>

                                    <AvForm
                                        onValidSubmit={this.submit}
                                    >
                                        <AvField type="select" name="vendorType" label="Business Type">
                                            <option key="no" value={'select-one-fff*'}>Select One</option>
                                            {
                                                optionData.map(item => <option key={item.vType}
                                                                               value={item.vType}>{item.name}</option>)
                                            }
                                        </AvField>

                                        <AvField
                                            name="businessName"
                                            label="Business Name"
                                            placeholder="Ex: Catalina Flower Shop"
                                            type="text"
                                            validate={{required: {value: true}}}
                                        />

                                        <FormGroup className="mb-0">
                                            <div>
                                                <Button type="submit" color="primary" className="mr-1">
                                                    Submit
                                                </Button>
                                            </div>
                                        </FormGroup>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

// @ts-ignore
export default withRouter(Initialize);
