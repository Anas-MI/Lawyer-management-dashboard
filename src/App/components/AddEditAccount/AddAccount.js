import React, { useState } from  'react'
import { Form, Col, Button} from 'react-bootstrap'
import { Card, message, notification } from 'antd';
import { useHistory } from 'react-router-dom';

const validNameRegex = RegExp(
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
  );

const AddAccount = () =>{

    const history = useHistory()
    const [state, setState] = useState({
        AccountType: "",
        AccountName: "",
        AccountHolder: "",
        AccountNumber: "",
        Institution: "",
        DomicileBranch: "",
        SwiftCode: "",
        TransitNumber: "",
        Currency: "",
        OpeningBalance: ""
    })
    const [error, setError] = useState({})
    const [display, setDisplay] = useState(false)

    // handel the change of form & set the error msg
    const handelChange = e =>{
        e.persist();
        const {name, value} = e.target;
        let errors = error
        switch (name) {
            case "AccountType":
                errors.AccountType = value === "default" ? "Account Type is required!" : "";
                break;
            case "AccountName":
                errors.AccountName =
                    value.length == 0
                    ? "Account Name is required!"
                    : !validNameRegex.test(value)
                    ? "Account Name must be in characters!"
                    : "";
                break;
            case "AccountHolder":
                errors.AccountHolder =
                    value.length == 0
                    ? "Account Holder is required!"
                    : !validNameRegex.test(value)
                    ? "Account Holder must be in characters!"
                    : "";
                break;
            case "AccountNumber":
                errors.AccountNumber =
                    value.length == 0
                    ? "Account Number is required!"
                    : "";
                break;
            case "Institution":
                errors.Institution =
                    value.length == 0
                    ? "Institution is required!"
                    : !validNameRegex.test(value)
                    ? "Institution must be in characters!"
                    : "";
                break;
            case "DomicileBranch":
                errors.DomicileBranch =
                    value.length == 0
                    ? "Domicile Branch is required!"
                    : "";
                break;
            case "SwiftCode":
                errors.SwiftCode =
                    value.length == 0
                    ? "Swift Code is required!"
                    : "";
                break;
            case "TransitNumber":
                errors.TransitNumber =
                    value.length == 0
                    ? "Transit Number is required!"
                    : "";
                break;
            case "Currency":
                errors.Currency = value === "default" ? "Currency is required!" : "";
                break;
            case "OpeningBalance":
                errors.OpeningBalance =
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
        if (!Object.keys(state).every((k) => state[k] !== "")) {
          setDisplay(true)
          return notification.warning({
            message: "Fields Should Not Be Empty",
          });
        } else {
            // if form is valid then do something
          
        }
        history.goBack();
      }

    return(
        <>
        <div className='form-width'>
            <div className="form-header-container mb-4">
                <h3 className="form-header-text">Add New Account</h3>
            </div>
            <Card className="mb-4">
                <Form className="form-details">
                    <Form.Group controlId="AccountType">
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="AccountType"
                            onChange={handelChange}
                        >
                            <option value="default">Select Account Type</option>
                            <option value="Operating Account">Operating Account</option>
                            <option value="Trust Account">Trust Account</option>
                        </Form.Control>
                        <p className="help-block text-danger">{error.AccountType}</p>
                    </Form.Group>
                    

                    <Form.Group controlId="AccountName">
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control type="text" name="AccountName" placeholder="Account name"  onChange={handelChange} />
                        <p className="help-block text-danger">{error.AccountName}</p>
                    </Form.Group>

                    <Form.Group controlId="AccountHolder">
                        <Form.Label>Account Holder</Form.Label>
                        <Form.Control type="text" name="AccountHolder" placeholder="Account Holder" onChange={handelChange} />
                        <p className="help-block text-danger">{error.AccountHolder}</p>
                    </Form.Group>

                    <Form.Group controlId="AccountNumber">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control type="number" name="AccountNumber" placeholder="Account Number" onChange={handelChange} />
                        <p className="help-block text-danger">{error.AccountNumber}</p>
                    </Form.Group>

                    <Form.Group controlId="Institution">
                        <Form.Label>Institution</Form.Label>
                        <Form.Control type="text" name="Institution" placeholder="Institution" onChange={handelChange} />
                        <p className="help-block text-danger">{error.Institution}</p>
                    </Form.Group>

                    <Form.Group controlId="DomicileBranch">
                        <Form.Label>Domicile Branch</Form.Label>
                        <Form.Control type="text" name="DomicileBranch" placeholder="Domicile Branch" onChange={handelChange} />
                        <p className="help-block text-danger">{error.DomicileBranch}</p>
                    </Form.Group>

                    <Form.Group controlId="SwiftCode">
                        <Form.Label>Swift Code</Form.Label>
                        <Form.Control type="text" name="SwiftCode" placeholder="Swift Code" onChange={handelChange} />
                        <p className="help-block text-danger">{error.SwiftCode}</p>
                    </Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="TransitNumber">
                                <Form.Label>Transit Number</Form.Label>
                                <Form.Control type="text" name="TransitNumber" placeholder="Transit Number"  onChange={handelChange}/>
                                <p className="help-block text-danger">{error.TransitNumber}</p>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Currency">
                                <Form.Label>Currency</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="Currency"
                                    onChange={handelChange}
                                >
                                    <option value="default">Select Currency</option>
                                    <option value="USD $">USD $</option>
                                    <option value="EUR €">EUR €</option>
                                </Form.Control>
                                <p className="help-block text-danger">{error.Currency}</p>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Group controlId="OpeningBalance">
                        <Form.Label>Opening Balance</Form.Label>
                        <Form.Control type="number" name="OpeningBalance" placeholder="Opening Balance" onChange={handelChange} />
                        <p className="help-block text-danger">{error.OpeningBalance}</p>
                    </Form.Group>

                    <Form.Group controlId="SetDefaultAccount">
                        <Form.Check type="checkbox" name="SetDefaultAccount" label="Set the account as default account" onChange={handelChange} />
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
