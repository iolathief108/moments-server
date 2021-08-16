import {Redirect} from 'react-router-dom';

// Authentication related pages
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';
import Register from '../pages/Authentication/Register';
import ForgetPwd from '../pages/Authentication/FogetPassword';

import Dashboard from '../pages/Dashboard';
import Initialize from '../pages/Initialize';


import Profile from '../pages/Profile/index';
import Contacts from '../pages/Editing/Contacts';
import Gallery from '../pages/Editing/Gallery';
import Yan from '../pages/Editing/Yan';

export const paths = {
    login: () => '/login',
    logout: () => '/logout',
    forgetPassword: () => '/forget-password',
    register: () => '/register',
    dashboard: () => '/profile',
    profile: () => '/profile',
    gallery: () => '/gallery',
    yan: () => '/listing',
    init: () => '/init',
    root: () => '/',
    editContact: () => '/edit-contact'
};

const authProtectedRoutes = [
    // {path: paths.dashboard(), component: Dashboard},
    {path: paths.profile(), component: Profile},
    {path: paths.init(), component: Initialize},

    {path: paths.editContact(), component: Contacts},
    {path: paths.gallery(), component: Gallery},
    {path: paths.yan(), component: Yan},
    // {path: paths.location(), component: Location},

    {path: paths.root(), exact: true, component: () => <Redirect to={paths.dashboard()} />},
];

const publicRoutes = [
    {path: paths.logout(), component: Logout},
    {path: paths.login(), component: Login},
    {path: paths.forgetPassword(), component: ForgetPwd},
    {path: paths.register(), component: Register},
];

export {authProtectedRoutes, publicRoutes};
