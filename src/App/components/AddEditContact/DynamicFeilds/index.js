import React, { useState, useEffect } from 'react'
import { Form,Button, Row , Col } from "react-bootstrap";



class DynamicFeilds extends React.Component {
  
  onClick = (e) => {
    console.log('from onclick')
    this.props.delete(e)
  }
    render(){
    console.log("Dynamic Called")
    return (
        <div >
            {
            this.props.inputList.map((val, idx)=> {
                  let inputId = `input-${idx}`
               
                  return (
                    <div key={idx}>
                      <Form.Group controlId={this.props.type}>
                        <Form.Label>{this.props.text}</Form.Label>
                         <Form.Control name={this.props.type} className={this.props.type} type="text" placeholder={this.props.text} 
                         onChange={this.props.change}/>
                      </Form.Group>
                      <Button id={idx} name={this.props.type} onClick={this.onClick}>-</Button>
                      <p className="help-block text-danger">{this.props.error[idx]}</p>
                    </div>
                  )
                })}
        </div>
    )
}}

export default DynamicFeilds
