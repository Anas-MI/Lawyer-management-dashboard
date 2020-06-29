import React, { useState, useEffect, useDispatch, useSelector} from 'react'
import { Form, Row , Col,   } from "react-bootstrap";
import { message, Button, Modal, Card } from 'antd';
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
        <div className='w-75 m-auto'>
        <h3 className="text-center mb-4 form-header-text">Add New Matter</h3>
        <Card title="Matter Information"  style={{ width: "100%" }}>
        <Form className="form-details">
          <Col>
            <Row>
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
            </Row>
            <Button  onClick={() => setModal(true)}>
            Add Contact
            </Button>
            <Form.Group controlId="formGroupMatter">
                    <Form.Label>Matter</Form.Label>
                    <Form.Control name='Matter' type="text" placeholder="Matter" 
                    value={state['Matter']} onChange={handleChange}/>
                </Form.Group>
            <Row>
                
            </Row>
            <Row>
                 <Form.Group controlId="formGroupClientRefenceNumber">
                    <Form.Label>Client reference number</Form.Label>
                    <Form.Control name='ClientRefenceNumber' type="text" placeholder="ClientRefenceNumber" 
                    value={state['ClientRefenceNumber']} onChange={handleChange}/>
                </Form.Group>
            </Row>
          </Col>
         
         <Col>
            <Row>
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
            </Row>
            <Row>
            <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Example select</Form.Label>
                  <Form.Control as="select">
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Pending</option>
                  </Form.Control>
                </Form.Group>
            </Row>
            <Row>
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
            </Row>
          </Col>
         </Form>
        </Card>
        <br></br>
        <Card title="Related Contacts"  style={{ width: "100%" }}>
            <Form>
            <DynamicFeild InputList={InputList} change={handleChange}></DynamicFeild>

                <Form.Check 
                  type="checkbox"
                  id={`check`}
                  label={`Bill this Contact`}
                /><br></br>
                <Button onClick={addFeild}>+ Add Related Contact</Button>
            </Form>
        </Card>
        <br></br>
        <Card title="Custom Feilds"  style={{ width: "100%" }}>
        <Form>
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
            <Button>Save</Button>
        </Form.Row>
        </Form>
        </Card>
        <br></br>
        <Card title="Billing Preference"  style={{ width: "100%" }}>
        <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control as="select">
                    <option>Flat</option>
                    <option>hourly</option>
                    <option>Contagious</option>
                  </Form.Control>
                </Form.Group>
        </Form>
        </Card>
        <br></br>
        <Card title="Task Automation"  style={{ width: "100%" }}>
        <Form>
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

