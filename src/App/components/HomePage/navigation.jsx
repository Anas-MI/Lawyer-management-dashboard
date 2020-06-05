import React, { Component } from 'react'

export class Navigation extends Component {
 

  render() {
    return (
        <div id="menu" className="bg-white border-bottom navigation-wrap shadow-sm sticky-top">
        <div className="container"> 
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-md navbar-light">
            <a className="navbar-brand page-scroll" href="/">Logo</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="navbar-nav py-4 py-md-0">
              <li className="nav-item"><a href="/" className="nav-link page-scroll">Home</a></li>
              <li className="nav-item"><a href="/" className="nav-link page-scroll">Feature</a></li>
              <li className="nav-item"><a href="/subscription" className="nav-link page-scroll">Pricing</a></li>
              <li className="nav-item"><a href="/blog" className="nav-link page-scroll">Blog</a></li>
              <li className="nav-item"><a href="/" className="nav-link page-scroll">Contact us</a></li>
            </ul>

            <div className="navbar-login ml-auto"> 
            <ul className="navbar-nav py-4 py-md-0">      
              <li className="nav-item"><a href="/login" className="nav-link page-scroll">Login</a></li>
              <li className="nav-item"><a href="/registration" className="text-white page-scroll btn cust-btn-primary">Register</a></li>
            </ul>
          </div>
          </div>
            </nav>
          </div>
        </div>
          
        </div>
      </div>
    )
  }
}

export default Navigation
