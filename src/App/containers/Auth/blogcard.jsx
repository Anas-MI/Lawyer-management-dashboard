import React, {Component} from 'react';
import Footer from '../../components/HomePage/footer';
import Navigation from '../../components/HomePage/navigation';
import { apiUrl }from '../../../resources/api';
import Contactimg from '../../components/img/Lawyer-Blog.png';

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
                <div className="row mb-5">
                    <div className="banner-text col-lg-8 p-5 section-title">
                        <h2 className="text-center">Blog</h2>
                        <p className="pt-3 text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo molestias aspernatur libero nulla, qui repellendus commodi id a deserunt magnam.</p>
                    </div>
                    <div className="banner-img col-lg-4">
                        <img src={Contactimg} width="90%" alt="Banner Img"/>
                    </div>
                </div>
                <div className="row" >
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