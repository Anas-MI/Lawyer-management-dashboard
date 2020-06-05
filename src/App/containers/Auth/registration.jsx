import React from "react";

function Registration() {
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
                      <input
                        type="text"
                        id="firstname"
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
                        id="lastname"
                        className="form-control"
                        placeholder="Last Name"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-12">
                  <div className="form-group">
                  <select name="country" id="country">
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="password"
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
                      <input
                        type="c-password"
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
                <button type="submit" className="text-white page-scroll btn cust-btn-primary mt-3">
                  Registration
                </button>
                <div class="text-block text-center my-3">
                  <span class="text-small font-weight-semibold">Already have an account ?</span>
                  <a href="/login" class="text-custom-primary text-small"> Login</a>
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
