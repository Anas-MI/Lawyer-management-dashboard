import React from "react";

function Forgot() {
  return (
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
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
               <div id="success"></div>
                <button type="submit" className="text-white page-scroll btn cust-btn-primary mt-3">
                  Reset password
                </button>                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
