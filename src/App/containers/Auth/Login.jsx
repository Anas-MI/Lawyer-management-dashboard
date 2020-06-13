import React , {useState, useEffect} from "react";
import { loginUser, setLoginSuccess } from "../../../store/Actions";
import { useDispatch, useSelector } from "react-redux";
import Navigation from '../../components/HomePage/navigation'
import Footer from '../../components/HomePage/footer'
import {useParams} from 'react-router'
import { Link } from "react-router-dom";
import { notification } from "antd";

const  Login = (props) => {

  const dispatch = useDispatch()

  const params = useParams()

  const [emailAddress ,setEmail] = useState('')
  const [password ,setPassword] = useState('')


  useEffect(()=>{
    if(params.lawyer){
      dispatch(setLoginSuccess({token:{user:JSON.parse(atob(params.lawyer))}}))
    }
  },[])


  const handleLogin = e => {
    e.preventDefault()
    checkValidity()
  }

  const checkValidity = () => {

    if(emailAddress==='' || password===''){
      return notification.warning({
        message:'Fields Should Not Be Empty'
      })
    }else {
      dispatch(loginUser({emailAddress,password} , (err,response)=>{
        if(err){
          notification.error(err);
        }else{
          notification.success(response);
        }
      }))
    }

  }


  return (
    <>
    <Navigation />
    <div className="Login">
      <div className="container text-center">
        <div className="align-content-center form-size py-3 row">
          <div className="col-md-6 offset-md-3">
            <div className="bg-light l-wrapper p-3 p-md-5 shadow">
              <div className="section-title mb-2">
                <h2 className="text-center">Login</h2>                
              </div>
              <form id="forgotForm">
                <div className="row">
                  <div className="col-md-12">
                  <div className="form-group">
                      <input onChange={e=>setEmail(e.target.value)}
                        type="email" value={emailAddress}
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
                      <input onChange={e=>setPassword(e.target.value)}
                        type="password" value={password}
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required="required"
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                 </div>
               <div id="success"></div>
                <button type="submit" onClick={handleLogin} style={{borderRadius:'0.25rem'}}
                className="text-white page-scroll cust-btn-primary mt-3">
                  Login
                </button>
                <div class="text-block text-center my-3">
                    <Link to='/forgot' class="text-small forgot-password text-primary">Forgot Password</Link>
                  </div>
                  <div class="text-block text-center my-3">
                  <span class="text-small font-weight-semibold">New user?</span>
                  <Link to="/registration" className="text-custom-primary text-small"> Register</Link>
                </div>
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

export default Login;
