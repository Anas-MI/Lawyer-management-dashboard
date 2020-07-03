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
      console.log("from dynamics" )
      console.log(this.state.editRes)
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
                        <Form.Control name='Relationship' type="text" placeholder="Relationship"  onChange={this.props.change} value={editRes[idx].relationship}/>
                    </Form.Group>
             </Col>
             <Col>
                  <Form.Group controlId={idx}>
                  <Form.Label>Contact</Form.Label>
                  <Form.Control as="select">
                    {this.props.option}
                 </Form.Control>
                 </Form.Group>
            </Col>
        </Row> 
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Bill this contact" id={`check`} defaultValue={editRes[idx].relationship} />
          </Form.Group>
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
                        <Form.Control name='Relationship' type="text" placeholder="Relationship"  onChange={this.props.change} />
                    </Form.Group>
             </Col>
             <Col>
                  <Form.Group controlId={idx}>
                  <Form.Label>Contact</Form.Label>
                  <Form.Control as="select">
                    {this.props.option}
                 </Form.Control>
                 </Form.Group>
            </Col>
        </Row> 
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Bill this contact" id={`check`}  />
          </Form.Group>
            </div>
          )
        })}
</div>
    return (
        JSX
    )
}}

export default DynamicFeilds
