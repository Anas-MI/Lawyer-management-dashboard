import React, {useEffect , useState} from 'react'
import { useSelector , connect} from 'react-redux'
import { Form, Col, Row } from 'react-bootstrap'
import api from '../../../../resources/api'

let option = null

class ExpenseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          matter : ""
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

        if(this.props.editmode){
            api.get('/matter/view/'+ this.props.record.matter).then((res)=>{
                console.log(res)
             this.setState({matter : res.data.data.matterDescription })
             console.log(this.state.matter)
            })
        }
       
         
    }

    render(){
        let date  = ""
        if(this.props.editmode){
             date = this.props.record.date.substring(0,10)
             console.log(date)
        }
        console.log(this.props.record.billable)
        return this.props.editmode ?   <Form >
        <Col>
            <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control 
                type="text" 
                name="qty" 
                defaultValue = {this.props.record.qty}
                onChange={this.props.handleChange}/>
            </Form.Group>
            {console.log(this.state.matter)}
            <Form.Group controlId="matter">
                <Form.Label>Matter</Form.Label>
                <Form.Control 
                    as="select"
                    name="matter" 
                    defaultValue = {this.state.matter}
                    onChange={this.props.handleChange}>
                <option>Select a matter</option>
                {this.state.option}
                </Form.Control>
             </Form.Group>
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
            <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                required
                type="date" 
                name="date" 
                defaultValue = {date}
                onChange={this.props.handleChange}/>
            </Form.Group>
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
             <Form.Check 
               type="checkbox"
               id="billable"
               name="billable"
               label="Billable"
               defaultChecked = {this.props.record.billable==="Yes"? true : false}
               onChange={this.props.handleChange}
           /><br></br>
    
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
          
        </Col>
    </Form>
    :
    <Form >
    <Col>
        <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
            type="text" 
            name="qty" 
            placeholder="1.0"
            onChange={this.props.handleChange}/>
        </Form.Group>
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
        <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control 
            required
            type="date" 
            name="date" 
            placeholder="Date" 
            onChange={this.props.handleChange}/>
        </Form.Group>
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
         <Form.Check 
               type="checkbox"
               id="billable"
               name="billable"
               label="Billable"
               onChange={this.props.handleChange}
           /><br></br>
    
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
          
    </Col>
</Form>

      
    }
}

const mapStateToProps = state => ({
    userId: state.user.token.user._id
  });

export default connect(mapStateToProps)(ExpenseForm)