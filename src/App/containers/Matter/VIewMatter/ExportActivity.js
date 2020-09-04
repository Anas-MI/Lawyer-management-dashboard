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
              <th>Qty</th>
              <th>Description</th>
              <th>Billable</th>
              <th>Rate</th>
              <th>Date</th>
              <th>Invoice Status</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataSource.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.qty}</td>
                  <td>{value.description}</td>
                  <th>{value.billable}</th>
                  <th>{ value.rate }</th>
                  <th>{value.date}</th>
                  <th>{value.invoiceStatus}</th>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ReactHTMLTableToExcel
          className="btn btn-outline-primary btn-sm excel-button"
          table="matter"
          filename="Acitivity"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>
    );
  }
}

export default ExportExcel;
