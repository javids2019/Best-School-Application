import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const Login = React.lazy(() => import('./MyApp/auth/login'));
const Register = React.lazy(() => import('./MyApp/auth/register'));

const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 },
    { path: '/auth/login', exact: true, name: 'Signup 1', component: Login },
    { path: '/auth/register', exact: true, name: 'Signin 1', component: Register },
];

export default route;