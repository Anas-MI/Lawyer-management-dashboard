import React , {useEffect } from 'react'
import api from '../../../../resources/api'
import {Card} from 'antd'


function Example(props) {
    console.log(props)
  /*
      const Address = response.data.data.address.map((value, index)=>{
 
        return <div  key ={index}>
            <p>{value.street}</p>
            <p>{value.city}</p>
            <p>{value.state}</p>
            <p>{value.zipCode}</p>
            <p>{value.country}</p>
            <p>{value.type}</p>
        </div>
        })
        const Website = response.data.data.website.map((value, index)=>{
    
            return <div key={index}>
                <p>{value}</p>
            </div>
        })
        const Email = response.data.data.emailAddress.map((value, index)=>{
            return <div key={index}>
                <p>{value}</p>
            </div>
        })
        const Number = response.data.data.phone.map((value, index)=>{
            return <div key={index}>
                <p>{value}</p>
            </div>
        })
    
      return (
        <div>
                <Card title={response.data.data.name} style={{ width: "100%" }}>
                </Card>
                <Card title="Contact Details" style={{ width: 300 }}>
                    <p>Email Address : {Email}</p>
                    <p>Phone Number : {Number}</p>
                    <p>Website : {Website}</p>
                    <p>Address : {Address}</p>
                    
                </Card>
                <Card title="Billing Information" style={{ width: 300 }}>
                    <p>ID : {response.data.data.billingClientId}</p>
                    <p>Rate : {response.data.data.billingCustomRate}</p>
                    
                </Card>
            </div>
      ); */
    
  }

  export default Example