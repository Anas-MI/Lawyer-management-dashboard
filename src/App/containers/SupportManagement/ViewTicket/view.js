import React from 'react'
import { Row, Col, Card} from 'react-bootstrap'

const viewTicket = ( props ) => {
    console.log(props)
  return <Card style = {{padding : "50px"}}>
      <Card.Header>
        <h5>Ticket from {props.location.state.name}</h5>
      </Card.Header>
      <Card.Body>
      <Row md="2">
         <Col>
            <img src = {props.location.state.attachment} alt = "No Image"></img>
         </Col>
         <Col>
            <Row>
              <Col>
                <h6>FIRST NAME</h6>
                <p>{props.location.state.firstName}</p>

              </Col>
              <Col>
                  <h6>LAST NAME</h6>
                  <p>{props.location.state.lastName}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>EMAIL</h6>
                <p>{props.location.state.email}</p>
              </Col>
              <Col>
                 <h6>ISSUE</h6>
                 <p>{props.location.state.issue}</p>

              </Col>
            </Row>
            <Row>
               <Col>
                 <h6>Attachment</h6>
                 <p>{props.location.state.attachment ? props.location.state.attachment : "No Attachments Added" }</p>

               </Col>
            </Row>
            <Row>
                <Col>
                  <h6>URL</h6>
                  <p>{props.location.state.url}</p>
                </Col>
            </Row>
            
         </Col>
      </Row>
  
      </Card.Body>
  </Card>
}

export default viewTicket

