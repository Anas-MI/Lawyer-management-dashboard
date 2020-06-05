import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../../store/Actions";

function Registration(props) {

  const dispatch = useDispatch()

  const [state , setState] = useState({})

  const handleChange = e => {
    e.persist()
    setState(st => ({...st,[e.target.name]:e.target.value}))

  }

  const handleRegister = e => {
    e.preventDefault()
    if(state.password !== state.confirmPass !== '')return alert('Pass Dont Match')
    dispatch(register(state))
    props.history.push('/login')
  }

  return (
    <div className="Login">
      <div className="container text-center">
        <div className="align-content-center form-size py-3 row">
          <div className="col-md-6 offset-md-3">
            <div className="bg-light l-wrapper p-3 p-md-5 shadow">
              <div className="section-title mb-2">
                <h2 className="text-center">Registration</h2>                
              </div>
              <form id="registrationForm">
                <div className="row">
                  <div className="col-md-6">
                  <div className="form-group">
                      <input name='firstname'
                        type="text" onChange={handleChange}
                        id="firstname" value={state['firstname']}
                        className="form-control"
                        placeholder="First Name"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                      <input
                        type="text"
                        id="lastname" name='lastname' onChange={handleChange}
                        className="form-control" value={state['lastname']}
                        placeholder="Last Name"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-12">
                  <div className="form-group">
                  <select name="country" id="country"  onChange={handleChange}>
                    <option value="a">Country1</option>
                    <option value="b">Country2</option>
                    <option value="c">Country3</option>
                    <option value="d">Country4</option>
                  </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-12">
                  <div className="form-group">
                  <select name="lawfirm" id="lawfirm" onChange={handleChange}
                  value={state['lawfirm']} >
                    <option value="a">Law Firm 1</option>
                    <option value="b">Law Firm 2</option>
                    <option value="c">Law Firm 3</option>
                    <option value="d">Law Firm 4</option>
                  </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-12">
                  <div className="form-group">
                  <input
                        type="number"
                        id="phone" name="phone" onChange={handleChange}
                        className="form-control" value={state['phone']}
                        placeholder="Mobile No."
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>


                  <div className="col-md-12">
                  <div className="form-group">
                      <input
                        type="email"
                        id="email" name="username" onChange={handleChange}
                        className="form-control" value={state['username']}
                        placeholder="Email"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input name="password" onChange={handleChange}
                        type="password" value={state['password']}
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
                      <input name='confirmPass'
                        type="c-password" value={state['confirmPass']}
                        id="c-password" onChange={handleChange}
                        className="form-control"
                        placeholder="Confirm Password"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                 </div>
               <div id="success"></div>
                <button type="submit" onClick={handleRegister} className="text-white page-scroll btn cust-btn-primary mt-3">
                  Registration 
                </button>
                <div class="text-block text-center my-3">
                  <span class="text-small font-weight-semibold">Already have an account ?</span>
                  <Link to="/login" class="text-custom-primary text-small"> Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
