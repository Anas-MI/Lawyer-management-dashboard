

import React from 'react'
import { extend } from 'jquery'
import { Form, Row , Col , Button } from "react-bootstrap";
import { Input, Select } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import api from '../../../resources/api';


const { Option } = Select;

const selectBefore = (
  <Select defaultValue="Firm User" className="select-before">
    <Option value="FirmUser">Firm User</Option>
    <Option value="Contacts">Contacts</Option>
  </Select>
);

 
class TaskForm extends React.Component{
  constructor(){
    super()
    this.state = {
      matter : "",
      name : ""
    }
  
  }
  
  componentDidMount(){
    /*
    if(this.props.editMode){
      api.get('/matter/view/'+ this.props.data.matter).then((res)=>{
        console.log(res)
        const formData = <Form.Group controlId="matter">
                          <Form.Label>Matter</Form.Label>
                          <Form.Control
                            required
                            as="select"
                            defaultValue={res.data.data.matterDescription}
                            onChange={this.props.handleChange}
                            name="matter"
                          >
                            <option>Select a matter</option>
                            {this.props.options}
                          </Form.Control>
                        </Form.Group>
        this.setState({matter : formData})
      })
    }
    */
  }
  
    render(){
      
        return <Form className="form-details">
        <Form.Group controlId="taskName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Task Name"
            defaultValue={this.state.name}
            onChange={this.props.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Due Date"
            onChange={this.props.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows="3"
            onChange={this.props.handleChange}
          />
        </Form.Group>

      {/*
        <Form.Group controlId="taskName">
          <Form.Label>Assignee</Form.Label>
          <div>
            <Input addonBefore={selectBefore} size="large" suffix={<UserOutlined className="site-form-item-icon" />}  placeholder="Type a name..." />
          </div>
        </Form.Group>
      */
      }

        <Form.Group controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Normal"
            required
            onChange={this.props.handleChange}
          >
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="matter">
          <Form.Label>Matter</Form.Label>
          <Form.Control
            required
            as="select"
            onChange={this.props.handleChange}
            name="matter"
          >
            <option>Select a matter</option>
            {this.props.options}
          </Form.Control>
        </Form.Group>
        <br />
        {
          /*
            <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Notify me when the task is completed" />
        </Form.Group>
        <br />
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Notify assignee via email" />
        </Form.Group>
        <br />
          */

        }
       
      </Form>
    }
}

export default TaskForm