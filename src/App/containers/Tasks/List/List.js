import { Modal, notification , Button, Popconfirm ,Table, Spin} from 'antd';
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import api from '../../../../resources/api';
import EditForm from './editForm'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

const user = JSON.parse(window.localStorage.getItem('Case.user'))
console.log(user)
class AddList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data : {
        userId : user.token.user._id,
        name : ''
      },
      tableData : [],
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      disabled : false,
      editMode : false,
      spinning : true
    }
  }
  componentDidMount(){
    api.get('/tasks/list/viewforuser/'+ user.token.user._id).then((res)=>{
      let tableData = []
      console.log(res.data.data)
      res.data.data.map((value,index)=>{
        const temp = {
          id : value._id,
          key : index,
          name : value.name,
          description : value.decription,
          practiseArea : value.practiseArea,
        }
    
        tableData.push(temp)
      })
      this.setState({
        tableData : tableData,
        spinning : false
      
      })
      console.log(this.state.tableData)
    })
    
  }
 

  showModal = () => {
    this.setState({
      visible: true,
    });
    console.log("show modal" + this.state)
    console.log("showModal " + this.props)
  };

  handleOk = () => {
    
    if(this.state.data.name == ''){
      notification.warning({message : "Please provide name for the list"})
    }else{
      let newstate = this.state
      newstate.disabled = true
      this.setState(newstate)
      console.log(newstate)
      console.log(this.state.disabled)
      if(this.state.editMode){
        const data = this.state.data
        api.post('/tasks/list/edit/'+data.id,data).then((res)=>{
  
         this.setState({data :  {
              userId : user.token.user._id
            },
            name : '',
            editMode : false
          })
          this.componentDidMount()
          notification.success({message : "List Edited Successfully"})
        }).catch((err)=>{
          notification.error({message : "Failed"})
        })
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
    
        });
  
      }else {

        api.post('/tasks/list/create',this.state.data).then((res)=>{
          this.setState({
            data : {
              userId : user.token.user._id,
              name : '',
            }
          })
          this.componentDidMount()
          notification.success({message : "List created Successfully"})
        }).catch((err)=>{
          console.log(err)
          notification.error({message : "Failed"})
        }).then(()=>{
          ReactDOM.findDOMNode(this.messageForm).reset()
        })
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        
        });
    
      }
      
          setTimeout(() => {
        //window.location.reload()
        this.setState({
          visible: false,
          disabled : false,
          confirmLoading: false,
        });
      }, 1200);
      console.log(this.state.disabled)
    }
   
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    const newstate = this.state
   
    newstate.data = {
      userId : user.token.user._id,
      name : '',
    }
    newstate.visible = false
    newstate.editMode = false
    this.setState(newstate);
    console.log(this.state.data)
    
    
  };

 
  render() {
    
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
  
      },
    
      {
        title: 'Practise Area',
        dataIndex: 'practiseArea',
        key: 'practiseArea',
  
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
  
      },
  
      {
        title: 'Edit',
        dataIndex: 'edit',
        key: '_id',
        render: (_, record) => {
          return (
            <Button variant="danger" onClick={() => handleEdit(record)}>
              Edit
            </Button>
          );
        },
      },
  
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: '_id',
        render: (_, record) => {
          return (
                <Popconfirm
                    title="Are you sure delete this list?"
                    onConfirm={() => handleDelete(record)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger >
                              Delete
                            </Button>
                  </Popconfirm>
            
          );
        },
      },
    ]
    
    const handleEdit = (record) => {

      console.log(record)
      this.setState({editMode : true, data : record })
 
    };
  
    const handleDelete = (record) => {
      api
          .get('/tasks/list/delete/' + record.id)
          .then((res) => {
            this.componentDidMount()
            notification.success({ message: 'List deleted.' })
          
          })
          .catch(() => notification.error({ message: 'Failed to delete' }));
          setTimeout(() => {
            //window.location.reload();
          }, 1000);
     
    };
    const { visible, confirmLoading } = this.state;
    const handleChange = (e) =>{
      e.persist()
      const { name , value} = e.target
      let data = this.state.data
      data[name] = value
      this.setState({data : data})
    }
    

    return (
      <Spin size="large" spinning = {this.state.spinning}>
        <div >
        <div>
          <Button
            onClick={this.showModal}
            className="form-add-button"
          >
            + Add List
          </Button>
          </div>
        <Modal
          title="Add List"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button  onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button type="primary" disabled={this.state.disabled} onClick={this.handleOk}>
              Create List
            </Button>,
          ]}
        >
            <Form
            id='myForm'
            className="form"
            ref={ form => this.messageForm = form }>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Name"
                  name="name"
                  onChange={handleChange} />
                </Form.Group>
            
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Descripton</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Description" 
                  onChange={handleChange}
                  name="decription"/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Practice Area</Form.Label>
                  <Form.Control 
                  as="select"
                  onChange={handleChange}
                  name="practiseArea"
                  >
                      <option>Select a practice area</option>
                      <option>Attorney</option>
                      <option>Administrative</option>
                      <option>Bankruptcy</option>
                      <option>Business</option>
                      <option>Builder's Liens</option>
                      <option>Civil Litigation</option>
                      <option>Commercial</option>
                      <option>Conveyance (Purchase)</option>
                      <option>Conveyance (Sale)</option>
                      <option>Corporate</option>
                      <option>Criminal</option>
                      <option>Employment</option>
                      <option>Estates</option>
                      <option>Family</option>
                      <option>Immigration</option>
                      <option>Insurance</option>
                      <option>Personal Injury</option>
                      <option>Tax</option>
                      <option>Wills</option>
                  </Form.Control>
                </Form.Group>
              </Form>
        </Modal>
        <Modal
          title="Edit List"
          visible={this.state.editMode}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button  onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button type="primary" onClick={this.handleOk}>
              Update List
            </Button>,
          ]}
        >
          <EditForm record = {this.state.data} handleChange = {handleChange}></EditForm>

        </Modal>

        <Table
        dataSource={this.state.tableData}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => this.props.handleView(record), // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
      ></Table>
      </div>
    
      </Spin>
      );
  }
}



export default AddList
