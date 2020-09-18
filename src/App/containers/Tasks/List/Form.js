import React from 'react'
import { Form, Row, Col } from 'react-bootstrap';


class ListForm extends React.Component{
  constructor(){
    super()
    this.state = {
     name : '',
    
    }
  }
  componentDidMount(){
    /*
    this.setState({
      name : ""
    })
      if(this.props.editMode){
        this.setState({
          name : this.props.record.name
        })
      }else{
        this.setState({
          name : ""
        })
      }
      */
  }
    render(){
        
      
      
      return  <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Name"
        name="name"
        onChange={this.props.handleChange} />
      </Form.Group>
  
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Descripton</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Description" 
        onChange={this.props.handleChange}
        name="decription"/>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Practice Area</Form.Label>
        <Form.Control 
        as="select"
        onChange={this.props.handleChange}
        name="practiseArea"
        >
            <option>Select a practice area</option>
            <option>Attorney</option>
            <option>Administrative</option>
            <option>Bankruptcy</option>
            <option>Business</option>
            <option>Builder's Liens</option>
            <option>Civil Litigation</option>
            <option>Commercial</option>
            <option>Conveyance (Purchase)</option>
            <option>Conveyance (Sale)</option>
            <option>Corporate</option>
            <option>Criminal</option>
            <option>Employment</option>
            <option>Estates</option>
            <option>Family</option>
            <option>Immigration</option>
            <option>Insurance</option>
            <option>Personal Injury</option>
            <option>Tax</option>
            <option>Wills</option>
        </Form.Control>
      </Form.Group>
    </Form>
    }
     
}
export default ListForm