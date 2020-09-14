import React, {useState, useEffect} from 'react'
import {Card, Button, Progress} from 'antd'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { isNull } from 'lodash';
const Payment = (props) =>{
    const user = useSelector((state) => state.user.token.user);
    let created_at = new Date(user.created_at)
        let now = new Date()
        let expiry_date = created_at
        expiry_date.setDate(created_at.getDate() + 15)
        const [subscriptionRequested, setsubscriptionRequested] = useState("Trail")
        const [renewal, setrenewal] = useState(<Row className="my-3">
                                                <Col sm><span className="table-span-dark">Trail period expires in </span></Col>
                                                <Col sm><span className="table-span-light">{expiry_date.getDate() - now.getDate()} Days</span></Col>
                                            </Row> )
        const [AutoRenewal, setAutoRenewal] = useState(null)
        const [Amount, setAmount] = useState("")
        const [RenewalDate, setRenewalDate] = useState("")
    console.log(user)

    const setValues = ( ) =>{
        if( user.registeredOn.requestGranted === "Yes"){
        
            setsubscriptionRequested(user.registeredOn.subscriptionRequested)
            console.log(user.registeredOn.subscriptionRequested)
            let renewalDate = new Date(user.registeredOn.date)
            console.log(renewalDate)

            if(user.registeredOn.subscriptionRequested === "monthly"){
                renewalDate.setMonth(renewalDate.getMonth() + 1)
                if(renewalDate.getDate() === now.getDate() &&
                    renewalDate.getMonth() === now.getMonth() &&
                     renewalDate.getFullYear() === now.getFullYear()
                    ){
                        renewalDate.setMonth(renewalDate.getMonth() + 1)
                    }

                setRenewalDate(renewalDate)
                setrenewal(<Row className="my-3">
                            <Col sm><span className="table-span-dark">Amount on next Bill</span></Col>
                            <Col sm><span className="table-span-light">$100 on {renewalDate.toDateString()}</span></Col>
                        </Row> )
            }else{

                renewalDate.setFullYear(renewalDate.getFullYear() + 1)

                if(renewalDate.getDate() === now.getDate() &&
                    renewalDate.getMonth() === now.getMonth() &&
                     renewalDate.getFullYear() === now.getFullYear()
                    ){
                        renewalDate.setFullYear(renewalDate.getFullYear() + 1)
                    }

                setRenewalDate(renewalDate)
                setrenewal(<Row className="my-3">
                            <Col sm><span className="table-span-dark">Amount on next Bill</span></Col>
                            <Col sm><span className="table-span-light">$1200 on {renewalDate.toDateString()}</span></Col>
                        </Row> )
            }
            console.log(Amount)
            console.log(RenewalDate)
            
                        /*
            setAutoRenewal(<Card title="Renewal Options" className="form-width mb-3">
                                <p>Your next Subscription in with to <b>Auto-Renewal {subscriptionRequested}</b></p>
                                <button type="button" class="btn btn-link pl-0">Change Renewal Options</button>
                            </Card> )
                            */
    
        }
    }
    useEffect(() => {
        setValues()
    }, [])

    
    /*
    const fetchUser = () =>{
        api.get('/user/view/' + this.props.userId).then((res)=>{
            console.log(res)
            setuser(res.data.data)
          })
    }
    useEffect(() => {
      //  fetchUser()
    }, [])
    */
    return <div>
        <Card title="Subscription" className="form-width mb-3">
            <h4></h4>
            <Row>
                <Col sm><span className="table-span-dark">Current Plan</span></Col>
                <Col sm><span className="table-span-light">{ subscriptionRequested }</span></Col>
            </Row>
            
            {/*
            <Row className="my-3">
                <Col sm><span className="table-span-dark">Pay on next Bill</span></Col>
                <Col sm><span className="table-span-light">7 users, paid yearly</span></Col>
            </Row>
            <Row className="my-3">
                <Col sm><span className="table-span-dark">License</span></Col>
                <Col sm>
                    <span className="table-span-light">User License used 7/7</span> <br /> 
                    <Progress percent={100} /> <br />
                    <Button type="link" style={{"padding": "0"}}>Buy More License</Button>
                </Col>
            </Row>
            <Row className="my-3">
                <Col sm><span className="table-span-dark">License</span></Col>
                <Col sm><span className="table-span-light">User License used 7/7</span></Col>
            </Row>
            */}
            {
                renewal
            }
        </Card>
        
        {
            /*
            <Card title="Credit Card Information" className="form-width mb-3">
            <p>You're using <b>Visa</b> ending in <b>2708</b> valid until <b>3/19</b></p>
            <button type="button" class="btn btn-link pl-0">Change Renewal Options</button>
        </Card>
        <Card title="Payment History" className="form-width mb-3">
            <button type="button" class="btn btn-link pl-0">View Your Previous Payment</button>
        </Card>
             */
        }
        {
            AutoRenewal
        }
        <Link to="/plans/subscription" className="nav-link page-scroll">
            Subscibe Now!
         </Link>
    </div>
}
 export default Payment