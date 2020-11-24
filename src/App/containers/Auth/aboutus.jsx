import React, { Component } from "react";
import Footer from "../../components/HomePage/footer";
import Navigation from "../../components/HomePage/navigation";
import Contactimg from "../../components/img/contact-us.png";
import axios from "axios";
import api from "../../../resources/api";
import { Modal } from "react-bootstrap";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class AboutUs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      banner: "",
      title: "",
      description: ""
    }
  }
  componentDidMount() {
    api.get("/footer/getaboutus").then(data => {
      console.log(data.data.data[0])
      let savedData = data.data.data[0];
      this.setState({ ...savedData });
      console.log(this.statem, '.....about us')
    }).catch(error => {
      console.log(error)
    })
  }

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
                <h2>{this.state.title}</h2>
                <p className="pt-3 text">
                  <p style={{ "word-break": "break-all" }}>{ReactHtmlParser(this.state.description)}</p>
                </p>
              </div>
              <div className="banner-img col-lg-4">
                <img src={this.state.banner} width="90%" alt="Banner Img" />
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
