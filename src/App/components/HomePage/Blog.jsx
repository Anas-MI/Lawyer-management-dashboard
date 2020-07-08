import React, { Component } from "react";
import axios from 'axios'
import { apiUrl } from "../../../resources/api";

export class Team extends Component {
  state = {
    blogs : []
}

componentDidMount () {
    axios.get(`${apiUrl}/blogs/showall`)
    .then( res => 
        this.setState({
            blogs : res.data.data
        })
        )
}
  render() {
    const blogsdata = this.state.blogs.slice(0, 6)
    return (
      <div id="blog" className="text-center">
        <div className="container">
          <div className="col-12">
            <h2 className="title-bdr">Blog</h2>            
          </div>
          <div className="row">
            {blogsdata.map( blog => (
              <div className="col-md-4 overflow-hidden">
                <div className="border-0 card mb-3 shadow-sm blogcard">
                  <img className="card-img-top" src="img/portfolio/01-small.jpg" alt="blog" />
                    <div className="card-body">
                        <a href={`/blogpage/${blog._id}`}>
                          <h5 className="card-title overflow-hidden">{blog.title}</h5>
                        </a>
                        <p className="card-text overflow-hidden">{blog.shortDescription}</p>
                    </div>
                  </div>
                </div> 
              ))
              }                    
          </div>
          <div className="col-md-12 col-md-offset-1 text-center">
              <a href="/blog" class="mt-5 text-custom-primary cta-btn-blank"><span>View More</span></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
