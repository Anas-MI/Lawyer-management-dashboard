import React from 'react'
import { Tabs, Button,Modal , Card, notification, Table, Popconfirm, Space } from 'antd';
import api from '../../../../resources/api'
import {connect} from 'react-redux'
import {Form} from 'react-bootstrap'
import ReactDOM from 'react-dom'

const { TabPane } = Tabs;

let data = {}
class customFeilds extends React.Component {
  constructor(props){
    super(props)
    this.state={
      
      data : {
        default : false,
        required : false,
      },
      disable : false,
      tableData : [],
      visible : false,
      editMode : false
    }
  }

  componentDidMount(){ 
    let tableData = []

    api.get('/user/view/'+this.props.userId).then((res)=>{
      data = res.data.data
      console.log(res)
      res.data.data.customFields.map((value,index)=>{
        const temp = {
          _id : value.type,
          key: index,
          name: value.name,
          type : value.type,
          default : value.default,
          required : value.required
        }
        tableData.push(temp)
      })
      this.setState({
        tableData : tableData
      })
    })

    
  }
   
 

 
  render() {
    const HandleChange=(e)=>{
      e.persist()
      const { value , name } = e.target
      let newState = this.state
      if( e.target.name === "required" || e.target.name === "default"){
       
        newState.data[name] = !newState.data[name]
        
      }else{
        newState.data[name] =  value
      }
      this.setState(newState)
      console.log(this.state)
    }
    const HandleOk=()=>{
      notification.destroy()
     // api.post('/user/update/'+this.props.userId, data).then((res)=>{
      const newdata = {
        userId : this.props.userId,
        name : this.state.data.name,
        type : this.state.data.type,
        default : this.state.data.default,
        required : this.state.data.required
      }
      if ((newdata.name === "" || newdata.name === undefined)  ) {
        return notification.warning({
          message: "Please select a name",
        });
      }else
      if ( newdata.type === "" ||newdata.type === undefined ) {
        return notification.warning({
          message: "Please select a type",
        });
      }else
      if ( (newdata.required === true && newdata.default === true) || (newdata.required ===false && newdata.default ===false) ) {
        return notification.warning({
          message: "Please select check either default or required",
        });
      }else{
        
        this.setState({
          disable : true
        })
        console.log(this.state)
        if(this.state.editMode){
          data.customFields[this.state.data.key] = newdata
        }else{
          data.customFields.push(newdata)
        }
        
          
        
       api.post('/user/update/' + this.props.userId , data ).then((res)=>{
        notification.success({message : "Field Saved."})
        this.componentDidMount()
        this.setState({
          visible : false,
          disable : false,
          editMode : false
        })
       }).catch(()=>{
          notification.error({message : "Failed to add"})
        }).then(()=>{
          ReactDOM.findDOMNode(this.messageForm).reset()
        })
      
      setTimeout(() => {
       // window.location.reload()
      }, 1000);
      
        
      }

    }
    const handleEdit=(record)=>{
      
      this.setState({
        data : record,
        editMode : true
      })
      console.log(record)
    }
    const handleCancel = ( ) =>{
      ReactDOM.findDOMNode(this.messageForm).reset()

      this.setState({
        visible : false,
        editMode : false
      })
    }
    const handleDelete=(record)=>{
      data.customFields.splice(record.key, 1)
      api.post('/user/update/'+this.props.userId, data).then((res)=>{
        notification.success({message : "Custom Feild Deleted"})
        this.componentDidMount()
      }).catch((err)=>{
        notification.error({message : "Failed to delete"})
      })
      setTimeout(() => {
        //window.location.reload()
      }, 1000);
    }
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
          title: 'Default',
          dataIndex: 'default',
          key: 'default',
          render: checked => <Form.Check 
                            type="checkbox"
                            id={`default`}
                            checked = {checked}  
                        />,
          
        },
        {
          title: 'Required',
          dataIndex: 'required',
          key: 'required',
          render: checked => <Form.Check 
                            type="checkbox"
                            id={`required`}
                            checked = {checked}  
                        />,
        },
      
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button onClick={()=>handleEdit(record)} type="link">Edit</Button>
            <Popconfirm
          title="Are you sure delete this Feild?"
          onConfirm={()=>handleDelete(record)}
          onCancel={this.cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">Delete</Button>
        </Popconfirm>
            
          </Space>
        ),
      },
    ];
    const operations = <Button onClick={() => this.setState({visible : true})}>Add</Button>
    return (
      <Card>
      <Tabs tabBarExtraContent={operations}>
             <TabPane tab="Custom Feild" key="1">
                <Table columns={columns} dataSource={this.state.tableData} />
              </TabPane>
              
        </Tabs>
        {/* 
        <Tabs>
             <TabPane tab="Matter Custom Feild" key="1">
                <Tabs tabBarExtraContent={operations}>
                  <TabPane tab="Individual Feild" key="1">
                          <Table columns={columns} dataSource={this.state.tableData} />

                    </TabPane>
                    <TabPane tab="Feild Sets" key="2">
                          <Table columns={columns} dataSource={this.state.tableData} />

                    </TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab="Contact Custom Feild" key="2">
                <Tabs>
                  <TabPane tab="Individual Feild" key="1">
                          <Table columns={columns} dataSource={this.state.tableData} />

                    </TabPane>
                    <TabPane tab="Feild Sets" key="2">
                          <Table columns={columns} dataSource={this.state.tableData} />

                    </TabPane>
                </Tabs>
             </TabPane>
        </Tabs>
        */}
        <Modal
          title="Add Custom Feild"
          centered
          visible={this.state.visible}
          onOk={HandleOk}
          onCancel={handleCancel}
          footer={[
            <Button  onClick={handleCancel}>
              Cancel
            </Button>,
            <Button type="primary" disabled = {this.state.disable} onClick={HandleOk}>
              Create Feild
            </Button>,
          ]}
        >
          <Form
          id='myForm'
          className="form"
          ref={ form => this.messageForm = form }
          >
            <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Name" name="name" onChange={HandleChange}/>
            </Form.Group>
            <Form.Group controlId="Type">
                <Form.Label>Select Custom Feild type</Form.Label>
                <Form.Control as="select" name="type" onChange={HandleChange}>
                <option>Checkbox</option>
                <option>Date</option>
                <option>password</option>
                <option>Integer</option>
                <option>Matter</option>
                <option>number</option>
                <option>Picklist</option>
                <option>Text</option>
                </Form.Control>
                <br></br>
                <Form.Check 
                    type="checkbox"
                    id={`Default`}
                    label={`Default`}
                    name="default"
                    onChange={HandleChange}
                /><br></br>
                <Form.Check 
                    type="checkbox"
                    id={`Required`}
                    label={`Required`}
                    name="required"
                    onChange={HandleChange}
                />

            </Form.Group>
            </Form>
        </Modal>
        <Modal
          title="Edit Custom Feild"
          centered
          visible={this.state.editMode}
          onOk={HandleOk}
          onCancel={handleCancel}
          footer={[
            <Button  onClick={handleCancel}>
              Cancel
            </Button>,
            <Button type="primary" disabled = {this.state.disable} onClick={HandleOk}>
              Edit Feild
            </Button>,
          ]}
        >
          <Form
          id='myForm'
          className="form"
          ref={ form => this.messageForm = form }>
            <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type="name" 
                defaultValue = {this.state.data.name} 
                name="name" 
                onChange={HandleChange}/>
            </Form.Group>
            <Form.Group controlId="Type">
                <Form.Label>Select Custom Feild type</Form.Label>
                <Form.Control 
                as="select" 
                name="type" 
                defaultValue = {this.state.data.type}
                onChange={HandleChange}>
                <option>Checkbox</option>
                <option>Date</option>
                <option>password</option>
                <option>Integer</option>
                <option>Matter</option>
                <option>number</option>
                <option>Picklist</option>
                <option>Text</option>
                </Form.Control>
                <br></br>
                <Form.Check 
                    type="checkbox"
                    id={`Default`}
                    label={`Default`}
                    name="default"
                    defaultChecked = {this.state.data.default}
                    onChange={HandleChange}
                /><br></br>
                <Form.Check 
                    type="checkbox"
                    id={`Required`}
                    label={`Required`}
                    defaultChecked = {this.state.data.required}
                    name="required"
                    onChange={HandleChange}
                />

            </Form.Group>
            </Form>
        </Modal>
      
        </Card>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.token.user._id
});
export default connect(mapStateToProps)(customFeilds)
