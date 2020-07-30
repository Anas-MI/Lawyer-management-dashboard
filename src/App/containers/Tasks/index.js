import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import UpcomingTasks from './UpcomingTasks/upcomingTasks';
import CompletedTask from './CompletedTasks/CompletedTasks';
import List from './List/List';
import api from '../../../resources/api';
import { Button, Modal, notification, Popconfirm, message } from 'antd';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import jsPDF from 'jspdf';
import TaskForm from './EditForm'
import { Input, Select } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';


import 'jspdf-autotable';
let res = {};
let response = {};
let ListData = null;
let options = null;



class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      loading: false,
      Data: { priority: 'Normal', matter: "" },
      editMode: false,
      res: '',
      selected: null,
      status: false,
    };
  }
  exportPDF = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = 'Tasks';
    const headers = [
      ['S.No', 'Task Name', 'Description', 'Matter', 'Due Date'],
    ];
    let data = [];
    this.state.tableData.map((val, index) => {
      const td = [
        index + 1,
        val.taskName,
        val.description,
        val.matter,
        this.getISTDate(val.dueDate),
      ];
      data.push(td);
    });
    let content = {
      startY: 50,
      head: headers,
      body: data,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('Tasks.pdf');
  };

  cancel(e) {
    console.log(e);
    message.error('Canceled');
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  openNotificationWithFailure = (type) => {
    notification[type]({
      message: 'Failure',
    });
  };
  openNotificationWithSucces = (type) => {
    notification[type]({
      message: 'Task Saved',
    });
  };

  handleOk = (e) => {
    e.preventDefault();
    notification.destroy();
    if(this.state.Data.taskName === '' || this.state.Data.taskName === undefined ){
      notification.warning({
        message: 'Please provide a taskName',
      });
    }
    if(this.state.Data.description === '' ||this.state.Data.description === undefined  ){
      notification.warning({
        message: 'Please provide a description',
      });
    }
    if( this.state.Data.dueDate === '' || this.state.Data.dueDate === undefined  ){
      notification.warning({
          message: 'Please select a due date',
        });
    }
    if( this.state.Data.matter === "" || this.state.Data.matter === undefined ){
      notification.warning({
        message: 'Please select a matter',
      });
      
    } else {
      this.setState({
        confirmLoading: true,
      });
      const data = this.state.Data;
      data.userId = this.props.userId;
      if (this.state.editMode) {
        api
          .post('tasks/edit/' + data._id, data)
          .then((res) => {
            console.log(res)
            this.openNotificationWithSucces('success')
          }
          )
          .catch(() => {
            this.openNotificationWithFailure('error');
          });
      } else {
        api
          .post('/tasks/create', data)
          .then((res) => {
            console.log(res)
            this.openNotificationWithSucces('success')
          })
          .catch(() => {
            this.openNotificationWithFailure('error');
          });
      }
      if(this.props.location.state === "from dashboard"){
        this.props.history.goBack()
      }else{
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          //window.location.reload();
        }, 1000);
      }
      }
      
  };

  handelAction = (_id) =>{
    this.setState({
      status : true
    })
    const data = this.state.status;
    console.log(data)
    api.get('/tasks/updatetask/'+_id, data)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
        console.log(err); 
      });
   setTimeout(()=>{
    window.location.reload()
   },600)
  }
  handelNonAction = (_id) =>{
    this.setState({
      status : false
    })
    const data = this.state.status;
    console.log(data)
    api.get('/tasks/updatetask/'+_id, data)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
        console.log(err); 
      });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleChange = (e) => {
    e.persist();
    let newState = this.state;
    if (e.target.id === "matter" ) {
      if( e.target.selectedIndex > 0){
        newState.Data[e.target.id] = response[e.target.selectedIndex - 1];
      }
      
    } else {
      newState.Data[e.target.id] = e.target.value;
    }
    this.setState(newState);
    console.log(this.state);
  };

  EditHandler(_id) {
    this.setState({ editMode: true });
    this.setState({ Data: _id });
    console.log(this.state.Data)
    this.setState({ selected: _id });
    this.showModal();
  }

  deleteHandler(_id) {
    api.get('tasks/delete/' + _id);
    message.success('Deleted');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
  getISTDate(dateInUTC) {
    var localDate = new Date(dateInUTC);
    return localDate.toLocaleString();
  }
  handleView = (record) => {

    delete record.edit
    delete record.delete
  
    this.props.history.push('/tasks/view/list', record)
  };
  async componentDidMount() {
    if(this.props.location.state === "from dashboard"){
      this.showModal()
    }
    let tableData = [];
    await api
      .get('/matter/viewforuser/' + this.props.userId)
      .then((res) => (response = res.data.data));
        console.log(response);
        options = response.map((value, index) => {
      if (index == 0) {
        let newdata = this.state;
        newdata.Data.matter = value._id;
        this.setState(newdata);
      }
      return <option>{value.matterDescription}</option>;
    });

    await api.get('/tasks/viewforuser/' + this.props.userId).then((res) => {
      console.log(res.data.data);
      const newdata = res.data.data.filter(function( obj ) {
        return obj.status == false;});
      tableData = [ ...tableData, ...newdata]  

      // res.data.data.map((item, index) => {
      //   tableData = [
      //     ...tableData,
      //     {
      //       ...item,
      //       key: item._id,
      //     },
      //   ];
      // });

      ListData = res.data.data.map((value, index) => {
        return (
          <tr>
            <th scope="row">{value.dueDate}</th>
            <td>{value.description}</td>
            <td>{value.taskName}</td>
            <td>{value.matter.matterDescription}</td>
            <td>
              <Button onClick={() => this.EditHandler(value, index)}>
                Edit
              </Button>
            </td>
            <td>
              <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => this.deleteHandler(value, index)}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </td>
          </tr>
        );
      });
    });
    this.setState({ ListData, tableData, options });
  }

  columns = [
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: '1',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: '2',
    },
    {
      title: 'Matter',
      dataIndex: 'matterDescription',
      key: '3',
      render: (_, record) => {
        // console.log(record);
        return record.matter;
      },
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: '3',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.dueDate.length - b.dueDate.length,
      render: (_, record) => {
        return this.getISTDate(record.dueDate);
      },
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: '7',
      render: (_, record) => {
        return (
          <Popconfirm
            title="Mark as Complete"
            onConfirm={() => this.handelAction(record._id)}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Form.Check type="checkbox"  />
          </Popconfirm>
        );
      },
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: '6',
      render: (_, record) => {
        return (
          <Button onClick={() => this.EditHandler(record)}>Edit</Button>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: '7',
      render: (_, record) => {
        return (
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => this.deleteHandler(record._id)}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];

  newcolumns = [
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: '1',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: '2',
    },
    // {
    //   title: 'Matter',
    //   dataIndex: 'matterDescription',
    //   key: '3',
    //   render: (_, record) => {
    //     // console.log(record);
    //     return record.matter;
    //   },
    // },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: '3',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.dueDate.length - b.dueDate.length,
      render: (_, record) => {
        return this.getISTDate(record.dueDate);
      },
    },
    {
      title: 'Action',
      dataIndex: 'status',
      key: '7',
      render: (_, record) => {
        return (
          <Popconfirm
            title="Mark as Incomplete"
            onConfirm={() => this.handelNonAction(record._id)}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Form.Check type="checkbox"  />
          </Popconfirm>
        );
      },
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: '6',
      render: (_, record) => {
        return (
          <Button onClick={() => this.EditHandler(record._id)}>Edit</Button>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: '7',
      render: (_, record) => {
        return (
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => this.deleteHandler(record._id)}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  
  render() {
    console.log(this.props)
    const operations = (
      <span>
        <Button className="ml-auto" color="success" onClick={this.exportPDF}>
          Export
        </Button>
        <Button onClick={this.showModal}>ADD</Button>
      </span>
    );
    const { TabPane } = Tabs;
    function callback(key) {
      console.log(key);
    }

    return (
      <div>
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={operations}
          onChange={callback}
          className="card p-4 overflow-auto"
        >
          <TabPane tab="Upcoming Tasks" key="1">
            <UpcomingTasks
              columns={this.columns}
              tableData={this.state.tableData}
            />
          </TabPane>
          <TabPane tab="Completed Tasks" key="2">
            <CompletedTask
              columns={this.newcolumns}
              tableData={this.state.tableData}
            />
          </TabPane>
          <TabPane tab="List" key="3">
            <List handleView={this.handleView} tableData={this.state.ListData}></List>
          </TabPane>
        </Tabs>
        <Modal
          title="Add to New Task"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <TaskForm options={this.state.options} data={this.state.Data} editMode={this.state.editMode} handleChange={this.handleChange}></TaskForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.token.user._id,
});
export default connect(mapStateToProps)(Tasks);
