import React, {Component} from 'react';
import api from '../../../resources/api';


class subscription extends Component {
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

    render() {
    return(
        <div className="subscription">
            <div className="container" style={{"max-width": "100%"}}>
                <div className="row">
                    <div className="col-lg-12 py-3 section-title">
                        <h2 className="text-center">Subscription</h2>
                        <div className="row py-3 d-flex justify-content-center">
                            {this.state.qdata.map((repodata) => 
                                <div className="col-lg-3 col-md-6 mb-4" key={repodata.id}>        
                                    <div className="sub_card overflow-hidden">
                                        <h3 className="card-title sub-title text-break">{repodata.price}</h3>
                                        <p className="card-text sub-text text-break">{repodata.planName}</p>
                                        <ul className="sub-list text-break">
                                            {repodata.list.map((lists)=> <li><i className="fa fa-check"></i>{lists}</li>)}
                                        </ul>
                                        <div className="text-center sub-free-trial mt-4">
                                            <p>Get a 15-Day Free Trial</p>
                                            <button onClick={this.props.handleSubscription} type="button" className="sub-button">Subscribe</button>
                                        </div>                                    
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default subscription