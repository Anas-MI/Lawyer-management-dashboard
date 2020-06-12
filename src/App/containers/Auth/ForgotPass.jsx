import React from "react";
import Footer from '../../components/HomePage/footer'
import Navigation from '../../components/HomePage/navigation'
import { useDispatch } from "react-redux";
import { useState } from "react";
import { resetPass } from "../../../store/Actions";

function Forgot (props) {

  const dispatch = useDispatch()

  const [state,setState] = useState({})

  const handleChange = e => {
    e.persist()
    setState(st=>({...st,[e.target.name]:e.target.value}))
  }

  const handleForgot = e => {
    e.preventDefault()
    dispatch(resetPass(state,props.history))
  }


  return (
    <>
    <Navigation />
    <div className="Forgot">
      <div className="container text-center">
        <div className="align-content-center form-size py-3 row">
          <div className="col-md-6 offset-md-3">
            <div className="bg-light l-wrapper p-3 p-md-5 shadow">
              <div className="section-title mb-2">
                <h2 className="text-center">Forgot</h2>   
                <p>We just need your registered Email Id to send you password reset instructions.</p>             
              </div>
              <form id="loginForm">
                <div className="row"> 
                  <div className="col-md-12">
                  <div className="form-group">
                      <input
                        type="email" name='emailAddress'
                        id="emailAddress" value={state['emailAddress']}
                        className="form-control" onChange={handleChange}
                        placeholder="Email"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
               <div id="success"></div>
                <button onClick={handleForgot} type="submit" className="text-white page-scroll cust-btn-primary mt-3"
                style={{borderRadius:'0.25rem'}}>
                  Reset password
                </button>                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Forgot;
