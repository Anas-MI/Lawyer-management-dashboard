import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalTitle,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddTargetModal } from "../../../store/Actions";

const AddTargetModal = (props) => {
    const dispatch = useDispatch()
  const [state, setState] = useState({});


  const showModal = useSelector(state => state.targetModal)
  const toggleModal = () => dispatch(toggleAddTargetModal())

  const handleChange = (e) => {
    e.persist();
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };


  const handleSubmit = e => {
      e.preventDefault()
      console.log(state)
  }

  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton  >
        <ModalTitle>Add Target</ModalTitle>
      </Modal.Header>
      <ModalBody>
        <Form>
            <FormGroup>
              <FormLabel>Default Billing Rate</FormLabel>
              <InputGroup>
              <FormControl
                type="number"
                name={"rate"}
                value={state["rate"]}
                onChange={handleChange}
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">Rs/$</InputGroup.Text>
              </InputGroup.Append>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <FormLabel>Target Billing </FormLabel>
              <InputGroup>
              <FormControl
                type="number"
                name={"target"}
                value={state["target"]}
                onChange={handleChange}
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">$</InputGroup.Text>
              </InputGroup.Append>
              </InputGroup>

            </FormGroup>
          <FormGroup>
            <FormLabel>Working Days</FormLabel>
            <InputGroup>
              <FormControl
                type="number"
                name={"workdays"}
                value={state["workdays"]}
                onChange={handleChange}
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">Days</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <FormLabel>Fiscal Year End</FormLabel>
            <FormControl
              type="date"
              name={"date"}
              value={state["date"]}
              onChange={handleChange}
            />
          </FormGroup>
          <Button onClick={handleSubmit} variant="outline-dark">Add Target</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddTargetModal;
