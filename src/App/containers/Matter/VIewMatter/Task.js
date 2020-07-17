import { Tabs } from 'antd';
import React from "react";
import api from "../../../../resources/api"
import {Button,Modal, notification, Popconfirm,message, Card} from 'antd'
import { Form, Row , Col} from "react-bootstrap";
import {connect} from 'react-redux'
 

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
      Data : {priority : "Normal" , matter : ""},
      editMode : false,
      res  : "",
      selected : null,
      Task : []
    };
  }

  async componentDidMount(){
 
        api.get('/tasks/fetchformatter/' + this.props.id).then((res) => {
          console.log('task', res.data);
          let tsk = [];
          res.data.data.map((value, index) => {
            tsk.push(
              <Card title="Task" className="form-width mb-4">
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td className="border-0 py-2">
                        <span className="table-span-dark">Date</span>
                      </td>
                      <td className="border-0 py-2">
                        <span className="table-span-light">
                          {value.dueDate.substring(0, 10)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">
                        <span className="table-span-dark">Task</span>
                      </td>
                      <td className="border-0 py-2">
                        <span className="table-span-light">{value.taskName}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">
                        <span className="table-span-dark">Description</span>
                      </td>
                      <td className="border-0">
                        <span className="table-span-light">
                          {value.description}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            );
          });
         this.setState({Task : tsk})
        });
        await api.get('/matter/viewforuser/'+ this.props.userId).then(res=>response=res.data.data)
        console.log(response)
         options = response.map((value , index)=>{
           if(index == 0){
             let newdata = this.state
             newdata.Data.matter = value._id
             this.setState(newdata)
           }
       return <option>{value.matterDescription}</option>
  
      })
      this.setState({ options})

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
      message: 'Task Saved',
    });
  };

  handleOk = (e) => {
   /* this.setState({ loading: true }); */
   e.preventDefault()
   notification.destroy()
    if ((this.state.Data.taskName ==="" ||this.state.Data.taskName ===undefined) || (this.state.Data.description ==="" ||this.state.Data.taskName ===undefined) || (this.state.Data.dueDate ==="" ||this.state.Data.dueDate ===undefined) || (this.state.Data.matter ==="" ||this.state.Data.matter ===undefined) ) {
      return notification.warning({
        message: "Fields Should Not Be Empty",
      });
    }else{
    const data = this.state.Data
    data.userId = this.props.userId
    if(this.state.editMode){
      api.post('tasks/edit/'+ this.state.selected, data).then(()=>this.openNotificationWithSucces('success')).catch(()=>{this.openNotificationWithFailure('error')})
    }else{
      api.post('/tasks/create', data).then(()=>this.openNotificationWithSucces('success')).catch(()=>{this.openNotificationWithFailure('error')})
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
      window.location.reload()
    }, 1000);
   
  }
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
      newState.Data[e.target.id]=response[e.target.selectedIndex]
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
    setTimeout(() => {
      window.location.reload()
    }, 1500);
   
   }
  

  render(){
    

    return  <div>
      <Card >
          <div className="d-flex justify-content-between">
            <h4>Tasks</h4>
            <div></div>
            <Button onClick={this.showModal} >ADD</Button>
          </div>
         
      </Card>
      {this.state.Task}
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
                <Form.Control required type="text" placeholder="Task Name"  onChange={this.handleChange}/>
            </Form.Group>
        </Row>
        <Row>
           <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control required type="date" placeholder="Due Date"  onChange={this.handleChange}/>
            </Form.Group>
        </Row>
      </Col>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control required as="textarea" rows="3" onChange={this.handleChange} />
      </Form.Group>
      <Form.Group controlId="priority">
      <Form.Label>Priority</Form.Label>
      <Form.Control as="select" defaultValue="Normal" required onChange={this.handleChange}>
        <option>Low</option>
        <option>Normal</option>
        <option>High</option>
      </Form.Control>
    </Form.Group>
            <Form.Group controlId="matter">
                <Form.Label>Matter</Form.Label>
                <Form.Control required as="select" onChange={this.handleChange} name="matter">
                  {this.state.options}
                </Form.Control>
              </Form.Group>
      </Form>
    </Modal>
    </div>
  }
}

const mapStateToProps = state => ({
  userId: state.user.token.user._id
});
export default connect(mapStateToProps)(Tasks)