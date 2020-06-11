import React, { Component } from 'react'
import SimpleImageSlider from "react-simple-image-slider";


export class Header extends Component {
  render() {
    
    const images = [
      { url: "/img/slider2.jpg" },
      { url: "/img/slider3.jpg" },
      { url: "/img/intro-bg.jpg" },
      { url: "/img/slider2.jpg" },
      { url: "/img/slider1.jpg" },      
  ];
    return (
        <header id="header">
        <div className="intro">
          <div className="overlay">
          <SimpleImageSlider
                    width={"100%"}
                    height={"calc(100vh - 93px)"}
                    images={images}
          />
          <div className="head-centered overlay-slider"><h1>Your clients rely on you. Lawyers rely on Us.</h1></div>
          
            {/* <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>{this.props.data ? this.props.data.title : 'Loading'}<span></span></h1>
                  <p>{this.props.data ? this.props.data.paragraph : 'Loading'}</p>
                  <a href="#features" className="btn btn-custom btn-lg page-scroll">Learn More</a> </div>
              </div>
            </div> */}
          </div>
        </div>
      </header>
    )
  }
}

export default Header
