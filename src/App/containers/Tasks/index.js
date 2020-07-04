import { Tabs } from 'antd';
import React from "react";
import UnpcomingTasks from './UpcomingTasks/upcomingTasks'
import CompletedTask from './CompletedTasks/CompletedTasks'
import List from './List/List'
import api from "../../../resources/api"
import {Button,Modal, notification, Popconfirm,message} from 'antd'
import { Form, Row , Col} from "react-bootstrap";



let res = {}
let response = {}
let tableData = null
let ListData = null
let options = null
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

  
   cancel(e) {
    console.log(e);
    message.error('Canceled');
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
 openNotificationWithFailure = type => {
    notification[type]({
      message: 'Failure',
        });
  };
   openNotificationWithSucces = type => {
    notification[type]({
      message: 'success',
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    console.log(this.state.Data)
    if(this.state.editMode){
      api.post('tasks/edit/'+ this.state.selected, this.state.Data).then(()=>this.openNotificationWithSucces('success')).catch(()=>{this.openNotificationWithFailure('error')})
    }else{
      api.post('/tasks/create', this.state.Data).then(()=>this.openNotificationWithSucces('success')).catch(()=>{this.openNotificationWithFailure('error')})
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
    }, 2000);
 
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
    if(e.target.id==='matter'){
      newState.Data[e.target.id]=response[e.target.selectedIndex]._id
    }else{
    newState.Data[e.target.id] = e.target.value
    }
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
     console.log(value)
    api.get('tasks/delete/'+value._id)
    message.success('Deleted');
    window.location.reload()
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
      <td>
      <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={()=>this.deleteHandler(value, index)}
          onCancel={this.cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </td>
    </tr>
    })
    
    tableData = res.data.data.map((value, index)=>{
        return  <tr>
        <th scope="row">{value.dueDate}</th>
        <td>{value.description}</td>
        <td>{value.taskName}</td>
        <td>{value.matter.matterDescription}</td>
        <td><Button onClick={()=>this.EditHandler(value, index)}>Edit</Button></td>
        <td>
      <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={()=>this.deleteHandler(value, index)}
          onCancel={this.cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </td>
      </tr>
      })
      console.log(res)
      await api.get('/matter/showall').then(res=>response=res.data.data)
       options = response.map((value , index)=>{
     return <option>{value.matterDescription}</option>

    

    })
    this.setState({ListData, tableData})
    
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
          <UnpcomingTasks tableData={this.state.tableData}></UnpcomingTasks>
        </TabPane>
        <TabPane tab="Completed Tasks" key="2">
          <CompletedTask tableData={this.state.tableData}></CompletedTask>
        </TabPane>
        <TabPane tab="List" key="3">
          <List tableData={this.state.ListData}></List>
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
                <Form.Control type="text" placeholder="Task Name"  onChange={this.handleChange}/>
            </Form.Group>
        </Row>
        <Row>
           <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" placeholder="Due Date"  onChange={this.handleChange}/>
            </Form.Group>
        </Row>
      </Col>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="3" onChange={this.handleChange} />
      </Form.Group>
      <Form.Group controlId="priority">
      <Form.Label>Priority</Form.Label>
      <Form.Control as="select" onChange={this.handleChange}>
        <option>Low</option>
        <option>Normal</option>
        <option>High</option>
      </Form.Control>
    </Form.Group>
            <Form.Group controlId="matter">
                <Form.Label>Matter</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} name="matter">
                  {options}
                </Form.Control>
              </Form.Group>
      </Form>
    </Modal>
    </div>
  }
}



export default Tasks