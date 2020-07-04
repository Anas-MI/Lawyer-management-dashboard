import React, { useState, useEffect, useDispatch, useSelector} from 'react'
import { Form, Row , Col , Button } from "react-bootstrap";
import { message,  Modal, Card, Result, notification } from 'antd';
import api from '../../../resources/api'
import AddPerson from '../AddEditContact/AddPerson'
import DynamicFeild from '../AddEditMatter/DynamicFeilds/index'

let res = {}
let customFields = null
let contacts = {}
let optns = null
let editMode = false
let editRes = ""
let customData =  []
let clientId = 1
let relatedId = []
let count = 1
class AddEditMatter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      relatedContacts  : [{relationship : "" , contact : "", billThis: ""}],
      customFields : [{

      }],
      modal : false,
    }

  }
  handleCustom(e){
    e.persist()
    let list = customData
    const { id , value, name } = e.target

    list[id]={[name] : value}

  }
  async componentDidMount(){
    if(this.props.location.pathname==="/manage/Matter/edit"){
      editMode= true;
      editRes= this.props.location.state
    }
    res = await api.get('/user/view/5eecb08eaec6f1001765f8d5').then(
      contacts = await api.get('/contact/showall'))
    
   
    optns = contacts.data.data.map((value, index)=>{
      return <option id={index}>{value.firstName}</option>
     })
    
    customFields = res.data.data.customFields.map((value, index)=>{
    
      return <Form.Group key={index} controlId={index}>
              <Form.Label>{value.name}</Form.Label>
              <Form.Control name={value.name} type={value.type} placeholder={value.name} onChange={this.handleCustom}/>
             </Form.Group>
    })
  }
  
  render(){
    

    const addFeild=() =>{
      count++
      let list = this.state.relatedContacts
      list.push({relationship : "", Contact : "", billThis : ""})
      this.setState({relatedContacts : list})
      let newState= this.state
      newState.Relation = this.state.relatedContacts
      this.setState(newState)
    }
  
  const handleChange = (e) => {
    e.persist()
    this.setState(st=>({...st,[e.target.name]:e.target.value}))
    if(e.target.name==="client"){
      clientId = e.target.selectedIndex
    }
    console.log(e)
  }
  const HandleDynamicChange = (e)=>{
    e.persist()
    let list = this.state
    const { id , value, name , checked } = e.target
    if(name==="billThis"){
      list.relatedContacts[id][name] = checked
    }else{
    list.relatedContacts[id][name] = value
    }
    if(name=='contact'){
      list.relatedContacts[id][name] = contacts.data.data[e.target.selectedIndex]._id
    }
    this.setState(list)
    console.log(this.state)
  }
  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Matter Saved'});
  };
  const openNotificationWithfailure = type => {
    notification[type]({
      message: 'Failure'});
  };
 
   const handleSubmit = e => {
     const data = this.state
     data.customFields = customData
     data.client = contacts.data.data[clientId]._id

     console.log(data)
        e.preventDefault()
        if(this.state.editMode){
           //  dispatch(updateBlog({id:state._id,body:state}))
        }else{
           api.post('matter/create', data).then(()=>openNotificationWithIcon('success')).catch(()=>openNotificationWithfailure('error'))
        }

        this.props.history.goBack()
    }
  
    let returnx
    if((editMode==true && this.state.editRes !=="" )|| editMode==false ){
      returnx =   <div className='form-width'>
      <div className="form-header-container mb-4">
            <h3 className="form-header-text">Add New Matter</h3>
      </div>
      <Card title="Matter Information" className="mb-4">
        <Form className="form-details">
          
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Client</Form.Label>
              <Form.Control as="select" name="client" onChange={handleChange}>
                
                {optns}
              </Form.Control>
            </Form.Group>
            <div className="form-add mb-4">
              <span onClick={() => this.setState({modal:true})}>Add Contact</span>
            </div>
            <Form.Group controlId="formGroupMatter">
              <Form.Label>Matter Description</Form.Label>
                <Form.Control name='matterDescription' as="textarea" rows="3" type="text" placeholder="Matter description" 
                  value={editRes.matterDescription} onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="formGroupClientRefenceNumber">
                <Form.Label>Client reference number</Form.Label>
                <Form.Control name='clientReferenceNumber' type="text" placeholder="Client Refence Number" 
                  value={editRes.clientReferenceNumber} onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Practise Area</Form.Label>
                <Form.Control as="select" name="practiseArea" onChange={handleChange} defaultValue={editRes.practiseArea}>
                  <option>{editRes.practiseArea}</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" onChange={handleChange} defaultValue={editRes.status}>
                  <option>Open</option>
                  <option>Closed</option>
                  <option>Pending</option>
                </Form.Control>
              </Form.Group>
              <Form.Row>
                <Col>
                  <Form.Group controlId="formGroupOpenDate">
                  <Form.Label>Open Date</Form.Label>
                  <Form.Control name='openDate' type="Date" placeholder="OpenDate" 
                    value={editRes.openDate} onChange={handleChange}/>
                  </Form.Group>
                </Col>
                <Col>  
                  <Form.Group controlId="formGroupClosing Date">
                  <Form.Label>Closing Date</Form.Label>
                  <Form.Control name='closing Date' type="Date" placeholder="Closing Date" 
                    value={editRes.closeDate} onChange={handleChange}/>
                  </Form.Group>
                </Col>  
                <Col>
                  <Form.Group controlId="formGroupPendingDate">
                  <Form.Label>Pending Date</Form.Label>
                  <Form.Control name='pendingDate' type="Date" placeholder="PendingDate" 
                    value={editRes.pendingDate} onChange={handleChange}/>
                  </Form.Group>
                </Col> 
              </Form.Row>
       </Form>
      </Card>

      <Card title="Related Contacts" className="mb-4">
          <Form className="form-details">
          <DynamicFeild InputList={this.state.relatedContacts}  option={optns} change={HandleDynamicChange} editRes={editRes} editMode={editMode}></DynamicFeild> 

    
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
      </Card>
      <Card title="Billing Preference"  className="mb-4">
        <Form className="form-details">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Rate</Form.Label>
            <Form.Control as="select" onChange={handleChange} defaultValue={editRes.billingType}>
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
                <Form.Label>Task</Form.Label>
                <Form.Control as="select" onChange={handleChange} defaultValue={editRes.task}>
                  <option>Client Intake</option>
                  <option>Task List</option>
                  <option>New Task List</option>
                </Form.Control>
              </Form.Group>
      </Form>
      </Card>
      <Button className="btn btn-success" onClick={handleSubmit}>ADD</Button>
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
    }else{
      returnx = null
    }
    return (
     returnx
    )
  }
}


export default AddEditMatter
