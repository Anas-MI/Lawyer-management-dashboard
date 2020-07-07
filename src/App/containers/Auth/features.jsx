import React, { Component } from 'react'
import Navigation from '../../components/HomePage/navigation'
import Footer from '../../components/HomePage/footer'
import Contactimg from '../../components/img/Lawyer-Blog.png'
import dashboard from '../../components/img/dashboard.png'
import Case from '../../components/img/case.png'
import calendar from '../../components/img/calendar.png'
import contact from '../../components/img/contact.png'
import account from '../../components/img/account.png'
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
        <>
        <Navigation />
        <div className="container">
            <div className="row mb-5">
                <div className="banner-text col-lg-8 p-5 section-title">
                    <h2 className="text-center">FEATURES</h2>
                    <p className="pt-3 text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo molestias aspernatur libero nulla, qui repellendus commodi id a deserunt magnam.</p>
                </div>
                <div className="banner-img col-lg-4">
                    <img src={Contactimg} width="90%" alt="Banner Img"/>
                </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <img className="img-fluid" src="https://legodesk.com/intro_css_js/images/feature-laptop.png" alt="img" />
              </div>
              <div className="work_inner row d-flex justify-content-between mx-2">
                { this.state.features.map( feature => 
                  <div className="col-lg-4 d-flex align-items-stretch overflow-hidden" key={feature.id}>
                    <div className="work_item w-100 align-items-center">
                      <img className="img-fluid" src={dashboard} alt="img" />
                      <a><h4 className="text-break">{feature.title}</h4></a>
                      <p className="text-break">{feature.description}</p>
                    </div>
                  </div>                                              
                )}
              </div>
          </div>   
        </div>
        <Footer />
        </>
    )
}
}
export default Features