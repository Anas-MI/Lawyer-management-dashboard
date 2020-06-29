import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, createBlog } from '../../../store/Actions'
import { Form, Row , Button, Col } from "react-bootstrap";
//import Classes from './index.css'
import { Upload, message,  Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DynamicFeilds from './DynamicFeilds/index.js'
import api from '../../../resources/api'
import AddCompany from './AddCompany/index'

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validNameRegex = RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);

const validZipRegex = RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
const validUrlRegex = RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
const validPrefixRegex = RegExp(/^(Miss|Mr|Mrs|Ms|Dr|Gov|Prof)\b/gm);

const AddEditContact = props => {

    const [state,setState] = useState({})
    const [companyData,setcompanyData] = useState({})
    const [modal , setModal] = useState()
    const [editMode,setEditMode] = useState(false)
    const [error, setError] = useState({
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Prefix: "",
      Title:"",
      Email: "",
      PhoneNumber: "",
      Website:"",
      Address:"",
      Street:"",
      City:"",
      State:"",
      ZipCode:"",
    });
    const dispatch = useDispatch()
    let [options, setOptions] = useState() 
    let response = {}
    const selectedContact = useSelector(state=>state.Contact.selected)
    useEffect(() => {
    
      async function fetchData() {
        response = await api.get('/company/showall')
        setOptionsList()
      }
      fetchData();
    }, []);
   
   
    const setOptionsList=()=>{
      let temp = response.data.data.map((value,id)=>{
        let key=id
      return <option>{value.name}</option>
      })
      setOptions(temp)
    }
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

  
  const handleChange = (e) => {
    e.persist()
    if(e.target.name == "Address" ){

    }else 
    if(e.target.name == "Email") {

    }else
    if(e.target.name == "Email") {

    }else
    {
    setState(st=>({...st,[e.target.name]:e.target.value}))
    }
    console.log(state)
    const { name, value } = e.target;
    let errors = error;
    switch (name) {
      case "Prefix":
          errors.Prefix = validPrefixRegex.test(value)
            ? ""
            : "Prefix is not valid!";
          break;
      case "FirstName":
        errors.FirstName =
            (value.length == 0) 
            ? "" 
            : (!validNameRegex.test(value))
            ? "First Name must be in characters!"
            : (value.length > 20) 
            ? "First Name must be less than 20 characters long!" 
            : "";
       break;
      case "MiddleName":
        errors.MiddleName =
          (value.length == 0) 
          ? "" 
          : (!validNameRegex.test(value))
          ? "Middle Name must be in characters!"
          : (value.length > 20) 
          ? "Middle Name must be less than 20 characters long!" 
          : "";
      break;
      case "LastName":
        errors.LastName =
          (value.length == 0) 
          ? "" 
          : (!validNameRegex.test(value))
          ? "Last Name must be in characters!"
          : (value.length > 20) 
          ? "Last Name must be less than 20 characters long!" 
          : "";
        break;
      case "lawFirmSize":
        errors.lawFirmSize = value === "nn" ? "Law Firm Size is required!" : "";
        break;
      case "Email":
        errors.Email = validEmailRegex.test(value)
          ? ""
          : "Email is not valid!";
        break;
      case "countryOfPractice":
        errors.countryOfPractice =
          value === "default" ? "Country is required!" : "";
        break;
      case "PhoneNumber":
        errors.PhoneNumber =
          value.length < 10 || value.length > 13
            ? "phone number must be between 10 and 13 digits"
            : "";
        break;
      case "Title":
          errors.Title =
            value.length == 0 ? "Title is Required" : "";
        break;
      case "Address":
          errors.Address =
            value.length == 0 ? "Address is Required" : "";
        break;
      case "Street":
          errors.Street =
            value.length == 0 ? "Street is Required" : "";
        break;
      case "City":
          errors.City =
            value.length == 0 ? "City is Required" : "";
        break;
      case "State":
          errors.State =
            value.length == 0 ? "State is Required" : "";
        break;
      case "ZipCode":
          errors.ZipCode = validZipRegex.test(value)
            ? ""
            : "Zipcode is not valid!";
          break;
      case "Website":
          errors.Website = validUrlRegex.test(value)
            ? ""
            : "Website is not valid!";
          break;
      default:
        break;
    }
    setError({ ...errors });
  }
  const handleMultipleChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[name][index] = value;
      setInputList(list); 
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
  
 const AddCompanyHandler = ()=>{
   api.post('/company/create', {companyData})
   setModal(false)

 }

 const companyDataHandler=(e)=>{
  e.persist()
  /*
  console.log(e.target.value)
  if (["Address","Email", "Number"].includes(e.target.className) ) {
    let list = inputList
    const path = e.target.className
    list.path[e.target.dataset.id] = e.target.value
    console.log(list)
    setInputList({list})
    let newState = [...state]
    newState.push(...inputList)
    setState(newState)
  } else */ {
  setcompanyData(st=>({...st,[e.target.name]:e.target.value}))
  }
 }


    
    const handleSubmit = e => {
        e.preventDefault()
        if(editMode){
           //  dispatch(updateBlog({id:state._id,body:state}))
        }else{
           api.post('contact/create', state)
        }
        props.history.goBack()
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
            <Form.Group controlId="formGroupPrefix">
              <Form.Label>Prefix</Form.Label>
              <Form.Control name='Prefix' type="text" placeholder="Prefix" 
              value={state['Prefix']} onChange={handleChange}/>
            </Form.Group>
            <p className="help-block text-danger">{error.Prefix}</p>
          
            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control name='FirstName' type="text" placeholder="First Name" 
                  value={state['FirstName']} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.FirstName}</p>
              </Col>
              <Col>
                <Form.Group controlId="formGroupMiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control name='MiddleName' type="text" placeholder="Middle Name" 
                  value={state['MiddleName']} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.MiddleName}</p>
              </Col>
              <Col>
                <Form.Group controlId="formGroupLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control name='LastName' type="text" placeholder="Last Name" 
                  value={state['LastName']} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.LastName}</p>
              </Col>
            </Form.Row>
            
            <Row>
            <Col>
              <Form.Group controlId="formGroupCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control as="select">
                  {options}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button type="primary" onClick={() => setModal(true)}>
          Add Company
        </Button>
            
            <DynamicFeilds type={"Email"} name={"Email"} text={"Email"} error={error.Email} inputList={inputList.Email} change={handleChange}></DynamicFeilds>
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
                <p className="help-block text-danger">{error.Title}</p>
              </Col>
            </Row>

            
            <DynamicFeilds type={"PhoneNumber"} name={"PhoneNumber"} text={"Phone Number"} error={error.PhoneNumber} inputList={inputList.Number} change={handleChange}></DynamicFeilds>
            <div className="form-add mb-4">
              <span onClick={()=>addFeild("Number")}>Add a Phone Number</span>
            </div>

            <Form.Group controlId="formGroupWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control name='Website' type="text" placeholder="Website" 
              value={state['Website']} onChange={handleChange}/>
            </Form.Group>
            <p className="help-block text-danger">{error.Website}</p>

            <p style={{"color" : "#4e4e91"}}><b>Address</b></p>
            <Form.Group controlId="formGroupStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control name='Street' type="text" placeholder="Street" 
              value={state['Street']} onChange={handleChange}/>
            </Form.Group>
            <p className="help-block text-danger">{error.Street}</p>

            <Form.Row>
              <Col>
                <Form.Group controlId="formGroupCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control name='City' type="text" placeholder="City" 
                  value={state['City']} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.City}</p>
              </Col>
              <Col>
                <Form.Group controlId="formGroupState">
                  <Form.Label>State</Form.Label>
                  <Form.Control name='State' type="text" placeholder="State" 
                  value={state['State']} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.State}</p>
              </Col>
              <Col>
                <Form.Group controlId="formGroupZipCode">
                  <Form.Label>ZipCode</Form.Label>
                  <Form.Control name='ZipCode' type="text" placeholder="ZipCode" 
                  value={state['ZipCode']} onChange={handleChange}/>
                </Form.Group>
                <p className="help-block text-danger">{error.ZipCode}</p>
              </Col>
            </Form.Row>
        
            
            <DynamicFeilds type={"Address"} name={"Address"} text={"Address"} inputList={inputList.Address} error={error.Address} change={handleChange}></DynamicFeilds>
            <div className="form-add mb-4">
              <span onClick={()=>addFeild("Address")}>Add an Address</span>
            </div>

            <Button onClick={handleSubmit} className="btn btn-success">{editMode?'Update':'Create'}</Button>
          </Form>
          <Modal
          title="Add Company"
          centered
          visible={modal}
          onOk={AddCompanyHandler}
          onCancel={() => setModal(false)}
        >
         <AddCompany></AddCompany>

        </Modal>
          </div>
      </div>
    </>  
    )
}

export default AddEditContact

