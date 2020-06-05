import React, { Component } from "react";

export class Team extends Component {
  render() {
    return (
      <div id="blog" className="text-center">
        <div className="container">
          <div className="col-12">
            <h2 className="title-bdr">Blog</h2>            
          </div>
          <div className="row">
            <div className="col-md-4">
              <div class="border-0 card mb-3 shadow-sm">
                <img
                  class="card-img-top"
                  src="img/portfolio/01-small.jpg"
                  alt="blog"
                />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div class="border-0 card mb-3 shadow-sm">
                <img
                  class="card-img-top"
                  src="img/portfolio/01-small.jpg"
                  alt="blog"
                />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div class="border-0 card mb-3 shadow-sm">
                <img
                  class="card-img-top"
                  src="img/portfolio/01-small.jpg"
                  alt="blog"
                />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-md-offset-1 text-center">
              <a href="/blog" class="mt-5 text-custom-primary cta-btn-blank"><span>View More</span></a>
          </div>

          {/* <div id="row">
          {this.props.data ? this.props.data.map(d => 
             <div className="col-md-3 col-sm-6 team">
             <div className="thumbnail"> <img src={d.img} alt="..." className="team-img" />
               <div className="caption">
                 <h4>{d.name}</h4>
                 <p>{d.job}</p>
               </div>
             </div>
           </div>
            
            
            ) : 'loading'}
          
          </div> */}
        </div>
      </div>
    );
  }
}

export default Team;
