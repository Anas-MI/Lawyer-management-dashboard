import { Tabs, Table } from 'antd';
import React, { useState } from 'react';
const { TabPane } = Tabs;

const UpcomingTasks = (props) => {
  var now = new Date();
 // var start_of_week = new Date(now.setDate(now.getDate() - now.getDay()));
  var start_of_week= now
  var end_of_week = new Date(
    now.getTime() + (6 - now.getDay()) * 24 * 60 * 60 * 1000
  );
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1);
  console.log( " tommorow :" + tomorrow )
  console.log(  " today : " + now)
  if (props.tableData !== undefined && props.tableData.length !== 0) {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="All" key="1">
          <Table dataSource={props.tableData} columns={props.columns} />
        </TabPane>
        <TabPane tab="Due Today" key="3">
          <Table
            dataSource={props.tableData.filter((item) => {
              var date = new Date(Date.parse(item.dueDate));
              return (
                date.getDate() === now.getDate() &&
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
              );
            })}
            columns={props.columns}
          />
        </TabPane>
        <TabPane tab="Due this Week" key="2">
          <Table
            dataSource={props.tableData.filter((item) => {
              var date = new Date(Date.parse(item.dueDate));
              return date < end_of_week && date > start_of_week || (date.getDate() === now.getDate() &&
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear());
            })}
            columns={props.columns}
          />
        </TabPane>

        <TabPane tab="Due Tomorow" key="4">
          <Table
            dataSource={props.tableData.filter((item) => {
              var date = new Date(Date.parse(item.dueDate));
              return (
                date.getDate() === tomorrow.getDate() &&
                date.getMonth() === tomorrow.getMonth() &&
                date.getFullYear() === tomorrow.getFullYear()
              );
            })}
            columns={props.columns}
          />
        </TabPane>
        <TabPane tab="Overdue" key="5">
          <Table
            dataSource={props.tableData.filter((item) => {
              var date = new Date(Date.parse(item.dueDate));
              return date <= yesterday
            })}
            columns={props.columns}
          />
        </TabPane>
      </Tabs>
    );
  }
  return <div></div>;
};

export default UpcomingTasks;
