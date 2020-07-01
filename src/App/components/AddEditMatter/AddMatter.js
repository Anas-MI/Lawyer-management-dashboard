import React, { useState, useEffect, useDispatch, useSelector} from 'react'
import { Form, Row , Col , Button } from "react-bootstrap";
import { message,  Modal, Card } from 'antd';
import api from '../../../resources/api'
import AddPerson from '../AddEditContact/AddPerson'
import DynamicFeild from '../AddEditMatter/DynamicFeilds/index'

let res = {}
let customFields = null
let contacts = {}
let optns = null
class AddEditMatter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      InputList  : [{Relationship : "" , Contact : ""}],
      modal : false,
      editMode : false
    }

  }
  async componentDidMount(){
    res = await api.get('/user/view/5eecb08eaec6f1001765f8d5').then(
    contacts = await api.get('/contact/showall'))
  }
  componentWillUpdate(){
    console.log(contacts)
    optns = contacts.data.data.map((value, index)=>{
      return <option key={index}>{value.firstName}</option>
     })
    customFields = res.data.data.customFields.map((value, index)=>{
    
      return <Form.Group key={index} controlId={index}>
              <Form.Label>{value.name}</Form.Label>
              <Form.Control name={value.name} type={value.type} placeholder={value.name} />
              </Form.Group>
    })
  }
  render(){
    
    const addFeild=() =>{
      let list = this.state.InputList
      list.push({Relationship : "" , Contact : ""})
      this.setState({InputList : list})
      let newState= this.state
      newState.Relation = this.state.InputList
      this.setState(newState)
    }
  
  const handleChange = (e) => {
    e.persist()
    this.setState(st=>({...st,[e.target.name]:e.target.value}))
  }
  const HandleDynamicChange = (e)=>{
    e.persist()
    let list = this.state
    const { id , value } = e.target
    list.Relation[id].Relationship = value
    this.setState(list)
  }

 
    const handleSubmit = e => {
        e.preventDefault()
        if(this.state.editMode){
           //  dispatch(updateBlog({id:state._id,body:state}))
        }else{
           api.post('matter/create', this.state)
        }
        this.props.history.goBack()
    }
  
    
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
                  
                  {optns}
                </Form.Control>
              </Form.Group>
              <div className="form-add mb-4">
                <span onClick={() => this.setState({modal:true})}>Add Contact</span>
              </div>
              <Form.Group controlId="formGroupMatter">
                <Form.Label>Matter Description</Form.Label>
                  <Form.Control name='Matter' as="textarea" rows="3" type="text" placeholder="Matter description" 
                    value={this.state['Matter']} onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="formGroupClientRefenceNumber">
                  <Form.Label>Client reference number</Form.Label>
                  <Form.Control name='ClientRefenceNumber' type="text" placeholder="Client Refence Number" 
                    value={this.state['ClientRefenceNumber']} onChange={handleChange}/>
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
                      value={this.state['OpenDate']} onChange={handleChange}/>
                    </Form.Group>
                  </Col>
                  <Col>  
                    <Form.Group controlId="formGroupClosing Date">
                    <Form.Label>Closing Date</Form.Label>
                    <Form.Control name='Closing Date' type="Date" placeholder="Closing Date" 
                      value={this.state['Closing Date']} onChange={handleChange}/>
                    </Form.Group>
                  </Col>  
                  <Col>
                    <Form.Group controlId="formGroupPendingDate">
                    <Form.Label>Pending Date</Form.Label>
                    <Form.Control name='PendingDate' type="Date" placeholder="PendingDate" 
                      value={this.state['PendingDate']} onChange={handleChange}/>
                    </Form.Group>
                  </Col> 
                </Form.Row>
         </Form>
        </Card>

        <Card title="Related Contacts" className="mb-4">
            <Form className="form-details">
            <DynamicFeild InputList={this.state.InputList} option={optns} change={HandleDynamicChange}></DynamicFeild> 

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
        <p>Customise your<Button variant="link" onClick={()=>this.props.history.push('/settings/customFeilds')}>Custom Feild</Button></p>

        {customFields}
        </Form>
          <Button className="btn btn-success">Save</Button>
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
        <Button onClick={handleSubmit}>ADD</Button>
       <br></br>
        <Modal
          title="Add Company"
          centered
          visible={this.state.modal}
          onOk={() => this.setState({modal :false})}
          onCancel={() => this.setState({modal :false})}
        >
        <AddPerson></AddPerson>

        </Modal>
        </div>
    )
  }
}


export default AddEditMatter
