import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setNewPass } from "../../../store/Actions";
import { useEffect } from "react";
import queryString from 'query-string'
import { notification } from "antd";


function Reset(props) {
  const dispatch = useDispatch()
  const [Display, setDisplay] = useState(false);
  const [state,setState] = useState({})
  const [error, setError] = useState({password: "",});

  const {token} = queryString.parse(props.location.search)

  const handleChange = e => {
    e.persist()
    setDisplay(false)
    const { name, value } = e.target;
    let errors = error;
    switch (name) {
      case "newPassword":
        errors.password =
          value.length < 6 ? "Password must be at least 6 characters" : "";
        break;
      default:
        break;
    }
    setError({ ...errors });
    setState(st=>({...st,[e.target.name]:e.target.value}))
  }


  const handleNewPass = e => {
    e.preventDefault()
    if(!Display){
      const validateForm = (error) => {
        let valid = true;
        Object.values(error).forEach((val) => val.length > 0 && (valid = false));
        return valid;
      };
      if (validateForm(error)) {
        checkValidity();
      } else {
        setDisplay(true)
        return notification.warning({
          message: "Failed to Reset Password.",
        });
      }
    }
  }

  const checkValidity = () => {
    if(!Object.keys(state).every(k=>state[k]!=='')){
      setDisplay(true)
      return notification.warning({
        message:'Fields Should Not Be Empty'
      })
    }
    else if(state['newPassword'] !== state['confirm_pass']){
      setDisplay(true)
      return notification.warning({
        message:'Passwords Don\'t Match' 
      })
    }
  else{
    return dispatch(setNewPass({...state,userid:token},(err,response)=>{
      if(err){
        setDisplay(true)
        notification.error(err);
      }else{
        props.history.push('/login')
        notification.success(response);
      }
    }))
  }

  }

  return (
    <div className="Forgot">
      <div className="container text-center">
        <div className="align-content-center py-5 row">
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
                      <p className="help-block text-danger">{error.password}</p>
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
