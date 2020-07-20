import React, { useState, useEffect } from 'react'
import { Form,Button, Row , Col } from "react-bootstrap";



class DynamicFeilds extends React.Component {
  
  onClick = (e) => {
    this.props.delete(e)
  }

    render(){
    return (
        <div >
            {
            this.props.inputList.map((val, idx)=> {
                  let inputId = `input-${idx}`
                const jsx = this.props.editMode ?      
                 <div key={idx}>
                    <Form.Row>
                    <Col>
                      <Form.Group >
                          <Form.Label>Type</Form.Label>
                          <Form.Control
                            as="select"
                            name="type"
                            defaultValue={this.props.record[idx]}
                            onChange={this.props.change}
                     
                          >
                            <option>Work</option>
                            <option>Home</option>
                            <option>Other</option>
                          </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId={idx}>
                      <Form.Label>{this.props.text}</Form.Label>
                      <Form.Control name={this.props.name} type={this.props.type} className={this.props.type}  defaultValue={this.props.record[idx]}
                      onChange={this.props.change}/>
                    </Form.Group>
                    </Col>
                    <Button id={idx} style={{ "height": "45px", "margin-top": "25px"}} name={this.props.name} onClick={this.onClick}>-</Button>
                    </Form.Row>
                    
                    <p className="help-block text-danger">{this.props.error[idx]}</p>
                  </div> 
                  :       
                  <div key={idx}>
                      <Form.Row>
                      <Col>
                      <Form.Group>
                          <Form.Label>Type</Form.Label>
                          <Form.Control
                            as="select"
                            name="type"
                            onChange={this.props.change}                   
                          >
                            <option>Work</option>
                            <option>Home</option>
                            <option>Other</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group controlId={idx}>
                        <Form.Label>{this.props.text}</Form.Label>
                         <Form.Control name={this.props.name} type={this.props.type} className={this.props.type} placeholder={this.props.text}
                         onChange={this.props.change}/>
                      </Form.Group>
                      </Col>
                      <Button id={idx} style={{ "height": "45px", "margin-top": "25px"}} name={this.props.name} onClick={this.onClick}>-</Button>
                      </Form.Row>
                      
                      <p className="help-block text-danger">{this.props.error[idx]}</p>
                    </div>
                  return (
                    jsx
                  )
                })}
        </div>
    )
}}

export default DynamicFeilds
