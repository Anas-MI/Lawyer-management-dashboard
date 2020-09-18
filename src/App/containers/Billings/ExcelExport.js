import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export class ExportExcel extends Component {
  constructor(props) {
    super(props);
    console.log('data in excel', props.dataSource);
  }
  
  render() {
    console.log(this.props)
    return (
      <div>
        <table id="matter" className="d-none">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Last Seen</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>ID</th>
              <th>Client</th>
              <th>Matter</th>
              <th>Issue Date</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataSource.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.lastSeen}</td>
                  <td>{value.status}</td>
                  <th>{value.dueDate}</th>
                  <th>{ value.id }</th>
                  <th>{value.client}</th>
                  <th>{value.matter}</th>
                  <th>{value.issueDate}</th>
                  <th>{value.balance}</th>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ReactHTMLTableToExcel
          className="btn btn-outline-primary btn-sm excel-button"
          table="matter"
          filename="Bills"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>
    );
  }
}

export default ExportExcel;
