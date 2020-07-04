import React, { useState, useEffect } from 'react'
import { Form,Button, Row , Col } from "react-bootstrap";
import api from '../../../../resources/api'
//this.props.editRes.relatedContacts[idx]._id
let response = {}
let optns = null
let editRes = ""
class DynamicFeilds extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      InputList : this.props.InputList,
      editMode : this.props.editMode
    }
  }
    componentDidUpdate(){
      if(this.state.editMode){
        editRes=this.props.editRes.relatedContacts
      }
    }
    render(){
    const JSX =  this.state.editMode ? <div >
    { 
    this.state.InputList.map((val, idx)=> {
          let inputId = `input-${idx}`
    
          return (
            <div key={idx}>
            <Row>
              <Col>
                    <Form.Group controlId={idx}>
                        <Form.Label>Relationship</Form.Label>
                        <Form.Control name="realationship"  type="text" placeholder="Relationship"  onChange={this.props.change} value={editRes[idx].relationship}/>
                    </Form.Group>
             </Col>
             <Col>
                  <Form.Group controlId={idx}>
                  <Form.Label>Contact</Form.Label>
                  <Form.Control as="select" name='contact' onChange={this.props.change}>
                    {this.props.option}
                 </Form.Control>
                 </Form.Group>
            </Col>
        </Row> 
          <Form.Group controlId={idx}>
            <Form.Check name="billThis" type="checkbox" label="Bill this contact" id={idx} defaultValue={editRes[idx].relationship} onChange={this.props.change} />
          </Form.Group>
 <br></br>
            </div>
          )
        })}
</div> : <div >
    { 
    this.state.InputList.map((val, idx)=> {
          let inputId = `input-${idx}`
    
          return (
            <div key={idx}>
            <Row>
              <Col>
                    <Form.Group controlId={idx}>
                        <Form.Label>Relationship</Form.Label>
                        <Form.Control name='relationship' type="text" placeholder="Relationship"  onChange={this.props.change} />
                    </Form.Group>
             </Col>
             <Col>
                  <Form.Group controlId={idx}>
                  <Form.Label>Contact</Form.Label>
                  <Form.Control as="select" name="contact" onChange={this.props.change}  >
                    {this.props.option}
                 </Form.Control>
                 </Form.Group>
            </Col>
        </Row> 
          <Form.Group controlId={idx}>
            <Form.Check name="billThis" type="checkbox" label="Bill this contact"   onChange={this.props.change}  />
          </Form.Group>
 <br></br>
            </div>
          )
        })}
</div>
    return (
        JSX
    )
}}

export default DynamicFeilds
