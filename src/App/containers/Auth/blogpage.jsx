import React from 'react';
import Footer from '../components/footer'

const blogpage = () =>{
    return(
        <>
        <div className="blogpage my-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-lg-9 post">
                        <div className="heading">
                            <h1 className="title pb-3" itemprop="mainEntityOfPage name">
                                Importance of Client-Centered Approach for Lawyers
                            </h1>
                            <p className="entry-meta py-1 mb-5">
                                <span datetime="2020-06-04T19:33:31+05:30" itemprop="dateModified" className="entry-time mr-1">June 04, 2020</span> 
                                <span className="entry-author "> written by
                                    <a href="/" className="entry-author-link" rel="author">
                                        <span className="entry-author-name ml-2">Gourav Goyal</span>
                                    </a>
                                </span> 
                            </p>
                        </div>
                        <div className="content">
                            <img src="https://www.glassdoor.com/blog/app/uploads/sites/2/GettyImages-713774487-1-1024x450.jpg" alt="Blog img"/>
                            <p>Client-centred lawyering offers lawyers, techniques to motivate client participation, and this was adopted first in the legal clinics. In earlier times, the clients used to delegate the work to the lawyers and completely trusts them with their case. The clients did not have active involvement in the case. Therefore, client-centred legal client management is aimed to create an interactive dynamic space that facilitates developing mutual trust and respect between the client and the lawyer.</p>
                            <p>Additionally, it facilitates the disclosure of accurate information and timelines of the case. In this modern era of alternative legal services offered through Artificial Intelligence, clients expect instant response and action from the lawyers. The fundamental principles of client-centred lawyering can be achieved by respecting the client's importance in decision making and giving value to their emotions and perspectives related to the matter.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
export default blogpage