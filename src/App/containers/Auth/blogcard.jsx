import React from 'react';
import Footer from '../components/footer'

const blogcard =() =>{
    return(
        <>
        <div className="text-center my-5">
            <div className="container">
                <div className="col-12"><h2 className="title-bdr">Blog</h2></div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="border-0 card mb-3 shadow-sm blogcard">
                            <img className="card-img-top" src="img/portfolio/01-small.jpg" alt="blog" />
                            <div className="card-body">
                                <a href="/blogpage">
                                <h5 className="card-title">Card title</h5>
                                </a>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="border-0 card mb-3 shadow-sm blogcard">
                            <img className="card-img-top" src="img/portfolio/01-small.jpg" alt="blog" />
                            <div className="card-body">
                                <a href="/blogpage">
                                <h5 className="card-title">Card title</h5>
                                </a>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="border-0 card mb-3 shadow-sm blogcard">
                            <img className="card-img-top" src="img/portfolio/01-small.jpg" alt="blog" />
                            <div className="card-body">
                                <a href="/blogpage">
                                <h5 className="card-title">Card title</h5>
                                </a>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
export default blogcard