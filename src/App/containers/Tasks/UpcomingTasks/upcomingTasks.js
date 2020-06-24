import { Tabs } from 'antd';
import React from "react";
import Content from  './ListContent/Content'
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const UpcomingTasks = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="All" key="1">
     <Content></Content>
    </TabPane>
    <TabPane tab="Due this Week" key="2">
      <Content></Content>
    </TabPane>
    <TabPane tab="Due Today" key="3">
      <Content></Content>
    </TabPane>
    <TabPane tab="Due Tomorow" key="4">
      <Content></Content>
    </TabPane>
    <TabPane tab="Overdue" key="5">
      <Content></Content>
    </TabPane>
  </Tabs>
);

export default UpcomingTasks