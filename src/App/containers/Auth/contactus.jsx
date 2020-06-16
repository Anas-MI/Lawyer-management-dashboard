import React, {Component} from 'react'
import Footer from '../../components/HomePage/footer'
import Navigation from '../../components/HomePage/navigation'
import Contactimg from '../../components/img/contact-us.png'
import axios from 'axios'
import { apiUrl } from "../../../resources/api";
import { Modal } from 'react-bootstrap';

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class contactus extends Component {
    
  state ={
    name: '',
    number: '',
  	email: '',
    description: '',
    show : false,
    errors: {
      name: '',
      email: '',
      number: '',
      description: '',
    }
  }


  handleChange=(event) =>{
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'name': 
        errors.name = 
           value.length > 20
            ? "Name must be less than 20 characters long!"
            : "";
        break;
      case 'number': 
        errors.number = 
            value.length < 10 || value.length > 13
            ? "phone number must be between 10 and 13 digits"
            : "";
        break;
      case 'description': 
        errors.description = 
          value.length < 10
            ? 'The Description too short!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
    })
    this.setState({ [name] : value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const validateForm = (errors) => {
      let valid = true;
      Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
      );
      return valid;
    }
    if(validateForm(this.state.errors)) {
      this.setState({show:true});
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
    }else{
      alert("Message failed to send.")
    }
  }

    render() {
    return(
        <>
         <Navigation />
         <div className="banner">
            <div className="container">
                <div className="row">
                    <div className="banner-text col-lg-8 p-5">
                        <h2>Get in touch with us</h2>
                        <p className="pt-3 text">Got questions? We're here to help you out if you're experiencing any issue or if you're just curious about things.</p>
                    </div>
                    <div className="banner-img col-lg-4">
                        <img src={Contactimg} width="90%" alt="Banner Img"/>
                    </div>
                    <div className="container text-center mb-5">
                        <div className="col-md-12">
                            <div className="row justify-content-md-center">
                                <div className="col-md-8">                       
                                  <form name="sentMessage" id="contactForm" noValidate onSubmit={this.handleSubmit}>
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="Name"
                                            required="required"
                                            onChange={this.handleChange}
                                          />
                                          <p className="help-block text-danger">{this.state.errors.name}</p>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <input
                                            type="number"
                                            id="number"
                                            name="number"
                                            className="form-control"
                                            placeholder="Number"
                                            required="required"
                                            onChange={this.handleChange}
                                          />
                                          <p className="help-block text-danger">{this.state.errors.number}</p>
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            required="required"
                                            onChange={this.handleChange}
                                          />
                                          <p className="help-block text-danger">{this.state.errors.email}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea
                                        name="Description"
                                        id="message"
                                        name="description"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Description"
                                        required ="required"
                                        onChange={this.handleChange}
                                      ></textarea>
                                      <p className="help-block text-danger">{this.state.errors.description}</p>
                                    </div>
                                    <div id="success"></div>
                                    <button type="submit" className="btn btn-custom btn-lg">
                                      Send Message
                                    </button>
                                  </form>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>    
        </div>
        
         <Footer />
     </>
 )
    }
}
export default contactus