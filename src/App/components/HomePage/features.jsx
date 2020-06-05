import React, { Component } from 'react'
import dashboard from '../img/dashboard.png'
import Case from '../img/case.png'
import calendar from '../img/calendar.png'
import contact from '../img/contact.png'
import account from '../img/account.png'


export class features extends Component {
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
                <div class="col-lg-4 d-flex align-items-stretch">
                  <div class="work_item w-100 align-items-center">
                    <img class="img-fluid" src={dashboard} alt="img" />
                      <a><h4>DASHBOARD</h4></a>
                      <p>Get a 360-degree view of your firm or practice. Stay on top of important matters.</p>
                  </div>
                </div>
                <div class="col-lg-4 d-flex align-items-stretch">
                  <div class="work_item w-100 align-items-center">
                    <img class="img-fluid" src={Case} alt="img" />
                      <a><h4>CASES</h4></a>
                      <p>Track your cases, get notified on hearing dates, save relevant documents.</p>
                  </div>
                </div>
                <div class="col-lg-4 d-flex align-items-stretch">
                  <div class="work_item w-100 align-items-center">
                    <img class="img-fluid" src={calendar} alt="img" />
                      <a><h4>CALENDAR</h4></a>
                      <p>Stay on top of your matters with proper to-do lists, weekly or daily alerts so that you and your firm is always ready for the cases well in advance.</p>
                  </div>
                </div>
                <div class="col-lg-4 ml-auto d-flex align-items-stretch">
                    <div class="work_item w-100 align-items-center justify-content-between">
                    <img class="img-fluid" src={contact} alt="img" />
                      <a><h4>CONTACTS</h4></a>
                      <p>Add and store contact details of your clients. Provide them access to the client portal and manage their multiple cases under one account.</p>
                  </div>
                </div>
                <div class="col-lg-4 mr-auto d-flex align-items-stretch">
                    <div class="work_item w-100 align-items-center justify-content-between">
                    <img class="img-fluid" src={account} alt="img" />
                      <a><h4>ACCOUNT & FINANCE</h4></a>
                      <p>Create and send automated recurring invoices. Track your receivables and expenses in your firm operations.</p>
                  </div>
                </div>
              </div>

              {/* <div className="col-md-6">
                <div class="f-image-wrapper">
                  <img
                    title="dashboard-mobile-app-home"
                    alt="Clio Mobile App dashboard"
                    src="img/about.jpg"
                    width="550"
                    height="439"
                    className="img-fluid"
                      />
                </div>
              </div> */}
              {/* <div className="col-md-5 offset-1">
                <div class="f-content-wrapper">
                  <ul class="grid-center-noBottom">
                    <li class="col-12_sm-5_md-12">
                    <h4 className="mb-4">Manage cases, organize contacts, and automate documents</h4>
                    <p>Streamline day-to-day processes, and keep cases organized so you can focus on billable work and grow your revenue. </p> </li>
                    <li class="col-12_sm-5_md-12">
                    <h4 className="mb-4">Generate bills, run reports, and get paid faster</h4>
                    <p>Keep track of financials and client accounts with easy-to-use reports and dashboards. Make billing easy with online payments, automated billing, and customized plans. </p> </li>
                    <li class="col-12_sm-5_md-12">
                    <h4 className="mb-4">Attract potential clients, track their progress, and secure their business</h4>
                    <p>Create easy-to-use client intake forms, automate client communication—such as emails, reminders, and requests—and organize referrals to seize every opportunity. </p> </li>
                    
                  </ul>
                </div>
              </div> */}
              {/* <div className="col-md-12 col-md-offset-1 text-center">
                  <a href="/" class="mt-5 text-custom-primary cta-btn-blank"><span>See All Features</span></a>
              </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default features
