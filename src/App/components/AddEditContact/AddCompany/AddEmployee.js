import React, { useState, useEffect, usePrevious, useRef} from 'react'
import { Form,Button, Row , Col } from "react-bootstrap";
import { Upload, message, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DynamicFeilds from '../DynamicFeilds/index.js'

function AddEmployee (props){

    const [state,setState] = useState({})
    const [index,setindex] = useState({})
    const [inputList, setInputList] = useState({Name : "",
        CompanyAddress : [""], CompanyEmail : [""], CompanyNumber : [""], CompanyWebsite: [""]
      });
      
      const prevState = usePrevious(props.state)
      const prevIndex = usePrevious(props.Index)
      
      function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      }
      
      useEffect(()=>{
      
        if(prevState != props.state){
            setState(props.state)
        }
        if(prevIndex != props.Index){
            setindex(props.index)
        }

      })
     
      
      const handleChange = (e) => {
        e.persist()
        console.log(e)
        if ([ "CompanyWebsite", "CompanyAddress","CompanyEmail", "CompanyNumber"].includes(e.target.className) ) {
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
        //setState(st=>({...st,[e.target.name]:e.target.value}))
        }
       const addFeild = (type) => {
        let list = inputList
         if(type==="CompanyWebsite"){
            list.CompanyWebsite.push("")
            setInputList(list)
          }if(type==="CompanyEmail"){
            list.CompanyEmail.push("")
            setInputList(list)
          }else
          if(type==="CompanyAddress"){
            list.CompanyAddress.push("")
            setInputList(list)
          }else if(type==="CompanyNumber"){
            list.CompanyNumber.push("")
            setInputList(list)     
        }
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
    return  (
    <>
      <div className='form-width'>
        <div className="card p-4">
        <Form className="form-details">   
        <div className="form-header-container mb-4">
              <h3 className="form-header-text">Add New Employee</h3>
        </div>
        <Upload {...imageHandler} onChange={handleImageChange}>
            <antdButton className="form-upload-button">
              <UploadOutlined /> Click to Upload
            </antdButton>
          </Upload><br></br>
        <Form.Row>
          <Col>
            <Form.Group controlId="formGroupFirstName">
              <Form.Label>Name</Form.Label>
              <Form.Control name='FirstName' type="text" placeholder="First Name" 
              value={state['FirstName']} onChange={(e)=>handleChange(e)}/>
            </Form.Group>
          </Col>
          <Col>
            
          </Col>
          <Col>
            
          </Col>
        </Form.Row>

        <DynamicFeilds type={"CompanyEmail"} name={"Company Email"} inputList={inputList.CompanyEmail} change={(e)=>handleChange(e)}></DynamicFeilds>
        <div className="form-add mb-4">
          <span onClick={()=>addFeild("CompanyEmail")}>Add a Company Email</span>
        </div>

        <DynamicFeilds type={"CompanyNumber"} name={"Company Phone Number"} inputList={inputList.CompanyNumber} change={handleChange}></DynamicFeilds>
        <div className="form-add mb-4">
          <span onClick={()=>addFeild("CompanyNumber")}>Add a Company Number</span>
        </div>

        <DynamicFeilds type={"CompanyWebsite"} name={"Company Website"} inputList={inputList.CompanyWebsite} change={handleChange}></DynamicFeilds>
        <div className="form-add mb-4">
          <span onClick={()=>addFeild("CompanyWebsite")}>Add a Company Website</span>
        </div>

        <p className='text-center' style={{"color" : "#4e4e91"}}><b>Address</b></p>
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
        
        <DynamicFeilds type={"CompanyAddress"} name={"Company Address"} inputList={inputList.CompanyAddress} change={handleChange}></DynamicFeilds>
        <div className="form-add mb-4">
          <span onClick={()=>addFeild("CompanyAddress")}>Add a Company Address</span>
        </div>
        </Form>
      </div>
      </div>
    </>
    )
}

export default AddEmployee
