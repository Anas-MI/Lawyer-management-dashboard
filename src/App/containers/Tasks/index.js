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
import { Input, Select } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';


import 'jspdf-autotable';
let res = {};
let response = {};
let ListData = null;
let options = null;

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="Firm User" className="select-before">
    <Option value="FirmUser">Firm User</Option>
    <Option value="Contacts">Contacts</Option>
  </Select>
);

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      loading: false,
      Data: { priority: 'Normal', matter: '' },
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
    if (
      this.state.Data.taskName === '' ||
      this.state.Data.taskName === undefined ||
      this.state.Data.description === '' ||
      this.state.Data.taskName === undefined ||
      this.state.Data.dueDate === '' ||
      this.state.Data.dueDate === undefined ||
      this.state.Data.matter === '' ||
      this.state.Data.matter === undefined
    ) {
      console.log(this.state.Data);

      return notification.warning({
        message: 'Fields Should Not Be Empty',
      });
    } else {
      this.setState({
        confirmLoading: true,
      });
      const data = this.state.Data;
      data.userId = this.props.userId;
      if (this.state.editMode) {
        api
          .post('tasks/edit/' + this.state.selected, data)
          .then(() => this.openNotificationWithSucces('success'))
          .catch(() => {
            this.openNotificationWithFailure('error');
          });
      } else {
        api
          .post('/tasks/create', data)
          .then(() => this.openNotificationWithSucces('success'))
          .catch(() => {
            this.openNotificationWithFailure('error');
          });
      }
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
        window.location.reload();
      }, 1000);
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
    if (e.target.id === 'matter') {
      newState.Data[e.target.id] = response[e.target.selectedIndex];
    } else {
      newState.Data[e.target.id] = e.target.value;
    }
    this.setState(newState);
    console.log(this.state);
  };

  EditHandler(_id) {
    this.setState({ editMode: true });
    this.setState({ res: _id });
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
          <Form className="form-details">
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Task Name"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="Due Date"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="3"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="taskName">
              <Form.Label>Assignee</Form.Label>
              <div>
                <Input addonBefore={selectBefore} size="large" suffix={<UserOutlined className="site-form-item-icon" />}  placeholder="Type a name..." />
              </div>
            </Form.Group>

            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Normal"
                required
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                name="matter"
              >
                {this.state.options}
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Notify me when the task is completed" />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Notify assignee via email" />
            </Form.Group>
            <br />
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.token.user._id,
});
export default connect(mapStateToProps)(Tasks);
