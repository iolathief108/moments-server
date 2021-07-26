import React, {Component} from 'react';
import {Switch} from 'react-router-dom';
import {connect} from 'react-redux';

// Import Routes
import {authProtectedRoutes, publicRoutes} from './routes';
import AppRoute from './routes/route';

// layouts
import VerticalLayout from './comps/VerticalLayout';
import HorizontalLayout from './comps/HorizontalLayout';
import NonAuthLayout from './comps/NonAuthLayout';
import {initAuthorization, sdk} from '@mara/shared';

// Import scss
import './assets/scss/theme.scss';
import './assets/override.scss';
import {getGlobalState, setGlobalState} from './state';
import {log} from 'echarts/types/src/util/log';


let inited = false;

class App extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            authInitialized: false,
        };
        this.getLayout = this.getLayout.bind(this);

        if (!inited) {
            initAuthorization().then(() => {
                this.setState({
                    authInitialized: true,
                });
            }).catch(e => console.log(e));
            if (!getGlobalState('category')) {
                sdk().getInitialData().then(res => {
                    if (res.data.vendorDetailsExtra && res.data.vendorDetailsExtra.vendor_type)
                        setGlobalState('category', res.data.vendorDetailsExtra.vendor_type);
                    else setGlobalState('category', null);
                }).catch(_e => {
                    setGlobalState('category', null);
                });
            }
            inited = true;
        }

    }

    /**
     * Returns the layout
     */
    getLayout = () => {
        let layoutCls = VerticalLayout;

        //@ts-ignore
        switch (this.props.layout.layoutType) {
            case 'horizontal':
                //@ts-ignore
                layoutCls = HorizontalLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };

    render() {
        const Layout = this.getLayout();

        //@ts-ignore
        if (!this.state.authInitialized) {
            return null;
        }

        return (
            <React.Fragment>
                {/*<Router>*/}
                <Switch>
                    {publicRoutes.map((route, idx) => (
                        <AppRoute
                            path={route.path}
                            layout={NonAuthLayout}
                            component={route.component}
                            key={idx}
                            isAuthProtected={false}
                        />
                    ))}

                    {authProtectedRoutes.map((route, idx) => (
                        <AppRoute
                            path={route.path}
                            layout={Layout}
                            component={route.component}
                            key={idx}
                            isAuthProtected={true}
                        />
                    ))}
                </Switch>
                {/*</Router>*/}
            </React.Fragment>
        );
    }
}

//@ts-ignore
const mapStateToProps = state => {
    return {
        layout: state.Layout,
    };
};

export default connect(mapStateToProps, null)(App);
