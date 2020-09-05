import React from 'react'
import {Card, Button, Progress} from 'antd'
import { Row, Col } from 'react-bootstrap';
const Payment = () =>{
    return <div>
        <Card title="Setup Your Subscriptions" className="form-width mb-3">
            <h4>Subscription</h4>
            <Row>
                <Col sm><span className="table-span-dark">Current Plan</span></Col>
                <Col sm><span className="table-span-light">Elite</span> <Button type="link">View Plan</Button></Col>
            </Row>
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
            <Row className="my-3">
                <Col sm><span className="table-span-dark">Amount on next Bill</span></Col>
                <Col sm><span className="table-span-light">$8,212 on 03/01/20</span></Col>
            </Row>
        </Card>
        <Card title="Renewal Options" className="form-width mb-3">
            <p>Your next Subscription in with to <b>Auto-Renewal Year</b></p>
            <button type="button" class="btn btn-link pl-0">Change Renewal Options</button>
        </Card>
        <Card title="Credit Card Information" className="form-width mb-3">
            <p>You're using <b>Visa</b> ending in <b>2708</b> valid until <b>3/19</b></p>
            <button type="button" class="btn btn-link pl-0">Change Renewal Options</button>
        </Card>
        <Card title="Payment History" className="form-width mb-3">
            <button type="button" class="btn btn-link pl-0">View Your Previous Payment</button>
        </Card>
    </div>
}
 export default Payment