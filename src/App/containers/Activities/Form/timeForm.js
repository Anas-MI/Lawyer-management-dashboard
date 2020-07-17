import React, {useEffect , useState} from 'react'
import { useSelector , connect} from 'react-redux'
import { Form, Col, Row } from 'react-bootstrap'
import api from '../../../../resources/api'
import Timer from '../../../components/Timer/index.js'
let option = null
class ExpenseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         
        }
    }
    componentDidMount(){
        api.get('/matter/viewforuser/'+ this.props.userId).then((res)=>{
            option = res.data.data.map((val, index)=>{
                 return <option>{val.matterDescription}</option>
             })
         }).then(()=>{
             console.log(option)
             this.setState({option : option})
         })
         
    }

    render(){
        console.log(this.props.record.billable)
        let date = ""
        if(this.props.editmode){
            date = this.props.record.date.substring(0,10)
            console.log(date)
       }

       const duration = this.props.touched ? <Form.Group controlId="duration">
                                                <Form.Label>Duration</Form.Label>
                                                <Form.Control 
                                                type="text" 
                                                name="time" 
                                                placeholder="hh:mm" 
                                                value = {this.props.time}
                                                onChange={this.props.handleChange}/>
                                              </Form.Group>
                                              :
                                              <Form.Group controlId="duration">
                                                <Form.Label>Duration</Form.Label>
                                                <Form.Control 
                                                type="text" 
                                                name="time" 
                                                placeholder="hh:mm" 
                                                onChange={this.props.handleChange}/>
                                            </Form.Group>
 
       return  this.props.editmode ? <Form >
       <Row>
           <Col>
           <Form.Group controlId="duration">
               <Form.Label>Duration</Form.Label>
               <Form.Control 
               type="text" 
               name="time" 
               defaultValue = {this.props.record.time}
               onChange={this.props.handleChange}/>
           </Form.Group>
           </Col>
           <Col>
               <Timer setTime = {this.props.setTime} ></Timer>
           </Col>
       </Row>
       
       <Row>
           <Col>
           <Form.Group controlId="matter">
               <Form.Label>Matter</Form.Label>
               <Form.Control 
                   as="select"
                   name="matter" 
                   defaultValue = {this.props.record.matter}
                   onChange={this.props.handleChange}>
               <option>Select a matter</option>
               {this.state.option}
               </Form.Control>
            </Form.Group>
           </Col>
           <Col>
           <Form.Group controlId="rate">
               <Form.Label>Rate</Form.Label>
               <Form.Control 
               required
               type="text" 
               name="rate" 
               defaultValue = {this.props.record.rate}
               onChange={this.props.handleChange} />
           </Form.Group>
           </Col>

       </Row>
      
           
       <Row>
           <Col>
           <Form.Group controlId="Description">
               <Form.Label>Description</Form.Label>
               <Form.Control 
               name="description" 
               as="textarea" 
               rows="3"
               defaultValue = {this.props.record.description}
               onChange={this.props.handleChange} />
           </Form.Group>
           </Col>

       </Row>
      
       <Row>
           <Col>
           <Form.Group controlId="rate">
               <Form.Label>Rate</Form.Label>
               <Form.Control 
               required
               type="text" 
               name="rate" 
               defaultValue = {this.props.record.rate}
               onChange={this.props.handleChange} />
           </Form.Group>
           </Col>
           <Col>
           <Form.Group controlId="date">
               <Form.Label>Date</Form.Label>
               <Form.Control 
               required
               type="date" 
               name="date" 
               defaultValue = {date}
               onChange={this.props.handleChange}/>
           </Form.Group>
           </Col>
           {/*
                <Col>
                <Form.Group controlId="invoiceStatus">
                    <Form.Label>Invoice Status</Form.Label>
                    <Form.Control 
                        as="select"
                        name="invoiceStatus"
                        defaultValue = {this.props.record.invoiceStatus}
                        onChange={this.props.handleChange} >
                    <option>Unbilled</option>
                    <option>Billed</option>
                    </Form.Control>
                 </Form.Group>
                </Col>
           */}
          
       </Row>
           
           <Row>
               <Col>
               <Form.Check 
              type="checkbox"
              id="billable"
              name="billable"
              label="Billable"
              defaultChecked = {this.props.record.billable==="Yes"? true : false}
              onChange={this.props.handleChange}
          /><br></br>
               </Col>
           </Row>
   
           {
               /*
               <Form.Check 
              type="checkbox"
              id="nonBillable"
              name="nonBillable"
              label="Non-billable"
              defaultChecked = {!this.props.record.billable}
              onChange={this.props.handleChange}
          />
               */
           }
   </Form>


   :
   <Form >
        <Row>
            <Col>
                 {duration}
            </Col>
            <Col>
                <Timer setTime = {this.props.setTime} ></Timer>
            </Col>
        </Row>
        
        <Row>
            <Col>
            <Form.Group controlId="matter">
                <Form.Label>Matter</Form.Label>
                <Form.Control 
                    as="select"
                    name="matter" 
                    placeholder="Matter"
                    onChange={this.props.handleChange}>
                <option>Select a matter</option>
                {this.state.option}
                </Form.Control>
             </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="rate">
                <Form.Label>Rate</Form.Label>
                <Form.Control 
                required
                type="text" 
                name="rate" 
                placeholder="0.0 /h"
                onChange={this.props.handleChange} />
            </Form.Group>
            </Col>

        </Row>
       
            
        <Row>
            <Col>
            <Form.Group controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                name="description" 
                as="textarea" 
                rows="3"
                placeholder="Description"
                onChange={this.props.handleChange} />
            </Form.Group>
            </Col>

        </Row>
       
        <Row>
            <Col>
            <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                required
                type="date" 
                name="date" 
                placeholder="Date" 
                onChange={this.props.handleChange}/>
            </Form.Group>
            </Col>
            {
                /* 
                <Col>
            <Form.Group controlId="invoiceStatus">
                <Form.Label>Invoice Status</Form.Label>
                <Form.Control 
                    as="select"
                    name="invoiceStatus"
                    onChange={this.props.handleChange} >
                <option>Unbilled</option>
                <option>Billed</option>
                </Form.Control>
             </Form.Group>
            </Col>
                */
            }
        </Row>
            
            <Row>
                <Col>
                <Form.Check 
               type="checkbox"
               id="billable"
               name="billable"
               label="Billable"
            
               onChange={this.props.handleChange}
           /><br></br>
                </Col>
            </Row>
    
            {
                /*
                <Form.Check 
               type="checkbox"
               id="nonBillable"
               name="nonBillable"
               label="Non-billable"
               defaultChecked = {!this.props.record.billable}
               onChange={this.props.handleChange}
           />
                */
            }
    </Form>


        
    }
}

const mapStateToProps = state => ({
    userId: state.user.token.user._id
  });

export default connect(mapStateToProps)(ExpenseForm)