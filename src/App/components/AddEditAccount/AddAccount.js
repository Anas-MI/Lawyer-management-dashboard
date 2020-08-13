import React, { useState } from  'react'
import { Form, Col, Button} from 'react-bootstrap'
import { Card, message, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import api from '../../../resources/api'
import { useSelector } from 'react-redux'

const validNameRegex = RegExp(
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
  );

const AddAccount = () =>{

    const history = useHistory()
    const userId = useSelector((state) => state.user.token.user._id);
    const [state, setState] = useState({
        userId : userId,
        type: "",
        accountName: "",
        accountHolder: "",
        accountNumber: "",
        institution: "",
        domicileBranch: "",
        swiftCode: "",
        transitNumber: "",
        currency: "",
        openingBalance: ""
    })
    const [error, setError] = useState({})
    const [display, setDisplay] = useState(false)

    // handel the change of form & set the error msg
    const handelChange = e =>{
        e.persist();
        setDisplay(false)
        const {name, value} = e.target;
        let errors = error
        switch (name) {
            case "type":
                errors.type = value === "default" ? "Account Type is required!" : "";
                break;
            case "accountName":
                errors.accountName =
                    value.length == 0
                    ? "Account Name is required!"
                    : !validNameRegex.test(value)
                    ? "Account Name must be in characters!"
                    : "";
                break;
            case "accountHolder":
                errors.accountHolder =
                    value.length == 0
                    ? "Account Holder is required!"
                    : !validNameRegex.test(value)
                    ? "Account Holder must be in characters!"
                    : "";
                break;
            case "accountNumber":
                errors.accountNumber =
                    value.length == 0
                    ? "Account Number is required!"
                    : "";
                break;
            case "institution":
                errors.institution =
                    value.length == 0
                    ? "Institution is required!"
                    : !validNameRegex.test(value)
                    ? "Institution must be in characters!"
                    : "";
                break;
            case "domicileBranch":
                errors.DomicileBranch =
                    value.length == 0
                    ? "Domicile Branch is required!"
                    : "";
                break;
            case "swiftCode":
                errors.swiftCode =
                    value.length == 0
                    ? "Swift Code is required!"
                    : "";
                break;
            case "transitNumber":
                errors.transitNumber =
                    value.length == 0
                    ? "Transit Number is required!"
                    : "";
                break;
            case "currency":
                errors.currency = value === "default" ? "Currency is required!" : "";
                break;
            case "openingBalance":
                errors.openingBalance =
                    value.length == 0
                    ? "Opening Balance is required!"
                    : value > 0 
                    ? ""
                    : "Opening Balance Greater than 0"
                    break;
            default:
                break;
        }
        setError( (st) => ({...st, ...errors }))
        setState( (st) => ({...st, [name] : value }));
    }

    // handel Submit of form 
    const handelSubmit = e =>{
        e.preventDefault();
        if(!display){
          const validateForm = (error) => {
            let valid = true;
            Object.values(error).forEach((val) => val.length > 0 && (valid = false));
            return valid;
          };
          if (validateForm(error)) {
            checkValidity();
          } else {
            setDisplay(true)
            return notification.warning({
              message: "Failed to Add New Account",
            });
          }
        }
      };
    
      // Check the Fields are Empty 
      function checkValidity() {

        if(state.type === ""){
            return notification.warning({
                message: "Please select a type" ,
              });
        }else
        if(state.accountHolder === ""){
            return notification.warning({
                message: "Please provide a Account holder" ,
              });
        }else if(state.accountName === ""){
            return notification.warning({
                message: "Please provide a Account Name" ,
              });
        }else  if(state.accountNumber === ""){
            return notification.warning({
                message: "Please provide a Account Number" ,
              });
        }else if(state.currency === ""){
            return notification.warning({
                message: "Please provide a currency" ,
              });
        }else if(state.domicileBranch === ""){
            return notification.warning({
                message: "Please provide a Domicile Branch" ,
              });
        }else if(state.institution === ""){
            return notification.warning({
                message: "Please provide a insitiution" ,
              });
        }else  if(state.openingBalance === ""){
            return notification.warning({
                message: "Please provide a opening balance" ,
              });
        }else  if(state.swiftCode === ""){
            return notification.warning({
                message: "Please provide a swift code" ,
              });
        }else  if(state.transitNumber === ""){
            return notification.warning({
                message: "Please provide a transit number" ,
              });
        }
        else {
            // if form is valid then do something
            api
            .post("/account/create", state)
            .then((res) => {
                console.log(res)
                notification.success({message : "Account Added."})
                history.goBack();
            })
            .catch((err) => {
                console.log(err); 
                notification.error({message : "Failed to add account."})
              });
        }
        
      }

    return(
        <>
        <div className='form-width'>
            <div className="form-header-container mb-4">
                <h3 className="form-header-text">Add New Account</h3>
            </div>
            <Card className="mb-4">
                <Form className="form-details">
                    <Form.Group controlId="type">
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="type"
                            onChange={handelChange}
                        >
                            <option value="default">Select Account Type</option>
                            <option value="Operating Account">Operating Account</option>
                            <option value="Trust Account">Trust Account</option>
                        </Form.Control>
                        <p className="help-block text-danger">{error.type}</p>
                    </Form.Group>
                    

                    <Form.Group controlId="accountName">
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control type="text" name="accountName" placeholder="Account name"  onChange={handelChange} />
                        <p className="help-block text-danger">{error.accountName}</p>
                    </Form.Group>

                    <Form.Group controlId="accountHolder">
                        <Form.Label>Account Holder</Form.Label>
                        <Form.Control type="text" name="accountHolder" placeholder="Account Holder" onChange={handelChange} />
                        <p className="help-block text-danger">{error.accountHolder}</p>
                    </Form.Group>

                    <Form.Group controlId="accountNumber">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control type="number" name="accountNumber" placeholder="Account Number" onChange={handelChange} />
                        <p className="help-block text-danger">{error.accountNumber}</p>
                    </Form.Group>

                    <Form.Group controlId="institution">
                        <Form.Label>Institution</Form.Label>
                        <Form.Control type="text" name="institution" placeholder="Institution" onChange={handelChange} />
                        <p className="help-block text-danger">{error.institution}</p>
                    </Form.Group>

                    <Form.Group controlId="domicileBranch">
                        <Form.Label>Domicile Branch</Form.Label>
                        <Form.Control type="text" name="domicileBranch" placeholder="Domicile Branch" onChange={handelChange} />
                        <p className="help-block text-danger">{error.domicileBranch}</p>
                    </Form.Group>

                    <Form.Group controlId="swiftCode">
                        <Form.Label>Swift Code</Form.Label>
                        <Form.Control type="text" name="swiftCode" placeholder="Swift Code" onChange={handelChange} />
                        <p className="help-block text-danger">{error.swiftCode}</p>
                    </Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="transitNumber">
                                <Form.Label>Transit Number</Form.Label>
                                <Form.Control type="text" name="transitNumber" placeholder="Transit Number"  onChange={handelChange}/>
                                <p className="help-block text-danger">{error.transitNumber}</p>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="currency">
                                <Form.Label>Currency</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="currency"
                                    onChange={handelChange}
                                >
                                    <option value="default">Select Currency</option>
                                    <option value="USD $">USD $</option>
                                    <option value="EUR €">EUR €</option>
                                </Form.Control>
                                <p className="help-block text-danger">{error.currency}</p>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Group controlId="openingBalance">
                        <Form.Label>Opening Balance</Form.Label>
                        <Form.Control type="number" name="openingBalance" placeholder="Opening Balance" onChange={handelChange} />
                        <p className="help-block text-danger">{error.openingBalance}</p>
                    </Form.Group>

                    <Form.Group controlId="defaultAccount">
                        <Form.Check type="checkbox" name="defaultAccount" label="Set the account as default account" onChange={handelChange} />
                    </Form.Group>
                    <br /><br />
                    <Button onClick={handelSubmit}>Create New Bank Account</Button>
                </Form>
            </Card>
        </div>          
        </>
    )
}

export default AddAccount
