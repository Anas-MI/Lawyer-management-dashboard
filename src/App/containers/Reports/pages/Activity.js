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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Form, Col, Row } from 'react-bootstrap';
import api from '../../../../resources/api';
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
                matter: "",
                billed: false
            },
            loading: true,
            timeData: [],
            expenseData: [],
            completeData: [],
            tableData: [],
            editTime: false,
            EditExpense: false,
            record: '',
            touched: true,
            disabletime: false,
            disableExpense: false,
            today: []
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
            seconds = "0" + seconds
        }
        //   const Seconds = time % 60;
        const data = this.state.data;
        data.time = hours + ':' + minutes + ':' + seconds
        this.setState({ data: data });
    }
    componentDidMount() {

        api.get('/matter/viewforuser/' + this.props.userId).then((res) => {
            matters = res;
            option = res.data.data.map((val, index) => {
                return <option key={index} value={val.matterDescription}>{val.matterDescription}</option>
            })
        }).then(() => {
            this.setState({ option: option })
        })
        api.get('/activity/viewforuser/' + this.props.userId).then((res) => {
            console.log(res)
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
                    qty: val.type === 'time' ? val.time : val.qty,
                    time: val.time ? val.time : '',
                    matter: val.matter ? val.matter : '-',
                    description: val.description ? val.description : '-',
                    rate: val.rate,
                    billable: val.billable ? 'Yes' : 'No',
                    date: val.date.substring(0, 10),
                    invoiceStatus: val.billed ? "Billed" : 'Unbilled',
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
                loading: false
            });
        });

        this.setTimer()

    }
    render() {
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
                        disableExpense: false,
                        disabletime: false
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
            {/*
        title: 'Edit',
        dataIndex: 'edit',
        key: '_id',
        render: (_, record) => {
          return (
            <Button variant="danger" onClick={() => handleEdit(record)}>
              Edit
            </Button>
          );
        },*/
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
            <Spin size="large" spinning={this.state.loading}>
                <div>
                    <div className="d-flex mb-2 title-component-header">
                        <div className="title-header-name">
                            <h5>Activities</h5>
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
                            <div className="mb-2" style={{ "margin-top": "1rem" }}>
                                <Button onClick={() => setTableData('all')}>All</Button>
                                <Button onClick={() => setTableData('time')}>Time</Button>
                                <Button onClick={() => setTableData('expense')}>Expense</Button>
                            </div>
                            <Form className="pt-0">
                                <Form.Row className="ml-1 date-activity-res">
                                    <Form.Group controlId="From" className="mr-2" style={{ "display": "flex", "flex-direction": "column" }}>
                                        <Form.Label style={{ marginBottom: "0px" }}>From</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="date"
                                            name="From"
                                            onChange={handleCustomSorting}
                                            style={{ width: '175px' }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="To" style={{ "display": "flex", "flex-direction": "column" }}>
                                        <Form.Label style={{ marginBottom: "0px" }}>To</Form.Label>
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
                </div>

            </Spin>
        );
    }
}

const mapStateToProps = (state) => ({
    userId: state.user.token.user._id,
});

export default connect(mapStateToProps)(Activity);
