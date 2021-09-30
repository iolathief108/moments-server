import React, {Component} from 'react';
import {Row, Col, Card, CardBody, Alert} from 'reactstrap';
import {isNumeric} from '@mara/shared';
import {withRouter, Link} from 'react-router-dom';
// noinspection ES6CheckImport
import {AvForm, AvField} from 'availity-reactstrap-validation';
import Loader from '../../comps/Loader';
import logoSm from '../../assets/images/logo-sm.png';
import {
    sdk,
    initAuthorization,
    businessName,
    parseSLPhone,
    validateStandardSLPhone,
} from '@mara/shared';

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otpState: false,
            phone: null,
            tryCount: 0,
            resendOtpCountdown: 0,
        };

        // handleValidSubmit
        // this.handleContinue = this.handleContinue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        initAuthorization().then((res) => {
            if (res) {
                this.props.history.push('/dash');
            }
        }).catch(() => {
            console.log('something went wrong');
        });
    }

    async sendOTP(phone) {
        try {
            const res = await sdk('/api/').vendorLoginOtp({
                phone,
            });
            const count = 59;
            if (res?.data?.vendorLoginOtp) {
                this.setState({
                    otpState: true,
                    phone,
                    error: false,
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

            } else {
                this.setState({
                    error: 'Something went wrong. Please check the phone number entered.',
                });
            }
        } catch (e) {
            this.setState({
                error: e?.response?.errors[0].message || 'Something went wrong. Please check the phone number entered.',
            });
            console.error(e);
        }
    }

    async handleSubmit(event, values) {

        const phone = parseSLPhone(values.phone);
        const password = values.password;
        if (!phone) {
            this.setState({
                error: 'Not a valid phone number!',
            });
            return;
        }

        try {
            const res = await sdk().vendorLogin({
                phone: phone,
                password: password,
            });
            if (!res.data.vendorLogin) {
                this.setState({
                    error: 'No account is registered with this number',
                });
            }

            initAuthorization().then((res) => {
                if (res) {
                    window.location.href = '/dash/';
                }
            }).catch(e => {
                this.setState({
                    error: 'Oops! Something went wrong!',
                });
                console.log(e);
            });

        } catch (e) {
            this.setState({
                error: e?.response?.errors[0].message || 'OTP failed! Please check the OTP number entered.',
            });
            console.error(e);
        }
    }

    validateOtp(value) {
        if (!isNumeric(value)) return 'otp code must have 6 numeric characters';
        if (value.length !== 6) return 'otp code must have 6 numeric characters';
        return true;
    }

    isPhoneValidate(value) {
        let parsedPhone = parseSLPhone(value);
        if (!parsedPhone) {
            return 'Not a valid phone number';
        }
        if (!validateStandardSLPhone(parsedPhone || '')) {
            return 'Not a valid phone number';
        }
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
                                    {this.props.loading ? <Loader/> : null}

                                    <Card className="overflow-hidden">
                                        <div className="bg-primary">
                                            <div
                                                className="text-primary text-center p-4">
                                                <h5 className="text-white font-size-20">
                                                    Welcome Back !
                                                </h5>
                                                <p className="text-white-50">
                                                    Sign in to continue
                                                    to {businessName}.
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
                                                            {this.state.error ? (
                                                                <Alert
                                                                    color="danger">{this.state.error}</Alert>
                                                            ) : null}

                                                            <div
                                                                className="form-group">
                                                                <AvField
                                                                    name="phone"
                                                                    label="Phone"
                                                                    className="form-control"
                                                                    placeholder="Enter your mobile number"
                                                                    type="phone"
                                                                    validate={{validate: this.isPhoneValidate}}
                                                                    required
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
                                                                />
                                                            </div>

                                                            <div
                                                                className="form-group">
                                                                <p><b>Note:</b> Please contact us to obtain your password</p>
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
                                                                        Log In
                                                                    </button>
                                                                </Col>
                                                            </Row>

                                                        </AvForm>

                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                                <div className="mt-5 text-center">
                                    <p>
                                        Don't have an account ?{' '}
                                        <Link
                                            to="/register"
                                            className="font-weight-medium text-primary"
                                        >
                                            {' '}
                                            Signup now{' '}
                                        </Link>{' '}
                                    </p>
                                    <p className="mb-0">
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


export default withRouter(Login);
