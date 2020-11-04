import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { Collapse, notification, Popconfirm, Space } from 'antd';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import api from '../../../resources/api';
const { Panel } = Collapse;

const FAQ = () => {
    const [show, setShow] = useState(false);
    const [state, setstate] = useState({
        question: "",
        answer: ""
    })
    const [editmode, seteditmode] = useState(false)
    const [index, setindex] = useState()
    const [FAQs, setFAQs] = useState({
        faq: []
    })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [disable, setdisable] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target
        setstate({ ...state, [name]: value })
        console.log(state)
    }
    const fetchFAQ = () => {
        api.get(`/footer/showall/`).then((res) => {
            setFAQs(res.data.data[res.data.data.length - 1])
        })
    }
    const handleSubmit = () => {
        notification.destroy()
        setdisable(true)
        if (state.question === "")
            return notification.warning({ message: "Please provide a answer" })
        if (state.answer === "")
            return notification.warning({ message: "Please provide a answer" })
        let data = FAQs
        data.faq.push(state)
        handleAPI()
    }
    const handleEdit = () => {
        notification.destroy()
        setdisable(true)
        if (state.question === "")
            return notification.warning({ message: "Please provide a answer" })
        if (state.answer === "")
            return notification.warning({ message: "Please provide a answer" })
        let data = FAQs
        data.faq[index] = state
        handleAPI()

    }
    const handleAPI = () => {
        let data = FAQs
        delete data.updated_at
        delete data._id
        delete data.__v

        api
            .post('/footer/create', data)
            .then((res) => {
                console.log(res)
                fetchFAQ()
                setdisable(false)
                handleClose()
                notification.success({ message: 'FAQS Updated.' });
            })
            .catch((err) => {
                console.log(err)
                setdisable(false)
                handleClose()
                notification.error({ message: 'Try again later.' });
            })
    }
    const handleDelete = (index) => {
        let data = FAQs
        data.faq.splice(index, 1)
        console.log(data)
        setFAQs(data)
        handleAPI()
    }
    useEffect(() => {
        fetchFAQ()
    }, [])
    const genExtra = (faq, index) => (
        <Space size={40}>
            <EditOutlined
                onClick={() => {
                    setstate(faq)
                    seteditmode(true)
                    setindex(index)
                    handleShow()
                }}
            />
            <Popconfirm
                title="Are you sure you want to delete?"
                onConfirm={event => {
                    // If you don't want click extra trigger collapse, you can prevent this:
                    event.stopPropagation();
                    handleDelete(index)
                }}
                okText="Yes"
                cancelText="No">
                <DeleteOutlined
                />
            </Popconfirm>
        </Space>
    );
    return (
        <div>
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
                        {
                            FAQs.faq.map((faq, index) => {
                                return (
                                    <Panel
                                        extra={genExtra(faq, index)}
                                        style={{ padding: "5px" }}
                                        header={faq.question} key={index}>
                                        <p>{faq.answer}</p>
                                    </Panel>
                                )
                            })
                        }
                    </Collapse>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={() => {
                setstate({ answer: "", question: "" })
                handleClose()
            }} >
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
                                value={state.question}
                                rows="2"
                                type="text"
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="Answer">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                name='answer'
                                as="textarea"
                                value={state.answer}
                                rows="3"
                                type="text"
                                onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setstate({ answer: "", question: "" })
                        handleClose()
                    }}>
                        Close
                    </Button>
                    <Button disabled={disable} variant="primary" onClick={editmode ? handleEdit : handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default FAQ