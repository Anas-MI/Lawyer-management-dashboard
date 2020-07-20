import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export class ExportExcel extends Component {
  constructor(props) {
    super(props);
    console.log('data in excel', props.dataSource);
  }

  render() {
    return (
      <div>
        <table id="matter" className="d-none">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Matter</th>
              <th>Client</th>
              <th>Practice Area</th>
              <th>Open date</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataSource.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.matterDescription}</td>
                  <td>{value.Client}</td>
                  <th>{value.practiseArea?  value.practiseArea : "-"}</th>
                  <th>{ value.openDate ? value.openDate : "-"}</th>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ReactHTMLTableToExcel
          className="btn btn-outline-primary btn-sm ml-auto"
          table="matter"
          filename="matters"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>
    );
  }
}

export default ExportExcel;
