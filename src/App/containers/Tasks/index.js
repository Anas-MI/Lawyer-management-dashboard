import { Tabs } from 'antd';
import React from "react";
import UnpcomingTasks from './UpcomingTasks/upcomingTasks'
import CompletedTask from './CompletedTasks/CompletedTasks'
import List from './List/List'
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Tasks = () => (
  <Tabs defaultActiveKey="1" onChange={callback} className="card p-4">
    <TabPane tab="Upcoming Tasks" key="1">
      <UnpcomingTasks></UnpcomingTasks>
    </TabPane>
    <TabPane tab="Completed Tasks" key="2">
      <CompletedTask></CompletedTask>
    </TabPane>
    <TabPane tab="List" key="3">
      <List></List>
    </TabPane>
  </Tabs>
);

export default Tasks