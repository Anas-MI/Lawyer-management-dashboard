import React, { useEffect, useState } from 'react'
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';

import Aux from "../../../hoc/_Aux";
import DEMO from "../../../store/constant";

import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import { useSelector } from 'react-redux';

const LawyerDetail = props => {

    const selectedLawyer = useSelector(state=>state.selectedLawyer)

    const handleLawyerDashboard = () => {
        var link = document.createElement('a')
        link.setAttribute('target','_blank')   
        link.setAttribute('href', '/login/' + btoa(JSON.stringify(selectedLawyer)))     
        link.click()
    }

    return (
        <div>
       <Aux>
            <Row>
                <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Row>
                                    <Col sm className="my-auto"><h6 className='mb-4'><b>Lawyer Info</b></h6></Col>
                                    <Col sm className="mt-1"><Button onClick={handleLawyerDashboard}>View Dashboard</Button></Col>
                                </Row>                                
                            </Card.Header>
                            <Card.Body className='px-3 py-2'>
                                <Row className="m-3">
                                    <Col sm><span className="table-span-dark">First Name</span></Col>
                                    <Col sm><span className="table-span-light">{selectedLawyer.firstName}</span></Col>
                                </Row>
                                <Row className="m-3">
                                    <Col sm><span className="table-span-dark">Last Name</span></Col>
                                    <Col sm><span className="table-span-light">{selectedLawyer.lastName}</span></Col>
                                </Row>
                                <Row className="m-3">
                                    <Col sm><span className="table-span-dark">Email Address</span></Col>
                                    <Col sm><span className="table-span-light">{selectedLawyer.emailAddress}</span></Col>
                                </Row>
                                <Row className="m-3">
                                    <Col sm><span className="table-span-dark">Country</span></Col>
                                    <Col sm><span className="table-span-light">{selectedLawyer.countryOfPractice}</span></Col>
                                </Row>
                                <Row className="m-3">
                                    <Col sm><span className="table-span-dark">Firm Size</span></Col>
                                    <Col sm><span className="table-span-light">{selectedLawyer.lawFirmSize}</span></Col>
                                </Row>                                
                            </Card.Body>
                        </Card>
                    </Col>
                

                    {/* <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'><b>Total Matters</b></h6>
                                <p className="m-0" style={{fontSize : "24px"}}>297</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'><b>Payments Received</b></h6>
                                <p className="m-0" style={{fontSize : "24px"}}><b>314$</b></p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'><b>Contacts</b></h6>
                                <p>+91-1254785214</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Supscription History</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Isabella Christensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>11 MAY 12:56</h6>
                                        </td>
                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Mathilde Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>11 MAY 10:35</h6>
                                        </td>
                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Karla Sorensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>9 MAY 17:38</h6>
                                        </td>
                                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">Reject</a><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">Approve</a></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col> */}
                
                </Row>
            </Aux>
        
        </div>
    )
}

export default LawyerDetail