import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setNewPass } from "../../../store/Actions";
import { useEffect } from "react";
import queryString from 'query-string'


function Reset(props) {
  const dispatch = useDispatch()

  const [state,setState] = useState({})

  const {token} = queryString.parse(props.location.search)

  const handleChange = e => {
    e.persist()
    setState(st=>({...st,[e.target.name]:e.target.value}))
  }

  const handleNewPass = e => {
    e.preventDefault()
    dispatch(setNewPass({...state,userid:token}))
    props.history.push('/login')
  }


  return (
    <div className="Forgot">
      <div className="container text-center">
        <div className="align-content-center form-size py-3 row">
          <div className="col-md-6 offset-md-3">
            <div className="bg-light l-wrapper p-3 p-md-5 shadow">
              <div className="section-title mb-2">
                <h2 className="text-center">Reset</h2>   
                <p>Please enter a secure Password.</p>             
              </div>
              <form id="loginForm">
                <div className="row"> 
                <div className="col-md-12">
                    <div className="form-group">
                      <input name="newPassword" value={state['newPassword']}
                        type="password" onChange={handleChange}
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                 <div className="col-md-12">
                    <div className="form-group">
                      <input name='confirm_pass' value={state['confirm_pass']}
                        type="password" onChange={handleChange}
                        id="c-password"
                        className="form-control"
                        placeholder="Confirm Password"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
               <div id="success"></div>
                <button type="submit" onClick={handleNewPass} className="text-white page-scroll btn cust-btn-primary mt-3">
                  Save
                </button>                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
