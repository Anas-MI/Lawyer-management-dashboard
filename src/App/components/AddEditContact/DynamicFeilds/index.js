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
               
                  return (
                    <div key={idx}>
                      <Form.Row>
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
                  )
                })}
        </div>
    )
}}

export default DynamicFeilds
