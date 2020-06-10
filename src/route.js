import React from 'react';
import Logout from './App/components/Logout';

const HomePage = React.lazy(()=>import('./App/containers/HomePage'))
const LoginPage = React.lazy(()=>import('./App/containers/Auth/Login'))
const Registration = React.lazy(()=>import('./App/containers/Auth/registration'))
const ForgotPass = React.lazy(()=>import('./App/containers/Auth/ForgotPass'))
const ResetPass = React.lazy(()=>import('./App/containers/Auth/resetpass'))
const BlogCard = React.lazy(()=>import('./App/containers/Auth/blogcard'))
const BlogPage = React.lazy(()=>import('./App/containers/Auth/blogpage'))
const Contact = React.lazy(()=>import('./App/containers/Auth/contactus'))
const Subscription = React.lazy(()=>import('./App/containers/Auth/subscription'))
const AdminRegister = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const AdminLogin = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const route = [
    { path: '/', exact: true, name: 'HomePage', component: HomePage },
    { path: '/login', exact: true, name: 'Login', component: LoginPage },
    { path: '/registration', exact: true, name: 'Registration', component: Registration },
    { path: '/forgot', exact: true, name: 'Forgot', component: ForgotPass },
    { path: '/reset', exact: true, name: 'Reset', component: ResetPass },
    { path: '/blog', exact: true, name: 'Signin 1', component: BlogCard },
    { path: '/blogpage', exact: true, name: 'Signin 1', component: BlogPage },
    { path: '/contact', exact: true, name: 'Signin 1', component: Contact },
    { path: '/subscription', exact: true, name: 'Signin 1', component: Subscription },
    { path: '/admin/login', exact: true, name: 'Signin 1', component: AdminLogin },
    { path: '/admin/register', exact: true, name: 'Signin 1', component: AdminRegister },
];



const AdminLayout = React.lazy(() => import('./App/layout/AdminLayout'));
const LawyerLayout = React.lazy(() => import('./App/layout/LawyerLayout'));

export const adminroute = [
    {path:'/' , exact:false, name:'AdminLayout',component:AdminLayout},
]

export const lawyerroute = [
    {path:'/' , exact:false, name:'LawyerLayout',component:LawyerLayout},

]



export default route;