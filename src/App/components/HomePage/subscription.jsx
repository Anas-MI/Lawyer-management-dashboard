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
        })
    }

    render() {
    return(
        <div className="subscription">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 py-3">
                        <h2 className="title-bdr">Subscription</h2>
                        <div className="row py-3">
                            {this.state.qdata.map((repodata) => 
                                <div className="col-lg-3 col-md-6" key={repodata.id}>        
                                    <div className="sub_card">
                                        <p className="card-text font-weight-bold">{repodata.planName}</p>
                                        <h2 className="card-title">{repodata.price}</h2>
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
        </div>
    )
}
}

export default subscription