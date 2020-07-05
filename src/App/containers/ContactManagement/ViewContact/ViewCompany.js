import React , {useEffect, useState } from 'react'
import api from '../../../../resources/api'
import {Card} from 'antd'
import { Button } from 'react-bootstrap'
import { responsiveMap } from 'antd/lib/_util/responsiveObserve'

let address = null
let title = null
let ID = null
let Website = null
let Email = null
let Number= null
let Rate = null
let data = null
let response = {}
class companyView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }
    async componentDidMount(){
        await api.get('/company/view/5ef5ca4a5080d35bcc38d416').then(res=>{
            response = res
         })
    }
    componentWillUpdate(){
        console.log(response.data)
        data = response.data.data
        title = response.data.data.name
        ID = response.data.data.billingClientId
        Rate = response.data.data.billingCustomRate
        address = response.data.data.address.map((value, index)=>{
 
            return <div  key ={index}>
                <p>{value.street}</p>
                <p>{value.city}</p>
                <p>{value.state}</p>
                <p>{value.zipCode}</p>
                <p>{value.country}</p>
                <p>{value.type}</p>
            </div>
            })
             Website = response.data.data.website.map((value, index)=>{
    
                return <div key={index}>
                    <p>{value}</p>
                </div>
            })
            Email = response.data.data.emailAddress.map((value, index)=>{
                return <div key={index}>
                    <p>{value}</p>
                </div>
            })
            Number = response.data.data.phone.map((value, index)=>{
                return <div key={index}>
                    <p>{value.number}</p>
                </div>
            })
    }
    render(){
        console.log(data)
        return<div>
            <Card  style={{ width: "100%" }}>{title}</Card>
            <Card extra={<Button variant="link" onClick={()=>this.props.history.push('/manage/contacts/edit/person', data)}>Edit</Button>} title="Contact Details" style={{ width: "100%" }}>
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
}

export default companyView