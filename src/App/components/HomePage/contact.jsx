import React, { Component } from "react";
import Footer from './footer'

export class Contact extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <div id="contact">
          <div className="container text-center">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-8 offset-md-2">               
                <div className="section-title">
                  <h2>Get In Touch</h2>
                  <p>
                    Please fill out the form below to send us an email and we
                    will get back to you as soon as possible.
                  </p>
                </div>
                <form name="sentMessage" id="contactForm" noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Name"
                          required="required"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="number"
                          className="form-control"
                          placeholder="Number"
                          required="required"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="Description"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Description"
                      required
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
                </div>
                </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
             </div>
        </div>
      </div>
      <Footer />
      </div>
    );
  }
}

export default Contact;
