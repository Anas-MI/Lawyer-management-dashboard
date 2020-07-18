import React from 'react';
import {
  Table,
  Button,
  Modal,
  Card,
  notification,
  Space,
  Popconfirm,
} from 'antd';
import { useSelector, connect } from 'react-redux';
import ExpenseForm from './Form/expenseForm';
import TimeForm from './Form/timeForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Form, Col, Row } from 'react-bootstrap';
import api from '../../../resources/api';
import { min } from 'lodash';

let matters = {};
let activity = {};
let timeError = '';
class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseModal: false,
      timeModal: false,
      data: {
        billable: false,
        qty: '1.0',
        date: '',
        rate: '',
        invoice: 'Unbilled',
        time: '',
      },
      timeData: [],
      expenseData: [],
      completeData: [],
      tableData: [],
      editmode: false,
      record: '',
      touched: true,
    };
  }
  convertTime = (serverdate) => {
    var date = new Date(serverdate);
    // convert to utc time
    var toutc = date.toUTCString();
    //convert to local time
    var locdat = new Date(toutc + ' UTC');
    return locdat;
  };
  componentDidMount() {
    api.get('/matter/viewforuser/' + this.props.userId).then((res) => {
      matters = res;
    });
    api.get('/activity/viewforuser/' + this.props.userId).then((res) => {
      activity = res.data.data;
      var now = new Date();

      var end_of_week = new Date(
        now.getTime() + (6 - now.getDay()) * 24 * 60 * 60 * 1000
      );
      end_of_week.setHours(23);
      end_of_week.setMinutes(59);
      end_of_week.setSeconds(59);

      var start_of_week = new Date(now.setDate(now.getDate() - now.getDay()));

      let timedata = [];
      let expenseData = [];
      let completeData = [];
      let today = [];
      let thisWeek = [];
      let thisMonth = [];
      let thisYear = [];
      res.data.data.map((val, index) => {
        const date = this.convertTime(val.date);
        const temp = {
          key: index,
          type: val.type,
          id: val._id,
          qty: val.qty,
          time: val.time ? val.time : '',
          matter: val.matter ? val.matter : '-',
          description: val.description ? val.description : '-',
          rate: val.rate,
          billable: val.billable ? 'Yes' : 'No',
          date: val.date.substring(0, 10),
          invoiceStatus: 'Unbilled',
          //  invoiceStatus :  val.invoiceStatus?  val.invoiceStatus : "-" ,
        };
        if (val.type === 'time') {
          timedata.push(temp);
        }
        if (val.type === 'expense') {
          expenseData.push(temp);
        }
        if (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        ) {
          // between now and end of week
          today.push(temp);
        }
        if (date >= start_of_week && date <= end_of_week) {
          // between now and end of week
          thisWeek.push(temp);
        }
        if (
          date.getFullYear() == now.getFullYear() &&
          date.getMonth() == now.getMonth()
        ) {
          thisMonth.push(temp);
        }
        if (date.getFullYear() == now.getFullYear()) {
          thisYear.push(temp);
        }
        completeData.push(temp);
      });
      this.setState({
        completeData: completeData,
        expenseData: expenseData,
        timeData: timedata,
        tableData: completeData,
        thisWeek: thisWeek,
        thisMonth: thisMonth,
        thisYear: thisYear,
        today: today,
      });
    });
    const time = window.localStorage.getItem('timer');
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60);
    if (minutes >= 59) {
      minutes = minutes % 60;
    }

    //   const Seconds = time % 60;
    const data = this.state.data;
    data.time = hours + ':' + minutes;
    this.setState({ data: data, touched: true });
    console.log(this.state);
  }
  showModal = (type) => {
    if (type === 'time') {
      this.setState({
        timeModal: true,
      });
    } else if (type === 'expense') {
      this.setState({
        expenseModal: true,
      });
    }
  };

  handleOk = (type) => {
    console.log(timeError);
    notification.destroy();
    if (timeError !== '') {
      notification.error({ message: 'Invalid time' });
    } else if (this.state.data.date === '') {
      notification.error({ message: 'Please select a Date' });
    } else if (this.state.data.rate === '') {
      notification.error({ message: 'Please provide rate' });
    } else {
      if (this.state.editmode) {
        if (type === 'time') {
          let data = this.state.data;
          data.type = 'time';
          data.userId = this.props.userId;
          api
            .post('/activity/edit/' + this.state.data.id, data)
            .then((res) => {
              notification.success({ message: 'Time entry Edited !' });
            })
            .catch((err) => {
              notification.error({ message: 'Failed' });
            })
            .then(() => {
              this.setState({
                timeModal: false,
                editmode: false,
                data: {
                  billable: true,
                  nonBillable: false,
                  date: '',
                  qty: '1.0',
                  rate: '',
                  invoice: 'Unbilled',
                },
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            });
        } else if (type === 'expense') {
          let data = this.state.data;
          data.type = 'expense';
          data.userId = this.props.userId;
          api
            .post('/activity/edit/' + this.state.data.id, data)
            .then((res) => {
              notification.success({ message: 'Expense Edited!' });
            })
            .catch((err) => {
              notification.error({ message: 'Failed' });
            })
            .then(() => {
              this.setState({
                expenseModal: false,
                editmode: false,
                data: {
                  billable: true,
                  nonBillable: false,
                  date: '',
                  rate: '',
                  qty: '1.0',
                  invoice: 'Unbilled',
                },
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            });
        }
      } else {
        if (type === 'time') {
          let data = this.state.data;
          data.type = 'time';
          data.userId = this.props.userId;
          api
            .post('/activity/create', data)
            .then((res) => {
              notification.success({ message: 'Time entry Added !' });
            })
            .catch((err) => {
              notification.error({ message: 'Failed' });
            })
            .then(() => {
              this.setState({
                timeModal: false,
                editmode: false,
                data: {
                  billable: true,
                  nonBillable: false,
                  date: '',
                  qty: '1.0',
                  rate: '',
                  invoice: 'Unbilled',
                },
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            });
        } else if (type === 'expense') {
          let data = this.state.data;
          data.type = 'expense';
          data.userId = this.props.userId;
          api
            .post('/activity/create', data)
            .then((res) => {
              notification.success({ message: 'Expense Added !' });
            })
            .catch((err) => {
              notification.error({ message: 'Failed' });
            })
            .then(() => {
              this.setState({
                expenseModal: false,
                editmode: false,
                data: {
                  billable: true,
                  nonBillable: false,
                  date: '',
                  qty: '1.0',
                  rate: '',
                  invoice: 'Unbilled',
                },
              });
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            });
        }
      }
    }
  };

  handleCancel = (type) => {
    if (type === 'time') {
      this.setState({
        timeModal: false,
        editmode: false,
        data: {
          billable: true,
          nonBillable: false,
          date: '',
          qty: '1.0',
          rate: '',
          invoice: 'Unbilled',
        },
      });
      console.log(this.state);
    } else if (type === 'expense') {
      this.setState({
        expenseModal: false,
        editmode: false,
        data: {
          billable: true,
          nonBillable: false,
          date: '',
          qty: '1.0',
          rate: '',
          invoice: 'Unbilled',
        },
      });
      console.log(this.state);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  render() {
    const handleEdit = (record) => {
      if (record.type === 'time') {
        this.setState({
          editmode: true,
          timeModal: true,
          data: record,
        });
      } else if (record.type === 'expense') {
        this.setState({
          editmode: true,
          expenseModal: true,
          data: record,
        });
      }
    };

    const handleDelete = (record) => {
      api
        .get('/activity/delete/' + record.id)
        .then((res) => {
          notification.success({ message: 'Activity Deleted !' });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((err) => {
          notification.error({ message: 'Failed to delete' });
        });
    };

    const columns = [
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Qty',
        dataIndex: 'qty',
        key: 'qty',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.qty > b.qty,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Rate',
        dataIndex: 'rate',
        key: 'rate',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.rate > b.rate,
      },
      {
        title: 'Billable',
        dataIndex: 'billable',
        key: 'billable',
        filters: [
          { text: 'Yes', value: 'Yes' },
          { text: 'No', value: 'No' },
        ],
        onFilter: (value, record) => record.billable.includes(value),
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.date > b.date,
      },
      {
        title: 'Invoice Status',
        dataIndex: 'invoiceStatus',
        key: 'invoiceStatus',
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
              title="Are you sure delete this task?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          );
        },
      },
    ];
    const exportPDF = () => {
      const unit = 'pt';
      const size = 'A4'; // Use A1, A2, A3 or A4
      const orientation = 'portrait'; // portrait or landscape

      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);

      doc.setFontSize(15);

      const title = 'Activity';
      const headers = [
        [
          'type',
          'Qty',
          'Description',
          'Billable',
          'Rate',
          'Date',
          'Invoice Status',
        ],
      ];

      let data = [];

      this.state.tableData.map((val, index) => {
        const td = [
          val.type,
          val.qty,
          val.description,
          val.billable,
          val.rate,
          val.date,
          val.invoiceStatus,
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
      doc.save('Activity.pdf');
    };
    const handleSorting = (e) => {
      e.persist();
      const { value } = e.target;

      if (value === 'This Week') {
        this.setState({ tableData: this.state.thisWeek });
      } else if (value === 'Today') {
        this.setState({ tableData: this.state.today });
      } else if (value === 'This month') {
        this.setState({ tableData: this.state.thisMonth });
      } else if (value === 'This year') {
        this.setState({ tableData: this.state.thisYear });
      } else if (value === 'Sort') {
        this.setState({ tableData: this.state.completeData });
      }
    };
    const handleCustomSorting = (e) => {
      e.persist();
      const { value, name } = e.target;
      let data = this.state;
      data[name] = value;
      this.setState(data);
      console.log(this.state);
      if (this.state.From != undefined && this.state.To != undefined) {
        console.log('will sort now');
        let customSort = [];
        activity.map((val, index) => {
          console.log(val.date);
          const temp = {
            type: val.type,
            id: val._id,
            qty: val.qty,
            time: val.time ? val.time : '',
            matter: val.matter ? val.matter : '-',
            description: val.description ? val.description : '-',
            rate: val.rate,
            billable: val.billable ? 'Yes' : 'No',
            date: val.date.substring(0, 10),
            invoiceStatus: val.invoiceStatus ? val.invoiceStatus : '-',
          };
          if (val.date >= this.state.From && val.date <= this.state.To)
            customSort.push(temp);
        });
        this.setState({ tableData: customSort });
      }
    };
    const handleChange = (e) => {
      e.persist();
      this.setState({ touched: false });
      const { name, id, value, selectedIndex } = e.target;
      let newData = this.state.data;
      if (name === 'matter') {
        if (selectedIndex >= 1) {
          newData[name] = matters.data.data[selectedIndex - 1];
        } else {
          newData[name] = '';
        }
      } else if (name === 'time') {
        timeError = '';
        var timeValue = value;
        if (timeValue == '' || timeValue.indexOf(':') < 0) {
          timeError = 'Inavlid Time';
          console.log(timeError);
        } else {
          var sHours = timeValue.split(':')[0];
          var sMinutes = timeValue.split(':')[1];

          if (sHours == '' || isNaN(sHours) /*|| parseInt(sHours)>23 */) {
            timeError = 'Inavlid Time';
            console.log(timeError);
          } else if (parseInt(sHours) == 0) sHours = '00';
          else if (sHours < 10) sHours = '0' + sHours;

          if (sMinutes == '' || isNaN(sMinutes) || parseInt(sMinutes) > 59) {
            timeError = 'Inavlid Time';
            console.log(timeError);
          } else if (parseInt(sMinutes) == 0) sMinutes = '00';
          else if (sMinutes < 10) sMinutes = '0' + sMinutes;

          timeValue = sHours + ':' + sMinutes;
        }
        newData[name] = timeValue;
        this.setState({ data: newData });
      } else if (name === 'nonBillable' || name === 'billable') {
        newData.billable = !newData.billable;
        console.log(newData.billable);
      } else {
        newData[name] = value;
        this.setState({ data: newData });
      }

      console.log(this.state);
    };
    const setTableData = (type) => {
      if (type === 'time') {
        this.setState({
          tableData: this.state.timeData,
        });
      } else if (type === 'expense') {
        this.setState({
          tableData: this.state.expenseData,
        });
      } else if (type === 'all') {
        this.setState({
          tableData: this.state.completeData,
        });
      }
    };
    return (
      <div className="p-2 ">
        <br></br>
        <br></br>

        <Card
          title="Activities"
          bodyStyle={{ padding: '14px 10px 0px 10px' }}
          extra={
            <span style={{ float: 'right' }}>
              <Button className="ml-auto" color="success" onClick={exportPDF}>
                Export
              </Button>
              <Button onClick={() => this.showModal('time')}>
                New Time Entry
              </Button>
              <Button onClick={() => this.showModal('expense')}>
                New Expense
              </Button>
            </span>
          }
        >
          <div
            style={{
              display: 'flex',
              'flex-wrap': 'wrap',
              'justify-content': 'space-between',
            }}
          >
            <div className="mb-2">
              <Button onClick={() => setTableData('all')}>All</Button>
              <Button onClick={() => setTableData('time')}>Time</Button>
              <Button onClick={() => setTableData('expense')}>Expense</Button>
            </div>
            <Form className="pt-0">
              <Form.Row className="ml-1">
                <Form.Group controlId="From" className="mr-2">
                  <Form.Control
                    size="sm"
                    type="date"
                    name="From"
                    onChange={handleCustomSorting}
                    style={{ width: '175px' }}
                  />
                </Form.Group>{' '}
                -
                <Form.Group controlId="To" className="mx-2">
                  <Form.Control
                    size="sm"
                    type="date"
                    name="To"
                    onChange={handleCustomSorting}
                    style={{ width: '175px' }}
                  />
                </Form.Group>
                <Form.Group controlId="sorting">
                  <Form.Control
                    size="sm"
                    as="select"
                    name="sorting"
                    onChange={handleSorting}
                    style={{ height: 'fit-content', padding: '4px' }}
                  >
                    <option>Sort</option>

                    <option>Today</option>
                    <option>This Week</option>
                    <option>This month</option>
                    <option>This year</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Card>
        <Card bodyStyle={{ padding: '0px' }} className="overflow-auto">
          <Table columns={columns} dataSource={this.state.tableData} />
        </Card>

        <Modal
          title="New Time Entry"
          visible={this.state.timeModal}
          onOk={() => this.handleOk('time')}
          onCancel={() => this.handleCancel('time')}
          afterClose={() => this.handleCancel('time')}
        >
          <TimeForm
            touched={this.state.touched}
            time={this.state.data.time}
            record={this.state.data}
            editmode={this.state.editmode}
            handleChange={handleChange}
          ></TimeForm>
        </Modal>
        <Modal
          title="New Expense"
          visible={this.state.expenseModal}
          onOk={() => this.handleOk('expense')}
          onCancel={() => this.handleCancel('expense')}
          afterClose={() => this.handleCancel('expense')}
        >
          <ExpenseForm
            record={this.state.data}
            editmode={this.state.editmode}
            handleChange={handleChange}
          ></ExpenseForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.token.user._id,
});

export default connect(mapStateToProps)(Activity);
