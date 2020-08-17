import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Button } from 'antd';

export class ExportExcel extends Component {
  constructor(props) {
    super(props);
    console.log('data in excel', props.dataSource);
  }

  render() {
    return (
      <div>
        <table id="emp" className="d-none">
          <thead>
            <tr>
              <th>Hours</th>
              <th>Subject</th>
              <th>Note</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataSource.map((p, index) => {
              
              return (
                <tr key={index}>
                  <td>{p.hours}</td>
                  <td>{p.subject}</td>
                  <td>{p.notes}</td>
                  <td>{p.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ReactHTMLTableToExcel
          className="btn btn-outline-primary btn-sm ml-auto"
          table="emp"
          filename="Notes"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>
    );
  }
}

export default ExportExcel;
