import React , {useEffect, useState } from 'react'
import api from '../../../../resources/api'
import {Card , Tabs} from 'antd'
import { number } from 'prop-types';
const { TabPane } = Tabs;

function CompanyView(props){
    let response = {}
    const [address, setAddress] = useState()
    const [firstName, setfirstName] = useState()
    const [ID, setID] = useState()
    const [Website, setWebsite] = useState()
    const [Email, setEmail] = useState()
    const [Number, setNumber] = useState()
    useEffect(() => {
    
        async function fetchData() {
           await api.get('/matter/view/5efb32a82d083261e7e21281').then(res=>{
              response = res.data
              console.log(response)
              setValue()
           })
        }
        fetchData();
        
      }, []);
      const setValue = () =>{
          console.log("setValue")
        const adrs = response.data.client.address.map((value, index)=>{
 
            return <div  key ={index}>
                <p>{value.street}</p>
                <p>{value.city}</p>
                <p>{value.state}</p>
                <p>{value.zipCode}</p>
                <p>{value.country}</p>
                <p>{value.type}</p>
            </div>
            })
            console.log(adrs)
            const mail = response.data.client.emailAddress.map((value, index)=>{
                return <div key={index}>
                    <p>{value}</p>
                </div>
            })
            const Num = response.data.client.phone.map((value, index)=>{
                return <div key={index}>
                    <p>{value.number}</p>
                </div>
            })
            const fNAme = response.data.client.firstName
            const IDx = response.data.client._id
            setAddress(adrs)
            setID(IDx)
            setfirstName(fNAme)
            setEmail(mail)
            setNumber(Num)
      }   
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
                <p>Client</p> : {firstName}
                <p>Phone</p>  : {number}
                <p>Email</p>  : {Email}
                <p>Address</p>: {address}
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
        <TabPane tab="Bills" key="9">
            <Card title="Bills" extra={<a href="#"></a>}  style={{ width: "50%" }}>
        </Card>
        </TabPane>
          </Tabs>
        
        
        
        </div>

}
export default CompanyView
