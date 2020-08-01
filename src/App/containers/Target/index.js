import React from 'react';
import { Form, Row , Col , Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { message,  Modal, Card, Result, notification } from 'antd';
import { useHistory } from "react-router-dom";

const PersonalTarget = () => {
    const history = useHistory();
    return (
        <div className='form-width'>
            <Card title="Personal Performance Target" className="mb-4">
                <Form className="form-details" >
                    <Form.Group controlId="formGroupMatter">
                        <Form.Label>Default Billing Rate</Form.Label>
                        <InputGroup>
                            <Form.Control
                            required
                            placeholder="200.00"
                            type="Number"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>$/Hr</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formGroupMatter">
                        <Form.Label>Target Billings</Form.Label>
                        <InputGroup>
                            <Form.Control
                            required
                            placeholder="1000.00"
                            type="Number"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>$/Year</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formGroupMatter">
                        <Form.Label>Working Days</Form.Label>
                        <InputGroup>
                            <Form.Control
                            required
                            placeholder="260"
                            type="Number"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>/Year</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formGroupMatter">
                        <Form.Label>Fiscal Year End</Form.Label>
                        <Form.Control 
                            name='openDate' 
                            type="Date" 
                            placeholder="OpenDate" 
                        />
                    </Form.Group>
                </Form>
            </Card>
            <Button  variant="success" className="btn" >Save Performance Information</Button> <span className="pr-2">or</span>
            <Button variant="light" onClick={()=>{history.goBack()}} >CANCEL</Button>  
        </div>
    )
}

export default PersonalTarget