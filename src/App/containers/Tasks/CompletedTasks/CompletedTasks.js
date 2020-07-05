import React from 'react'
//import Content from './Content/Content'

function CompletedTask(props){
    const tableData = props.tableData 
    return <div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Discription</th>
          <th scope="col">Task</th>
          <th scope="col">Matter</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {tableData}
      </tbody>
  </table>
  </div>     
    

}
export default CompletedTask
