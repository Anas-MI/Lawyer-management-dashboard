import React, { Component } from "react";
import { apiUrl } from "../../../resources/api";


export class Contact extends Component {
  
  state ={
    name: '',
    number: '',
  	email: '',
  	description: '',
  }
  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onNumberChange = (event) => {
    this.setState({number: event.target.value})
  }

  onEmailChange = (event) =>{
    this.setState({email: event.target.value})
  }

  onDescriptionChange = (event)  => {
    this.setState({description: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST", 
      url:`${apiUrl}/contactus/create`, 
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
      }else if(response.data.status === 'fail'){
        alert("Message failed to send.")
      }
    })
    this.setState({
      name: '',
      number: '',
  	  email: '',
  	  description: '',
    })
  }
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
                <form name="sentMessage" id="contactForm" noValidate onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Name"
                          required="required"
                          onChange={this.onNameChange}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          id="number"
                          className="form-control"
                          placeholder="Number"
                          required="required"
                          onChange={this.onNumberChange}
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
                          onChange={this.onEmailChange}
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
                      required ="required"
                      onChange={this.onDescriptionChange}
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
      </div>
    );
  }
}

export default Contact;
