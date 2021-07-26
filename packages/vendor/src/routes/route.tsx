import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {isAuthorized} from '@mara/shared';
import {useGlobalState} from '../state';
import {paths} from './index';


const AppRoute = ({
                      component: Component,
                      layout: Layout,
                      isAuthProtected,
                      ...rest
                  }) => {
    const [cat] = useGlobalState('category');

    return (
        <Route
            {...rest}
            render={props => {

                if (cat === undefined) return null;
                if (isAuthProtected && !isAuthorized()) {
                    return (
                        <Redirect
                            to={{
                                pathname: paths.login(),
                                state: {from: props.location},
                            }}
                        />
                    );
                } else if (isAuthProtected && isAuthorized() && !cat && !rest.path.includes('init')) {
                    return (
                        <Redirect to={{
                            pathname: paths.init(),
                            state: {from: props.location},
                        }}/>
                    );
                }

                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                );
            }}
        />
    );
};

export default AppRoute;
