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
let editMode = true;
let editRes = ""
let customData =  []
let clientId = 0
let error = {
  relationship: [""]
}

class AddEditMatter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      rate : "Flat",
      status :"Open",
      editData : {},
      client : "",
      relatedContacts : [],
      customFields : [],
      modal : false,
      taskOptions: []
    }

  }
  handleCustom(e){
    e.persist()
    const { id , value, name } = e.target
    customData[id]={[name] : value}
  

  }
  handleChange = (e) => {
    e.persist()
    this.setState(st=>({...st,[e.target.name]:e.target.value}))
    if(e.target.name==="client"){
      clientId = e.target.selectedIndex - 1
    }
  }
   addFeild=() =>{
      let list = this.state.relatedContacts
      list.push({relationship : "", contact : "", billThis : "", id: ""})
      this.setState({relatedContacts : list})
 
  }
   handleDelete = (e)=>{
    e.persist()
     const { name , id } = e.target
     let newState = this.state
     newState.relatedContacts.splice(id, 1)
     this.setState(newState)
  }

  HandleDynamicChange = (e)=>{
    e.persist()
    let list = this.state
    const { id , value, name , checked ,selectedIndex } = e.target
    if(name==="billThis"){
      list.relatedContacts[id][name] = checked
    }if(name === 'contact'){
      console.log(contacts)
      if(selectedIndex != 0){
        list.relatedContacts[id][name] = contacts.data.data[selectedIndex -1]._id
      list.relatedContacts[id].id = selectedIndex
      }
    }else{
    list.relatedContacts[id][name] = value
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
  async componentDidMount(){
   
    const editData = await api.get('/matter/view/'+this.props.location.state)
    console.log(editData)
    this.setState({editData : editData.data.data, 
      matterDescription : editData.data.data.matterDescription , 
      relatedContacts : editData.data.data.relatedContacts? editData.data.data.relatedContacts : [] })
    this.setState({client: editData.data.data.client._id})

    let taskOptions = []
    api.get('/tasks/viewforuser/' + this.props.userId).then((res) => {
      console.log(res)
      res.data.data.map((value, index)=>{
        taskOptions.push(<option value={value._id}>{value.taskName}</option>)
      })
      this.setState({taskOptions : taskOptions})
      const taskAuto =<Form className="form-details">
                      <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Task</Form.Label>
                                <Form.Control as="select" name="task" onChange={this.handleChange} defaultValue={this.state.editData.task ? this.state.editData.task[0] : ""}>
                                  <option>Select a task</option>
                                  {
                                    this.state.taskOptions.map((val)=>{
                                      return val
                                    })
                                  }
                                </Form.Control>
                              </Form.Group>
                        
                      </Form>
      this.setState({ taskAutomation : taskAuto})
    })
    api.get('/user/view/' + this.props.userId).then((res)=>{
     console.log(res)
      let customFeilds = []
  
      res.data.data.customFields.map((value, index)=>{

          customFeilds.push(<Col md="6">
          <Form.Group key={index} controlId={index}>
            <Form.Label>{value.name}</Form.Label>
            <Form.Control
              name={value.name}
              type={value.type}
              defaultValue={editData.data.data.customFields.length == 0 || editData.data.data.customFields[index] == undefined ? " " : editData.data.data.customFields[index][value.name]}
            onChange={this.handleCustom}
            />
          </Form.Group>
        </Col>)
        console.log(editData.data.data.customFields)
      })
      this.setState({
        customFields : customFeilds
      })
    
      })
   
    if(this.props.location.pathname==="/manage/Matter/edit"){
      editMode= true;
      editRes= this.props.location.state
    }
    res = await api.get('/user/view/'+this.props.userId).then(
      contacts = await api.get('contact/viewforuser/'+this.props.userId))
    
   
    optns = contacts.data.data.map((value, index)=>{
 
      return <option value={value._id} id={index}>{value.firstName + " " + value.lastName}</option>
     })

     const formData = <div>
       <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Client</Form.Label>
              <Form.Control as="select" name="client" defaultValue={this.state.editData.client._id} onChange={this.handleChange}>
              <option>Select a contact</option>

                {optns}
              </Form.Control>
            </Form.Group>
            <div className="form-add mb-4">
              <span onClick={() => this.setState({modal:true})}>Add Contact</span>
            </div>
        <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Practise Area</Form.Label>
                <Form.Control as="select" name="practiseArea" onChange={this.handleChange} defaultValue={this.state.editData.practiseArea}>
                      <option>Select a practice area</option>
                      <option>Attorney</option>
                      <option>Administrative</option>
                      <option>Bankruptcy</option>
                      <option>Business</option>
                      <option>Builder's Liens</option>
                      <option>Civil Litigation</option>
                      <option>Commercial</option>
                      <option>Conveyance (Purchase)</option>
                      <option>Conveyance (Sale)</option>
                      <option>Corporate</option>
                      <option>Criminal</option>
                      <option>Employment</option>
                      <option>Estates</option>
                      <option>Family</option>
                      <option>Immigration</option>
                      <option>Insurance</option>
                      <option>Personal Injury</option>
                      <option>Tax</option>
                      <option>Wills</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" onChange={this.handleChange} defaultValue={this.state.editData.status}>
                  <option>Open</option>
                  <option>Closed</option>
                  <option>Pending</option>
                </Form.Control>
              </Form.Group>
              <Form.Row className="matter-res-date">
                <Col sm>
                  <Form.Group controlId="formGroupOpenDate">
                  <Form.Label>Open Date</Form.Label>
                  <Form.Control name='openDate' type="Date" defaultValue={this.state.editData.openDate} 
                  onChange={this.handleChange}/>
                  </Form.Group>
                </Col>
                <Col sm>  
                  <Form.Group controlId="formGroupClosing Date">
                  <Form.Label>Closing Date</Form.Label>
                  <Form.Control name='closeDate' type="Date" defaultValue={this.state.editData.closeDate}
                   onChange={this.handleChange}/>
                  </Form.Group>
                </Col>  
                <Col sm>
                  <Form.Group controlId="formGroupPendingDate">
                  <Form.Label>Pending Date</Form.Label>
                  <Form.Control name='pendingDate' type="Date" defaultValue={this.state.editData.pendingDate}
                 onChange={this.handleChange}/>
                  </Form.Group>
                </Col> 
              </Form.Row>
     </div>
     
     const contactForm = <Form className="form-details">
     <DynamicFeild name="realtedContacts"   InputList={this.state.relatedContacts}  option={optns} error={error.relationship} change={this.HandleDynamicChange}  delete={this.handleDelete} editMode={editMode}></DynamicFeild> 


       <br/>
       <div className="form-add mb-4">
         <span onClick={this.addFeild}>Add Related Contact</span>
       </div>
     </Form>
     const billing =  <Form className="form-details">
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Rate</Form.Label>
                            <Form.Control as="select" name="billingType" onChange={this.handleChange} defaultValue={this.state.editData.billingType} >
                              <option>Flat</option>
                              <option>Hourly</option>
                              <option>Contagious</option>
                            </Form.Control>
                          </Form.Group>
                      </Form>
     this.setState({formData : formData, contactForm : contactForm, billing : billing})
   
    /*
    customFields = res.data.data.customFields.map((value, index)=>{
      return <Form.Group key={index} controlId={index}>
              <Form.Label>{value.name}</Form.Label>
              <Form.Control required={value.required} 
              name={value.name} type={value.type} 
              defaultValue={this.state.editData.customFields ? this.state.editData.customFields[index][value.name] : ""}
               onChange={this.handleCustom}/>
             </Form.Group>
    })*/
    this.setState({optns : optns,})
   
    
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
        message: "Please select a contact",
      });
    }else{
     // console.log("all good")
       const data = this.state
        data.customFields = customData
        data.client = contacts.data.data[clientId]._id
        data.userId = this.props.userId

       if(editMode){
        api.post('/matter/edit/'+this.props.location.state, data).then((res)=>{
            console.log(res)
            this.openNotificationWithIcon('success')
            if(this.props.location!=undefined){
              this.props.history.goBack()
             }
          }).catch(()=>{
            this.openNotificationWithfailure('error')
          })
            /*
             if(this.props.location!=undefined){
               this.props.history.goBack()
              }
              */

       }else{
         api.post('/matter/create', data).then(res=>console.log(res)).then(()=>this.openNotificationWithIcon('success')).catch(()=>this.openNotificationWithfailure('error'))
         
       }

       
    }
  }
  
  render(){
    

    
  
  const handleChange = (e) => {
    e.persist()
    
    if(e.target.name==="client"){
      clientId = e.target.selectedIndex - 1
    }else
    if(e.target.name === "task"){
      if(e.target.selectedIndex != 0){
        this.setState(st=>({...st,[e.target.name]:e.target.value}))
      }
    }
    else{
      this.setState(st=>({...st,[e.target.name]:e.target.value}))
    }
  }
  

    return (
      <div className='form-width'>
      <div className="form-header-container mb-4">
            <h3 className="form-header-text">Edit Matter</h3>
      </div>
      <Card title="Matter Information" className="mb-4">
        <Form className="form-details" >
          
           
            <Form.Group controlId="formGroupMatter">
              <Form.Label>Matter Description</Form.Label>
                <Form.Control required name='matterDescription' as="textarea" rows="3" type="text" defaultValue={this.state.editData.matterDescription}
                 onChange={handleChange}/>
              </Form.Group>
              {
                this.state.formData
              }
              <Form.Group controlId="formGroupClientRefenceNumber">
                <Form.Label>Client reference number</Form.Label>
                <Form.Control name='clientReferenceNumber' type="number" defaultValue={this.state.editData.clientReferenceNumber}
                 onChange={handleChange}/>
              </Form.Group>
            
       </Form>
      </Card>

      <Card title="Related Contacts" className="mb-4">
          {
            this.state.contactForm
          }
      </Card>
      <Card title="Custom Fields"  className="mb-4">
      <Form className="form-details">
      <p>Customise your<Button variant="link" onClick={()=>this.props.history.push('/settings/customFeilds')}>Custom Fields</Button></p>

      {       
                  this.state.customFields.map((val)=>{
                    return val
                  })
                }
      </Form>
      </Card>
      <Card title="Billing Preference"  className="mb-4">
        {this.state.billing}
      </Card>

      <Card title="Task Automation"  className="mb-4">
      {
        this.state.taskAutomation
      }
      </Card>
      <Button onClick={this.handleSubmit} className="btn btn-success" >Update</Button>
      <Button onClick={()=>{this.props.history.goBack()}} >CANCEL</Button>
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


