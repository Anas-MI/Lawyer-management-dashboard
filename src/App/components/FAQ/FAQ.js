import React from 'react'
import Navigation from '../HomePage/navigation'
import { Card } from 'react-bootstrap'
import Footer from '../HomePage/footer'
import { Collapse } from 'antd';
const { Panel } = Collapse;
const FAQ = (props) => {
    const handleRoute = (route) => {
        props.history.push(route)
    }
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.`;
    return (
        <>
            <Navigation handleRoute={handleRoute} />
            <Card style={{ justifyContent: "center", padding: "5%" }}>
                <Card.Title>
                    <h1 style={{textAlign : "center"}}>Frequently Asked Questions ( FAQ )</h1>
                </Card.Title>
                <Card.Body>
                    <Collapse accordion>
                        <Panel header="This is panel header 1" key="1">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3">
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </Card.Body>
            </Card>
            <Footer handleRoute={handleRoute} />
        </>
    )
}

export default FAQ