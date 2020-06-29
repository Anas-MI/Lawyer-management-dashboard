import React , {useEffect, useState } from 'react'
import api from '../../../../resources/api'
import {Card , Tabs} from 'antd'
const { TabPane } = Tabs;

function CompanyView(props){
    let response = {}
/*
    useEffect(() => {
    
        async function fetchData() {
           await api.get('/company/view/5ef5ca4a5080d35bcc38d416').then(res=>{
              response = res
              console.log(response)
              setValue()
           })

        }
        fetchData();
      }, []);

      const setValue = () =>{
   
      }
  */    
 function callback(key) {
    console.log(key);
  }
 return<div>
     <Tabs defaultActiveKey="1" onChange={callback}>
     <TabPane tab="Dashboard" key="1">
       <Card title="Financial" extra={<a href="#">Add Expense</a>} style={{ width: "50%" }}>
                <p> Work In progress Amount</p>
                <p>Outstanding Amount</p>
                <p>Trust Funds
                </p>
            </Card>
            <Card title="Contact" extra={<a href="#">Add Contact</a>}  style={{ width: "50%" }}>
                <p>Client</p>
                <p>Phone</p>
                <p>Email</p>
                <p>Address</p>
        </Card>
     </TabPane>
     <TabPane tab="Acitivites" key="2">       
            <Card title="Activities" extra={<a href="#">Add Activity</a>}  style={{ width: "50%" }}>
                <Card extra={<div><a href="#">Edit</a> <a href="#">Delete</a><a href="#">Dublicate</a></div>} >
                <p>Action </p>
                <p>Type</p>
                <p>Qty</p>
                <p>Discription</p>
                <p>Rate</p>
                <p>Non billable</p>
                <p>Date</p>
                <p>User</p>
                <p>Invoice status</p>
            </Card>
            </Card>
        </TabPane>
        <TabPane tab="Calendar" key="3">
            <Card title="Calender" extra={<a href="#"></a>}  style={{ width: "50%" }}>
                <p>Start</p>
                <p>End</p>
                <p>title</p>
                <p>Description</p>
            </Card>
        </TabPane>
        <TabPane tab="Communication" key="4">
            <Card title="Communication" extra={<a href="#"></a>}  style={{ width: "50%" }}>
        </Card>
        </TabPane>
        <TabPane tab="Phone Log" key="5">
            <Card title="Phone Log" extra={<a href="#"></a>}  style={{ width: "50%" }}>
        </Card>
        </TabPane>
        <TabPane tab="Notes" key="6">
            <Card title="Notes" extra={<a href="#"></a>}  style={{ width: "50%" }}>
        </Card>
        </TabPane>
        <TabPane tab="Document" key="7">
            <Card title="Document" extra={<a href="#"></a>}  style={{ width: "50%" }}>
        </Card>
        </TabPane>
        <TabPane tab="Task" key="8">
            <Card title="Task" extra={<a href="#"></a>}  style={{ width: "50%" }}>
        </Card>
        </TabPane>
        <TabPane tab="Bills" key="6">
            <Card title="Bills" extra={<a href="#"></a>}  style={{ width: "50%" }}>
        </Card>
        </TabPane>
          </Tabs>
        
        
        
        </div>

}
export default CompanyView