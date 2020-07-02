
import React from 'react'


class Content extends React.Component {
  constructor(props){
  super(props)
  }
  render() {
    const tableData = this.props.tableData 
    return (
      <div>
         <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Discription</th>
              <th scope="col">Task</th>
              <th scope="col">Matter</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
      </table>
      </div>     
    )
  }
}

export default Content 
