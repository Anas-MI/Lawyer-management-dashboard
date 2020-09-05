import React, {Component} from 'react';
import api from '../../../resources/api';
import { Card } from 'react-bootstrap'
import { notification } from 'antd';

class subscription extends Component {
    state = {
        qdata : [ ],
        qmsg : '',
        data : {
            userId : window.localStorage.getItem('userId'),
            subscriptionRequested : ""
        }
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
        const handleClick = ( index ) => {
            console.log(index)
            const data = this.state.data
            data.requestGranted = "No"
            if (index== 0) {
                data.subscriptionRequested = "monthly"
                window.location.href = 'https://www.fygaro.com/en/payments/c82abb7f-7851-425d-bdff-af2fb0704eaf/buy-now'
            }
            if (index == 1) {
                data.subscriptionRequested = "yearly"
                window.location.href = 'https://www.fygaro.com/en/payments/b2489fb2-225b-4839-a9ae-d8b1726fe58e/buy-now'
            }

            api.post(`subscription/create`, data).then((res)=>{
                console.log(res)
               // notification.success({message : "Sending request to the admin"})
            }).catch((err)=>{
                console.log(err)
               // notification.warning({message : "Failed to send request to the admin"})
            })
    
        }
    return(
        <Card>
            <Card.Header>
                <h5>Choose our plans</h5>
            </Card.Header>
            <Card.Body>
   
                    <div className="container">
                    <div className="text-center">
                                 <p style={{fontSize : "20px"}}><strong style={{fontWeight : "bold"}}>Our plans saves you time. Lots of it.</strong> <br></br>Choose the plan that's right for your firm.</p>    
                             </div>
                        <div className="row">
                             
                            <div className="col-lg-12 py-3 section-title">
                                <h2 style = {{fontSize : "35px"}} className="text-center">Subscriptions</h2>
                                <div className="row py-3 d-flex justify-content-center">
                                    {this.state.qdata.map((repodata, index) => 
                                        <div className="col-lg-3 col-md-6" key={repodata.id}>        
                                            <div className="sub_card overflow-hidden">
                                                <p className="card-text font-weight-bold text-break">{repodata.planName}</p>
                                                <h3 className="card-title text-break" style={{"font-size": "36px"}}>{repodata.price}</h3>
                                                <ul className="sub-list text-break">
                                                    {repodata.list.map((lists)=> <li><i className="fa fa-check"></i>{lists}</li>)}
                                                </ul>
                                                <div className="text-center">
                                                    <p>Get a 15-Day Free Trial</p>
                                                    <button type="button" onClick = {()=>handleClick(index)} className="sub-button">Subscribe</button>
                                                </div>                                    
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            
            </Card.Body>
        </Card>
        )
}
}

export default subscription