import { Modal, notification , Button, Popconfirm ,Table} from 'antd';
import React from 'react';
import Form from './Form'
import api from '../../../../resources/api';
import EditForm from './editForm'
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
      editMode : false
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
      this.setState({tableData : tableData})
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
      notification.warning("Please provide name for the list")
    }else{
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
          confirmLoading: false,
        });
      }, 1200);
  
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
      this.setState({editMode : true, data : record , visible : true})
 
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
            <Button type="primary"  onClick={this.handleOk}>
              Create List
            </Button>,
          ]}
        >
          <Form handleChange = {handleChange} ></Form>
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
            <Button type="primary"  onClick={this.handleOk}>
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
    );
  }
}



export default AddList
