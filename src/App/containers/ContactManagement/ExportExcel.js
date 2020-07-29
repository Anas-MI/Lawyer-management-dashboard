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
              <th>S.No</th>
              <th>Name</th>
              <th>Email Address</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataSource.map((p, index) => {
              
              return (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>{p.firstName}</td>
                  <td>{p.emailAddress.map((value) => {
                    console.log(value)
                        return value;
                      })}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ReactHTMLTableToExcel
          className="btn btn-outline-primary btn-sm ml-auto"
          table="emp"
          filename="contacts"
          sheet="Sheet"
          buttonText="Export to Excel"
        />
      </div>
    );
  }
}

export default ExportExcel;
