import React, {Component} from 'react'
import Footer from '../../components/HomePage/footer'
import Navigation from '../../components/HomePage/navigation'
import Contactimg from '../../components/img/contact-us.png'
import axios from 'axios'
import { apiUrl } from "../../../resources/api";
import { Modal } from 'react-bootstrap';

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validNameRegex = RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

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
      case "name":
          errors.name =
              (value.length == 0) 
              ? "" 
              : (!validNameRegex.test(value))
              ? "Name must be in characters!"
              : (value.length > 20) 
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
    const isFormValid = () => {
      const {name, number, email, description} = this.state;
      
      if (name && number && email && description){
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
        return this.setState({show:true});
      }
    }
    if(validateForm(this.state.errors)) {
      isFormValid()
    }else{
      alert("Message failed to send.")
    }
  }

    render() {
      const handleRoute = (route) =>{
        console.log(route)
        this.props.history.push(route)
      }
    return(
        <>
         <Navigation />
         <div className="banner">
            <div className="container">
                <div className="row">
                    <div className="banner-text col-lg-8 p-5">
                    <h4>About Us</h4>
                        <h2>Why Us?</h2>
                        <p className="pt-3 text">We’re more than just a tech company. We’ve got goals, hopes, and dreams, just like you. We want to serve a better solution to a centuries old profession and do some good in the world while we’re at it—permanently.We know our technology changes lives. If that’s something that speaks to you—you belong here, too.</p>
                    </div>
                    <div className="banner-img col-lg-4">
                        <img src={Contactimg} width="90%" alt="Banner Img"/>
                    </div>
              
               
                </div>
            </div>
            <Modal
        show={this.state.show}
        onHide={() => this.setState({show : false})}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <p className="text-success">Message Sent.</p>         
          </Modal.Title>
        </Modal.Header>
      </Modal>    
        </div>
        
         <Footer handleRoute = {handleRoute} />
     </>
 )
    }
}
export default contactus