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
 
            return <div className="table-span-light" key ={index}>
                <p style={{"font-size": "15px"}}>{value.type}</p>
                <p>{value.street}</p>
                <p>{value.city}</p>
                <p>{value.state}</p>
                <p>{value.zipCode}</p>
                <p>{value.country}</p>
                
            </div>
            })
            const Web = response.data.data.website.map((value, index)=>{
    
                return <div className="table-span-light" key={index}>
                    <p>{value}</p>
                </div>
            })
            const mail = response.data.data.emailAddress.map((value, index)=>{
                return <div className="table-span-light" key={index}>
                    <p>{value}</p>
                </div>
            })
            const Num = response.data.data.phone.map((value, index)=>{
                return <div className="table-span-light" key={index}>
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
            <Card title="Contact Details" className="form-width2 mb-4">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Email Address</span></td>
                            <td className="border-0 py-2"><span className="table-span-light">{Email}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Phone Number</span></td>
                            <td className="border-0 py-2"><span className="table-span-light">{Number}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Website</span></td>
                            <td className="border-0"><span className="table-span-light">{Website}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Address</span></td>
                            <td className="border-0 py-2"><span className="table-span-light">{address}</span></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
            <Card title="Billing Information" className="form-width2 mb-4">
                <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">ID</span></td>
                            <td className="border-0 py-2"><span className="table-span-light">{ID}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Rate</span></td>
                            <td className="border-0 py-2"><span className="table-span-light">{Rate}</span></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </div>

}
export default CompanyView
