import React, { useState, useEffect, useDispatch, useSelector} from 'react'
import { Form, Row , Col, Button} from "react-bootstrap";
import { message,  Modal, Card } from 'antd';
import api from '../../../resources/api'
import AddPerson from '../AddEditContact/AddPerson'
import DynamicFeild from '../AddEditMatter/DynamicFeilds/index'
const AddEditMatter = props => {

    const [state,setState] = useState({})
    const [InputList, setInputList] = useState([{Relationship : "" , Contact : ""}])
    const [modal , setModal] = useState()
    let Count = 1
    
  const addFeild=() =>{
    Count++
    let list = InputList
    list.push({Relationship : "" , Contact : ""})
    setInputList(list)
  }
  
  const handleChange = (e) => {
    e.persist()
    setState(st=>({...st,[e.target.name]:e.target.value}))
  }

 /*
    const handleSubmit = e => {
        e.preventDefault()
        if(editMode){
           //  dispatch(updateBlog({id:state._id,body:state}))
        }else{
           api.post('contact/create', state)
        }
        props.history.goBack()
    }
    */

    return (
      <div className='form-width'>
        <div className="form-header-container mb-4">
              <h3 className="form-header-text">Add New Matter</h3>
        </div>
        <Card title="Matter Information" className="mb-4">
          <Form className="form-details">
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Client</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
              <div className="form-add mb-4">
                <span onClick={() => setModal(true)}>Add Contact</span>
              </div>
              <Form.Group controlId="formGroupMatter">
                <Form.Label>Matter Description</Form.Label>
                  <Form.Control name='Matter' as="textarea" rows="3" type="text" placeholder="Matter description" 
                    value={state['Matter']} onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formGroupClientRefenceNumber">
                  <Form.Label>Client reference number</Form.Label>
                  <Form.Control name='ClientRefenceNumber' type="text" placeholder="Client Refence Number" 
                    value={state['ClientRefenceNumber']} onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Practise Area</Form.Label>
                  <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Example select</Form.Label>
                  <Form.Control as="select">
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Pending</option>
                  </Form.Control>
                </Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="formGroupOpenDate">
                    <Form.Label>Open Date</Form.Label>
                    <Form.Control name='OpenDate' type="Date" placeholder="OpenDate" 
                      value={state['OpenDate']} onChange={handleChange}/>
                    </Form.Group>
                  </Col>
                  <Col>  
                    <Form.Group controlId="formGroupClosing Date">
                    <Form.Label>Closing Date</Form.Label>
                    <Form.Control name='Closing Date' type="Date" placeholder="Closing Date" 
                      value={state['Closing Date']} onChange={handleChange}/>
                    </Form.Group>
                  </Col>  
                  <Col>
                    <Form.Group controlId="formGroupPendingDate">
                    <Form.Label>Pending Date</Form.Label>
                    <Form.Control name='PendingDate' type="Date" placeholder="PendingDate" 
                      value={state['PendingDate']} onChange={handleChange}/>
                    </Form.Group>
                  </Col> 
                </Form.Row>
         </Form>
        </Card>

        <Card title="Related Contacts" className="mb-4">
            <Form className="form-details">
              <DynamicFeild InputList={InputList} change={handleChange}></DynamicFeild>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Bill this contact" id={`check`}/>
              </Form.Group>
              <br/>
              <div className="form-add mb-4">
                <span onClick={addFeild}>Add Related Contact</span>
              </div>
            </Form>
        </Card>
        <Card title="Custom Feilds"  className="mb-4">
        <Form className="form-details">
          <Form.Row>
            <Col>
              <Form.Group controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control name='Name' type="text" placeholder="Name" 
                value={state['Name']} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupText">
                <Form.Label>Text</Form.Label>
                <Form.Control name='Text' type="text" placeholder="MText" 
                value={state['Text']} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Form.Row>
          <Button className="btn btn-success">Save</Button>
        </Form>
        </Card>
        <Card title="Billing Preference"  className="mb-4">
          <Form className="form-details">
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Contact</Form.Label>
              <Form.Control as="select">
                <option>Flat</option>
                <option>Hourly</option>
                <option>Contagious</option>
              </Form.Control>
            </Form.Group>
        </Form>
        </Card>

        <Card title="Task Automation"  className="mb-4">
        <Form className="form-details">
        <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control as="select">
                    <option>Client Intake</option>
                    <option>Task List</option>
                    <option>New Task List</option>
                  </Form.Control>
                </Form.Group>
        </Form>
        </Card>
        <Button onClick={()=>props.history.goBack()}>ADD</Button>
       <br></br>
        <Modal
          title="Add Company"
          centered
          visible={modal}
          onOk={() => setModal(false)}
          onCancel={() => setModal(false)}
        >
        <AddPerson></AddPerson>

        </Modal>
        </div>
    )
}

export default AddEditMatter

