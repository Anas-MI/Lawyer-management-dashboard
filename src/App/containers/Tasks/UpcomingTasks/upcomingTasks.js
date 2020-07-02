import { Tabs } from 'antd';
import React from "react";
import Content from  './ListContent/Content'
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const UpcomingTasks = (props) => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="All" key="1">
     <Content tableData={props.tableData}></Content>
    </TabPane>
    <TabPane tab="Due this Week" key="2">
      <Content tableData={props.tableData}></Content>
    </TabPane>
    <TabPane tab="Due Today" key="3">
      <Content tableData={props.tableData}></Content>
    </TabPane>
    <TabPane tab="Due Tomorow" key="4">
      <Content tableData={props.tableData}></Content>
    </TabPane>
    <TabPane tab="Overdue" key="5">
      <Content tableData={props.tableData}></Content>
    </TabPane>
  </Tabs>
);

export default UpcomingTasks
