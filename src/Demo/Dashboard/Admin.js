import React from 'react';
import {Row, Col, Card, Table} from 'react-bootstrap';
import { Tabs } from "antd"

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import api from "../../resources/api"
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import GrowthChart from '../../App/components/GrowthChart/index'
import WeeklyGrowth from '../../App/components/GrowthChart/weekly'
import MonthlyGrowth from '../../App/components/GrowthChart/monthly'
const { TabPane } = Tabs;

class AdminDashboard extends React.Component {

    constructor(){
        super()
        this.state = {
            yearly : {
                totalLawyers : 0,
                totalMatters : 0,
                totalContacts : 0,
                subscriptions : 0,
                Amount : 0
            },
            monthly : {
                totalLawyers : 0,
                totalMatters : 0,
                totalContacts : 0,
                subscriptions : 0,
                Amount : 0
            },
            weekly : {
                totalLawyers : 0,
                totalMatters : 0,
                totalContacts : 0,
                subscriptions : 0,
                Amount : 0
            },
            active : {
                totalLawyers : 0,
                totalMatters : 0,
                totalContacts : 0,
                subscriptions : 0,
                Amount : 0
            }


        }
    }
    componentDidMount(){
        const now = new Date();

         var start_of_week = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay())
         var end_of_week = new Date(
           now.getTime() + (6 - now.getDay()) * 24 * 60 * 60 * 1000
         );

         var start_of_the_month = new Date(now.getFullYear(), now.getMonth(), 1)
         var end_of_the_month = new Date(now.getFullYear(), now.getMonth() + 1, 0)

         var start_of_the_year = new Date(now.getFullYear(), 0, 1)
         var end_of_the_year = new Date(now.getFullYear(), 11, 31)

         console.log(now)
         console.log(start_of_week)
         console.log(end_of_week)
         console.log(start_of_the_month)
         console.log(end_of_the_month)
         console.log(start_of_the_year)
         console.log(end_of_the_year)

        let usersCount = 0
        let wuser = 0
        let muser = 0
        api.get("/admin/showall").then((res)=>{
            console.log(res)
            res.data.data.map((val, index)=>{
                let userDate = new Date(val.created_at)
                if(userDate <= end_of_week && userDate >= start_of_week)
                    {
                        wuser++
                    }
                if(userDate <= end_of_the_month && userDate >= start_of_the_month)
                    {
                        muser++
                 }
                if(userDate <= end_of_the_year && userDate >= start_of_the_year)
                 {
                     usersCount++
                   }
            })
            
            let newState = this.state
            newState.yearly.totalLawyers = usersCount
            newState.monthly.totalLawyers = muser
            newState.weekly.totalLawyers = wuser
            newState.active.totalLawyers = wuser
            console.log(newState)
            this.setState(newState)

            
        })

        let mattersCount = 0
        let wmatter = 0
        let mmatter = 0
        api.get("/matter/showall").then((res)=>{
            console.log(res)
            res.data.data.map((val, index)=>{
                let date = new Date(val.created_at)
                if(date <= end_of_week && date >= start_of_week)
                    {
                        wmatter++
                    }
                if(date <= end_of_the_month && date >= start_of_the_month)
                    {
                        mmatter++
                 }
                if(date <= end_of_the_year && date >= start_of_the_year)
                 {
                     mattersCount++
                   }
            })
            
            let newState = this.state
            newState.yearly.totalMatters = mattersCount
            newState.monthly.totalMatters = mmatter
            newState.weekly.totalMatters = wmatter
            newState.active.totalMatters = wmatter
            console.log(newState)
            this.setState(newState)

            
        })

        let contactsCount = 0
        let wcontact = 0
        let mcontact = 0

        api.get("/contact/showall").then((res)=>{
            console.log(res)
            res.data.data.map((val, index)=>{
                let Contactdate = new Date(val.created_at)
                if(Contactdate <= end_of_week && Contactdate >= start_of_week)
                    {
                        wcontact++
                    }
                if(Contactdate <= end_of_the_month && Contactdate >= start_of_the_month)
                    {
                        mcontact++
                 }
                if(Contactdate <= end_of_the_year && Contactdate >= start_of_the_year)
                 {
                     contactsCount++
                   }
            })
            
            let newState = this.state
            newState.yearly.totalContacts = contactsCount
            newState.monthly.totalContacts = mcontact
            newState.weekly.totalContacts = wcontact
            newState.active.totalContacts = wcontact
            console.log(newState)
            this.setState(newState)
        })
        let subscriptionCount = 0
        let wsubscription = 0
        let msubscription = 0
        let tAmount = 0
        let mAmount = 0
        let wAmount = 0
        api.get(`subscription/showall`).then((res)=>{
            console.log(res)
            res.data.data.map((val, index)=>{
                if(val.userId != null){
                    let subDate = new Date(val.userId.registeredOn.date)
                if(val.requestGranted === "Yes"){
                    console.log(val)
                    if(subDate <= end_of_week && subDate >= start_of_week)
                    {
                        wsubscription++
                        if(val.subscriptionRequested === "monthly"){
                            wAmount = wAmount + 100
                        }else{
                            wAmount = wAmount + 1200
                        }
                        
                    }
                if(subDate <= end_of_the_month && subDate >= start_of_the_month)
                    {
                        msubscription++
                        if(val.subscriptionRequested === "monthly"){
                            mAmount = mAmount + 100
                        }else{
                            mAmount = mAmount + 1200
                        }
                     }
                if(subDate <= end_of_the_year && subDate >= start_of_the_year)
                 {
                     subscriptionCount++
                     if(val.subscriptionRequested === "monthly"){
                        tAmount = tAmount + 100
                    }else{
                        tAmount = tAmount + 1200
                    }
                   }
                }
                }
            })
            
            let newState = this.state
            newState.yearly.subscriptions = subscriptionCount
            newState.monthly.subscriptions = msubscription
            newState.weekly.subscriptions = wsubscription
            newState.active.subscriptions = wsubscription

            newState.yearly.Amount = tAmount
            newState.monthly.Amount = mAmount
            newState.weekly.Amount = wAmount
            newState.active.Amount = wAmount
            console.log(newState)
            this.setState(newState)

            
        })

          
    }

    render() {
        
        
        const callback = (key) =>{
            console.log(key)
            
            if(key == 1){
                this.setState({
                    active : this.state.weekly
                })
            }else
            if(key == 2){
              console.log("Key == 2")
              this.setState({
                active : this.state.monthly
            })
            }else{
                if(key == 3){
                    console.log("Key == 3")
                    this.setState({
                      active : this.state.yearly
                  })
                  }
            }
            
            
          }
        const data = 
            <Row>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Lawyers</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> */}
                                            {this.state.active.totalLawyers}</h3>
                                    </div>

                                    {/* <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg text-white rounded-pill f-14 f-w-400 ">Create Task</a>
                                    </div> */}
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
                                <h6 className='mb-4'>Total Matters</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-down text-c-red f-30 m-r-5"/> */}
                                            {this.state.active.totalMatters}</h3>
                                    </div>

                                    {/* <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg2 text-white rounded-pill f-14 f-w-400 ">Create Events</a>
                                    </div> */}
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
                                <h6 className='mb-4'>Total Contacts</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                            {this.state.active.totalContacts}</h3>
                                    </div>

                                    {/* <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg text-white rounded-pill f-14 f-w-400 ">Create Bills</a>
                                    </div> */}
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Subscribers</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                           {this.state.active.subscriptions}</h3>
                                    </div>

                                    {/* <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg text-white rounded-pill f-14 f-w-400 ">Create Bills</a>
                                    </div> */}
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Amount</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-4">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                            {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5"/>  */}
                                            {this.state.active.Amount}</h3>
                                    </div>

                                    {/* <div className="col-8 text-right">
                                        <a href="#!" class="label theme-bg text-white rounded-pill f-14 f-w-400 ">Create Bills</a>
                                    </div> */}
                                </div>
                                {/* <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={12}>
                      
                    </Col>



                </Row>
           
        
        return (
            <Aux>
                <Tabs
                    defaultActiveKey="1"
                    onChange={callback}
                    className="card p-4 overflow-auto"
                    >
                    <TabPane tab="Weekly" key="1">
                    {
                            data
                        }
                          <WeeklyGrowth></WeeklyGrowth>
                    </TabPane>
                    <TabPane tab="Monthly" key="2">
                    {
                            data
                        }
                          <MonthlyGrowth></MonthlyGrowth>
                    </TabPane>
                    <TabPane tab="Yearly" key="3">
                        {
                            data
                        }
                          <GrowthChart/>
                    </TabPane>
                    </Tabs>
            </Aux>
        );
    }
}

export default AdminDashboard;