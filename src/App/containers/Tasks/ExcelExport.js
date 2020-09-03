import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


export class ExportExcel extends Component {
  constructor(props) {
    super(props);
    console.log('data in excel', props.dataSource);
  }
  getISTDate(dateInUTC) {
    var localDate = new Date(dateInUTC);
    return localDate.toLocaleString();
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <table id="matter" className="d-none">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Matter</th>
              <th>Due Date</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataSource.map((value, index) => {
              if(value.matter){
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.taskName}</td>
                    <td>{value.description}</td>
                    <td>{value.matter.matterDescription  ? value.matter.matterDescription  : value.matter}</td>
                    <td>{value.dueDate.substring(0,10)}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        <ReactHTMLTableToExcel
          className="btn btn-outline-primary btn-sm excel-button"
          table="matter"
          filename="Task"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>
    );
  }
}

export default ExportExcel;
