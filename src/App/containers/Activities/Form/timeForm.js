import React, {useEffect , useState} from 'react'
import { useSelector , connect} from 'react-redux'
import { Form, Col, Row } from 'react-bootstrap'
import api from '../../../../resources/api'
import Timer from '../../../components/Timer/index.js'
let option = null
class ExpenseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          data : {
            time : ''
          }
        }
    }
    setTimer = () => {
       
        const time = window.localStorage.getItem('timer');
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor(time / 60);
        let seconds = time % 60
       
        if (minutes >= 59) {
          minutes = minutes % 60;
        }
        if (seconds < 10) {
          seconds = "0"+seconds
        }
        console.log("Secounds  " + seconds)
    
        //   const Seconds = time % 60;
        const data = this.state.data;
        data.time = hours + ':' + minutes + ':' + seconds
        this.setState({ data: data });
        console.log(this.state.data)
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
         
        this.setTimer()
       }

    render(){
        
        let date = ""
        /*
        const time = window.localStorage.getItem('timer');
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor(time / 60);
        if (minutes >= 59) {
        minutes = minutes % 60;
        }

        //   const Seconds = time % 60;
        
        const timeee = hours + ':' + minutes;
        if(timeee != window.localStorage.getItem('timer') ){
            const data = this.state.data
            data.time = time
            this.setState({
                data : data
            })
        }
        */

                                        
        

       return <Form 
       id='myForm'
       className="form"
       ref={ form => this.props.handleReset(form) } >
        <Row>
            <Col>
                <Form.Group controlId="duration">
                     <Form.Label>Duration</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="time" 
                        placeholder="hh:mm:ss" 
                        defaultValue = {this.state.data.time}
                        onChange={this.props.handleChange}/>
                </Form.Group>
            </Col>
            <Col>
                <Timer setTimer = {this.setTimer} ></Timer>
            </Col>
        </Row>
        
        <Row>
            <Col>
            <Form.Group controlId="matter">
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
            <Col>
            <Form.Group controlId="rate">
                <Form.Label>Rate</Form.Label>
                <Form.Control 
                required
                type="text" 
                name="rate" 
                placeholder="0.0 /h"
                onChange={this.props.handleChange} />
            </Form.Group>
            </Col>

        </Row>
       
            
        <Row>
            <Col>
            <Form.Group controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                name="description" 
                as="textarea" 
                rows="3"
                placeholder="Description"
                onChange={this.props.handleChange} />
            </Form.Group>
            </Col>

        </Row>
       
        <Row>
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
            {
                /* 
                <Col>
            <Form.Group controlId="invoiceStatus">
                <Form.Label>Invoice Status</Form.Label>
                <Form.Control 
                    as="select"
                    name="invoiceStatus"
                    onChange={this.props.handleChange} >
                <option>Unbilled</option>
                <option>Billed</option>
                </Form.Control>
             </Form.Group>
            </Col>
                */
            }
        </Row>
            
            <Row>
                <Col>
                <Form.Check 
               type="checkbox"
               id="billable"
               name="billable"
               label="Billable"
            
               onChange={this.props.handleChange}
           /><br></br>
                </Col>
            </Row>
    
            {
                /*
                <Form.Check 
               type="checkbox"
               id="nonBillable"
               name="nonBillable"
               label="Non-billable"
               defaultChecked = {!this.props.record.billable}
               onChange={this.props.handleChange}
           />
                */
            }
    </Form>


        
    }
}

const mapStateToProps = state => ({
    userId: state.user.token.user._id
  });

export default connect(mapStateToProps)(ExpenseForm)