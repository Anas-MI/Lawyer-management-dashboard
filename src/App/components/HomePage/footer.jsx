import React from "react";

const footer = () => {
  return (
    <div id="footer">
      <div className="f-top">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-12 pb-4">
              <div className="ftr-set">
                <h3>LOGO</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  molestias aspernatur libero nulla, qui repellendus commodi id
                  a deserunt magnam reprehenderit laboriosam dolorum officiis
                  iusto hic odit fugit expedita quos.
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 pb-4 ">
              <div className="ftr-set">
                <h3>Contact</h3>
                <ul className="nav ftr-nav flex-column">
                  <li>
                    <a href="/" className="page-scroll">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/features" className="page-scroll">
                      Feature
                    </a>
                  </li>
                  <li>
                    <a href="/subscription" className="page-scroll">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="page-scroll">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="page-scroll">
                      Contact us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 pb-4">
              <div className="ftr-set">
                <h3>Link</h3>
                <ul className="nav ftr-nav flex-column">
                  <li>
                    <a href="#home" className="page-scroll">
                      Work from Home
                    </a>
                  </li>
                  <li>
                    <a href="#features" className="page-scroll">
                      Legal Trends Report
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="page-scroll">
                      Start a Law Firm
                    </a>
                  </li>
                  <li>
                    <a href="#blog" className="page-scroll">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#contactus" className="page-scroll">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 ">
              <div className="ftr-set">
                <div className="social">
                  <h3>Address</h3>
                  <p>
                    {" "}
                    Voluptate quidem sapiente perferendis illum hic laboriosam?
                  </p>
                  <h3>Social</h3>
                  <ul className="clearfix">
                    <li>
                      <a href="/">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <i className="fa fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="f-nav">
        <div className="container">
          <ul className="clearfix f-menu-items" style={{"line-height" : "2",}}>
            <li>
              <small>© 2020 casemanagement.com</small>
            </li>
            <li>
              <a
                href="/"
                target="_blank"
                data-tracking-trigger="click"
                data-tracking-action="NA Footer Navigation Link"
              >
                <small>Terms of Service</small>
              </a>
            </li>
            <li>
              <a
                href="/"
                target="_blank"
                data-tracking-trigger="click"
                data-tracking-action="NA Footer Navigation Link"
              >
                <small>Legal Service</small>
              </a>
            </li>
            <li>
              <a
                href="/"
                target="_blank"
                data-tracking-trigger="click"
                data-tracking-action="NA Footer Navigation Link"
              >
                <small>Privacy Policy</small>
              </a>
            </li>
            <li>
              <div className="o-region-selector l-region-selector js-region-selector">
                <select
                  data-tracking-trigger="change"
                  data-tracking-action="Region Selector"
                >
                  <option value="" selected="selected">
                    Region
                  </option>
                  <option value="uk" data-alternate-url="/">
                    United Kingdom
                  </option>
                </select>
              </div>
            </li>
            <li>
              <div className="l-social c-social">
                <ul>
                  <li>
                    <a href="/">
                      <span className="fa fa-facebook"></span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="fa fa-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="fa fa-linkedin"></span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="fa fa-youtube"></span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span className="fa fa-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default footer;
