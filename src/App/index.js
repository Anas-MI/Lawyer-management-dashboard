import React, { Component, Suspense, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import '../../node_modules/font-awesome/scss/font-awesome.scss';
import './App.css';
import "./App.scss"

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";


import HomePage from './containers/HomePage'
import LoginPage from './containers/Auth/Login.jsx'
import ForgotPass from './containers/Auth/ForgotPass';
import Registration from './containers/Auth/registration';
import Reset from './containers/Auth/resetpass';

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

const App = () => {

    const [auth , setAuth] = useState(false)


    useEffect(()=>{
        //Auto Login Check


    },[])


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
                <Route path='/login' exact component={props => <LoginPage {...props} setAuth={setAuth} />} />
                <Route path='/forgot' exact component={ForgotPass} />
                <Route path='/reset' exact component={Reset} />
                <Route path='/registration' exact component={Registration} />
          </Switch>
      )

      if(auth){
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
                </Suspense>
            </ScrollToTop>
        </Aux>
    );

}


export default App;
