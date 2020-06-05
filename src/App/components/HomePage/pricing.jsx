import React, { Component } from 'react'

export class pricing extends Component {
  render() {
    return (
      <div id="pricing" className="bg-blue-gr">
      <div className="container">
        <div className="row">          
          <div className="col-xs-12 col-md-12">
            <div className="pricing-content text-center">
              <h2>Pricing</h2>
              <div className="snip1214">
                <div className="plan">
                    <h3 className="plan-title">
                    Starter
                    </h3>
                    <div className="plan-cost"><span className="plan-price">$19</span><span className="plan-type">/ Monthly</span></div>
                    <ul className="plan-features">
                    <li><i className="fa fa-check"> </i>5GB Linux Web Space</li>
                    <li><i className="fa fa-check"> </i>5 MySQL Databases</li>
                    <li><i className="fa fa-check"> </i>Unlimited Email</li>
                    <li><i className="fa fa-check"> </i>250Gb Monthly Transfer</li>
                    <li><i className="fa fa-check"> </i>24/7 Tech Support</li>
                    <li><i className="fa fa-check"> </i>Daily Backups</li>
                    </ul>
                    <div className="plan-select"><a href="/">Select Plan</a></div>
                </div>
                <div className="plan">
                    <h3 className="plan-title">
                    Basic
                    </h3>
                    <div className="plan-cost"><span className="plan-price">$29</span><span className="plan-type">/ Monthly</span></div>
                    <ul className="plan-features">
                    <li><i className="fa fa-check"> </i>10GB Linux Web Space</li>
                    <li><i className="fa fa-check"> </i>10 MySQL Databases</li>
                    <li><i className="fa fa-check"> </i>Unlimited Email</li>
                    <li><i className="fa fa-check"> </i>500Gb Monthly Transfer</li>
                    <li><i className="fa fa-check"> </i>24/7 Tech Support</li>
                    <li><i className="fa fa-check"> </i>Daily Backups</li>
                    </ul>
                    <div className="plan-select"><a href="/">Select Plan</a></div>
                </div>
                <div className="plan">
                    <h3 className="plan-title">
                    Professional
                    </h3>
                    <div className="plan-cost"><span className="plan-price">$49</span><span className="plan-type">/ Monthly</span></div>
                    <ul className="plan-features">
                    <li><i className="fa fa-check"> </i>25GB Linux Web Space</li>
                    <li><i className="fa fa-check"> </i>25 MySQL Databases</li>
                    <li><i className="fa fa-check"> </i>Unlimited Email</li>
                    <li><i className="fa fa-check"> </i>2000Gb Monthly Transfer</li>
                    <li><i className="fa fa-check"> </i>24/7 Tech Support</li>
                    <li><i className="fa fa-check"> </i>Daily Backups</li>
                    </ul>
                    <div className="plan-select"><a href="/">Select Plan</a></div>
                </div>
                <div className="plan">
                    <h3 className="plan-title">
                    Ultra
                    </h3>
                    <div className="plan-cost"><span className="plan-price">$99</span><span className="plan-type">/ Monthly</span></div>
                    <ul className="plan-features">
                    <li><i className="fa fa-check"> </i>100GB Linux Web Space</li>
                    <li><i className="fa fa-check"> </i>Unlimited MySQL Databases</li>
                    <li><i className="fa fa-check"> </i>Unlimited Email</li>
                    <li><i className="fa fa-check"> </i>10000Gb Monthly Transfer</li>
                    <li><i className="fa fa-check"> </i>24/7 Tech Support</li>
                    <li><i className="fa fa-check"> </i>Daily Backups</li>
                    </ul>
                    <div className="plan-select"><a href="/">Select Plan</a></div>
                </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default pricing
