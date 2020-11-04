import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap'
import { Collapse } from 'antd';
const { Panel } = Collapse;

const FAQ = () => {
    const [show, setShow] = useState(false);
    const [state, setstate] = useState({
        question : "",
        answer: ""
    })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
        const {name , value} = e.target
        setstate({...state, [name] : value})
        console.log(state)
     }
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.`;
    return (
        <>
            <div className="d-flex mb-2 title-component-header">
                <div className="title-header-name">
                    <h5>Frequently Asked Questions ( FAQ )</h5>
                </div>
                <div className="d-flex extra-iteam-div">
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleShow}
                    >
                        Add FAQs
                </button>
                </div>
            </div>
            <Card>
                <Card.Body>
                    <Collapse accordion>
                        <Panel style={{ padding: "5px" }} header="This is panel header 1" key="1">
                            <p>{text}</p>
                        </Panel>
                        <Panel style={{ padding: "5px" }} header="This is panel header 2" key="2">
                            <p>{text}</p>
                        </Panel>
                        <Panel style={{ padding: "5px" }} header="This is panel header 3" key="3">
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Frequently Asked Questions (FAQ)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="form-details" >
                        <Form.Group controlId="question">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                name='question'
                                as="textarea"
                                rows="2"
                                type="text"
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="Answer">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                name='answer'
                                as="textarea"
                                rows="3"
                                type="text"
                                onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default FAQ