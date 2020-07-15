import React from 'react';
import jsPDF from 'jspdf';
import { Button } from 'antd';
import 'jspdf-autotable';
import ReactDOMServer from 'react-dom/server';

import html2pdf from 'simple-html2pdf';
//let invoiceData = { id , date , status}
// companyData ={ name, address , phone , email}
//userData = { name,address}
//billData =[]

const Invoice = (props) => {
  const exportPDF = () => {
    var canvas = document.getElementById('canvas');
    var pdf = new jsPDF('p', 'mm', 'a4');
    // pdf.html(canvas, {
    //   callback: function () {
    //     pdf.save('testing.pdf');
    //     window.open(pdf.output('bloburl')); // to debug
    //   },
    // });
    // pdf.save('test.pdf');

    pdf.addHTML(
      canvas,

      function () {
        pdf.save('invoice.pdf');
      }
    );
  };

  const invoiceForm = () => (
    <div id="canvas" className="container px-5 col text-center">
      <h6 className="text-right pb-3">
        Invoice #{props.invoiceData.id} - {props.invoiceData.date}
      </h6>

      <div>
        <img
          src={props.companyData.logo}
          alt="companyLogo"
          style={{ width: '200px' }}
        />
        <h3 className="font-weight-bold">{props.companyData.name}</h3>
        <div>{props.companyData.address}</div>
        <div>Phone : {props.companyData.phone}</div>
        <div>Email : {props.companyData.email}</div>
      </div>

      <div className="text-right">
        <h5 className="font-weight-bold">INVOICE</h5>
        <div>
          <div>Invoice #{props.invoiceData.id}</div>
          <div>Date : {props.invoiceData.date}</div>
          <div>{props.invoiceData.status}</div>
        </div>
      </div>
      <div className="float-left text-left">
        <div>{props.clientData.name}</div>
        <div>{props.clientData.address}</div>
      </div>
      <div className="my-5 py-5">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Attorney</th>
              <th scope="col">Notes</th>
              <th scope="col">Rate</th>
              <th scope="col">Hours</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {props.billData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.date}</th>
                <td>{item.attorney}</td>
                <td>{item.notes}</td>
                <td>&#8377;{item.rate}</td>
                <td>{item.hours}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      {invoiceForm()}
      <Button className="ml-auto " type="primary" onClick={exportPDF}>
        Print
      </Button>
    </div>
  );
};
export default Invoice;
//Example use case
// {/* <Invoice
//               invoiceData={{ id: '644', status: 'due', date: '24/6/20' }}
//               companyData={{
//                 logo: 'https://uilogos.co/img/logotype/hexa.png',
//                 name: 'ABC Company',
//                 address: '4354  Settlers Lane, New York',
//                 phone: '917-821-3450',
//                 email: 'w9lk6p927j@temporary-mail.net',
//               }}
//               clientData={{
//                 name: 'M Salamanca',
//                 address: '4354  Settlers Lane, New York',
//               }}
//               billData={[
//                 {
//                   date: '12/12/12',
//                   attorney: 'AB',
//                   notes: 'dumpy data 1',
//                   rate: '21',
//                   hours: '1.4',
//                   total: '16',
//                 },
//                 {
//                   date: '12/12/12',
//                   attorney: 'AB',
//                   notes: 'dumpy data 2',
//                   rate: '120',
//                   hours: '1',
//                   total: '17',
//                 },
//                 {
//                   date: '12/12/20',
//                   attorney: 'AB',
//                   notes: 'dumpy data 3',
//                   rate: '120',
//                   hours: '1',
//                   total: '12',
//                 },
//               ]}
//             /> */}
