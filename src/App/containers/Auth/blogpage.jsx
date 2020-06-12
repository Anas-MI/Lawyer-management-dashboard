import React, {Component} from 'react';
import Footer from '../../components/HomePage/footer'
import Navigation from '../../components/HomePage/navigation'
import { apiUrl }from '../../../resources/api'

import axios from 'axios'

class blogpage extends Component{
    state = {
        blogs : [],
        myMainSite : window.location.href  
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
        var splitUrl = this.state.myMainSite.split('/blogpage/');
    return(
        <>
        <Navigation />
        <div className="blogpage my-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-lg-9 post">
                    {this.state.blogs.map( blog => ( 
                        (splitUrl[1] == blog._id) ? (
                        <>
                            <div className="heading">
                                <h1 className="title pb-3" itemprop="mainEntityOfPage name">
                                    {blog.title}
                                </h1>
                                <p className="entry-meta py-1 mb-5">
                                    <span className="entry-author "> written by
                                        <a href="/" className="entry-author-link" rel="author">
                                            <span className="entry-author-name ml-2">{blog.author}</span>
                                        </a>
                                    </span> 
                                </p>
                            </div>
                            <div className="content">
                                <p>{blog.description}</p>
                            </div>
                        </>
                        ) : ('')
                    ))
                    }
                        
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
    }
}
export default blogpage