import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFeature, createFeature } from "../../../../store/Actions";
import { Form,Button } from "react-bootstrap";
import { notification } from "antd";

const AddEditFeature = (props) => {
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState({});

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
    const { name, value } = e.target;
    let errors = error;
    switch (name) {
      case "title":
        errors.title =
            (value.length == 0) 
            ? "Title is Required"
            : (value.length > 20) 
            ? "Title is too Long" :""
       break;
       case "description":
        errors.description =
            (value.length == 0) 
            ? "Description is required"
            : (value.length > 120) 
            ? "Description is too long" 
            : (value.length < 50) 
            ? "Description is too Short" :""
       break;
      default:
        break;
    }
    setError({ ...errors });
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
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
          message: "Failed to Add New Feature",
        });
      }
    }
  };

  function checkValidity() {
    if (!Object.keys(state).every((k) => state[k] !== "")) {
      setDisplay(true)
      return notification.warning({
        message: "Fields Should Not Be Empty",
      });
    } else {
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
  }
  props.history.goBack()
}

  return (
    <div className='w-75 m-auto'>
        <h3 className='text-center' >Add New Feature</h3>
    <Form className="form-details">
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Feature Title"
            value={state["title"]}
            onChange={handleChange}
          />
          <p className="help-block text-danger">{error.title}</p>
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Description"
            value={state["description"]}
            onChange={handleChange}
            as="textarea" rows="2"
          />
          <p className="help-block text-danger">{error.description}</p>
        </Form.Group>
        <Button onClick={handleSubmit}>{editMode ? "Update" : "Create"}</Button>
      </Form>
    </div>
  );
};

export default AddEditFeature