import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import api from '../../resources/api'
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux'
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import { ConsoleSqlOutlined } from '@ant-design/icons';


class Dashboard extends React.Component {
    constructor(){
        super()
        this.state = {
            time : ""
        }
    }
    convertTime = (serverdate) => {
        var date = new Date(serverdate);
        // convert to utc time
        var toutc = date.toUTCString();
        //convert to local time
        var locdat = new Date(toutc + ' UTC');
        return locdat;
      };
    render() {
        
        setInterval(()=>{
         
            api.get('/calendar/viewforuser/'+this.props.userId).then(res=>{
           
                res.data.data.map((value, index)=>{
                   
                    const StartTime = value.startTime? value.startTime : ""
                    const Description = value.title
                    const matter = value.matter ?  value.matter.matterDescription : ""
                    const timeForReminder = value.timeForReminder ? value.timeForReminder : ""
                    
                    if(value.notification == true){
                        const alertdate =  this.convertTime(value.startTime)
    
                        let ddd = alertdate.getDate();
                        let mmm = alertdate.getMonth()+1; 
                        let yyyyy = alertdate.getFullYear();
                        let hourss = alertdate.getHours() > 12 ? alertdate.getHours() - 12 : alertdate.getHours()  ;
                        let minss = alertdate.getMinutes() ;
                        console.log(alertdate)
                        
                        /*
                            if(ddd<10) {
                                ddd = '0' + dd
                            }          
                            if(mmm<10) {
                                mmm = '0' + mm
                            }
        */            
                        let today = new Date();
                        let dd = today.getDate();
                        let mm = today.getMonth()+1; 
                        let yyyy = today.getFullYear();
                        let hours = today.getHours() > 12 ?  today.getHours() - 12 :  today.getHours() ;
                        let mins = today.getMinutes();

                        /*
                            if(dd<10) {
                                dd = '0'+dd
                            } 
                            
                            if(mm<10) {
                                mm = '0'+mm
                            } 
*/
                        console.log("1" + ddd + "/" + mmm + "/" + yyyyy + " " + hourss + ":" + minss)
                        console.log("2" +dd + "/" + mm + "/" + yyyy + " " + hours + ":" + mins)
                        if ( mins == "00" && ddd==dd && mmm==mm && yyyy==yyyyy && hours -1  == hourss && ( minss + timeForReminder > 59 )){
                            alert("Event reminder : \n" + Description + "\n at : " + StartTime + "\n Associated matter : " + matter)
                            console.log(value)
                        
                        }else
                        if(ddd==dd && mmm==mm && yyyy==yyyyy && hours == hourss && ( minss - mins < timeForReminder && minss - mins > 0   )){
                                alert("Event reminder : \n" + Description + "\n at : " + StartTime + "\n Associated matter : " + matter)
                                console.log(value)
                            
                        }
                        else{
                            console.log("i min passed")
                        }
                               
                    }
                    /*
                    const tableData={
                        id: value._id,
                        Subject : value.title,
                       
                        TimeForReminder : value.timeForReminder,
                        Matter : value.matter ?  value.matter.matterDescription : "",
                        Email : value.email,
                        Notification : value.notification,
                  
        
                    }
                   */
                })

            
            })

        },5*60*1000)
        const tabContent = (
            <Aux>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3784</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Julie Vad</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>3544</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Storm Hanse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>2739</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Frida Thomse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>1032</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Silje Larsen</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green"/>8750</span>
                    </div>
                </div>
                <div className="media friendlist-box align-items-center justify-content-center">
                    <div className="m-r-10 photo-table">
                        <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></a>
                    </div>
                    <div className="media-body">
                        <h6 className="m-0 d-inline">Storm Hanse</h6>
                        <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red"/>8750</span>
                    </div>
                </div>
            </Aux>
        );

        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total task due</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                             297</h3>
                                    </div>

                                    <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg text-white rounded-pill f-14 f-w-400 ">Create Task</a>
                                    </div>
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total calendar Events</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-down text-c-red f-30 m-r-5"/> */}
                                             314</h3>
                                    </div>

                                    <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg2 text-white rounded-pill f-14 f-w-400 ">Create Events</a>
                                    </div>
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Draft bills</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                            453</h3>
                                    </div>

                                    <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg text-white rounded-pill f-14 f-w-400 ">Create Bills</a>
                                    </div>
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Recent Users</Card.Title>
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
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total in draft</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                             724</h3>
                                    </div>

                                    <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg2 text-white rounded-pill f-14 f-w-400 ">Create Task</a>
                                    </div>
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                        
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Unpaid bills</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                             25</h3>
                                    </div>

                                    <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg text-white rounded-pill f-14 f-w-400 ">Create Task</a>
                                    </div>
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total unpaid bills</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                             98</h3>
                                    </div>

                                    <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg2 text-white rounded-pill f-14 f-w-400 ">Create Task</a>
                                    </div>
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Overdue bills</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-down text-c-red f-30 m-r-5"/> */}
                                             423</h3>
                                    </div>

                                    <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg text-white rounded-pill f-14 f-w-400 ">Create Events</a>
                                    </div>
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total overdue bills</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                            666</h3>
                                    </div>

                                    <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg2 text-white rounded-pill f-14 f-w-400 ">Create Bills</a>
                                    </div>
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Header>
                                <Card.Title as='h5'>Rating</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center m-b-20">
                                    <div className="col-6">
                                        <h2 className="f-w-300 d-flex align-items-center float-left m-0">4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow"/></h2>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="d-flex  align-items-center float-right m-0">0.4 <i className="fa fa-caret-up text-c-green f-22 m-l-10"/></h6>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>5</h6>
                                        <h6 className="align-items-center float-right">384</h6>
                                        <div className="progress m-t-30 m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>4</h6>
                                        <h6 className="align-items-center float-right">145</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>3</h6>
                                        <h6 className="align-items-center float-right">24</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>

                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>2</h6>
                                        <h6 className="align-items-center float-right">1</h6>
                                        <div className="progress m-t-30  m-b-20" style={{height: '6px'}}>
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '10%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <h6 className="align-items-center float-left"><i className="fa fa-star f-10 m-r-10 text-c-yellow"/>1</h6>
                                        <h6 className="align-items-center float-right">0</h6>
                                        <div className="progress m-t-30  m-b-5" style={{height: '6px'}}>
                                            <div className="progress-bar" role="progressbar" style={{width: '0%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={8} className='m-b-30'>
                        <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
                            <Tab eventKey="today" title="Today">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="week" title="This Week">
                                {tabContent}
                            </Tab>
                            <Tab eventKey="all" title="All">
                                {tabContent}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Aux>
        );
    }
}
const mapStateToProps = (state) => ({
    userId: state.user.token.user._id,
  });
  export default connect(mapStateToProps)(Dashboard);
