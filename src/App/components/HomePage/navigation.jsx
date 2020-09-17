import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from '../../../resources/api'
import "bootstrap/js/src/collapse.js";

export class Navigation extends Component {
  constructor(){
    super()
    this.state = {
      
        list : [],
        list2 : [],
        description: '',
        address: '',
        socialMedia: [
            { item : "Facebook",  url :'' },
            { item : "Twitter",  url :'' },
            { item : "Youtube",  url :'' },
            { item : "Instagram",  url :'' },
            { item : "LinkedIn",  url :'' }
        ],
        imageFile: '',
        header : [],
        logo: "",
        banner : ["You Rely on Lawyer, Lawyers rely on us"],
    
    }
  }

  componentDidMount(){
    api.get(`/footer/showall/`).then((res)=>{
      console.log(res)
      this.setState(res.data.data[res.data.data.length - 1])
      //  this.setState(res.data.data)
      })
  }

  render() {
    return (
      <div
        id="menu"
        className="bg-white border-bottom navigation-wrap shadow-sm sticky-top p-0"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 p-0">
              <nav className="navbar navbar-expand-md navbar-light p-0 pb-2 px-3">
                <Link
                  className="navbar-brand-name page-scroll ml-2"
                  to="/"
                >
                  <img alt = "Case Management" height = "90px" width="100px" src ={this.state.headerLogo}></img>
                </Link>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="bs-example-navbar-collapse-1"
                >
                  <ul className="navbar-nav pt-1 px-md-3" id=" topNav">
                  { 
                  
                  this.state.header.map((val, index)=>{
                    return <li className="nav-item">
                            <Link to={val.url} className="nav-link page-scroll">
                              {val.item}
                            </Link>
                          </li>
                  })
                }{
                  /*
                   <li className="nav-item">
                      <Link to="/features" className="nav-link page-scroll">
                        Feature
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/subscription" className="nav-link page-scroll">
                        Pricing
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/blog" className="nav-link page-scroll">
                        Blog
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contact" className="nav-link page-scroll">
                        Contact us
                      </Link>
                    </li>

                  */
                }
                </ul>

                  <div className="navbar-login ml-auto" id="bottomNav">
                    <ul className="navbar-nav px-md-3">
                      <li className="nav-item mr-3">
                        <Link to="/login" className="nav-link page-scroll">
                          Login
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/registration"
                          className="text-white page-scroll cust-btn-primary"
                          style={{ borderRadius: "0.25rem" }}
                        >
                          Register
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
