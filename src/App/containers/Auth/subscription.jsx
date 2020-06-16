import React, {Component} from 'react';
import Navigation from '../../components/HomePage/navigation';
import Footer from '../../components/HomePage/footer';
import Contactimg from '../../components/img/Lawyer-Blog.png'
import api from '../../../resources/api';

export class subscription extends Component {
    state = {
        qdata : [ ],
        qmsg : ''
    };

    componentDidMount () {
        api.get('/plans/showall')
        .then(res =>{
          this.setState({
            qdata: res.data.data,
            qmsg: res.data.message
        });
        console.log(this.state.qdata)
        })
    }
    render(){
    return (
        <>
            <Navigation/>
            <div className="container">
                <div className="row mb-5">
                    <div className="banner-text col-lg-8 p-5 section-title">
                        <h2 className="text-center">Subscription</h2>
                        <p className="pt-3 text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo molestias aspernatur libero nulla, qui repellendus commodi id a deserunt magnam.</p>
                    </div>
                    <div className="banner-img col-lg-4">
                        <img src={Contactimg} width="90%" alt="Banner Img"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 py-3">
                        <div className="row py-3">
                            {this.state.qdata.map((repodata) => 
                                <div className="col-lg-3 col-md-6" key={repodata.id}>        
                                    <div className="sub_card">
                                        <p className="card-text font-weight-bold">{repodata.planName}</p>
                                        <h3 className="card-title" style={{"font-size": "36px"}}>{repodata.price}</h3>
                                        <ul className="sub-list">
                                            {repodata.list.map((lists)=> <li><i className="fa fa-check"></i>{lists}</li>)}
                                        </ul>
                                        <div className="text-center">
                                            <p>Get a 15-Day Free Trial</p>
                                            <button type="button" className="sub-button">Subscribe</button>
                                        </div>                                    
                                    </div>
                                </div>
                            )
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

export default subscription