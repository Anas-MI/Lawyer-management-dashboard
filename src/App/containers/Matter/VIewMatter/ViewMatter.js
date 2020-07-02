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
 
            return <div className="table-span-light" key ={index}>
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
                return <div className="table-span-light" key={index}>
                    <p>{value}</p>
                </div>
            })
            const Num = response.data.client.phone.map((value, index)=>{
                return <div className="table-span-light" key={index}>
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
     <TabPane tab="Dashboard" key="1" style={{"padding" : "0px"}}>
       <Card title="Financial" extra={<a href="#">Add Expense</a>} className="form-width mb-4">
           <div className="text-center pt-2" >
                <div>Work In progress Amount</div>
                <div class="d-flex py-2 mt-2 matter-amount">
                    <div style={{"flex": 1,"border-right": "2px solid #B2E4D6"}}>
                        <p><b>Outstanding Amount</b></p>
                        <span>$347.00</span>
                    </div>
                    <div style={{"flex": 1}}>
                        <p><b>Trust Funds</b></p>
                        <span>$500.00</span>
                    </div>
                </div>
           </div>
            
        </Card>
            <Card title="Deails" extra={<a href="#">Add Contact</a>}  className="form-width mb-4">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Client</span></td>
                            <td className="border-0 py-2"><span className="table-span-light">{firstName}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Phone</span></td>
                            <td className="border-0 py-2"><span className="table-span-light">{number}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Email</span></td>
                            <td className="border-0"><span className="table-span-light">{Email}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Address</span></td>
                            <td className="border-0 py-2"><span className="table-span-light">{address}</span></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
     </TabPane>
     <TabPane tab="Acitivites" key="2">       
            <Card title="Activities" extra={<a href="#">Add Activity</a>}  className="form-width mb-4">
                <Card extra={<div><a href="#">Edit</a> <a href="#">Delete</a> <a href="#">Dublicate</a></div>}>
                <table class="table table-borderless form-width">
                    <tbody>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Action</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Type</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Qty</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Discription</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Rate</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Non Billable</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Date</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">User</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Invoice Status</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
            </Card>
        </TabPane>
        <TabPane tab="Calendar" key="3">
            <Card title="Calender" extra={<a href="#"></a>}  className="form-width mb-4">
            <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Start</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">End</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Title</span></td>
                            <td className="border-0"><span className="table-span-light"></span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Description</span></td>
                            <td className="border-0 py-2"><span className="table-span-light"></span></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </TabPane>
        <TabPane tab="Communication" key="4">
            <Card title="Communication" extra={<a href="#"></a>}  className="form-width mb-4">
        </Card>
        </TabPane>
        <TabPane tab="Phone Log" key="5">
            <Card title="Phone Log" extra={<a href="#"></a>}  className="form-width mb-4">
        </Card>
        </TabPane>
        <TabPane tab="Notes" key="6">
            <Card title="Notes" extra={<a href="#"></a>}  className="form-width mb-4">
        </Card>
        </TabPane>
        <TabPane tab="Document" key="7">
            <Card title="Document" extra={<a href="#"></a>}  className="form-width mb-4">
        </Card>
        </TabPane>
        <TabPane tab="Task" key="8">
            <Card title="Task" extra={<a href="#"></a>}  className="form-width mb-4">
        </Card>
        </TabPane>
        <TabPane tab="Bills" key="9">
            <Card title="Bills" extra={<a href="#"></a>}  className="form-width mb-4">
        </Card>
        </TabPane>
          </Tabs>
        
        
        
        </div>

}
export default CompanyView
