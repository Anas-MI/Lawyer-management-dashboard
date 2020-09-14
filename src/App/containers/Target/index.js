import React, { useEffect , useState } from 'react';
import { Form, Row , Col , Button, Card } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { message,  Modal, Result, notification } from 'antd';
import { useHistory } from "react-router-dom";
import api from '../../../resources/api';
import { useDispatch, useSelector } from 'react-redux';

const PersonalTarget = () => {
    const history = useHistory();
    const [disabled, setdisabled] = useState(false)
    const [state, setState] = useState({
        target  : {
            rate : "" ,
            target  : "",
            date : "",
            workdays : ""
        }
    });
    const userId = useSelector((state) => state.user.token.user._id);

    const fetchUser = ( ) => {
        api.get(`/user/view/${userId}`).then((res)=>{
            if(res.data.data.target == undefined){
                res.data.data.target = {

                }
            }
            setState(res.data.data)
        })
    }
    useEffect(() => {
        fetchUser()
    }, [])
    const handleChange = (e) => {
        e.persist();
        const { name , value } = e.target
        let newState = state
        newState.target[name] = value
        setState(newState)
        console.log(state)
    };


    const handleSubmit = e => {
        notification.destroy()
        e.preventDefault()
        if(state.target.rate == ""){
            notification.warning({
                message : "Please provide a default billing rate"
            })
        }else
        if(state.target.target == ""){
            notification.warning({
                message : "Please provide a target"
            })
        }else
        if(state.target.workdays == ""){
            notification.warning({
                message : "Please provide a number of work days in year"
            })
        }else
        if(state.target.date == ""){
            notification.warning({
                message : "Please provide a date"
            })
        }else{
            setdisabled(true)
            console.log(state)
            api.post(`/user/update/${userId}`, state).then((res)=>{
                console.log(res)
                setdisabled(false)
                notification.success({message : "Target details updated."})
                history.goBack()
            }).catch((err)=>{
                console.log(err)
                setdisabled(false)
                notification.error({message : "Failed to update details"})
            })
        }
    }
    return (
        <div className='form-width'>
            <Card style = {{"width" : "80%"}} >
                <Card.Header>
                    <h5>Personal Performance Target</h5>
                </Card.Header>
                <Card.Body>
                  <Form className="form-details" >
                    <Form.Group controlId="formGroupMatter">
                        <Form.Label>Default Billing Rate</Form.Label>
                        <InputGroup>
                            <Form.Control
                            defaultValue = {state.target.rate}
                            name = "rate"
                            onChange = { handleChange }
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
                            defaultValue = {state.target.target}
                            name = "target"
                            placeholder="1000.00"
                            onChange = { handleChange }
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
                            defaultValue = {state.target.workdays}
                            name = "workdays"
                            placeholder="260"
                            onChange = { handleChange }
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
                            defaultValue = {state.target.date}
                            name = "date"
                            type="Date" 
                            onChange = { handleChange }
                            placeholder="OpenDate" 
                        />
                    </Form.Group>
                </Form>    
                </Card.Body>
                 </Card>
            <Button onClick = {handleSubmit} disabled = {disabled}  variant="success" className="btn" >Save Performance Information</Button> <span className="pr-2">or</span>
            <Button variant="light" onClick={()=>{history.goBack()}} >CANCEL</Button>  
        </div>
    )
}

export default PersonalTarget