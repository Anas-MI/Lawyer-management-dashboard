import React , {useEffect, useState } from 'react'
import api from '../../../../resources/api'
import {Card, Button, Tabs} from 'antd'
import { useDispatch, useSelector } from "react-redux";
const { TabPane } = Tabs;


function CompanyView(props){
    let response = {}
    let data = null
    const [url ,setUrl] = useState("")
    const userId = useSelector(state=>state.user.token.user._id)
    const [address, setAddress] = useState()
    const [Title, setTitle] = useState()
    const [ID, setID] = useState()
    const [Website, setWebsite] = useState()
    const [Email, setEmail] = useState()
    const [Number, setNumber] = useState()
    const [Rate, setRate] = useState()
    useEffect(() => {
   
        async function fetchData() {
           await api.get('/contact/view/'+ props.location.state).then(res=>{
              response = res.data.data
              console.log(response)
              setValue()
           })

        }
        console.log(props.location.state)
        fetchData();
      }, []);

      const setValue = () =>{
        const ttl = response.firstName +" "+ response.lastName
        const URL = response.image
        data = response
        const idx = response.billingClientId
        const rte = response.billingCustomRate
        const adrs = response.address.map((value, index)=>{
 
            return <div className="table-span-light" key ={index}>
                <p style={{"font-size": "15px"}}>{value.type}</p>
                <p>{value.street}</p>
                <p>{value.city}</p>
                <p>{value.state}</p>
                <p>{value.zipCode}</p>
                <p>{value.country}</p>
                
            </div>
            })
            const Web = response.website.map((value, index)=>{
    
                return <div className="table-span-light" key={index}>
                    <p>{value}</p>
                </div>
            })
            const mail = response.emailAddress.map((value, index)=>{
                return <div className="table-span-light" key={index}>
                    <p>{value}</p>
                </div>
            })
            const Num = response.phone.map((value, index)=>{
                return <div className="table-span-light" key={index}>
                    <p>{value}</p>
                </div>
            })
            setUrl(URL)
        setAddress(adrs)
        setID(idx)
        setRate(rte)
        setTitle(ttl)
        setEmail(mail)
        setNumber(Num)
        setWebsite(Web)
      }
      
 return(
    <>
    <Tabs defaultActiveKey="1">
        <TabPane tab="Dashboard" key="1" style={{ padding: '0px' }}>
        <div className="d-flex flex-wrap mb-3">
            <div>
                <h3>{Title}</h3>
            </div>
            <div className="green-span">
                <p>Client</p>  
            </div>
        </div>
        <div className="d-flex flex-wrap"> 
            <Card extra={<Button type="link" onClick={()=>props.history.push('/edit/contact', props.location.state)}>Edit</Button>} title="Contact Details" className="m-2 card-box">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td><img height="200" width="200" src={url} alt="No image"></img></td>
                        </tr>
                       <tr>
                            <td className="border-0 py-1"><span className="table-span-dark">Name</span></td>
                            <td className="border-0 py-1"><span className="table-span-light">{Title}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-1"><span className="table-span-dark">Email Address</span></td>
                            <td className="border-0 py-1"><span className="table-span-light">{Email}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-1"><span className="table-span-dark">Phone Number</span></td>
                            <td className="border-0 py-1"><span className="table-span-light">{Number}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-1"><span className="table-span-dark">Website</span></td>
                            <td className="border-0 py-1"><span className="table-span-light">{Website}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-1"><span className="table-span-dark">Address</span></td>
                            <td className="border-0 py-1"><span className="table-span-light">{address}</span></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
            <Card title="Billing Information" className="m-2 card-box">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td className="border-0 py-1"><span className="table-span-dark">ID</span></td>
                            <td className="border-0 py-1"><span className="table-span-light">{ID}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-1"><span className="table-span-dark">Rate</span></td>
                            <td className="border-0 py-1"><span className="table-span-light">{Rate}</span></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </div>
        </TabPane>
        
        <TabPane tab="Communication" key="4">
          
        </TabPane>
        <TabPane tab="Phone Log" key="5">
          <Card
            title="Phone Log"
            extra={<a href="#"></a>}
            className="form-width mb-4"
          ></Card>
        </TabPane>
        <TabPane tab="Notes" key="6">
          <Card
            title="Notes"
            extra={<a href="#"></a>}
            className="form-width mb-4"
          ></Card>
        </TabPane>
        <TabPane tab="Document" key="7">
          {/* 
            <Documents
            matters={props.location.state.matters}
            userId={props.location.state.userId}
            matterId={props.location.state.id}
          />
          */

          }
        </TabPane>
        <TabPane tab="Bills" key="9">
          
        </TabPane>
        <TabPane tab="Transactions" key="10">
        </TabPane>
      </Tabs>
        
    </>
 )

}
export default CompanyView
