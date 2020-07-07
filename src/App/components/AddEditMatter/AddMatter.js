import React, { useState, useEffect, useDispatch, useSelector} from 'react'
import { Form, Row , Col , Button } from "react-bootstrap";
import { message,  Modal, Card, Result, notification } from 'antd';
import api from '../../../resources/api'
import AddPerson from '../AddEditContact/AddPersonModal'
import DynamicFeild from '../AddEditMatter/DynamicFeilds/index'
import { connect } from 'react-redux'

const validNameRegex = RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

let res = {}
let customFields = null
let contacts = {}
let optns = null
let editMode = false
let editRes = ""
let customData =  []
let clientId = 1
let error = {
  relationship: [""]
}

class AddEditMatter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      rate : "Flat",
      status :"Open",
      client : "",
      relatedContacts  : [],
      customFields : [{
      }],
      modal : false,
    }

  }
  handleCustom(e){
    e.persist()
    const { id , value, name } = e.target
    customData[id]={[name] : value}
    console.log(customData)

  }
  async componentDidMount(){
    if(this.props.location.pathname==="/manage/Matter/edit"){
      editMode= true;
      editRes= this.props.location.state
    }
    res = await api.get('/user/view/'+this.props.userId).then(
      contacts = await api.get('contact/viewforuser/'+this.props.userId))
    
   
    optns = contacts.data.data.map((value, index)=>{
      if(index == 0){
        const temp = this.state
        temp.relatedContacts.contact = value._id
        temp.client = value._id

        this.setState(temp)

      }
      return <option id={index}>{value.firstName}</option>
     })
   
    
    customFields = res.data.data.customFields.map((value, index)=>{
      return <Form.Group key={index} controlId={index}>
              <Form.Label>{value.name}</Form.Label>
              <Form.Control required={value.required} name={value.name} type={value.type} placeholder={value.name} onChange={this.handleCustom}/>
             </Form.Group>
    })
    this.setState({optns : optns, customFields : customFields})
  }
   openNotificationWithIcon = type => {
    notification[type]({
      message: 'Matter Saved'});
  };
    openNotificationWithfailure = type => {
    notification[type]({
      message: 'Failure'});
  };
   
  handleSubmit = (event) => {
    event.preventDefault();
    notification.destroy()
   

    if ((this.state.matterDescription ==="" ||this.state.matterDescription ===undefined) ) {
      return notification.warning({
        message: "Please add a matter description",
      });
    }else  if ((this.state.client ==="" ||this.state.client ===undefined) ) {
      return notification.warning({
        message: "Please add a matter description",
      });
    }else{
      console.log("all good")
       const data = this.state
        data.customFields = customData
        data.client = contacts.data.data[clientId]._id
        data.userId = this.props.userId
        console.log(data)
       if(this.state.editMode){
          //  dispatch(updateBlog({id:state._id,body:state}))
       }else{
         api.post('matter/create', data).then(res=>console.log(res)).then(()=>this.openNotificationWithIcon('success')).catch(()=>this.openNotificationWithfailure('error'))
         
       }

       if(this.props.location!=undefined){
        this.props.history.goBack()
       }
    }
  }
  
  render(){
    

    const addFeild=() =>{
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
   
    console.log(this.state)
  }
  const handleDelete = (e)=>{
    e.persist()
     const { name , id } = e.target
     let newState = this.state
     newState.relatedContacts.splice(id, 1)
     this.setState(newState)
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
    console.log(error.relationship)
    switch (name) {
      case "relationship":
        error.relationship[id] =
        (!validNameRegex.test(value))
        ? "Realtionship must be in characters!"
        : (value.length > 20) 
        ? "Relationship must be less than 20 characters long!" 
        : "";
   break;
     
      default:
        break;
    }
    this.setState(list)
    console.log(this.state)
  }

 
  
  
   
    return (
      <div className='form-width'>
      <div className="form-header-container mb-4">
            <h3 className="form-header-text">Add New Matter</h3>
      </div>
      <Card title="Matter Information" className="mb-4">
        <Form className="form-details" >
          
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
                <Form.Control required name='matterDescription' as="textarea" rows="3" type="text" placeholder="Matter description" 
                  value={editRes.matterDescription} onChange={handleChange}/>
              </Form.Group>
              <Form.Group controlId="formGroupClientRefenceNumber">
                <Form.Label>Client reference number</Form.Label>
                <Form.Control name='clientReferenceNumber' type="number" placeholder="Client Refence Number" 
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
          <DynamicFeild name="realtedContacts" InputList={this.state.relatedContacts}  option={optns} error={error.relationship} change={HandleDynamicChange} editRes={editRes} delete={handleDelete} editMode={editMode}></DynamicFeild> 

    
            <br/>
            <div className="form-add mb-4">
              <span onClick={addFeild}>Add Related Contact</span>
            </div>
          </Form>
      </Card>
      <Card title="Custom Feilds"  className="mb-4">
      <Form className="form-details">
      <p>Customise your<Button variant="link" onClick={()=>this.props.history.push('/settings/customFeilds')}>Custom Feilds</Button></p>

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
      <Button onClick={this.handleSubmit} lassName="btn btn-success" >ADD</Button>
     <br></br>
      <Modal
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

const mapStateToProps = state => ({
  userId: state.user.token.user._id
});
export default connect(mapStateToProps)(AddEditMatter)


