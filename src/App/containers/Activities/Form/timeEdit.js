import React, {useEffect , useState} from 'react'
import { useSelector , connect} from 'react-redux'
import { Form, Col, Row } from 'react-bootstrap'
import {Spin , Space} from 'antd'
import api from '../../../../resources/api'
import Timer from '../../../components/Timer/index.js'
let option = null
class ExpenseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         data : {
         },
         record : {
         },
         loading : true
        }
    }
    componentWillReceiveProps(nextProps) {
    
        if (nextProps !== this.props) {
          console.log("not equal")
          console.log(this.props)
          console.log(nextProps)
          this.setState({record : nextProps.record})
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
        this.setState({record : this.props.record})
        api.get('/matter/viewforuser/'+ this.props.userId).then((res)=>{
            option = res.data.data.map((val, index)=>{
                 return <option>{val.matterDescription}</option>
             })
         }).then(()=>{
             console.log(option)
             this.setState({option : option})
             api.get('/matter/view/'+ this.props.record.matter._id).then((res)=>{
                console.log(res)
                const matter = <Form.Group controlId="matter">
                                    <Form.Label>Matter</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="matter" 
                                        defaultValue = {res.data.data.matterDescription}
                                        onChange={this.props.handleChange}>
                                    <option>Select a matter</option>
                                    {this.state.option}
                                    </Form.Control>
                                </Form.Group>
             this.setState({matter : matter , loading : false })
             console.log(this.state.matter)
            })
         })
         const data = this.state.data;
        data.time = this.props.time
        this.setState({ data: data });
        console.log(this.state.data)
    }

    render(){
        console.log(this.props.record.billable)
        let date = ""
        if(this.props.editmode){
            date = this.props.record.date.substring(0,10)
            console.log(date)
       }
/*
       const duration = this.props.touched ? <Form.Group controlId="duration">
                                                <Form.Label>Duration</Form.Label>
                                                <Form.Control 
                                                type="text" 
                                                name="time" 
                                                placeholder="hh:mm" 
                                                value = {this.state.data.time}
                                                onChange={this.props.handleChange}/>
                                              </Form.Group>
                                              :
                                              <Form.Group controlId="duration">
                                                <Form.Label>Duration</Form.Label>
                                                <Form.Control 
                                                type="text" 
                                                name="time" 
                                                placeholder="hh:mm" 
                                                onChange={this.props.handleChange}/>
                                            </Form.Group>
 */
       return  <Spin spinning={this.state.loading} size="large">
        <Form >
            <Row>
                <Col>
                <Form.Group controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="time" 
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
                    {
                        this.state.matter
                    }
                </Col>
                <Col>
                <Form.Group controlId="rate">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control 
                    required
                    type="text" 
                    name="rate" 
                    defaultValue = {this.state.record.rate}
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
                    defaultValue = {this.state.record.description}
                    onChange={this.props.handleChange} />
                </Form.Group>
                </Col>

            </Row>
            
            <Row>
                <Col>
                <Form.Group controlId="rate">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control 
                    required
                    type="text" 
                    name="rate" 
                    defaultValue = {this.state.record.rate}
                    onChange={this.props.handleChange} />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                    required
                    type="date" 
                    name="date" 
                    defaultValue = {date}
                    onChange={this.props.handleChange}/>
                </Form.Group>
                </Col>
                {/*
                        <Col>
                        <Form.Group controlId="invoiceStatus">
                            <Form.Label>Invoice Status</Form.Label>
                            <Form.Control 
                                as="select"
                                name="invoiceStatus"
                                defaultValue = {this.state.record.invoiceStatus}
                                onChange={this.props.handleChange} >
                            <option>Unbilled</option>
                            <option>Billed</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                */}
                
            </Row>
                
                <Row>
                    <Col>
                    <Form.Check 
                    type="checkbox"
                    id="billable"
                    name="billable"
                    label="Billable"
                    defaultChecked = {this.state.record.billable==="Yes"? true : false}
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
                    defaultChecked = {!this.state.record.billable}
                    onChange={this.props.handleChange}
                />
                    */
                }
        </Form>

                </Spin>
      
    }
}

const mapStateToProps = state => ({
    userId: state.user.token.user._id
  });

export default connect(mapStateToProps)(ExpenseForm)