import React from 'react'
import { Form, Row , Button, Col } from "react-bootstrap";
import { Upload, message,  Modal } from 'antd';
import { notification } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import DynamicFeilds from './DynamicFeilds/index.js'
import api from '../../../resources/api'
import AddCompany from './AddCompany/index'


const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validNameRegex = RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

const validUrlRegex = RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);


let editMode = null
let options = null
let response = {}
let res = ""
let error = {
  FirstName: "",
  MiddleName: "",
  LastName: "",
  Prefix: "",
  Title:"",
}
let errors ={
  Email: [""],
  Number: [""],
  Website:[""],
  Address:[""],
  Street:[""],
  City:[""],
  Country:[""],
  State:[""],
  ZipCode:[""],
  Type:[""],
}
class newPerson extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Address : [""], Email : [""], Number : [""], Website:[""], modal : false
    }
  }
  async componentDidMount(){
    response = await api.get('/company/showall')
    
     options = response.data.data.map((value,id)=>{
    return <option key={id}>{value.name}</option>
    })
  }
  componentWillUpdate(){
    if(this.props.location.pathname == "/manage/contacts/edit/person"){
      editMode = true
      res=this.props.location.state
    }
  }
  render(){
    let address = null
    const handleChange = (e) => {
      e.persist()
      this.setState(st=>({...st,[e.target.name]:e.target.value}))
      console.log(this.state)
      const { name, value, id } = e.target;
      switch (name) {
        case "Prefix":
        
        case "FirstName":
          error.FirstName =
              (value.length == 0) 
              ? "" 
              : (!validNameRegex.test(value))
              ? "First Name must be in characters!"
              : (value.length > 20) 
              ? "First Name must be less than 20 characters long!" 
              : "";
         break;
        case "MiddleName":
          error.MiddleName =
            (value.length == 0) 
            ? "" 
            : (!validNameRegex.test(value))
            ? "Middle Name must be in characters!"
            : (value.length > 20) 
            ? "Middle Name must be less than 20 characters long!" 
            : "";
        break;
        case "LastName":
          error.LastName =
            (value.length == 0) 
            ? "" 
            : (!validNameRegex.test(value))
            ? "Last Name must be in characters!"
            : (value.length > 20) 
            ? "Last Name must be less than 20 characters long!" 
            : "";
          break;
        case "lawFirmSize":
          error.lawFirmSize = value === "nn" ? "Law Firm Size is required!" : "";
          break;

        case "Title":
            error.Title =
              value.length == 0 ? "Title is Required" : "";
          break;
       
        default:
          break;
      }
      console.log(error)
    }
    const HandleAddressChange=(e)=>{
      e.persist()
      address = {...address, [e.target.name]:e.target.value}
      let newState = this.state
      newState.Address[e.target.id]=address
    }
    const handleMultipleChange = (e) => {
      e.persist()
      let list = this.state
      const { id , value, name } = e.target  
      list[name][id] = value
      this.setState(list)
      
      console.log(error)
    }
    
  
    const handleImageChange = e => {
      //this.setState(st=>({...st,[e.target.name]:e.target.value}))
      }
     const addFeild = (type) => {
      let list = this.state
        if(type==="Email"){
          list.Email.push("")
          this.setState(list)
        }else
        if(type==="Address"){
          list.Address.push("")
          this.setState(list)
        }else if(type==="Number"){
          list.Number.push("")
          this.setState(list)
        }else if(type==="Website"){
          list.Website.push("")
          this.setState(list)
        }
        console.log(this.state[type])
     
    }
  const imageHandler = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
    
   const AddCompanyHandler = ()=>{
    // api.post('/company/create', {companyData})
     this.setState({modal : false})
   }
 

   const handleDelete = (e)=>{
    e.persist()
     const { name , id } = e.target
     let newState = this.state
     newState[name].splice(id, 1)
     this.setState(newState)
  }
  
  const handleSubmit = e => {
    e.preventDefault()
      if(editMode){
             //  dispatch(updateBlog({id:this.state._id,body:this.state}))
      }else{
         api.post('contact/create', this.state)
        }
      this.props.history.goBack()
  }

      return (
        <>
        <div className='form-width'>
          <div className="card p-4">
            <Form className="form-details">
            <div className="form-header-container mb-4">
              <h3 className="form-header-text">Add New Person</h3>
            </div>
              <h4>Personal Details</h4>
              <Upload {...imageHandler} onChange={handleImageChange}>
                <antdButton className="form-upload-button">
                  <UploadOutlined /> Click to Upload
                </antdButton>
              </Upload><br></br>
              
            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control name='FirstName' type="text" placeholder="First Name" 
                  value={res.firstName} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.FirstName}</p>
              </Col>
              <Col>
                <Form.Group controlId="formGroupMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control name='MiddleName' type="text" placeholder="Middle Name" 
                  value={res.middleName} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.MiddleName}</p>
              </Col>
              <Col>
                <Form.Group controlId="formGroupLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control name='LastName' type="text" placeholder="Last Name" 
                  value={res.lastName} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.LastName}</p>
              </Col>
            </Form.Row>
            
            <Row>
            <Col>
              <Form.Group controlId="formGroupCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control as="select" onChange={handleChange}>
                  {options}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        
          <Row>
              <Col>
                <Form.Group controlId="formGroupTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name='Title' type="text" placeholder="Title" 
                  value={res.title} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.Title}</p>
              </Col>
          </Row>

            <DynamicFeilds type={"Email"} name={"Email"} text={"Email"} error={errors.Email} inputList={this.state.Email} change={handleMultipleChange} delete={handleDelete}></DynamicFeilds>
            <div className="form-add mb-4">
              <span onClick={()=>addFeild("Email")}>Add an Email</span>
            </div>

            <DynamicFeilds type={"Number"} name={"Number"} text={"Phone Number"} error={errors.Number} inputList={this.state.Number} change={handleMultipleChange} delete={handleDelete}></DynamicFeilds>
            <div className="form-add mb-4">
              <span onClick={()=>addFeild("Number")}>Add a Phone Number</span>
            </div>
            <DynamicFeilds type={"Website"} name={"Website"} text={"Website"} error={errors.Website} inputList={this.state.Website} change={handleMultipleChange} delete={handleDelete}></DynamicFeilds>
            <div className="form-add mb-4">
              <span onClick={()=>addFeild("Website")}>Add a Website</span>
            </div>
            
  
            <p style={{"color" : "#4e4e91"}}><b>Address</b></p>
            {
              this.state.Address.map((value, index)=>{
                return <div className="mb-3">
            <Form.Row>
              <Col>
              <Form.Group controlId={index}>
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" onChange={HandleAddressChange}>
                  <option value="default">Type</option>
                  <option value="Work">Work</option>
                  <option value="Home">Home</option>
                </Form.Control>
              </Form.Group>
              <p className="help-block text-danger">{errors.Type}</p>
              </Col>
              <Col>
              <Form.Group controlId={index}>
                  <Form.Label>Street</Form.Label>
                  <Form.Control name='Street' type="text" placeholder="Street" 
                  onChange={HandleAddressChange}/>
                 </Form.Group>
            <p className="help-block text-danger">{errors.Street[index]}</p>
              </Col>
              
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group controlId={index}>
                  <Form.Label>City</Form.Label>
                  <Form.Control name='City' type="text" placeholder="City" 
                   value={res.City} onChange={HandleAddressChange}/>
                </Form.Group>
                <p className="help-block text-danger">{errors.City[index]}</p>
              </Col>
              <Col>
                <Form.Group controlId={index}>
                  <Form.Label>State</Form.Label>
                  <Form.Control name='State'type="text" placeholder="State" 
                  value={res.State} onChange={HandleAddressChange}/>
                </Form.Group>
                <p className="help-block text-danger">{errors.State[index]}</p>
              </Col>
              <Col>
                <Form.Group controlId={index}>
                  <Form.Label>ZipCode</Form.Label>
                  <Form.Control name='ZipCode' type="number" placeholder="ZipCode" 
                  value={res.ZipCode} onChange={HandleAddressChange}/>
                </Form.Group>
                <p className="help-block text-danger">{errors.ZipCode[index]}</p>
              </Col>
              </Form.Row>
              
            <Form.Row>
              <Col>
                <Form.Group controlId={index}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control name='Address' type="text" placeholder="Address" 
                  value={res.Address} onChange={HandleAddressChange}/>
                </Form.Group>
                <p className="help-block text-danger">{errors.Address[index]}</p>
              </Col>
              <Button  style={{ "height": "45px", "margin-top": "25px"}} id={index} name="Address" onClick={handleDelete}>-</Button>
            </Form.Row>
        
                </div>
              })
            }
            
            <div className="form-add mb-4">
              <span onClick={()=>addFeild("Address")}>Add an Address</span>
            </div>
  
            <Button  onClick={handleSubmit} className="btn btn-success">{editMode?'Update':'Create'}</Button>
          </Form>
          <Modal
          centered
          visible={this.state.modal}
          onOk={AddCompanyHandler}
          onCancel={() => this.setState({modal : false})}
        >
         <AddCompany></AddCompany>
  
        </Modal>
          </div>
      </div>
    </>  
  
           )  
  }
}
export default newPerson
