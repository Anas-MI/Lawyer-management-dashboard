import React from "react";
import Footer from '../../components/HomePage/footer'
import Navigation from '../../components/HomePage/navigation'
import { useDispatch } from "react-redux";
import { useState } from "react";
import { resetPass } from "../../../store/Actions";
import { notification } from "antd";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

function Forgot (props) {

  const dispatch = useDispatch()

  const [state,setState] = useState({})
  const [error, setError] = useState({emailAddress: ""});

  const handleChange = e => {
    e.persist()
    const { name, value } = e.target;
    let errors = error;
    switch (name) {
      case "emailAddress":
        errors.emailAddress = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      default:
        break;
    }
    setError({ ...errors });
    setState(st=>({...st,[e.target.name]:e.target.value}))
  }

  const handleForgot = e => {
    e.preventDefault()
    const validateForm = (error) => {
      let valid = true;
      Object.values(error).forEach((val) => val.length > 0 && (valid = false));
      return valid;
    };
    if (validateForm(error)) {
      checkValidity();
    } else {
      return notification.warning({
        message: "Failed to Send Reset password.",
      });
    }
  };


  function checkValidity(){

    if(!Object.keys(state).every(k=>state[k]!=='')){
      return notification.warning({
        message:'Fields Should Not Be Empty'
      })
    }
  else{
    return dispatch(resetPass(state,(err,response)=>{
      if(err){
        notification.error(err);
      }else{
        notification.success(response);
        setState({emailAddress:''})
      }
    }))
  }

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
                        name={"emailAddress"}
                      />
                      <p className="help-block text-danger">{error.emailAddress}</p>
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
