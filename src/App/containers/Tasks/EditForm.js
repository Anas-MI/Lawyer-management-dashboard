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
  constructor(props){
    super(props)
    this.state = {
      matter : "",
      data : {
        taskName : "",
        matter : ""
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    
      if (nextProps !== this.props) {
        console.log("not equal")
        console.log(this.props)
        console.log(nextProps)
        this.setState({data : nextProps.data})
      }
    
  }
  componentDidMount(){
    this.setState({data : this.props.data})
      console.log(this.state.data.matter)

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
    render(){
        console.log(this.props.data)
      
        return <Form className="form-details">
                  <Form.Group controlId="taskName">
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={this.state.data.taskName}
                      onChange={this.props.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="dueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={this.state.data.dueDate ? this.state.data.dueDate.substring(0,10) : ""}
                      onChange={this.props.handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      required
                      defaultValue={this.state.data.description}
                      as="textarea"
                      rows="3"
                      onChange={this.props.handleChange}
                    />
                  </Form.Group>

                {
                  /*
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
                    
                      required
                      defaultValue={this.state.data.priority}
                      onChange={this.props.handleChange}
                    >
                      <option>Low</option>
                      <option>Normal</option>
                      <option>High</option>
                    </Form.Control>
                  </Form.Group>
                  {this.state.matter}
                  
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