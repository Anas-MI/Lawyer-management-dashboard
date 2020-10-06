import React, { Component } from "react";
import Footer from "../../components/HomePage/footer";
import Navigation from "../../components/HomePage/navigation";
import Contactimg from "../../components/img/contact-us.png";
import axios from "axios";
import { apiUrl } from "../../../resources/api";
import { Modal } from "react-bootstrap";

class AboutUs extends Component {
  render() {
    const handleRoute = (route) => {
      console.log(route);
      this.props.history.push(route);
    };
    return (
      <>
        <Navigation />
        <div className="banner">
          <div className="container">
            <div className="row">
              <div className="banner-text col-lg-8 p-5">
                <h4>About Us</h4>
                <h2>Why Us?</h2>
                <p className="pt-3 text">
                  We’re more than just a tech company. We’ve got goals, hopes,
                  and dreams, just like you. We want to serve a better solution
                  to a centuries old profession and do some good in the world
                  while we’re at it—permanently.We know our technology changes
                  lives. If that’s something that speaks to you—you belong here,
                  too.
                </p>
              </div>
              <div className="banner-img col-lg-4">
                <img src={Contactimg} width="90%" alt="Banner Img" />
              </div>
            </div>
          </div>
        </div>

        <Footer handleRoute={handleRoute} />
      </>
    );
  }
}
export default AboutUs;
