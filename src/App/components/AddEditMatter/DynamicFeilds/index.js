import React, { useState, useEffect } from 'react'
import { Form,Button, Row , Col } from "react-bootstrap";



class DynamicFeilds extends React.Component {
  constructor(props){
    super(props)
  }
  

    render(){
      
    return (
        <div >
            {
            this.props.InputList.map((val, idx)=> {
                  let inputId = `input-${idx}`
               
                  return (
                    <div key={idx}>
                    <Row>
                      <Col>
                            <Form.Group controlId="formGroupRelationship">
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control name='Relationship' type="text" placeholder="Relationship" 
                                value={val['Relationship']} onChange={this.props.change}/>
                            </Form.Group>
                     </Col>
                     <Col>
                          <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Contact</Form.Label>
                          <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
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