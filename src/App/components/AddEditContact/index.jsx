import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, createBlog } from '../../../store/Actions'
import { Form,Button, Row , Col } from "react-bootstrap";
import Classes from './index.css'
import { Upload, message, antdButton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



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

    const [inputList, setInputList] = useState([{ type: "" }]);
 {/*
  // handle input change
  const handleInputChange = (e, index) => {
    const temp = e.target;
    const list = [...inputList];
    list[index] = temp;
    setInputList(list);
  };
 

   
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { firstName: "", lastName: "" }]);
    };

  */}
  const handleChange = e => {
    e.persist()
    setState(st=>({...st,[e.target.name]:e.target.value}))
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
           //  dispatch(updateBlog({id:state._id,body:state}))
        }else{
           //  dispatch(createBlog(state))
        }
        props.history.goBack()
    }

    return (
        <div className='w-75 m-auto'>
        <h3 className='text-center' >Add New Contact</h3>
        <Form>
            <Upload {...imageHandler} onChange={handleChange}>
              <antdButton>
                <UploadOutlined /> Click to Upload
              </antdButton>
            </Upload><br></br>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Prefix</Form.Label>
            <Form.Control name='Prefix' type="text" placeholder="Prefix" 
            value={state['Prefix']} onChange={handleChange}/>
          </Form.Group>

          <Form.Row>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control name='FirstName' type="text" placeholder="First Name" 
                value={state['FirstName']} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control name='MiddleName' type="text" placeholder="Middle Name" 
                value={state['MiddleName']} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name='LastName' type="text" placeholder="Last Name" 
                value={state['LastName']} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Form.Row>
          
          <Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Company</Form.Label>
                <Form.Control as="select">
                  <option>Third Essential</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name='Email' type="text" placeholder="Email" 
                value={state['Email']} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control name='Title' type="text" placeholder="Title" 
                value={state['Title']} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name='PhoneNumber' type="number" placeholder="Phone Number" 
                value={state['PhoneNumber']} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Row>


          <Form.Group controlId="formGroupEmail">
            <Form.Label>Website</Form.Label>
            <Form.Control name='Website' type="text" placeholder="Website" 
            value={state['Website']} onChange={handleChange}/>
          </Form.Group>
          <p className='text-center' >Address</p>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Street</Form.Label>
            <Form.Control name='Street' type="text" placeholder="Street" 
            value={state['Street']} onChange={handleChange}/>
          </Form.Group>

          <Form.Row>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>City</Form.Label>
                <Form.Control name='City' type="text" placeholder="City" 
                value={state['City']} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>State</Form.Label>
                <Form.Control name='State' type="text" placeholder="State" 
                value={state['State']} onChange={handleChange}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupEmail">n
                <Form.Label>ZipCode</Form.Label>
                <Form.Control name='ZipCode' type="text" placeholder="ZipCode" 
                value={state['ZipCode']} onChange={handleChange}/>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Type</Form.Label>
            <Form.Control name='Type' type="text" placeholder="Type" 
             value={state['Type']} onChange={handleChange}/>
          </Form.Group>
          {/*
          <div>
              {inputList.map((x, i) => {
                return (
                  <div>
                    <Form.Group controlId="formGroupEmail">
                      <Form.Label>Type</Form.Label>
                      <Form.Control name='Type' type="text" placeholder="Type" 
                      value={state['Type']} onChange={handleChange}/>
                    </Form.Group>
                    <div>
                      {inputList.length !== 1 && <Button
                        className="mr10"
                        onClick={() => handleRemoveClick(i)}>Remove</Button>}
                      {inputList.length - 1 === i && <Button onClick={handleAddClick}>Add</Button>}
                    </div>
                  </div>
                );
              })}
              
            </div>*/}
            
          <Button onClick={handleSubmit}>{editMode?'Update':'Create'}</Button>
        </Form>
      </div>
    )
}

export default AddEditContact
