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
import { toggleAddTargetModal, toggleTimeEditModal, setTimer } from "../../../store/Actions";

const TimeEditModal = (props) => {
    const dispatch = useDispatch()
  const [state, setState] = useState('');


  const showModal = useSelector(state => state.timeEditModal)
  const toggleModal = () => dispatch(toggleTimeEditModal())

  const handleChange = (e) => {
    e.persist();
    setState(e.target.value);
  };


  const handleSubmit = e => {
      e.preventDefault()
      console.log(state)
      dispatch(setTimer(state))
  }

  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton  >
        <ModalTitle>Edit Timer</ModalTitle>
      </Modal.Header>
      <ModalBody>
        <Form>
            <FormGroup>
                <FormControl
                 type='time' onChange={handleChange}> /</FormControl>
            </FormGroup>
        
          <Button onClick={handleSubmit} variant="outline-dark">Save Time</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default TimeEditModal;
