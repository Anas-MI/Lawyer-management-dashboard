import { Tabs } from 'antd';
import React from "react";
import UnpcomingTasks from './UpcomingTasks/upcomingTasks'
import CompletedTask from './CompletedTasks/CompletedTasks'
import List from './List/List'
import api from "../../../resources/api"
import {Button,Modal} from 'antd'
import { Form, Row , Col} from "react-bootstrap";



let res = {}
let tableData = null
let ListData = null

class Tasks extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      loading: false,
      Data : {},
      editMode : false,
      res  : "",
      selected : null
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  

  handleOk = () => {
    this.setState({ loading: true });
    if(this.state.editMode){
      api.post('tasks/edit/'+ this.state.selected)
    }else{
      api.post('/tasks/create', this.state.Data)
    }
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        loading:false,
        visible: false,
        confirmLoading: false,
      });
    }, 3000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  handleChange=(e)=>{
    e.persist()
    let newState = this.state
    console.log(e.target)
    newState.Data[e.target.id] = e.target.value
    this.setState(newState)
    console.log(this.state)
  }

   EditHandler(value,index){
     this.setState({editMode : true})
     this.setState({res : value})
     this.setState({selected : value._id})
     this.showModal()
   }

   deleteHandler(value,index){
     api.get('tasks/delete/'+value._id)
   }
  async componentDidMount(){
    res = await api.get('/tasks/showall')
    ListData = res.data.data.map((value, index)=>{
      return  <tr>
      <th scope="row">{value.dueDate}</th>
      <td>{value.description}</td>
      <td>{value.taskName}</td>
      <td>{value.matter.matterDescription}</td>
      <td><Button onClick={()=>this.EditHandler(value, index)}>Edit</Button></td>
            <td><Button onClick={()=>this.deleteHandler(value, index)} danger>Delete</Button></td>
    </tr>
    })

    tableData = res.data.data.map((value, index)=>{
        return  <tr>
        <th scope="row">{value.dueDate}</th>
        <td>{value.description}</td>
        <td>{value.taskName}</td>
        <td>{value.matter.matterDescription}</td>
      </tr>
      })
      console.log(res)
  }
  

 

  render(){
    const operations = <Button onClick={this.showModal} >ADD</Button>;
    const { TabPane } = Tabs;
    function callback(key) {
      console.log(key);
    }

    return  <div>
      <Tabs defaultActiveKey="1" tabBarExtraContent={operations} onChange={callback} className="card p-4" className="overflow-auto">
        <TabPane tab="Upcoming Tasks" key="1">
          <UnpcomingTasks tableData={tableData}></UnpcomingTasks>
        </TabPane>
        <TabPane tab="Completed Tasks" key="2">
          <CompletedTask tableData={tableData}></CompletedTask>
        </TabPane>
        <TabPane tab="List" key="3">
          <List tableData={ListData}></List>
        </TabPane>
       </Tabs>
    <Modal
      title="Add to List"
      visible={this.state.visible}
      confirmLoading={this.state.confirmLoading}
      footer={[
        <Button  onClick={this.handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={this.state.loading}  onClick={this.handleOk}>
          Save
        </Button>
    //    <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
    //      Save and Add another
     //   </Button>,
      ]}
    >
      <Form>
      <Col>
        <Row>
            <Form.Group controlId="taskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control type="text" placeholder="Task Name" value={this.state.res.taskName}  onChange={this.handleChange}/>
            </Form.Group>
        </Row>
        <Row>
           <Form.Group controlId="DueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" placeholder="Due Date" value={this.state.res.dueDate} onChange={this.handleChange}/>
            </Form.Group>
        </Row>
      </Col>
      <Form.Group controlId="Description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="3" value={this.state.res.description} onChange={this.handleChange} />
      </Form.Group>
      <Form.Group controlId="Priority">
      <Form.Label>Priority</Form.Label>
      <Form.Control as="select" onChange={this.handleChange}>
        <option>Low</option>
        <option>Normal</option>
        <option>High</option>
      </Form.Control>
    </Form.Group>
    <Form.Group controlId="Matter">
                <Form.Label>Matter</Form.Label>
                <Form.Control type="text" placeholder="Matter" onChange={this.handleChange} />
            </Form.Group>
      </Form>
    </Modal>
    </div>
  }
}



export default Tasks
