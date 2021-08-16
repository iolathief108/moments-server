import React, {Component} from 'react';
import {Row, Col, Card, CardBody, Alert} from 'reactstrap';
import {
    businessName,
    parseSLPhone,
    validateStandardSLPhone,
} from '@mara/shared';
import {debounce as _debounce} from 'lodash';


// availity-reactstrap-validation
import {AvForm, AvField} from 'availity-reactstrap-validation';

import Loader from '../../comps/Loader';
// action
import {registerUser, loginUser} from '../../store/actions';

// Redux
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// import images
import logoSm from '../../assets/images/logo-sm.png';
import {sdk, parseName, isValidPassword} from '@mara/shared';
import {paths} from '../../routes';
import {makeID} from '../../helpers/utils';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpStep: false,
            firstName: null,
            lastName: null,
            password: null,
            phone: null,
        };

        this.handleContinue = this.handleContinue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    async handleSubmit(event, values) {
        try {
            const res = await sdk().vendorRegister({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                phone: this.state.phone,
                otp: values.otp,
            });
            if (res.data.vendorRegister) {
                this.props.history.push(paths.dashboard());
            } else {
                this.setState({
                    error: 'Registration failed',
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    handleContinue(event, values) {

        this.setState({
            loading: true,
            error: false,
        });

        const parsedPhone = parseSLPhone(values.phone);
        if (!parsedPhone) {
            this.setState({
                error: 'entered Phone not valid',
                loading: false,
            });
            return;
        }

        if (!values.password) return false;
        if (!isValidPassword(values.password)) return false;

        sdk().isVendorPhoneExist({
            phone: parsedPhone,
        }).then((res) => {

            if (res.data.isVendorPhoneExist) {
                this.setState({
                    ...this.state,
                    loading: false,
                    error: false,
                    otpStep: true,
                    firstName: parseName(values.firstName),
                    lastName: parseName(values.lastName),
                    password: values.password,
                    phone: parsedPhone,
                });
            } else {
                this.setState({
                    ...this.state,
                    error: 'phone already exist',
                });
            }

        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false,
            });
        });
    }

    handleBack() {
        this.setState({
            otpStep: false,
        });
    }

    valPhone = (value) => {
        let parsedPhone = parseSLPhone(value);
        if (!parsedPhone) {
            return 'Not a valid phone number';
        }
        if (!validateStandardSLPhone(parsedPhone)) {
            return 'Not a valid phone number';
        }
        return true;
    };
    current = '';
    validatePhone = _debounce((value, ctx, input, cb) => {

        const cBack = (val) => {
            if (this.current === id) {
                cb(val);
            }
        };
        const id = makeID(35);
        this.current = id;
        let parsedPhone = parseSLPhone(value);
        if (!parsedPhone) {
            cBack('Not a valid phone number');
            return;
        }

        if (!validateStandardSLPhone(parsedPhone || '')) {
            cBack('Not a valid phone number');
            return;
        }
        sdk().isVendorPhoneExist({phone: parsedPhone}).then(response => {
            cBack(response.data.isVendorPhoneExist || 'This phone number already exists');
            this.setState({
                phoneError: !response.data.isVendorPhoneExist,
                error: null
            })
            return;
        }).catch(e => {
            console.log(e.response.status);
            if (e.response.status === 502) {
                this.setState({
                    error: 'Unfortunately the server is down, please try again later'
                })
            }
            cBack('Ooops! Something went wrong!');
        });
    }, 1050);


    validatePassword(value) {
        if (!isValidPassword(value)) return 'Password must be at least 8 characters long';
        return true;
    }

    render() {
        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark">
                        <i className="fas fa-home h2"></i>
                    </Link>
                </div>
                <div className="account-pages my-5 pt-5">
                    <div className="container">
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <div className="position-relative">
                                    {this.state.loading ? <Loader/> : null}
                                    <div style={{
                                        opacity: this.state.otpStep ? 50 : 0,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        transition: 'all 0.5s',
                                        height: this.state.otpStep ? '25px' : 0,
                                        cursor: 'pointer',
                                        color: 'blue',
                                    }}
                                         onClick={this.handleBack}
                                    >
                                        <i
                                            className={'dripicons-arrow-thin-left'}
                                            style={{
                                                textAlign: 'center',
                                                marginRight: '8px',
                                                marginBottom: '-2px',
                                            }}
                                        />
                                        <span>Back</span>
                                    </div>
                                    <Card className="overflow-hidden" style={{
                                        transition: 'all 0.5s',
                                    }}>
                                        <div className="bg-primary">
                                            <div
                                                className="text-primary text-center p-4">
                                                <h5 className="text-white font-size-20">
                                                    Moments Registration
                                                </h5>
                                                <p className="text-white-50">
                                                    You're one step away from completing the registration.
                                                </p>
                                                <Link to="/"
                                                      className="logo logo-admin">
                                                    <img src={logoSm}
                                                         height="24"
                                                         alt="logo"/>
                                                </Link>
                                            </div>
                                        </div>
                                        <CardBody className="p-4">
                                            <div className="p-3">
                                                {
                                                    !this.state.otpStep ?
                                                        <AvForm
                                                            className="form-horizontal mt-4"
                                                            onValidSubmit={this.handleContinue}
                                                        >
                                                            {this.state.error &&
                                                            this.state.error ? (
                                                                <Alert
                                                                    color="danger">
                                                                    {this.state.error}
                                                                </Alert>
                                                            ) : null}

                                                            {/* form things */}
                                                            <div
                                                                className="form-group">
                                                                <Row>
                                                                    <Col>
                                                                        <AvField
                                                                            name="firstName"
                                                                            label="First Name"
                                                                            className="form-control"
                                                                            placeholder="First Name"
                                                                            type="text"
                                                                            value={this.state.firstName || undefined}
                                                                            required
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <AvField
                                                                            name="lastName"
                                                                            label="Last Name"
                                                                            className="form-control"
                                                                            placeholder="Last Name"
                                                                            type="text"
                                                                            value={this.state.lastName || undefined}
                                                                            required
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <div
                                                                className={`form-group${!this.state.phoneError ? ' phone-123' : null}`}>
                                                                <AvField
                                                                    name="phone"
                                                                    label="Phone"
                                                                    type="phone"
                                                                    value={this.state.phone}
                                                                    required
                                                                    validate={{
                                                                        async: this.validatePhone,
                                                                    }}
                                                                    placeholder="Enter Your Phone Number"
                                                                />
                                                            </div>
                                                            <div
                                                                className="form-group">
                                                                <AvField
                                                                    name="password"
                                                                    label="Password"
                                                                    type="password"
                                                                    required
                                                                    placeholder="Enter Password"
                                                                    validate={{validatePassword: this.validatePassword}}
                                                                />
                                                            </div>
                                                            <Row
                                                                className="form-group">
                                                                <div
                                                                    className="col-12 text-right">
                                                                    <button
                                                                        className="btn btn-primary w-md waves-effect waves-light"
                                                                        type="submit"> Continue
                                                                    </button>
                                                                </div>
                                                            </Row>


                                                            {/* terms */}
                                                            <Row
                                                                className="form-group mt-2 mb-0">
                                                                <div
                                                                    className="col-12 mt-4">
                                                                    <p className="mb-0">
                                                                        By
                                                                        registering
                                                                        you
                                                                        agree to
                                                                        the
                                                                        {' ' + businessName + ' '}
                                                                        <Link
                                                                            to="#"
                                                                            className="text-primary">
                                                                            Terms
                                                                            of
                                                                            Use
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </Row>
                                                        </AvForm> :
                                                        <AvForm
                                                            className="form-horizontal mt-4"
                                                            onValidSubmit={this.handleSubmit}
                                                        >
                                                            {this.state.error ? (
                                                                <Alert
                                                                    color="danger">{this.state.error}</Alert>
                                                            ) : null}

                                                            <div
                                                                className="form-group">
                                                                <AvField
                                                                    name="otp"
                                                                    label="OTP"
                                                                    className="form-control"
                                                                    value=""
                                                                    placeholder="Enter otp"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                            <Row
                                                                className="form-group">
                                                                <Col
                                                                    sm={6}> &nbsp; </Col>
                                                                <Col sm={6}
                                                                     className="text-right">
                                                                    <button
                                                                        className="btn btn-primary w-md waves-effect waves-light"
                                                                        type="submit"
                                                                    >
                                                                        Register
                                                                    </button>
                                                                </Col>
                                                            </Row>
                                                            <Row
                                                                className="form-group mt-2 mb-0">
                                                                <div
                                                                    className="col-12 mt-4">
                                                                    <p className="mb-0">
                                                                        By
                                                                        registering
                                                                        you
                                                                        agree to
                                                                        the
                                                                        Moments{' '}
                                                                        <Link
                                                                            to="#"
                                                                            className="text-primary">
                                                                            Terms
                                                                            of
                                                                            Use
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </Row>
                                                        </AvForm>
                                                }
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className="mt-5 text-center">
                                    <p>
                                        Already have an account ?{' '}
                                        <Link
                                            to="login"
                                            className="font-weight-medium text-primary"
                                        >
                                            {' '}
                                            Login{' '}
                                        </Link>{' '}
                                    </p>
                                    <p>
                                        © 2021 {businessName} <span className="d-none d-sm-inline-block"> - All rights reserved.</span>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const {user, registrationError, loading} = state.Account;
    return {user, registrationError, loading};
};

export default connect(mapStatetoProps, {registerUser, loginUser})(Register);
