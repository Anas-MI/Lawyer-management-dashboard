import React, {useEffect , useState} from 'react'
import { useSelector , connect} from 'react-redux'
import { Form, Col, Row } from 'react-bootstrap'
import api from '../../../../resources/api'

let option = null
let optns = null
class EmailForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          
        }
    }
    componentDidMount(){
        api.get('/matter/viewforuser/'+ this.props.userId).then((res)=>{
            option = res.data.data.map((val, index)=>{
                 return <option>{val.matterDescription}</option>
             })
         }).then(()=>{
             console.log(option)
             this.setState({option : option})
         })

         api.get('/contact/viewforuser/'+this.props.userId).then((res)=>{
            optns = res.data.data.map((value, index)=>{
    
                return <option id={index}>{value.firstName}</option>
               })
         }).then(()=>{this.setState({contacts : optns})})
         
    }

    render(){
       
    
       return    this.props.editMode ?
       <Form >
        <Row>
            
            <Col>
            <Form.Group>
        <Form.Label>Matter</Form.Label>
               <Form.Control 
                   as="select"
                   name="matter" 
                   defaultValue = {this.props.record.matter}
                   onChange={this.props.handleChange}>
               <option>Select a matter</option>
               {this.state.option}
               </Form.Control>
        </Form.Group>
            </Col>
        </Row>
      
       <Row>
           <Col >
           <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Control 
                    as="select"
                    name="from" 
                    defaultValue = {this.props.record.from}
                    onChange={this.props.handleChange}>
                    <option>Select a contact</option>    
                {this.state.contacts}
                </Form.Control>
                </Form.Group>
           </Col>
           
           <Col>
           <Form.Group >
                <Form.Label>To</Form.Label>
                <Form.Control 
                    as="select"
                    name="to" 
                    defaultValue = {this.props.record.to}
                    onChange={this.props.handleChange}>
                    <option>Select a contact</option>
                    {this.state.contacts}
                </Form.Control>
                </Form.Group>
           </Col>
       </Row>
        <Row>
            <Col>
            <Form.Group controlId="date">
               <Form.Label>Time</Form.Label>
               <Form.Control 
               required
               type="time" 
               name="time" 
               defaultValue = {this.props.record.time}
               onChange={this.props.handleChange}/>
           </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="date">
               <Form.Label>Date</Form.Label>
               <Form.Control 
               required
               type="date" 
               name="date" 
               defaultValue = {this.props.record.date} 
               onChange={this.props.handleChange}/>
           </Form.Group>
            </Col>

        </Row>
      
       <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control 
                name="subject" 
                rows="3"
                defaultValue = {this.props.record.subject}
                onChange={this.props.handleChange} />
            </Form.Group>  
    
       
            <Form.Group controlId="body">
                <Form.Label>Body</Form.Label>
                <Form.Control 
                name="body" 
                as="textarea" 
                rows="3"
                defaultValue = {this.props.record.body}
                onChange={this.props.handleChange} />
            </Form.Group>
       
    
   </Form>    
   
       :
       <Form >
        <Row>
            
            <Col>
            <Form.Group>
        <Form.Label>Matter</Form.Label>
               <Form.Control 
                   as="select"
                   name="matter" 
                   placeholder="Matter"
                   onChange={this.props.handleChange}>
               <option>Select a matter</option>
               {this.state.option}
               </Form.Control>
        </Form.Group>
            </Col>
        </Row>
      
       <Row>
           <Col >
           <Form.Group>
                <Form.Label>From</Form.Label>
                <Form.Control 
                    as="select"
                    name="from" 
                    placeholder="Select a contact"
                    onChange={this.props.handleChange}>
               <option>Select a contact</option>    
              {this.state.contacts}
                </Form.Control>
                </Form.Group>
           </Col>
           
           <Col>
           <Form.Group >
                <Form.Label>To</Form.Label>
                <Form.Control 
                    as="select"
                    name="to" 
                    placeholder="Select a contact"
                    onChange={this.props.handleChange}>
                    <option>Select a contact</option>
                    {this.state.contacts}
                </Form.Control>
                </Form.Group>
           </Col>
       </Row>
        <Row>
            <Col>
            <Form.Group controlId="date">
               <Form.Label>Time</Form.Label>
               <Form.Control 
               required
               type="time" 
               name="time" 
               placeholder="Time" 
               onChange={this.props.handleChange}/>
           </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="date">
               <Form.Label>Date</Form.Label>
               <Form.Control 
               required
               type="date" 
               name="date" 
               placeholder="Date" 
               onChange={this.props.handleChange}/>
           </Form.Group>
            </Col>

        </Row>
      
       <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control 
                name="subject" 
                rows="3"
                placeholder="subject"
                onChange={this.props.handleChange} />
            </Form.Group>  
    
       
            <Form.Group controlId="body">
                <Form.Label>Body</Form.Label>
                <Form.Control 
                name="body" 
                as="textarea" 
                rows="3"
                placeholder="body"
                onChange={this.props.handleChange} />
            </Form.Group>
       
    
   </Form>    
    
        }
}

const mapStateToProps = state => ({
    userId: state.user.token.user._id
  });

export default connect(mapStateToProps)(EmailForm)