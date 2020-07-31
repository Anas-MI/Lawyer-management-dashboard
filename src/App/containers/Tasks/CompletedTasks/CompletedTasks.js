import React, {useState, useEffect} from 'react';
//import Content from './Content/Content'
import { Table } from 'antd';
import api from '../../../../resources/api';
function CompletedTask(props) {

  const [state, setState] = useState([])
 /*
  useEffect(() => {
    api.get('/tasks/showall')
    .then((res)=> {
      console.log(res.data.data) 
      const newdata = res.data.data.filter(function( obj ) {
          return obj.status == true;
        });
      setState([...state, ...newdata])
    })
  }, []);
  */

  return (
    <div>
      <Table columns={props.columns} dataSource={props.tableData} />
    </div>
  );
}
export default CompletedTask;
