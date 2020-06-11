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
                            <Card.Header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                <Card.Title as='h5'>Lawyer Info</Card.Title>
                                <Button onClick={handleLawyerDashboard}>View Dashboard</Button>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td>First Name</td><td>{selectedLawyer.firstName}</td>
                                    </tr>
                                    <tr className="unread">
                                        <td>Last Name</td><td>{selectedLawyer.lastName}</td>
                                    </tr>
                                    <tr className="unread">
                                        <td>Email Address</td><td>{selectedLawyer.emailAddress}</td>
                                    </tr>
                                    <tr className="unread">
                                        <td>Country</td><td>{selectedLawyer.countryOfPractice}</td>
                                    </tr>
                                    <tr className="unread">
                                        <td>Firm Size</td><td>{selectedLawyer.lawFirmSize}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                

                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Matters</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                             297</h3>
                                    </div>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Payments Received</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-down text-c-red f-30 m-r-5"/> */}
                                             314$</h3>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Contacts</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <div className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                            +91-1254785214</div>
                                    </div>
                                </div>
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
                    </Col>
                
                </Row>
            </Aux>
        
        </div>
    )
}

export default LawyerDetail