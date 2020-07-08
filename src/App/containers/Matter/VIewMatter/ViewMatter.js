import React , {useEffect, useState } from 'react'
import api from '../../../../resources/api'
import {Card , Tabs, Button, Modal} from 'antd'
import { number } from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap'
const { TabPane } = Tabs;

function CompanyView(props){
    let response = {}
    let calendar= {}
    let task = {}
    const [state, setState] = useState({visible : false})
    const [contact, setContact] = useState([])
    const [Calendar, setCalendar] = useState([])
    const [Task, setTask] = useState([])
    const [address, setAddress] = useState()
    const [events, setEvents] = useState()
    const [firstName, setfirstName] = useState()
    const [ID, setID] = useState()
    const [Website, setWebsite] = useState()
    const [Email, setEmail] = useState()
    const [Number, setNumber] = useState()
    console.log(props.location.state.id)
    useEffect(() => {
    
        async function fetchData() {
           await api.get('/matter/view/'+props.location.state.id).then(res=>{
              response = res.data
              console.log(response)
             
           })  
           calendar = await api.get('/calendar/viewforuser/'+props.location.state.id)
           .then(
            task = await api.get('/tasks/fetchformatter/'+props.location.state.id)
           ) 
           console.log(calendar)
           setValue()
        }
        fetchData();
        
      }, []);


      const setValue=()=>{
        let data = []
         //  setRealatedContacts(rcntct)
         response.data.relatedContacts.map(async(value, index)=>{
            console.log(value.contact)
           const cntct = await api.get('/contact/view/'+value.contact)
           console.log(cntct.data)
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
           data.push(<Card  title="Related Contact"  className="form-width mb-4">
            <table class="table table-borderless">
            <tbody>
            <tr>
                <td className="border-0 py-2"><span className="table-span-dark">Client</span></td>
                <td className="border-0 py-2"><span className="table-span-light">{cntct.data.data.firstName + cntct.data.data.lastName}</span></td>
            </tr>
            <tr>
                <td className="border-0 py-2"><span className="table-span-dark">Phone</span></td>
                <td className="border-0 py-2"><span className="table-span-light">{Num}</span></td>
            </tr>
            <tr>
                <td className="border-0 py-2"><span className="table-span-dark">Email</span></td>
                <td className="border-0"><span className="table-span-light">{mail}</span></td>
            </tr>
        </tbody>
    </table>
        </Card>)
             setContact(data)
       }
)
       
       let cal = []
       calendar.data.data.map((value,index)=>{
        cal.push(  <Card title="Calendar"  className="form-width mb-4">
        <table class="table table-borderless">
                <tbody>
                    <tr>
                        <td className="border-0 py-2"><span className="table-span-dark">Start</span></td>
    <td className="border-0 py-2"><span className="table-span-light">{value.startTime}</span></td>
                    </tr>
                    <tr>
                        <td className="border-0 py-2"><span className="table-span-dark">End</span></td>
                        <td className="border-0 py-2"><span className="table-span-light">{value.endTime}</span></td>
                    </tr>
                    <tr>
                        <td className="border-0 py-2"><span className="table-span-dark">Title</span></td>
                        <td className="border-0"><span className="table-span-light">{value.title}</span></td>
                    </tr>
                    <tr>
                        <td className="border-0 py-2"><span className="table-span-dark">Description</span></td>
                        <td className="border-0 py-2"><span className="table-span-light">{value.description}</span></td>
                    </tr>
                </tbody>
            </table>
        </Card>)
        setCalendar(cal)
    })
  
        let tsk = []
        task.data.data.map((value,index)=>{
            tsk.push(  <Card title="Task"  className="form-width mb-4">
            <table class="table table-borderless">
                    <tbody>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Date</span></td>
        <td className="border-0 py-2"><span className="table-span-light">{value.dueDate}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Task</span></td>
                            <td className="border-0 py-2"><span className="table-span-light">{value.taskName}</span></td>
                        </tr>
                        <tr>
                            <td className="border-0 py-2"><span className="table-span-dark">Description</span></td>
                            <td className="border-0"><span className="table-span-light">{value.description}</span></td>
                        </tr>
                    </tbody>
                </table>
            </Card>)
            setTask(tsk)
        })

    /*   
        
       */
       // setEvents(evnt)

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

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = e => {
    console.log(e);
    setState({
      visible: false,
    });
  };

  const handleCancel = e => {
    console.log(e);
    setState({
      visible: false,
    });
  };
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
            <Card title="Details" extra={<Button type="link" onClick={showModal}>Add Contact</Button>}  className="form-width mb-4">
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
     
            {
                contact.map((value,index)=>{
                    return value
                })
            }
              <Modal
                title="Add Contact"
                visible={state.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <Form>
                    <Row>
                    <Col>
                            <Form.Group controlId="relationship">
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control name='relationship' type="text" placeholder="Relationship"  />
                            </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="rcontact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control as="select" name="contact"   >
                            <option>1</option>
                            <option>2</option>
                        </Form.Control>
                        </Form.Group>
                    </Col>
                </Row> 
                <Form.Group controlId="billThis">
                    <Form.Check name="billThis" type="checkbox" label="Bill this contact"     />
                </Form.Group>
                </Form>
                </Modal>
        
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
            {console.log(Calendar)}
        {
            Calendar
        }
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
           {
               Task
           }
        </TabPane>
        <TabPane tab="Bills" key="9">
            <Card title="Bills" extra={<a href="#"></a>}  className="form-width mb-4">
        </Card>
        </TabPane>
          </Tabs>
        
        
        
        </div>

}
export default CompanyView
