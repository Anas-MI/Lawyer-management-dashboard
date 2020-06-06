import React, { Component, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import "./App.scss"

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";

import Toaster from './components/Toaster'
import HomePage from './containers/HomePage'
import LoginPage from './containers/Auth/Login.jsx'
import ForgotPass from './containers/Auth/ForgotPass';
import Registration from './containers/Auth/registration';
import Reset from './containers/Auth/resetpass';
import Blog from './containers/Auth/blogcard';
import BlogPage from './containers/Auth/blogpage';
import ContactUs from './containers/Auth/contactus';
import Subscription from './containers/Auth/subscription';

import { useSelector } from 'react-redux';

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

const App = () => {

const user = useSelector(state => state.user)



    const menu = routes.map((route, index) => {
        return (route.component) ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                    <route.component {...props} />
                )} />
        ) : (null);
      });


      var Paths = (
          <Switch >
                <Route path='/' exact component={HomePage} />
                <Route path='/login' exact component={LoginPage} />
                <Route path='/forgot' exact component={ForgotPass} />
                <Route path='/reset' exact component={Reset} />
                <Route path='/registration' exact component={Registration} />
                <Route path='/blog' exact component={Blog} />
                <Route path='/blogpage' exact component={BlogPage} />
                <Route path='/contact' exact component={ContactUs} />
                <Route path='/subscription' exact component={Subscription} />
                <Redirect from="*" to='/' />
          </Switch>
      )

      if(user){
          Paths = (
              <Switch>
                    {menu}
                    <Route path="/" component={AdminLayout} />
              </Switch>
          )
      }

      return (
        <Aux>
            <ScrollToTop>
                <Suspense fallback={<Loader/>}>
                    <Switch>
                        {Paths}
                        {/* <Redirect from="*" to={redirect} /> */}
                    </Switch>
                    <Toaster/>
                </Suspense>
            </ScrollToTop>
        </Aux>
    );

}


export default App;
