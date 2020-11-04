import React, { useEffect, useState } from 'react'
import Navigation from '../HomePage/navigation'
import { Card } from 'react-bootstrap'
import Footer from '../HomePage/footer'
import { Collapse } from 'antd';
import api from '../../../resources/api';
const { Panel } = Collapse;
const FAQ = (props) => {
    const [FAQs, setFAQs] = useState([])
    const handleRoute = (route) => {
        props.history.push(route)
    }
    const fetchFAQ = () => {
        api.get(`/footer/showall/`).then((res) => {
            setFAQs(res.data.data[res.data.data.length - 1].faq)
        })
    }
    useEffect(() => {
        fetchFAQ()
    }, [])
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.`;
    return (
        <>
            <Navigation handleRoute={handleRoute} />
            <Card style={{ justifyContent: "center", padding: "5%" }}>
                <Card.Title>
                    <h1 style={{ textAlign: "center" }}>Frequently Asked Questions ( FAQ )</h1>
                </Card.Title>
                <Card.Body>
                    <Collapse accordion>
                        {
                            FAQs.map((faq, index) => {
                                return (
                                    <Panel
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
            <Footer handleRoute={handleRoute} />
        </>
    )
}

export default FAQ