import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
createPlan,
  updatePlan,
} from "../../../../store/Actions";
import { Form,Button, Col } from "react-bootstrap";
import { notification } from "antd";

const AddEditPlan = (props) => {
  const [state, setState] = useState({
    planName : "",
    list : [""],
    price: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const selectedPlan = useSelector((state) => state.Plan.selected);

  useEffect(() => {
    if (!selectedPlan) {
      setEditMode(false);
    } else {
      setState({ ...selectedPlan });
      setEditMode(true);
    }
  }, []);

  // const splitChange = (e) => {
  //   e.persist();
  //   const {name, value} = e.target;
  //   let errors = error;
  //   switch (name) {
  //      case "list":
  //       errors.list =
  //           (value.length == 0) 
  //           ? "list is required"
  //           : ""
  //      break;
  //     default:
  //       break;
  //   }
  //   setError((st) => ({ ...st, ...errors }));
  //   setState((st) => ({ ...st, [name]: value.split(',') }));
  // }


  const handleChange = (e) => {
    e.persist();
    const {name, value} = e.target;
    let errors = error;
    switch (name) {
      case "planName":
        errors.planName =
            (value.length == 0) 
            ? "Plan Name is Required"
            : ""
       break;
       case "price":
        errors.price =
            (value.length == 0) 
            ? "Price is required"
            : ""
       break;
      default:
        break;
    }
    setError((st) => ({ ...st, ...errors }));
    setState((st) => ({ ...st, [name]: value }));
  };

  const addFeild = () => {
    let listx = state.list
    listx.push("")
    setState((st) =>({...st, ...listx}))
  };
  
  const handleDelete = (e)=>{
      e.persist()
     const { id } = e.target
     let newState = state.list
     newState.splice(id, 1)
     setState({...state, ...newState});
  };
  
  const handleDynamicData = (e)=> {
    e.persist();
    const { value , id} = e.target;
    let newData = state.list
    newData[id] = value
    setState({...state, ...newData});
  };

  const handleSubmit = (e) => {
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
          message: "Failed to Add New Plan",
        });
      }
    }
  };

  function checkValidity() {
    if (!Object.keys(state).every((k) => state[k] !== "" )) {
      setDisplay(true)
      return notification.warning({
        message: "Fields Should Not Be Empty",
      });
    } else if ((state.list === "" || state.list === undefined )) {
      setDisplay(true)
      return notification.warning({
        message: "Fields Should Not Be Empty",
      });
    } else {
      if (editMode) {
        dispatch(updatePlan({id:state._id,body:state},(err,response)=>{
          if(err){
            notification.error(err)
          }else{
            notification.success(response)
          }
        }));
      } else {
        dispatch(createPlan(state,(err,response)=>{
          if(err){
            notification.error(err)
          }else{
            notification.success(response)
          }
        }));
      }
      props.history.goBack()
  }
};

  return (
    <div className='w-75 m-auto'>
        <h3 className='text-center' >Add New Plan</h3>
    <Form className="form-details">
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Plan Name</Form.Label>
          <Form.Control
            name="planName"
            type="text"
            placeholder="Plan Name"
            value={state["planName"]}
            onChange={handleChange}
          />
          <p className="help-block text-danger">{error.planName}</p>
        </Form.Group>
        {
          state.list.map((value, index) => {
            return (
              <>
              <Form.Row>
                <Col>
                  <Form.Group controlId={index}>
                  <Form.Label>List {index+1}</Form.Label>
                  <Form.Control
                    name="list"
                    type="text"
                    placeholder="List"
                    value={state.list[index]}
                    onChange={handleDynamicData}
                  />
                  </Form.Group>
                </Col>
                <Button id={index} name="list" style={{ "height": "45px", "margin-top": "25px"}} onClick={handleDelete}>-</Button>
              </Form.Row>
            <p className="help-block text-danger">{error.list}</p>
            </>
          )
          })
        }
        <div className="form-add mb-4">
              <span onClick={()=>addFeild()}>Add a List</span>
        </div>


        
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="text"
            placeholder="Price"
            value={state["price"]}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">add $ at last</Form.Text>
          <p className="help-block text-danger">{error.price}</p>
        </Form.Group>
        
        <Button onClick={handleSubmit}>{editMode ? "Update" : "Create"}</Button>
      </Form>
    </div>
  );
};


export default AddEditPlan