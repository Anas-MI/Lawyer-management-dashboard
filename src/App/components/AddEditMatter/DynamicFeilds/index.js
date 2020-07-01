import React, { useState, useEffect } from 'react'
import { Form,Button, Row , Col } from "react-bootstrap";
import api from '../../../../resources/api'

let response = {}
let optns = null
class DynamicFeilds extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      InputList : this.props.InputList
    }
  }
 
    render(){
    return (
        <div >
            {
            this.state.InputList.map((val, idx)=> {
                  let inputId = `input-${idx}`
               
                  return (
                    <div key={idx}>
                    <Row>
                      <Col>
                            <Form.Group controlId={idx}>
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control name='Relationship' type="text" placeholder="Relationship"  onChange={this.props.change}/>
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
                    </div>
                  )
                })}
        </div>
    )
}}

export default DynamicFeilds
