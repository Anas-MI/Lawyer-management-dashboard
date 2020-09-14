import React, {useEffect , useState} from 'react'
import { useSelector , connect} from 'react-redux'
import { Form, Col, Row } from 'react-bootstrap'
import api from '../../../../resources/api'
import {Spin , Space} from 'antd'
let option = null

class ExpenseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          matter : "",
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
    componentDidMount(){
        this.setState({record : this.props.record})

        api.get('/matter/viewforuser/'+ this.props.userId).then((res)=>{
            option = res.data.data.map((val, index)=>{
                 return <option>{val.matterDescription}</option>
             })
         }).then(()=>{
             console.log(option)
             this.setState({option : option})
             api.get('/matter/view/'+ this.props.record.matter).then((res)=>{
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

        
            
    
       
         
    }
    
    render(){
        let date  = ""
        if(this.props.editmode){
             date = this.props.record.date.substring(0,10)
             console.log(date)
        }
        console.log(this.props.record.billable)
        return <Space size="middle">
                <Spin spinning={this.state.loading} size="large" >
                <Form >
        <Row>
            <Col>
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control 
                    type="number" 
                    name="qty" 
                    defaultValue = {this.state.record.qty}
                    onChange={this.props.handleChange}/>
                </Form.Group>
            </Col>
            <Col>
                {console.log(this.state.matter)}
                {
                    this.state.matter
                }
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
    
            
            
        
            {
                /*
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
                */
            }
           
           <Form.Check 
               type="checkbox"
               id="billable"
               name="billable"
               label="Billable"
               defaultChecked = {this.state.record.billable==="Yes"? true : false}
               onChange={this.props.handleChange}
           /><br></br>
    
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
                </Space>
       
    }
}

const mapStateToProps = state => ({
    userId: state.user.token.user._id
  });

export default connect(mapStateToProps)(ExpenseForm)