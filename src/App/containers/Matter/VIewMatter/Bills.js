import Invoice from '../../../components/Invoice/Invoice';
import React, {useState} from 'react';
import { Card, Button, Tabs, Table, Spin } from 'antd';
import jsPDF from 'jspdf';
const { TabPane } = Tabs;

export default function Bills(props) {
  const [Loading, setLoading] = useState(false)
  const columnsForBills = [
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
  function callback(key) {
    console.log(key);
  }

  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = 'Bills';
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

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('bills.pdf');
  };
  return (
    <Spin spinning={Loading} size = "large">
      <Card
      title="Bills"
      extra={
        <span style={{ float: 'right' }}>
          <Button className="ml-auto" color="success" onClick={exportPDF}>
            Export
          </Button>
        </span>
      }
    >
      <Tabs defaultActiveKey="4" onChange={callback}>
        <TabPane tab="Draft" key="1">
          <Table
            dataSource={props.dataSource.filter(
              (item) => item.status === 'draft'
            )}
            columns={columnsForBills}
          />
        </TabPane>
        <TabPane tab="Paid" key="2">
          <Table
            dataSource={props.dataSource.filter(
              (item) => item.status === 'paid'
            )}
            columns={columnsForBills}
          />
        </TabPane>
        <TabPane tab="Unpaid" key="3">
          <Table
            dataSource={props.dataSource.filter(
              (item) => item.status === 'unpaid'
            )}
            columns={columnsForBills}
          />
        </TabPane>
        <TabPane tab="All" key="4">
          <Table dataSource={props.dataSource} columns={columnsForBills} />;
        </TabPane>
      </Tabs>
    </Card>
  
    </Spin>);
}
