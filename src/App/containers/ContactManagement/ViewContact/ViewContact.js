import React , {useEffect, useState } from 'react'
import api from '../../../../resources/api'
import {Card} from 'antd'

function CompanyView(props){
    let response = {}
    const [address, setAddress] = useState()
    const [Title, setTitle] = useState()
    const [ID, setID] = useState()
    const [Website, setWebsite] = useState()
    const [Email, setEmail] = useState()
    const [Number, setNumber] = useState()
    const [Rate, setRate] = useState()
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
        const ttl = response.data.data.name
        const idx = response.data.data.billingClientId
        const rte = response.data.data.billingCustomRate
        const adrs = response.data.data.address.map((value, index)=>{
 
            return <div  key ={index}>
                <p>{value.street}</p>
                <p>{value.city}</p>
                <p>{value.state}</p>
                <p>{value.zipCode}</p>
                <p>{value.country}</p>
                <p>{value.type}</p>
            </div>
            })
            const Web = response.data.data.website.map((value, index)=>{
    
                return <div key={index}>
                    <p>{value}</p>
                </div>
            })
            const mail = response.data.data.emailAddress.map((value, index)=>{
                return <div key={index}>
                    <p>{value}</p>
                </div>
            })
            const Num = response.data.data.phone.map((value, index)=>{
                return <div key={index}>
                    <p>{value.number}</p>
                </div>
            })
        setAddress(adrs)
        setID(idx)
        setRate(rte)
        setTitle(ttl)
        setEmail(mail)
        setNumber(Num)
        setWebsite(Web)
      }
      
 return<div>
            <Card style={{ width: "100%" }}>{Title}</Card>
            <Card title="Contact Details" style={{ width: "100%" }}>
                <p>Email Address : </p> {Email}
                <p>Phone Number : </p> {Number}
                <p>Website : </p> {Website}
                <p>Address : </p> {address}
                
            </Card>
            <Card title="Billing Information" style={{ width: 300 }}>
                <p>ID : </p> {ID}
                <p>Rate : </p> {Rate}
                
            </Card>
        </div>

}
export default CompanyView
