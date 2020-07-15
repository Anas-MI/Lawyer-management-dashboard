import React from 'react';
import { Tabs, Card, Table, Button } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const { TabPane } = Tabs;

export default class billing extends React.Component {
  handelBills = (type) => {
    if (type === 'record') {
      this.props.history.push('/manage/billing/record');
    } else if (type === 'expense') {
    }
  };

  render() {
    const callback = () => {};
    const dataSource = [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
    ];

    const columns = [
      {
        title: 'Last Seen',
        dataIndex: 'lastSeen',
        key: 'lastSeen',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
      },
      {
        title: 'Matter',
        dataIndex: 'matter',
        key: 'matter',
      },
      {
        title: 'Issue Date',
        dataIndex: 'issueDate',
        key: 'issueDate',
      },
      {
        title: 'Balance',
        dataIndex: 'Balance',
        key: 'Balance',
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
          'Last Seen',
          'Status',
          'Due Date',
          'ID',
          'Client',
          'Matter',
          'Issue Date',
          'Balance',
        ],
      ];

      let data = [];
      /*
            state.tableData.map((val, index)=>{
              const td= [val.firstName, val.billingCustomRate , val.emailAddress]
              data.push(td)
            })
           */

      let content = {
        startY: 50,
        head: headers,
        body: data,
      };

      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save('contact.pdf');
    };

    return (
      <div className="p-2 ">
        <Card
          title="Billing"
          extra={
            <span style={{ float: 'right' }}>
              <Button className="ml-auto" color="success" onClick={exportPDF}>
                Export
              </Button>
              <Button onClick={() => this.handelBills('record')}>
                Record Payment
              </Button>
              {/*  <Button onClick={()=>this.showModal("expense")}>New Expense</Button>*/}
            </span>
          }
        >
          <Tabs defaultActiveKey="4" onChange={callback}>
            <TabPane tab="Draft" key="1">
              <Table dataSource={dataSource} columns={columns} />;
            </TabPane>
            <TabPane tab="Paid" key="2">
              <Table dataSource={dataSource} columns={columns} />;
            </TabPane>
            <TabPane tab="Unpaid" key="3">
              <Table dataSource={dataSource} columns={columns} />;
            </TabPane>
            <TabPane tab="All" key="4">
              <Table dataSource={dataSource} columns={columns} />;
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
