import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFeature, createFeature } from "../../../../store/Actions";
import { Form,Button } from "react-bootstrap";
import { notification } from "antd";

const AddEditFeature = (props) => {
  const [state, setState] = useState({});
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const selectedFeature = useSelector((state) => state.Feature.selected);

  useEffect(() => {
    if (!selectedFeature) {
      setEditMode(false);
    } else {
      setState({ ...selectedFeature });
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
      dispatch(updateFeature({id:state._id,body:state},(err,response)=>{
        if(err){
          notification.error(err)
        }else{
          notification.success(response)
        }
      }));
    } else {
      dispatch(createFeature(state,(err,response)=>{
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
        <h3 className='text-center' >Add New Feature</h3>
    <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Feature Title"
            value={state["title"]}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Description"
            value={state["description"]}
            onChange={handleChange}
          />
        </Form.Group>
        <Button onClick={handleSubmit}>{editMode ? "Update" : "Create"}</Button>
      </Form>
    </div>
  );
};

export default AddEditFeature