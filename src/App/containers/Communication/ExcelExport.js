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
              <th>Hours</th>
              <th>type</th>
              <th>Time</th>
              <th>Date</th>
              <th>Subject</th>
              <th>Matter</th>
              <th>from</th>
              <th>to</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataSource.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.addTime}</td>
                  <td>{value.logType}</td>
                  <td>{value.time}</td>
                  <td>{value.date}</td>
                  <td>{ value.subject }</td>
                  <td>{value.matter}</td>
                  <td>{value.from}</td>
                  <td>{value.to}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ReactHTMLTableToExcel
          className="btn btn-outline-primary btn-sm ml-auto"
          table="matter"
          filename="Communications"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>
    );
  }
}

export default ExportExcel;
