import React from 'react'
import { Row, Col, Card} from 'react-bootstrap'

const viewTicket = ( props ) => {
  
  const handleClick = ( ) => {
    window.open(props.location.state.attachment)
  }
  return <Card style = {{padding : "50px"}}>
      <Card.Header>
        <h5>Ticket from {props.location.state.name}</h5>
      </Card.Header>
      <Card.Body>
      <Row md="2">
         <Col>
            <img height = "90%" width = "90%" src = {props.location.state.attachment} alt = "No Image"></img>
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
                  <p>{props.location.state.attachment ? <a onClick = { handleClick } style = {{color : "blue"}}>{props.location.state.attachment}</a> : "No Attachments Added" }</p>

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

