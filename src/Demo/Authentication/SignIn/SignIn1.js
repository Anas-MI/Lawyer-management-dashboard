import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/Actions";
import { notification, Spin } from "antd";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const AdminLogin = (props) => {
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);

  const [state, setState] = useState({});
  const [errors, setErrors] = useState({
    emailAddress: "",
    password: "",
  });

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setState((st) => ({ ...st, [name]: value }));
    var err = errors;
    switch (name) {
      case "emailAddress":
        err.emailAddress = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      case "password":
        err.password =
          value.length < 6 ? "Password must be at least 6 characters" : "";
        break;
      default:
        break;
    }
    setErrors({ ...err });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setSpinner(true);
    const validateForm = (error) => {
      let valid = true;
      Object.values(error).forEach((val) => val.length > 0 && (valid = false));
      return valid;
    };
    if (validateForm(errors)) {
      checkValidity();
    } else {
      setSpinner(false);
      return notification.warning({
        message: "Failed to Register.",
      });
    }
  };

  const checkValidity = () => {
    if (state["emailAddress"] === "" || state["password"] === "") {
      return notification.warning({
        message: "Fields Should Not Be Empty",
      });
    } else {
      dispatch(
        loginUser({ ...state, type: "admin" }, (err, response) => {
          if (err) {
            notification.error(err);
          } else {
            notification.success(response);
          }
          setSpinner(false);
        })
      );
    }
  };

  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <div className="input-group mb-3">
                <input
                  name="emailAddress"
                  value={state["emailAddress"]}
                  onChange={handleChange}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <p className="help-block text-danger">{errors.emailAddress}</p>

              <div className="input-group mb-4">
                <input
                  name="password"
                  value={state["password"]}
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  placeholder="password"
                />
              </div>
              {spinner && <Spin />}

              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-1"
                    id="checkbox-fill-a1"
                  />
                  <p className="help-block text-danger">{errors.password}</p>

                  <label htmlFor="checkbox-fill-a1" className="cr">
                    {" "}
                    Save credentials
                  </label>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="btn btn-primary shadow-2 mb-4"
              >
                Login
              </button>
              <p className="mb-2 text-muted">
                Forgot password? <NavLink to="/forgot">Reset</NavLink>
              </p>
              <p className="mb-0 text-muted">
                Don’t have an account?{" "}
                <NavLink to="/admin/register">Signup</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default AdminLogin;
