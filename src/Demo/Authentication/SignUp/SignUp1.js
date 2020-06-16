import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";
import { register } from "../../../store/Actions";
import { useDispatch } from "react-redux";
import { notification } from "antd";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const AdminRegister = (props) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    username: "",
    emailAddress: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    emailAddress: "",
    password: "",
  });

  const handleChange = (e) => {
    e.persist();
    var err = errors;
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
    switch (e.target.name) {
      case "emailAddress":
        err.emailAddress = validEmailRegex.test(e.target.value)
          ? ""
          : "Email is not valid!";
        break;
      case "username":
        err.username =
          e.target.value.length < 6 && e.target.value.length < 20
            ? "Username must be between  6 and 20 characters"
            : "";
      case "password":
        errors.password =
          e.target.value.length < 6
            ? "Password must be at least 6 characters"
            : "";
        break;
      default:
        break;
    }
    setErrors({ ...err });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const validateForm = (error) => {
      let valid = true;
      Object.values(error).forEach((val) => val.length > 0 && (valid = false));
      return valid;
    };
    if (validateForm(errors)) {
      checkValidity();
    } else {
      return notification.warning({
        message: "Failed to Register.",
      });
    }
  };

  function checkValidity() {
    if (!Object.keys(state).every((k) => state[k] != "")) {
      return notification.warning({
        message: "Fields Should Not Be Empty",
      });
    } else {
      return dispatch(
        register({ ...state, admin: true }, (err, response) => {
          if (err) {
            console.log(err);
            notification.error(err);
          } else {
            notification.success(response);
            props.history.push("/admin");
          }
        })
      );
    }
  }

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
                <i className="feather icon-user-plus auth-icon" />
              </div>
              <h3 className="mb-4">Sign up</h3>
              <div className="input-group mb-3">
                <input
                  name="username"
                  value={state["username"]}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <p className="help-block text-danger">{errors.username}</p>

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
              <p className="help-block text-danger">{errors.password}</p>

              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-2"
                    id="checkbox-fill-2"
                  />
                  <label htmlFor="checkbox-fill-2" className="cr">
                    Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a>{" "}
                    weekly.
                  </label>
                </div>
              </div>
              <button
                onClick={handleRegister}
                className="btn btn-primary shadow-2 mb-4"
              >
                Sign up
              </button>
              <p className="mb-0 text-muted">
                Allready have an account? <NavLink to="/admin">Login</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default AdminRegister;
