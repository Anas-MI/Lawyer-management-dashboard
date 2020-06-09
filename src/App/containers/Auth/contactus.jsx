import React from 'react'
import Footer from '../../components/HomePage/footer'
import Navigation from '../../components/HomePage/navigation'
import Contactimg from '../../components/img/contact-us.png'

const contactus = () => {
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
                                    <button type="submit" className="text-white btn cust-btn-primary">
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
export default contactus