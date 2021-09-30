import React, {Component} from 'react';
import {Alert, Card, CardBody, Col, Row} from 'reactstrap';
import {
    businessName, isNumeric,
    isValidPassword,
    parseName,
    parseSLPhone,
    sdk,
    validateStandardSLPhone,
} from '@mara/shared';
import {debounce as _debounce} from 'lodash';
// noinspection ES6CheckImport
import {AvField, AvForm} from 'availity-reactstrap-validation';
import Loader from '../../comps/Loader';
import {loginUser, registerUser} from '../../store/actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import logoSm from '../../assets/images/logo-sm.png';
import {paths} from '../../routes';
import {makeID} from '../../helpers/utils';

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpStep: false,
            firstName: null,
            lastName: null,
            password: null,
            phone: null,
            authCode: null,
            resendOtpCountdown: 0,
            tryCount: 0,
        };

        // this.handleContinue = this.handleContinue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleBack = this.handleBack.bind(this);
    }

    async handleSubmit(event, values) {

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

        try {

            const alreadyExistResult = await sdk().isVendorPhoneExist({
                phone: parsedPhone,
            });
            if (alreadyExistResult.data.isVendorPhoneExist) {
                this.setState({
                    error: 'The phone number you entered already exists!',
                });
                return;
            }

            this.setState({
                firstName: parseName(values.firstName),
                lastName: parseName(values.lastName),
                password: values.password,
                phone: parsedPhone,
                authCode: values.authCode
            });

            // registration
            const res = await sdk().vendorRegister({
                firstName: parseName(values.firstName),
                lastName: parseName(values.lastName),
                password: values.password,
                phone: parsedPhone,
                authCode: values.authCode
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
            this.setState({
                loading: false,
                error: typeof e === 'string' ? e : e?.response?.errors[0].message || 'Something went wrong. Please check the phone number entered.',
            });


            this.setState({
                error: typeof e === 'string' ? e : e?.response?.errors[0].message || 'Something went wrong. Please check the OTP number entered.',
            });
            console.error(e);

            return;
        }
    }

    async sendOTP(phone) {
        try {
            const res = await sdk().vendorRegisterOtp({phone});
            if (!res.data.vendorRegisterOtp) {
                this.setState({
                    loading: false,
                    error: 'Something went wrong. Please check the phone number entered.',
                });
                return;
            }
            const count = 59;
            this.setState({
                loading: false,
                error: false,
                otpStep: true,
                resendOtpCountdown: count,
                tryCount: this.state.tryCount + 1,
            });

            (async () => {
                for (let i = 0; i < count; i++) {
                    await sleep(1000);
                    this.setState({
                        resendOtpCountdown: count - i - 1,
                    });
                }
            })();

        } catch (e) {
            this.setState({
                error: e?.response?.errors[0].message || 'Something went wrong. Please check the phone number entered.',
            });
            console.error(e);
        }
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
        const id = makeID(35);
        const cBack = (val) => {
            if (this.current === id) {
                cb(val);
            }
        };
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
            cBack(!response.data.isVendorPhoneExist || 'This phone number already exists');
            this.setState({
                // phoneError: !response.data.isVendorPhoneExist,
                phoneError: true,
                error: null,
            });
        }).catch(e => {
            console.log(e.response.status);
            if (e.response.status === 502) {
                this.setState({
                    error: 'Unfortunately the server is down, please try again later',
                });
            }
            cBack('Oops! Something went wrong!');
        });
    }, 1050);

    validatePassword(value) {
        if (!isValidPassword(value)) return 'Password must be at least 8 characters long';
        return true;
    }

    validateOtp(value) {
        if (!isNumeric(value)) return 'otp code must have 6 numeric characters';
        if (value.length !== 6) return 'otp code must have 6 numeric characters';
        return true;
    }

    render() {
        return (
            <React.Fragment>
                <div className="home-btn d-none d-sm-block">
                    <Link to="/" className="text-dark">
                        <i className="fas fa-home h2"/>
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
                                                    Staff Only!!
                                                    {/*Moments Registration*/}
                                                </h5>
                                                <p className="text-white-50">
                                                    Contact Us for Registration
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
                                                <AvForm
                                                    className="form-horizontal mt-4"
                                                    onValidSubmit={this.handleSubmit}
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
                                                    {/*<div*/}
                                                    {/*    className={`form-group${!this.state.phoneError ? ' phone-123' : null}`}>*/}
                                                    <div
                                                        className={'form-group'}>
                                                        <AvField
                                                            name="phone"
                                                            label="Phone"
                                                            type="phone"
                                                            // helpMessage="Note: This should be the number of person in charge of this account"
                                                            value={this.state.phone}
                                                            className="form-control"
                                                            required
                                                            validate={{
                                                                validate: this.valPhone,
                                                                async: this.validatePhone,
                                                            }}
                                                            placeholder="Enter Your Phone Number"
                                                        />
                                                    </div>

                                                    {/*Password*/}
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

                                                    {/*Auth Code*/}
                                                    <div
                                                        className={'form-group'}>
                                                        <AvField
                                                            name="authCode"
                                                            label="Auth Code"
                                                            type="text"
                                                            // helpMessage="Note: This should be the number of person in charge of this account"
                                                            value={this.state.authCode}
                                                            className="form-control"
                                                            required
                                                            placeholder="Enter Auth Code"
                                                        />
                                                    </div>

                                                    {/*Register Button*/}
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
                                                                <a
                                                                    href="/terms-of-use/"
                                                                    target="_blank"
                                                                    className="text-primary">
                                                                    Terms
                                                                    of
                                                                    Use
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </Row>
                                                </AvForm>
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
                                        © 2021 {businessName} <span
                                        className="d-none d-sm-inline-block"> - All rights reserved.</span>
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

const mapStateToProps = state => {
    const {user, registrationError, loading} = state.Account;
    return {user, registrationError, loading};
};

export default connect(mapStateToProps, {registerUser, loginUser})(Register);
