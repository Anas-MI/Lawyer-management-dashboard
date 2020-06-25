import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, createBlog } from '../../../store/Actions'
import { Form,Button, Row , Col } from "react-bootstrap";
//import Classes from './index.css'
import { Upload, message, antdButton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DynamicFeilds from './DynamicFeilds/index.js'


const AddEditContact = props => {

    const [state,setState] = useState({})
    const [editMode,setEditMode] = useState(false)
    const dispatch = useDispatch()
    const selectedContact = useSelector(state=>state.Contact.selected)

    useEffect(()=>{
        if(!selectedContact){
            setEditMode(false)
        }else{
            setState({...selectedContact})
            setEditMode(true)
        }
    },[])
    const [inputList, setInputList] = useState({Address : [""], Email : [""], Number : [""],
    CompanyAddress : [""], CompanyEmail : [""], CompanyNumber : [""], CompanyWebsite: [""]
  });


  const handleChange = (e,index) => {
    e.persist()
    console.log(e.target.value)
    console.log(index)
    if (["Address","Email", "Number"].includes(e.target.className) ) {
      let list = inputList
      const path = e.target.className
      list.path[e.target.dataset.id] = e.target.value
      console.log(list)
      setInputList({list})
      let newState = [...state]
      newState.push(...inputList)
      setState(newState)
    } else {
    setState(st=>({...st,[e.target.name]:e.target.value}))
    }
  }

  const handleImageChange = e => {
    console.log(e)
    //setState(st=>({...st,[e.target.name]:e.target.value}))
    }
   const addFeild = (type) => {
    let list = inputList
      if(type==="Email"){
        list.Email.push("")
        setInputList(list)
      }else
      if(type==="Address"){
        list.Address.push("")
        setInputList(list)
      }else if(type==="Number"){
        list.Number.push("")
        setInputList(list)
      }
      console.log(inputList)
    let newState = state
    newState= [state, inputList]
    setState(newState)
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


    
    const handleSubmit = e => {
        e.preventDefault()
        if(editMode){
             dispatch(updateBlog({id:state._id,body:state}))
        }else{
          console.log(state)
             dispatch(createBlog(state))
        }
        props.history.goBack()
    }

    return (
      <>
        <div className="form-header-container mb-4">
          <h3 className="form-header-text">Add New Person</h3>
        </div>
        <div className='w-75'>
          <div className="card" style={{"padding" : "1rem"}}>
            <Form className="form-details">
              <h4>Personal Details</h4>

              <Upload {...imageHandler} onChange={handleImageChange}>
                <antdButton className="form-upload-button">
                  <UploadOutlined /> Click to Upload
                </antdButton>
              </Upload><br></br>
            <Form.Group controlId="formGroupPrefix">
              <Form.Label>Prefix</Form.Label>
              <Form.Control name='Prefix' type="text" placeholder="Prefix" 
              value={state['Prefix']} onChange={handleChange}/>
            </Form.Group>
          
            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control name='FirstName' type="text" placeholder="First Name" 
                  value={state['FirstName']} onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control name='MiddleName' type="text" placeholder="Middle Name" 
                  value={state['MiddleName']} onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control name='LastName' type="text" placeholder="Last Name" 
                  value={state['LastName']} onChange={handleChange}/>
                </Form.Group>
              </Col>
            </Form.Row>
            
            <Row>
              <Col>
                <Form.Group controlId="formGroupCompany">
                  <Form.Label>Company</Form.Label>
                  <Form.Control as="select">
                    <option>Third Essential</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            
            <DynamicFeilds type={"Email"} name={"Email"} inputList={inputList.Email} change={handleChange}></DynamicFeilds>
            <div className="form-add mb-4">
              <span onClick={()=>addFeild("Email")}>Add an Email</span>
            </div>
            <Row>
              <Col>
                <Form.Group controlId="formGroupTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name='Title' type="text" placeholder="Title" 
                  value={state['Title']} onChange={handleChange}/>
                </Form.Group>
              </Col>
            </Row>

            
            <DynamicFeilds type={"PhoneNumber"} name={"Phone Number"} inputList={inputList.Number} change={handleChange}></DynamicFeilds>
            <div className="form-add mb-4">
              <span onClick={()=>addFeild("Number")}>Add a Phone Number</span>
            </div>

            <Form.Group controlId="formGroupWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control name='Website' type="text" placeholder="Website" 
              value={state['Website']} onChange={handleChange}/>
            </Form.Group>
            <p style={{"color" : "#4e4e91"}}><b>Address</b></p>
            <Form.Group controlId="formGroupStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control name='Street' type="text" placeholder="Street" 
              value={state['Street']} onChange={handleChange}/>
            </Form.Group>

            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control name='City' type="text" placeholder="City" 
                  value={state['City']} onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupState">
                  <Form.Label>State</Form.Label>
                  <Form.Control name='State' type="text" placeholder="State" 
                  value={state['State']} onChange={handleChange}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupZipCode">
                  <Form.Label>ZipCode</Form.Label>
                  <Form.Control name='ZipCode' type="text" placeholder="ZipCode" 
                  value={state['ZipCode']} onChange={handleChange}/>
                </Form.Group>
              </Col>
            </Form.Row>
        
            
            <DynamicFeilds type={"Address"} name={"Address"} inputList={inputList.Address} change={handleChange}></DynamicFeilds>
            <div className="form-add mb-4">
              <span onClick={()=>addFeild("Address")}>Add an Address</span>
            </div>

            <Button onClick={handleSubmit} className="btn btn-success">{editMode?'Update':'Create'}</Button>
          </Form>
          </div>
      </div>
    </>  
    )
}

export default AddEditContact

