import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';
import {notification} from 'antd'
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
            time : "",
            taskCount : 0,
            eventCount : 0,
            draftCount : 0,
            draftAmount : 0,
            unPaidCount : 0,
            unPaidAmount :0
        }
    }
    componentDidMount(){
        api.get('/tasks/viewforuser/' + this.props.userId).then((res) => {
            let tcount = 0
            res.data.data.map((val,index)=>{
                if(val.status == false){
                    tcount++
                }
            })
            this.setState({taskCount : tcount})
        })

        api.get('/calendar/viewforuser/'+this.props.userId).then((res)=>{
            let Ecount = 0
        
            res.data.data.map((val,index)=>{
                Ecount++
            })
            this.setState({eventCount : Ecount})
        })

        api.get('/billing/bill/viewforuser/'+this.props.userId).then((res)=>{
            let draftCount = 0
            let draftAmount = 0
            let unPaidCount = 0
            let unPaidAmount =0
            
            res.data.data.map((value , index)=>{
             
              if(value.status=="Unpaid"){
                unPaidCount++
                unPaidAmount = unPaidAmount + parseFloat(value.balance)
              }
              if(value.status=="draft"){
                draftCount++
                draftAmount = draftAmount + parseFloat(value.balance)
            
              }
              
            })
            this.setState({
                unPaidAmount : unPaidAmount,
                unPaidCount : unPaidCount,
                draftAmount : draftAmount,
                draftCount : draftCount
            })
          })
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
                        console.log(alertdate)
                        let ddd = alertdate.getDate();
                        let mmm = alertdate.getMonth()+1; 
                        let yyyyy = alertdate.getFullYear();
                       // let hourss = timeForReminder.getHours() > 12 ? timeForReminder.getHours() - 12 : timeForReminder.getHours()  ;
                      //  let minss = timeForReminder.getMinutes() ;
                        let hourss = timeForReminder.split(':')[0];
                        let minss = timeForReminder.split(':')[1];
                        minss = minss ?  minss.substring(0,2) : ""
                       
                       
                       
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
                        let plusonehour = parseInt(hours) + 1
                        console.log(plusonehour)
                        let mins = today.getMinutes() < 10 ? '0' + today.getMinutes()  :  today.getMinutes()
                        let plusmins = parseInt(mins + 0)

                        /*
                            if(dd<10) {
                                dd = '0'+dd
                            } 
                            
                            if(mm<10) {
                                mm = '0'+mm
                            } 
                        console.log("1" + ddd + "/" + mmm + "/" + yyyyy + " " + hourss + ":" + minss)
                        console.log("2" +dd + "/" + mm + "/" + yyyy + " " + hours + ":" + mins)
                        /*
                        if ( minss == "00" && ddd==dd && mmm==mm && yyyy==yyyyy && plusonehour  == hourss && ( plusmins == 00 )){
                            notification.open({
                                message: Description,
                                description:
                                    'Event assosiated to matter ' + matter + 'starts at ' + StartTime,
                                className: 'custom-class',
                                style: {
                                  width: 600,
                                },
                              });
                            console.log(value)
                        
                        }else
                        */
                        if(ddd==dd && mmm==mm && yyyy==yyyyy && hours == hourss &&  minss == mins  ){
                            alert("Event : " + Description + "\n" + 'Event assosiated to matter ' + matter + 'starts at ' + StartTime )
                           /*
                            notification.open({
                                message: Description,
                                description:
                                    'Event assosiated to matter ' + matter + 'starts at ' + StartTime,
                                className: 'custom-class',
                                style: {
                                  width: 600,
                                },
                              });
                            console.log(value)
                            */
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

        },60*1000)
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
                <h6 style={{"font-size": "16px", "padding-bottom": "10px"}}><b>Today's Agenda</b></h6>  
                <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total task due</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                        {this.state.taskCount}</h3>
                                    </div>

                                    <div className="col-8 text-right">
                                        <Button variant="success" onClick={()=>this.props.history.push('/tasks' , "from dashboard")}>Create Task</Button>
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
                                            {this.state.eventCount}</h3>
                                    </div>
                                    <div className="col-8 text-right">
                                        <Button variant="info" onClick={()=>this.props.history.push('/calendar')}>Create Event</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                    <Row>
                        <Col md={5} xl={5}>
                            <h6 style={{"font-size": "16px", "padding-bottom": "10px"}}><b>Hourly Metrics</b></h6>
                            <Card className='Recent-Users' style={{ "height": "370px"}}>
                                <Card.Header>
                                    <Card.Title as='h5'>Billable Hours Target</Card.Title>
                                </Card.Header>
                                <Card.Body className='px-0 py-2' style={{ "display": "flex", "justify-content": "center", "align-items": "center"}}>
                                    <div>
                                        <h6 className='mb-4 pl-2'><b>Billable Hours Target</b></h6>
                                        <div>
                                            <Button variant="info" className="btn-sm" onClick={()=>this.props.history.push('/target')}>SET UP YOUR TARGET</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={7} xl={7}>
                            <h6 style={{"font-size": "16px", "padding-bottom": "10px"}}><b>Billing Metrics for Firm</b></h6>
                            <Row>
                                <Col md={12} xl={6}>
                                    <Card>
                                        <Card.Body style={{"padding": "1rem"}}>
                                            <h6 className='mb-4'><b>Draft bills</b></h6>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-4">
                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                                        {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                                    {this.state.draftCount}</h3>
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
                                <Col md={12} xl={6}>
                                    <Card>
                                        <Card.Body style={{"padding": "1rem"}}>
                                            <h6 className='mb-4'><b>Total in draft</b></h6>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-4">
                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                                        {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                                        ${this.state.draftAmount}</h3>
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
                            </Row>
                            <Row>
                                <Col md={12} xl={6}>
                                    <Card>
                                        <Card.Body style={{"padding": "1rem"}}>
                                            <h6 className='mb-4'><b>Unpaid bills</b></h6>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-4">
                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                                        {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                                        {this.state.unPaidCount}</h3>
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
                                <Col md={12} xl={6}>
                                    <Card>
                                        <Card.Body style={{"padding": "1rem"}}>
                                            <h6 className='mb-4'><b>Total unpaid bills</b></h6>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-4">
                                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                                        {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                                        ${this.state.unPaidAmount}</h3>
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
                            </Row>
                            <Row>
                                <Col md={12} xl={6}>
                                    <Card>
                                        <Card.Body style={{"padding": "1rem"}}>
                                            <h6 className='mb-4'><b>Overdue bills</b></h6>
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
                                <Col md={12} xl={6}>
                                    <Card>
                                        <Card.Body style={{"padding": "1rem"}}>
                                            <h6 className='mb-4'><b>Total overdue bills</b></h6>
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
                            </Row>                 
                        </Col>
                    </Row>
                    
                   <Row>   
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
