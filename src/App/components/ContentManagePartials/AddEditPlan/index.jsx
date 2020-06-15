import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
createPlan,
  updatePlan,
} from "../../../../store/Actions";
import { Form,Button } from "react-bootstrap";
import { notification } from "antd";

const AddEditPlan = (props) => {
  const [state, setState] = useState({});
  const [editMode, setEditMode] = useState(false);

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

  const handleChange = (e) => {
    e.persist();
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <div className='w-75 m-auto'>
        <h3 className='text-center' >Add New Plan</h3>
    <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Plan Name</Form.Label>
          <Form.Control
            name="planName"
            type="text"
            placeholder="Plan Name"
            value={state["planName"]}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="text"
            placeholder="Price"
            value={state["price"]}
            onChange={handleChange}
          />
        </Form.Group>
        <Button onClick={handleSubmit}>{editMode ? "Update" : "Create"}</Button>
      </Form>
    </div>
  );
};


export default AddEditPlan