import React, { Component } from 'react'
import dashboard from '../img/dashboard.png'
import Case from '../img/case.png'
import calendar from '../img/calendar.png'
import contact from '../img/contact.png'
import account from '../img/account.png'
import axios from 'axios'
import { apiUrl } from '../../../resources/api'

export class Features extends Component {
  state = {
      features : [ ]
    };

componentDidMount () {
    axios.get(`${apiUrl}/features/showall`)
    .then(res =>{
      this.setState({
        features: res.data.data,
    });
    })
}

  render() { 
    return (
        <div id="features" className="features">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-md-offset-1 section-title">
                <h2 className="text-center">Features</h2>
              </div>
              <div className="col-lg-12 text-center">
                <img className="img-fluid" src="https://legodesk.com/intro_css_js/images/feature-laptop.png" alt="img" />
              </div>
              <div className="work_inner row d-flex justify-content-between mx-2">
                { this.state.features.map( feature => 
                  <div class="col-lg-4 d-flex align-items-stretch" key={feature.id}>
                    <div class="work_item w-100 align-items-center">
                      <img class="img-fluid" src={dashboard} alt="img" />
                      <a><h4>{feature.title}</h4></a>
                      <p>{feature.description}</p>
                    </div>
                  </div>                                              
                )}
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Features
