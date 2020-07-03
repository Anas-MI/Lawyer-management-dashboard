import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog, createBlog } from "../../../../store/Actions";
import { Form, Button } from "react-bootstrap";
import { notification } from "antd";

const validNameRegex = RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);


const AddEditBlog = (props) => {
  const [state, setState] = useState({
    title: "",
    author: "",
    shortDescription: "",
    description:"",
  });
  const [editMode, setEditMode] = useState(false);
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const selectedBlog = useSelector((state) => state.Blog.selected);

  useEffect(() => {
    if (!selectedBlog) {
      setEditMode(false);
    } else {
      setState({ ...selectedBlog });
      setEditMode(true);
    }
  }, []);

  const handleChange = (e) => {
    e.persist();
    setDisplay(false)
    const { name, value } = e.target;
    let errors = error;
    switch (name) {
      case "title":
        errors.title =
            (value.length == 0) 
            ? "Title is Required"
            : (value.length > 60) 
            ? "Title is too Long" :""
       break;
       case "author":
        errors.author =
            (value.length == 0) 
            ? "Author is required"
            : (!validNameRegex.test(value))
            ? "Author Name must be in characters!": ""
       break;
       case "shortDescription":
        errors.shortDescription =
            (value.length == 0) 
            ? "Short Description is required"
            : (value.length > 110) 
            ? "Short Description is too Long" 
            : (value.length < 50) 
            ? "Short Description is too Short" :""
       break;
       case "description":
        errors.description =
            (value.length == 0) 
            ? "Description is required"
            : (value.length < 110) 
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
          message: "Failed to Add New Blog",
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
        dispatch(
          updateBlog({ id: state._id, body: state }, (err, response) => {
            if (err) {
              notification.error(err);
            } else {
              notification.success(response);
            }
          })
        );
      } else {
        dispatch(
          createBlog(state, (err, response) => {
            if (err) {
              notification.error(err);
            } else {
              notification.success(response);
            }
          })
        );
      }
    }
    props.history.goBack();
  }

  return (
    <div className="w-75 m-auto">
      <h3 className="text-center">Add New Blog</h3>
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
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            type="text"
            placeholder="author"
            value={state["author"]}
            onChange={handleChange}
          />
          <p className="help-block text-danger">{error.author}</p>
        </Form.Group>

        <Form.Group controlId="formGroupEmail">
          <Form.Label>Short Description</Form.Label>
          <Form.Control
            name="shortDescription"
            type="text"
            placeholder="Short Description"
            value={state["shortDescription"]}
            onChange={handleChange}
          />
          <p className="help-block text-danger">{error.shortDescription}</p>
        </Form.Group>

        <Form.Group controlId="formGroupEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Description"
            value={state["description"]}
            onChange={handleChange}
            as="textarea" rows="3"
          />
          <p className="help-block text-danger">{error.description}</p>
        </Form.Group>
        <Button onClick={handleSubmit}>{editMode ? "Update" : "Create"}</Button>
      </Form>
    </div>
  );
};

export default AddEditBlog;
