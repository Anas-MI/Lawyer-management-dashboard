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
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 py-3 section-title">
                        <h2 className="text-center">Subscription</h2>
                        <div className="row py-3">
                            {this.state.qdata.map((repodata) => 
                                <div className="col-lg-3 col-md-6" key={repodata.id}>        
                                    <div className="sub_card overflow-hidden">
                                        <p className="card-text font-weight-bold text-break">{repodata.planName}</p>
                                        <h3 className="card-title text-break" style={{"font-size": "36px"}}>{repodata.price}</h3>
                                        <ul className="sub-list text-break">
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