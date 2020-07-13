import React from 'react'
import { Card , Space, Table, Button, notification } from 'antd'
import { Form , Col , Row } from 'react-bootstrap'
import api from '../../../resources/api'
import { connect } from 'react-redux'

let optns = null
class Record extends React.Component{
   constructor(props){
       super(props)
       this.state = {
           data : {
               client : "",
               destination : "",
               paymentDate : "" , 
               source : "" ,

           }
       }
   }
   componentDidMount(){
     api.get('/contact/viewforuser/'+this.props.userId).then((res)=>{
        optns = res.data.data.map((value, index)=>{

            return <option id={index}>{value.firstName}</option>
           })
     }).then(()=>{this.setState({options : optns})})
    
    
   }
    render(){
        const handleChange = (e) => {
            e.persist()
            const { name, id, value} = e.target
            let newData = this.state.data
            newData[name] = value
            this.setState({data : newData})   
            console.log(this.state.data)
        }
        const handleSubmit = (e) =>{
            if(this.state.data.client === ""){
                notification.error({message : "Please select a client"})
            }else if(this.state.data.source === ""){
                notification.error({message : "Please select a source"})
            }else if(this.state.data.destination === ""){
                notification.error({message : "Please select a destination"})
            }else if(this.state.data.paymentDate === ""){
                notification.error({message : "Please select a payment date"})
            }else{
                this.props.history.goBack()
            }
        }
        const dataSource = [
            {
              key: '1',
              name: 'Mike',
              age: 32,
              address: '10 Downing Street',
            },
            {
              key: '2',
              name: 'John',
              age: 42,
              address: '10 Downing Street',
            },
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
      

        const title = <Space size="large">
                        <div style={{float: "left"}}>
                            <p style={{fontWeight : "bold", marginBottom:"-15%"}}>Total open balance</p><br/>
                            <p style={{fontWeight : "bold"}}>₹0.00</p>
                        </div>
                        <div style={{float: "right"}}>
                            <Form>
                                <Row>
                                    <Col md="8">
                                    <Form.Group controlId="paymentAmount">
                                    <Form.Label style={{fontWeight : "bold"}}>Payment amount</Form.Label>
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

                      </Space>
        const invoiceTitle =  this.state.data.client===""?  <h4 style={{textAlign:"center", fontWeight:"bold"}}>Select a client to record a payment.</h4> : title
        const invoiceBody = this.state.data.client===""?
                            null 
                            : 
                            <div >
                                <Card>
                                    <Table dataSource={dataSource} columns={columns} />;
                                </Card> 
                                <div style={{display :"inline"}}>
                                    <Form style={{float: "left"}}>
                                        <Row>
                                            <Col md="7">
                                                <Form.Group controlId="formGroupMatter">
                                                <Form.Label style={{fontWeight : "bold"}}>Description</Form.Label>
                                                    <Form.Control 
                                                    style = {{width : "300%"}}
                                                    required name='description' 
                                                    as="textarea" 
                                                    rows="3" 
                                                    type="text"
                                                    placeholder="Description"
                                                    onChange={handleChange} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </Form>
                                    <Card style={{width : "50%" , float: "right"}}>
                                        <p>Summary</p>
                                        <p>Payment : </p>
                                    </Card>
                                </div>
                            </div>

        return <div>
            <Card title="Record Payment">
             <Form>
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
                                <option>Source</option>
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
          <br></br><br></br>

          <Card >
            {invoiceTitle}
          </Card>
          {invoiceBody}
       
        <div style={{position : "absolute", bottom : "0px"}}>
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
