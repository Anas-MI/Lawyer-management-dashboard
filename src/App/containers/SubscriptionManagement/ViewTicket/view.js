import React from 'react'
import { Row, Col, Card} from 'react-bootstrap'

const viewTicket = ( props ) => {
  console.log(props)
  return <Card style = {{padding : "50px"}}>
  <Card.Header>
    <h5>Request from {props.location.state.name}</h5>
  </Card.Header>
  <Card.Body>
  <Row md="2">
     
     <Col>
        <h4  style={{textAlign : "center", fontWeight: "bold"}}>User details</h4>
        <br></br>
        <Row>
          <Col>
            <h6>FIRST NAME</h6>
            <p>{props.location.state.userId.firstName}</p>

          </Col>
          <Col>
              <h6>LAST NAME</h6>
              <p>{props.location.state.userId.lastName}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6>EMAIL</h6>
            <p>{props.location.state.userId.emailAddress}</p>
          </Col>
        </Row>
        
        
     </Col>
     <Col>
        <h4 style={{textAlign : "center", fontWeight: "bold"}}>Request Details</h4>
        <br></br>
        <Row>
           <Col>
             <h6>REQUEST TYPE</h6>
              <p>{props.location.state.subscriptionRequested}</p>

           </Col>
           <Col>
              <h6>APPROVED STATUS</h6>
              <p>{props.location.state.requestGranted}</p>
            </Col>
        </Row>
        
        <Row>
            <Col>
              <h6>REQUEST DATE</h6>
              <p>{props.location.state.date}</p>
            </Col>
        </Row>
     </Col>
  </Row>

  </Card.Body>
</Card>

}

export default viewTicket

