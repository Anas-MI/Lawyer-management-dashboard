import React, { useState, useEffect } from 'react'
import { Form,Button, Row , Col } from "react-bootstrap";



class DynamicFeilds extends React.Component {
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
                         onChange={(e,idx)=>this.props.change(e,idx)}/>
                      </Form.Group>
                      <p className="help-block text-danger">{this.props.error}</p>
                    </div>
                  )
                })}
        </div>
    )
}}

export default DynamicFeilds
