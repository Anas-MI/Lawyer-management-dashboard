import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../store/Actions';

const AdminLogin = props => {

    const dispatch = useDispatch()

    const [state , setState] = useState({})

    const handleChange = e => {
      e.persist()
      setState(st => ({...st,[e.target.name]:e.target.value}))

    }
  
    const handleLogin = e => {
      e.preventDefault()
      dispatch(loginUser(state))
      props.history.push('/admin/dashboard')
    }
  
  

        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                <input name='emailAddress' value={state['emailAddress']}
                                onChange={handleChange}
                                type="email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="input-group mb-4">
                                <input name='password' value={state['password']}
                                onChange={handleChange}
                                    type="password" className="form-control" placeholder="password"/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>
                                <button onClick={handleLogin} className="btn btn-primary shadow-2 mb-4">Login</button>
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
}

export default AdminLogin;