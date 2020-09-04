  import React from 'react';
  import {
    Table,
    Button,
    Modal,
    Card,
    notification,
    Space,
    Popconfirm,
    Spin
  } from 'antd';
  import { useSelector, connect } from 'react-redux';
  import ExportExcel from './ExportActivity'
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  import { Form, Col, Row } from 'react-bootstrap';
  import api from '../../../../resources/api';
  import ReactDOM from 'react-dom'
  import Timer from '../../../components/Timer/index.js'

  let matters = {};
  let activity = {};
  let timeError = '';
  let option = null
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
          matter : "",
          billed : false
        },
        loading : true,
        timeData: [],
        expenseData: [],
        completeData: [],
        tableData: [],
        editTime: false,
        EditExpense : false,
        record: '',
        touched: true,
        disabletime : false,
        disableExpense : false,
        today :[]
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
    
    setTimer = () => {
  
      const time = window.localStorage.getItem('timer');
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor(time / 60);
      let seconds = time % 60
     
      if (minutes >= 59) {
        minutes = minutes % 60;
      }
      if (seconds < 10) {
        seconds = "0"+seconds
      }
  
      //   const Seconds = time % 60;
      const data = this.state.data;
      data.time = hours + ':' + minutes + ':' + seconds
      this.setState({ data: data });
  }
    componentDidMount() {
      
      api.get('/matter/viewforuser/' + this.props.userId).then((res) => {
        matters = res;
        option = res.data.data.map((val, index)=>{
          return <option key={index} value={val.matterDescription}>{val.matterDescription}</option>
      })
      }).then(()=>{
        this.setState({option : option})
    })
    api.get('/activity/viewformatter/'+this.props.userId+'/'+ this.props.id).then((res) => {
      activity = res.data.data;
        var now = new Date();
  
        var end_of_week = new Date(
          now.getTime() + (6 - now.getDay()) * 24 * 60 * 60 * 1000
        );
        end_of_week.setHours(23);
        end_of_week.setMinutes(59);
        end_of_week.setSeconds(59);
  
       // var start_of_week = new Date(now.setDate(now.getDate() - now.getDay()));
  
        let timedata = [];
        let expenseData = [];
        let completeData = [];
        let today = [];
        let thisWeek = [];
        let thisMonth = [];
        let thisYear = [];
        res.data.data.map((val, index) => {
          const date = this.convertTime(val.date);
          let temp = {
            key: index,
            type: val.type,
            id: val._id,
            qty : val.type === 'time' ? val.time : val.qty,
            time: val.time ? val.time : '',
            matter: val.matter ? val.matter : '-',
            description: val.description ? val.description : '-',
            rate: val.rate,
            billable: val.billable ? 'Yes' : 'No',
            date: val.date.substring(0, 10),
            invoiceStatus: 'Unbilled',
            //  invoiceStatus :  val.invoiceStatus?  val.invoiceStatus : "-" ,
          };
          console.log(now)
          console.log(date)
          console.log("sepeaaot")
          if (val.type === 'time') {
  
            timedata.push(temp);
          }
          if (val.type === 'expense') {
     
            expenseData.push(temp);
          }
          if (
            date.getDate() == now.getDate() &&
            date.getMonth() == now.getMonth() &&
            date.getFullYear() == now.getFullYear()
          ) {
            
            today.push(temp);
          }
          if (date >= now && date <= end_of_week) {
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
        console.log(today)
        this.setState({
          completeData: completeData,
          expenseData: expenseData,
          timeData: timedata,
          tableData: completeData,
          thisWeek: thisWeek,
          thisMonth: thisMonth,
          thisYear: thisYear,
          today: today,
          loading : false
        });
      });
      
      this.setTimer()
    
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
   
      notification.destroy();
      if (timeError !== '') {
        notification.error({ message: 'Invalid time' });
      } else if (this.state.data.date === '') {
        notification.error({ message: 'Please select a Date' });
      } else if (this.state.data.rate === '') {
        notification.error({ message: 'Please provide rate' });
      } else {
        this.setState({
          disableExpense : true,
          disabletime : true
        })
        if (this.state.editTime || this.state.EditExpense) {
          if (type === 'time') {
            let data = this.state.data;
            data.type = 'time';
            data.userId = this.props.userId;
            api
              .post('/activity/edit/' + this.state.data.id, data)
              .then((res) => {
                this.componentDidMount()
                this.setState({
                  disableExpense : false,
                  disabletime : false,
                  editTime: false,
                  EditExpense : false,
                })
                notification.success({ message: 'Time entry Edited !' });
              })
              .catch((err) => {
                notification.error({ message: 'Failed' });
              })
              .then(() => {
              
                ReactDOM.findDOMNode(this.messageForm).reset()
                this.setState({
                  timeModal: false,
                  editmode: false,
                  data: {
                    billable: false,
                    nonBillable: false,
                    date: '',
                    qty: '1.0',
                    rate: '',
                    invoice: 'Unbilled',
                  },
                });
                console.log(this.state.data)
                setTimeout(() => {
                  //window.location.reload();
                }, 1500);
              });
          } else if (type === 'expense') {
            let data = this.state.data;
            data.type = 'expense';
            data.userId = this.props.userId;
            api
              .post('/activity/edit/' + this.state.data.id, data)
              .then((res) => {
                this.componentDidMount()
                this.setState({
                  disableExpense : false,
                  disabletime : false
                })
                notification.success({ message: 'Expense Edited!' });
              })
              .catch((err) => {
                notification.error({ message: 'Failed' });
              })
              .then(() => {
                ReactDOM.findDOMNode(this.messageForm).reset()
  
                this.setState({
                  expenseModal: false,
                  EditExpense : false,
                  editmode: false,
                  data: {
                    billable: false,
                    nonBillable: false,
                    matter : "",
                    date: '',
                    rate: '',
                    qty: '1.0',
                    invoice: 'Unbilled',
                  },
                });
                setTimeout(() => {
                 // window.location.reload();
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
                this.componentDidMount()
                this.setState({
                  disableExpense : false,
                  disabletime : false
                })
                notification.success({ message: 'Time entry Added !' });
              })
              .catch((err) => {
                notification.error({ message: 'Failed' });
              })
              .then(() => {
                ReactDOM.findDOMNode(this.messageForm).reset()
                this.setState({
                  timeModal: false,
                  editmode: false,
                  data: {
                    billable: false,
                    nonBillable: false,
                    matter : "",
                    date: '',
                    qty: '1.0',
                    rate: '',
                    invoice: 'Unbilled',
                  },
                });
                setTimeout(() => {
                  //window.location.reload();
                }, 1500);
              });
          } else if (type === 'expense') {
            let data = this.state.data;
            data.type = 'expense';
            data.userId = this.props.userId;
            api
              .post('/activity/create', data)
              .then((res) => {
                this.componentDidMount()
                this.setState({
                  disableExpense : false,
                  disabletime : false
                })
                notification.success({ message: 'Expense Added !' });
              })
              .catch((err) => {
                notification.error({ message: 'Failed' });
              })
              .then(() => {
                ReactDOM.findDOMNode(this.messageForm).reset()
                this.setState({
                  expenseModal: false,
                  editmode: false,
                  data: {
                    billable: false,
                    nonBillable: false,
                    date: '',
                    matter : "",
                    qty: '1.0',
                    rate: '',
                    invoice: 'Unbilled',
                  },
                });
                setTimeout(() => {
                  //window.location.reload();
                }, 1500);
              });
          }
        }
      }
    };
  
    handleCancel = (type) => {
      ReactDOM.findDOMNode(this.messageForm).reset()
      console.log("Handle Cancel")
      let newState = this.state
      newState.data = {
        billable: false,
        nonBillable: false,
        matter : {},
        date: '',
        qty: '1.0',
        rate: '',
        invoice: 'Unbilled',
      }
      this.setState(newState)
  
  
      if (type === 'time') {
        this.setState({
          timeModal: false,
          editTime : false,
         
        });
  
      } else if (type === 'expense') {
        this.setState({
          expenseModal: false,
          EditExpense: false, 
        });
        
      }
      console.log(this.state.data)
      this.setTimer()
      
    };
  
    render() {
      const handleEdit = (record) => {
       // ReactDOM.findDOMNode(this.messageForm).reset()
        let newState = this.state
        newState.data = record
        this.setState(newState)
        if (record.type === 'time') {
          this.setState({
            editTime: true,
     
          });
        } else if (record.type === 'expense') {
          this.setState({
            EditExpense: true,
  
          });
        }
        console.log(this.state.data)
      };
  
      const handleDelete = (record) => {
        api
          .get('/activity/delete/' + record.id)
          .then((res) => {
            this.componentDidMount()
            notification.success({ message: 'Activity Deleted !' });
            setTimeout(() => {
              //window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            notification.error({ message: 'Failed to delete' });
          });
      };
  
      const handleDublicate = (record) => {
  
        if (record.type === 'time') {
          record.type = 'time';
          record.userId = this.props.userId;
          record.billable = record.billable === "Yes" ? true : false
         
        } else if (record.type === 'expense') {
          record.type = 'expense';
          record.userId = this.props.userId;
          record.billable = record.billable === "Yes" ? true : false       
        }
        console.log(record)
        api
        .post('/activity/create', record)
        .then((res) => {
          this.componentDidMount()
          this.setState({
            disableExpense : false,
            disabletime : false
          })
          notification.success({ message: 'Acitivity duplicated !' });
        })
        .catch((err) => {
          notification.error({ message: 'Failed' });
        })
        .then(() => {
      //    ReactDOM.findDOMNode(this.messageForm).reset()
          this.setState({
            timeModal: false,
            editmode: false,
            data: {
              billable: false,
              nonBillable: false,
              date: '',
              qty: '1.0',
              rate: '',
              invoice: 'Unbilled',
            },
          });
          setTimeout(() => {
            //window.location.reload();
          }, 1500);
        });
      }
      const handleReset = ( form ) =>{
        this.messageForm = form
      }
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
          title: 'Duplicate',
          dataIndex: 'Dublicate',
          key: '_id',
          render: (_, record) => {
            return (
              <Button onClick={() => handleDublicate(record)}>
                Duplicate
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
                title="Are you sure delete this Activity?"
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
      
        if (this.state.From != undefined && this.state.To != undefined) {
  
          let customSort = [];
          activity.map((val, index) => {
        
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
            var sSecs = timeValue.split(':')[2];
            console.log(sSecs)
            if (sHours == '' || isNaN(sHours) /*|| parseInt(sHours)>23 */) {
              timeError = 'Inavlid Time';
              console.log(timeError);
            } else if (parseInt(sHours) == 0) sHours = '00';
           // else if (parseInt(sHours) < 10) {
  //            sHours = '0' + sHours};
  
            if (sMinutes == '' || isNaN(sMinutes) || parseInt(sMinutes) > 59) {
              timeError = 'Inavlid Time';
              console.log(timeError);
            } else if (parseInt(sMinutes) == 0) sMinutes = '00';
           // else if (parseInt(sMinutes) < 10) sMinutes = '0' + sMinutes;
  
            if (sSecs == '' || isNaN(sSecs) /*|| parseInt(sHours)>23 */) {
              timeError = 'Inavlid Time';
              console.log(timeError);
            } else if (parseInt(sSecs) == 0) sSecs = '00';
           // else if (sSecs < 10) sSecs = '0' + sSecs;
            timeValue = sHours + ':' + sMinutes +':' + sSecs;
          }
          newData[name] = timeValue;
          this.setState({ data: newData });
        } else if (name === 'nonBillable' || name === 'billable') {
          newData.billable = !newData.billable;
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
        <Spin size = "large" spinning={this.state.loading}>
          <div>
          <div className="d-flex mb-2 title-component-header">
              <div className="title-header-name">
                <h5>Activities</h5>
              </div>
              <div className="d-flex extra-iteam-div">
                  <button
                      className="btn  btn-outline-primary   btn-sm"
                      onClick={exportPDF}
                  >
                      Export to Pdf
                  </button>
                  <ExportExcel dataSource={this.state.tableData || []} />
                  <button
                      className=" btn  btn-outline-primary   btn-sm"
                      onClick={() => this.showModal('time')}
                  >
                      New Time Entry
                  </button>
                  <button
                      className="btn  btn-outline-primary   btn-sm"
                      onClick={() => this.showModal('expense')}
                  >
                      New Expense Entry
                  </button>
              </div> 
            </div>
  
          <Card
            bodyStyle={{ padding: '14px 10px 0px 10px' }}
          >
            <div
              style={{
                display: 'flex',
                'flex-wrap': 'wrap',
                'justify-content': 'space-between',
              }}
            >
              <div className="mb-2" style={{"margin-top": "1rem"}}>
                <Button onClick={() => setTableData('all')}>All</Button>
                <Button onClick={() => setTableData('time')}>Time</Button>
                <Button onClick={() => setTableData('expense')}>Expense</Button>
              </div>
              <Form className="pt-0">
                <Form.Row className="ml-1 date-activity-res">
                  <Form.Group controlId="From" className="mr-2"  style={{ "display": "flex", "flex-direction": "column"}}>
                    <Form.Label style={{ marginBottom : "0px" }}>From</Form.Label>
                    <Form.Control
                      size="sm"
                      type="date"
                      name="From"
                      onChange={handleCustomSorting}
                      style={{ width: '175px' }}
                    />
                  </Form.Group>
                  
                  <Form.Group controlId="To" style={{ "display": "flex", "flex-direction": "column"}}>
                    <Form.Label style={{ marginBottom : "0px" }}>To</Form.Label>
                    <Form.Control
                      size="sm"
                      type="date"
                      name="To"
                      onChange={handleCustomSorting}
                      style={{ width: '175px' }}
                    />
                  </Form.Group>
                  <Form.Group controlId="sorting" className="short-activity-botton">
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
            <Table className="table-responsive" columns={columns} dataSource={this.state.tableData} />
          </Card>
  
          <Modal
            title="New Time Entry"
            visible={this.state.timeModal}
            onOk={() => this.handleOk('time')}
            onCancel={() => this.handleCancel('time')}
            afterClose={() => this.handleCancel('time')}
            footer={[
              <Button  onClick={() => this.handleCancel('time')}>
                Cancel
              </Button>,
              <Button type="primary" 
              disabled = {this.state.disabletime} 
              onClick={() => this.handleOk('time')}>
                Add Entry
              </Button>,
            ]}
          >
                <Form 
                id='myForm'
                className="form"
                ref={ form => this.messageForm = form } >
                  <Row>
                      <Col>
                          <Form.Group controlId="duration">
                              <Form.Label>Duration</Form.Label>
                                <Form.Control 
                                  type="text" 
                                  name="time" 
                                  placeholder="hh:mm:ss" 
                                  defaultValue = {this.state.data.time}
                                  onChange={handleChange}/>
                          </Form.Group>
                      </Col>
                      <Col className = "activityTimer">
                          <Timer setTimer = {this.setTimer} ></Timer>
                      </Col>
                  </Row>
                  
                  <Row>
                      <Col>
                      <Form.Group controlId="matter">
                          <Form.Label>Matter</Form.Label>
                          <Form.Control 
                              as="select"
                              name="matter" 
                              placeholder="Matter"
                              onChange={handleChange}>
                          <option>Select a matter</option>
                          {this.state.option}
                          </Form.Control>
                      </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group controlId="rate">
                          <Form.Label>Rate</Form.Label>
                          <Form.Control 
                          required
                          type="number" 
                          name="rate" 
                          placeholder="0.0 /h"
                          onChange={handleChange} />
                      </Form.Group>
                      </Col>
  
                  </Row>
                
                      
                  <Row>
                      <Col>
                      <Form.Group controlId="Description">
                          <Form.Label>Description</Form.Label>
                          <Form.Control 
                          name="description" 
                          as="textarea" 
                          rows="3"
                          placeholder="Description"
                          onChange={handleChange} />
                      </Form.Group>
                      </Col>
  
                  </Row>
                
                  <Row>
                      <Col>
                      <Form.Group controlId="date">
                          <Form.Label>Date</Form.Label>
                          <Form.Control 
                          required
                          type="date" 
                          name="date" 
                          placeholder="Date" 
                          onChange={handleChange}/>
                      </Form.Group>
                      </Col>
                      {
                          /* 
                          <Col>
                      <Form.Group controlId="invoiceStatus">
                          <Form.Label>Invoice Status</Form.Label>
                          <Form.Control 
                              as="select"
                              name="invoiceStatus"
                              onChange={handleChange} >
                          <option>Unbilled</option>
                          <option>Billed</option>
                          </Form.Control>
                      </Form.Group>
                      </Col>
                          */
                      }
                  </Row>
                      
                      <Row>
                          <Col>
                          <Form.Check 
                        type="checkbox"
                        id="billable"
                        name="billable"
                        label="Billable"
                      
                        onChange={handleChange}
                    /><br></br>
                          </Col>
                      </Row>
              
                      {
                          /*
                          <Form.Check 
                        type="checkbox"
                        id="nonBillable"
                        name="nonBillable"
                        label="Non-billable"
                        defaultChecked = {!this.props.record.billable}
                        onChange={handleChange}
                    />
                          */
                      }
              </Form>
  
          </Modal>
          <Modal
            title="Edit Time Entry"
            visible={this.state.editTime}
            onOk={() => this.handleOk('time')}
            onCancel={() => this.handleCancel('time')}
            afterClose={() => this.handleCancel('time')}
            footer={[
              <Button  onClick={() => this.handleCancel('time')}>
                Cancel
              </Button>,
              <Button type="primary" disabled = {this.state.disabletime} onClick={() => this.handleOk('time')}>
                Update Entry
              </Button>,
            ]}
          >
            <Form 
            id='myForm'
            className="form"
            ref={ form => this.messageForm = form }>
              <Row>
                  <Col>
                  <Form.Group controlId="duration">
                      <Form.Label>Duration</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="time" 
                      defaultValue = {this.state.data.time}
                      onChange={handleChange}/>
                  </Form.Group>
                  </Col>
                  <Col className = "activityTimer" >
                      <Timer setTimer = {this.setTimer} ></Timer>
                  </Col>
              </Row>
              
              <Row>
                  <Col>
                      <Form.Group controlId="matter">
                                      <Form.Label>Matter</Form.Label>
                                      <Form.Control 
                                          as="select"
                                          name="matter" 
                                          value = {this.state.data.matter ? this.state.data.matter.matterDescription : ""}
  
                                          onChange={handleChange}>
                                      <option>Select a matter</option>
                                      {this.state.option}
                                      </Form.Control>
                                  </Form.Group>
                  </Col>
                  <Col>
                  <Form.Group controlId="rate">
                      <Form.Label>Rate</Form.Label>
                      <Form.Control 
                      required
                      type="number" 
                      name="rate" 
                      defaultValue = {this.state.data.rate}
                      onChange={handleChange} />
                  </Form.Group>
                  </Col>
  
              </Row>
              
                  
              <Row>
                  <Col>
                  <Form.Group controlId="Description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control 
                      name="description" 
                      as="textarea" 
                      rows="3"
                      defaultValue = {this.state.data.description}
                      onChange={handleChange} />
                  </Form.Group>
                  </Col>
  
              </Row>
              
              <Row>
                  
                  <Col>
                  <Form.Group controlId="date">
                      <Form.Label>Date</Form.Label>
                      <Form.Control 
                      required
                      type="date" 
                      name="date" 
                      defaultValue = {this.state.data.date}
                      onChange={handleChange}/>
                  </Form.Group>
                  </Col>
                  
                  
              </Row>
                  
                  <Row>
                      <Col>
                      <Form.Check 
                      type="checkbox"
                      id="billable"
                      name="billable"
                      label="Billable"
                      defaultChecked = {this.state.data.billable==="Yes"? true : false}
                      onChange={handleChange}
                  /><br></br>
                      </Col>
                  </Row>
          </Form>
  
            
          </Modal>
          <Modal
            title="New Expense"
            visible={this.state.expenseModal}
            onOk={() => this.handleOk('expense')}
            onCancel={() => this.handleCancel('expense')}
            afterClose={() => this.handleCancel('expense')}
            footer={[
              <Button  onClick={() => this.handleCancel('expense')}>
                Cancel
              </Button>,
              <Button type="primary" disabled = {this.state.disableExpense} onClick={() => this.handleOk('expense')}>
                Add Entry
              </Button>
            ]}
          >
              <Form 
                id='myForm'
                className="form"
                ref={ form => this.messageForm = form } >
                  <Row>
                      <Col>
                          <Form.Group controlId="quantity">
                              <Form.Label>Quantity</Form.Label>
                              <Form.Control 
                              type="number" 
                              name="qty" 
                              placeholder="1.0"
                              onChange={handleChange}/>
                          </Form.Group>
                      </Col>
                      <Col>
                          <Form.Group controlId="matter">
                              <Form.Label>Matter</Form.Label>
                              <Form.Control 
                                  as="select"
                                  name="matter" 
                                  placeholder="Matter"
                                  onChange={handleChange}>
                              <option>Select a matter</option>
                              {this.state.option}
                              </Form.Control>
                          </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                          <Form.Group controlId="Description">
                              <Form.Label>Description</Form.Label>
                              <Form.Control 
                              name="description" 
                              as="textarea" 
                              rows="3"
                              placeholder="Description"
                              onChange={handleChange} />
                          </Form.Group>
                      </Col>
                  </Row>
                  
                  <Row>
                      <Col>
                          <Form.Group controlId="rate">
                              <Form.Label>Rate</Form.Label>
                              <Form.Control 
                              required
                              type="number" 
                              name="rate" 
                              placeholder="0.0 /h"
                              onChange={handleChange} />
                          </Form.Group>
                      </Col>
                      <Col>
                          <Form.Group controlId="date">
                              <Form.Label>Date</Form.Label>
                              <Form.Control 
                              required
                              type="date" 
                              name="date" 
                              placeholder="Date" 
                              onChange={handleChange}/>
                          </Form.Group>
                      </Col>
                  </Row>
                  
                      {
                          /*
                              <Form.Group controlId="invoiceStatus">
                      <Form.Label>Invoice Status</Form.Label>
                      <Form.Control 
                          as="select"
                          name="invoiceStatus"
                          onChange={handleChange} >
                      <option>Unbilled</option>
                      <option>Billed</option>
                      </Form.Control>
                  </Form.Group>
                          */
                      }
                
                  
                
                  <Form.Check 
                        type="checkbox"
                        id="billable"
                        name="billable"
                        label="Billable"
                        onChange={handleChange}
                    /><br></br>
              
                      {
                          /*
                          <Form.Check 
                        type="checkbox"
                        id="nonBillable"
                        name="nonBillable"
                        label="Non-billable"
                        defaultChecked = {!this.props.record.billable}
                        onChange={handleChange}
                    />
                          */
                      }
                    
  
            </Form>
  
          </Modal>
          <Modal
            title="Edit Expense"
            visible={this.state.EditExpense}
            onOk={() => this.handleOk('expense')}
            onCancel={() => this.handleCancel('expense')}
            afterClose={() => this.handleCancel('expense')}
            footer={[
              <Button  onClick={() => this.handleCancel('expense')}>
                Cancel
              </Button>,
              <Button type="primary" disabled = {this.state.disableExpense} onClick={() => this.handleOk('expense')}>
                Update Entry
              </Button>,
            ]}
          >
            <Form  id='myForm'
            className="form"
            ref={ form => this.messageForm = form }>
          <Row>
              <Col>
                  <Form.Group controlId="quantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control 
                      type="number" 
                      name="qty" 
                      defaultValue = {this.state.data.qty}
                      onChange={handleChange}/>
                  </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="matter">
                                      <Form.Label>Matter</Form.Label>
                                      <Form.Control 
                                          as="select"
                                          name="matter" 
                                          value = {this.state.data.matter ? this.state.data.matter.matterDescription : ""}
                                          onChange={handleChange}>
                                      <option>Select a matter</option>
                                      {this.state.option}
                                      </Form.Control>
                                  </Form.Group>
              </Col>
      </Row>
      <Row>
          <Col>
          <Form.Group controlId="Description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                  name="description" 
                  as="textarea" 
                  rows="3"
                  defaultValue = {this.state.data.description}
                  onChange={handleChange} />
              </Form.Group>
          </Col>
      </Row>
      <Row>
          <Col>
              <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control 
                  required
                  type="date" 
                  name="date" 
                  defaultValue = {this.state.data.date}
                  onChange={handleChange}/>
              </Form.Group>
          </Col>
          <Col>
              <Form.Group controlId="rate">
                  <Form.Label>Rate</Form.Label>
                  <Form.Control 
                  required
                  type="number" 
                  name="rate" 
                  defaultValue = {this.state.data.rate}
                  onChange={handleChange} />
              </Form.Group>
          </Col>
      </Row>
             <Form.Check 
                 type="checkbox"
                 id="billable"
                 name="billable"
                 label="Billable"
                 defaultChecked = {this.state.data.billable==="Yes"? true : false}
                 onChange={handleChange}
             /><br></br>
      
            
            
      
      </Form>
      
          </Modal>
        </div>
     
        </Spin>
         );
    }
  }
  
  const mapStateToProps = (state) => ({
    userId: state.user.token.user._id,
  });
  
  export default connect(mapStateToProps)(Activity);
  