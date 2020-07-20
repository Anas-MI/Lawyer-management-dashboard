import React from 'react';
//import Content from './Content/Content'
import { Table } from 'antd';
function CompletedTask(props) {
  return (
    <div>
      <Table columns={props.columns} dataSource={props.tableData} />
    </div>
  );
}
export default CompletedTask;
