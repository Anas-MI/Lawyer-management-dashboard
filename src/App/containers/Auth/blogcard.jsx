import React, {Component} from 'react';
import Footer from '../../components/HomePage/footer'
import Navigation from '../../components/HomePage/navigation'
import { apiUrl }from '../../../resources/api'

import axios from 'axios'

class Blogcard extends Component{
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
            console.log(this.state.blogs)
    }

    render () {
        return(
            <>
            <Navigation />
            <div className="text-center my-5">
                <div className="container">
                    <div className="col-12"><h2 className="title-bdr">Blog</h2></div>
                    <div className="row">
                    {this.state.blogs.map( blog => (
                        <div className="col-md-4" key={blog._id}>
                            <div className="border-0 card mb-3 shadow-sm blogcard">
                            <img className="card-img-top" src="img/portfolio/01-small.jpg" alt="blog" />
                                <div className="card-body">
                                    <a href={`/blogpage/${blog._id}`}>
                                    <h5 className="card-title">{blog.title}</h5>
                                    </a>
                                    <p className="card-text">{blog.shortDescription}</p>
                                </div>
                            </div>
                            </div> 
                        ))
                    }                         
                    </div>
                </div>
            </div>
            <Footer />
            </>
        )
    }
}
export default Blogcard