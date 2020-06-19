import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Navigation extends Component {
 
  render() {
    return (
      <div id="menu" className="bg-white border-bottom navigation-wrap shadow-sm sticky-top">
      <div className="container"> 
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-md navbar-light">
          <Link className="navbar-brand-name page-scroll  mr-3" to="/">Case Management </Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="navbar-nav py-4 py-md-0">
            <li className="nav-item"><Link to="/features" className="nav-link page-scroll">Feature</Link></li>
            <li className="nav-item"><Link to="/subscription" className="nav-link page-scroll">Pricing</Link></li>
            <li className="nav-item"><Link to="/blog" className="nav-link page-scroll">Blog</Link></li>
            <li className="nav-item"><Link to="/contact" className="nav-link page-scroll">Contact us</Link></li>
          </ul>

          <div className="navbar-login ml-auto"> 
          <ul className="navbar-nav py-4 py-md-0">      
            <li className="nav-item mr-3"><Link to="/login" className="nav-link page-scroll">Login</Link></li>
            <li className="nav-item"><Link to="/registration" className="text-white page-scroll cust-btn-primary" style={{borderRadius:'0.25rem'}}>Register</Link></li>
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
