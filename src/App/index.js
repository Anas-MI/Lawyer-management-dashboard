import React, { Component, Suspense, useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import "./App.scss";
import "./App.css";
import 'antd/dist/antd.css';
import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes, { adminroute, lawyerroute } from "../route";

import Toaster from "./components/Toaster";
// import HomePage from "./containers/HomePage";
// import LoginPage from "./containers/Auth/Login.jsx";
// import ForgotPass from "./containers/Auth/ForgotPass";
// import Registration from "./containers/Auth/registration";
// import Reset from "./containers/Auth/resetpass";
// import Blog from "./containers/Auth/blogcard";
// import BlogPage from "./containers/Auth/blogpage";
// import ContactUs from "./containers/Auth/contactus";
// import Subscription from "./containers/Auth/subscription";

import { useSelector, useDispatch } from "react-redux";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

const App = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  });
  const adminmenu = adminroute.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  });
  const lawyermenu = lawyerroute.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  });

  //   var Paths = (
  //       <Switch >
  //             <Route path='/' exact component={HomePage} />
  //             <Route path='/login' exact component={LoginPage} />
  //             <Route path='/forgot' exact component={ForgotPass} />
  //             <Route path='/reset' exact component={Reset} />
  //             <Route path='/registration' exact component={Registration} />
  //             <Route path='/blog' exact component={Blog} />
  //             <Route path='/blogpage' exact component={BlogPage} />
  //             <Route path='/contact' exact component={ContactUs} />
  //             <Route path='/subscription' exact component={Subscription} />
  //             <Route path='/admin/login' exact component={AdminLogin} />
  //             <Route path='/admin/register' exact component={AdminRegister} />
  //             <Redirect from="*" to='/' />
  //       </Switch>
  //   )

  //   if(user){
  //       Paths = (
  //           <Switch>
  //                 {menu}
  //                 {
  //                 user.token.user.admin
  //                 ?(
  //                     <Aux>
  //                         <Route path="/" component={AdminLayout} />
  //                         <Route path='/login' exact component={LoginPage} />
  //                     </Aux>
  //                 )
  //                 :<Route path="/" component={LawyerLayout} />
  //                 }
  //                 <Route path='/logout' exact render={()=>dispatch(logoutUser())} />
  //           </Switch>
  //       )
  //   }


  return (
    <Aux>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          {user ? (
            user.token.user.admin ? (
              <Switch>{adminmenu}
              <Redirect from='*' to='/admin/dashboard' />
              </Switch>
            ) : (
              <Switch>{lawyermenu}
              <Redirect from='*' to='/dashboard/default' />
              </Switch>
            )
          ) : (
            <Switch>{menu}
                <Redirect from='*' to='/' />
            </Switch>
          )}
          <Toaster />
        </Suspense>
      </ScrollToTop>
    </Aux>
  );
};

export default App;
