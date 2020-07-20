import { Tabs, Table } from 'antd';
import React from 'react';
const { TabPane } = Tabs;

const UpcomingTasks = (props) => {
  var now = new Date();
  var date = props.tableData;
  console.log(date);

  return (
    <Tabs defaultActiveKey="1">
      {console.log(now.getDate())}
      <TabPane tab="All" key="1">
        <Table dataSource={props.tableData} columns={props.columns} />
      </TabPane>
      <TabPane tab="Due Today" key="3">
        <Table dataSource={props.tableData} columns={props.columns} />
      </TabPane>
      <TabPane tab="Due this Week" key="2">
        <Table dataSource={props.tableData} columns={props.columns} />
      </TabPane>

      <TabPane tab="Due Tomorow" key="4">
        <Table dataSource={props.tableData} columns={props.columns} />
      </TabPane>
      <TabPane tab="Overdue" key="5">
        <Table dataSource={props.tableData} columns={props.columns} />
      </TabPane>
    </Tabs>
  );
};

export default UpcomingTasks;
