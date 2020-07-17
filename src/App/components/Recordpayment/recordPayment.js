import React from 'react'
import { Card , Space, Table, Button, notification } from 'antd'
import { Form , Col , Row } from 'react-bootstrap'
import api from '../../../resources/api'
import { connect } from 'react-redux'

let optns = null
let contacts = {}
class Record extends React.Component{
   constructor(props){
       super(props)
       this.state = {
           data : {
               client : "",
            //   destination : "",
               paymentDate : "" , 
               source : "" ,
               userId : this.props.userId

           }
       }
   }
   componentDidMount(){
     api.get('/contact/viewforuser/'+this.props.userId).then((res)=>{
         contacts = res.data.data
         optns = res.data.data.map((value, index)=>{
          return <option id={index}>{value.firstName}</option>
           })
     }).then(()=>{
         this.setState({options : optns})
        })
    
    
   }
    render(){
        const handleChange = (e) => {
            e.persist()
            const { name, id, value} = e.target
            let newData = this.state.data
          
            if(name === "client"){
                newData[name] = contacts[e.target.selectedIndex]
            }else{
                newData[name] = value
            }
            this.setState({data : newData})  
             
            console.log(this.state.data)
        }
        const handleSubmit = (e) =>{
            if(this.state.data.client === "" || this.state.data.source ===  "Select a client"){
                notification.error({message : "Please select a client"})
            }else if(this.state.data.source === "" || this.state.data.source ===  "Select a Source"){
                notification.error({message : "Please select a source"})
            } /* else if(this.state.data.destination === "" || this.state.data.destination === "Select a Destination"){
                notification.error({message : "Please select a destination"})
            }*/else if(this.state.data.paymentDate === ""){
                notification.error({message : "Please select a payment date"})
            }else{
               api.post('/billing/create',this.state.data).then((res)=>{
                   console.log(res)
                   notification.success({message : "Bill Recorded"})
                   this.props.history.goBack()
               }).catch((err)=>{
                    notification.error({message : "Failure "})
               })
            }
        }
        const dataSource = [
          
          ];
          
          const columns = [
            {
              title: 'Invoice ID',
              dataIndex: 'invoiceID',
              key: 'invoiceID',
            },
            {
                title: 'Matter',
                dataIndex: 'matter',
                key: 'matter',
              },
              {
                title: 'Issue Date',
                dataIndex: 'issueDate',
                key: 'issueDate',
              },
              {
                title: 'Due In',
                dataIndex: 'dueIn',
                key: 'dueIn',
              },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
            },
           
            {
                title: 'Intrest',
                dataIndex: 'intrest',
                key: 'intrest',
              },
             
            
             
              {
                title: 'Open Balance',
                dataIndex: 'openBalance',
                key: 'openBalance',
              },
              {
                title: 'Payment',
                 dataIndex: 'payment',
                 key: 'payment',
               }, 
          ];
      

        const title = <div style={{"display": "flex", "flex-wrap": "wrap" }}>
                        <div className="mr-4">
                            <p style={{fontWeight : "bold"}}>Total open balance</p>
                            <p style={{fontWeight : "bold", "float": "right", "font-size": "17px"}}>₹0.00</p>
                        </div>
                        <div>
                            <Form className="pt-0">
                                <Row>
                                    <Col md="8">
                                    <Form.Group controlId="paymentAmount">
                                    <Form.Label style={{fontWeight : "bold"}}>Payment Amount</Form.Label>
                                    <Form.Control
                                    style={{height : "38px"}}
                                    required
                                    name="paymentAmount"
                                    type="text"
                                    onChange = { handleChange }
                                    placeholder="0.00"
                                //    onChange={handleChange}
                                    />
                            </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                      </div>

        const invoiceTitle =  this.state.data.client===""?  <h4 style={{textAlign:"center", fontWeight:"bold"}}>Select a client to record a payment.</h4> : title
       
        const invoiceBody = this.state.data.client===""?
                            null 
                            : 
                            <div>

                                <Card bodyStyle={{"padding": "0px"}} className="overflow-auto">
                                    <Table dataSource={dataSource} columns={columns} />
                                </Card> 


                                <div className="mt-3" style={{"display": "flex", "flex-wrap": "wrap", "justify-content": "space-between" }}>
                                    <div style={{"flex" : "1"}} className="mr-3">
                                        <Form className="pt-0">
                                            <Form.Group controlId="formGroupMatter">
                                            <Form.Label style={{fontWeight : "bold"}}>Description</Form.Label>
                                            <Form.Control 
                                                required name='description' 
                                                as="textarea" 
                                                rows="3" 
                                                type="text"
                                                placeholder="Description"
                                                onChange={handleChange} />
                                            </Form.Group>
                                        </Form>
                                    </div>
                                    <div style={{"flex" : "1"}} className="pt-4">
                                        <Card bodyStyle={{"padding": "10px 20px"}}>
                                            <p style={{"font-size" : "17px"}}><b>Summary</b></p>
                                            <p><b>Payment :</b></p>
                                        </Card>
                                    </div>
                                </div>
                            </div>

        return <div>
            <Card title="Record Payment" bodyStyle={{"padding": "0px 24px 0px"}} className="mb-4">
             <Form className="form-details">
                 <Row>
                     <Col md="3">
                        <Form.Group controlId="formGroupCompany">
                            <Form.Label>Client</Form.Label>
                            <Form.Control 
                            name="client" 
                            as="select"
                            onChange = { handleChange }>
                                <option>Select a client</option>
                                {this.state.options}
                            </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col md="3">
                     <Form.Group controlId="source">
                            <Form.Label>Source</Form.Label>
                            <Form.Control
                             name="source"
                              as="select"
                              onChange = { handleChange }>
                                <option>Select a Source</option>
                                <option>Card Payment</option>
                                <option>Cash Payment</option>
                                <option>Net Banking</option>
                                <option>Other</option>
                            </Form.Control>
                        </Form.Group>
                     </Col>

                 </Row>
                 <Row>
                    <Col md="3">
                       <Form.Group controlId="date">
                            <Form.Label>Payment Date</Form.Label>
                            <Form.Control 
                            type="date"  
                            name="paymentDate"
                            onChange = { handleChange } />
                        </Form.Group>
                    </Col>
                    <Col md="3">
                       <Form.Group controlId="destinaation">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control 
                            name="destination" 
                            as="select"
                            onChange = { handleChange }>
                                <option>Select a Destination</option>
                                <option>Destination</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                 </Row>
                 <Row>
                    <Col md="4">
                        <Form.Group controlId="formGroupLastName">
                            <Form.Label>Reference</Form.Label>
                            <Form.Control
                            required
                            name="reference"
                            type="text"
                            placeholder="Enter a checking or reference # here"
                            onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                 </Row>
             </Form>
            </Card>

            <Card>
                {invoiceTitle}
            </Card>

            {invoiceBody}

            <div className="pt-3">
                <Button type="primary" onClick={handleSubmit}>Record</Button>
                <Button onClick={()=>{this.props.history.goBack()}}>Cancel</Button>
            </div>
    </div>
    }
}

const mapStateToProps = state => ({
    userId: state.user.token.user._id
  });
  export default connect(mapStateToProps)(Record)
