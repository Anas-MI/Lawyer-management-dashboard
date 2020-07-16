import React from 'react';
import jsPDF from 'jspdf';
import {Card, Button } from 'antd';
import 'jspdf-autotable';
import ReactDOMServer from 'react-dom/server';

import html2pdf from 'simple-html2pdf';

//let invoiceData = { id , date , status}
// companyData ={ name, address , phone , email}
//userData = { name,address}
//billData =[]

const Invoice = (props) => {
  console.log(props)
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
    
    <Card  bodyStyle={{"padding": "30px"}} className="mb-3">
    <div id="canvas" className="text-center P-3">
      <h6 className="text-right pb-3">
        Invoice #{props.location.state.invoiceData.id} - {props.location.state.invoiceData.date}
      </h6>

      <div>
        <img
          src={props.location.state.companyData.logo}
          alt="companyLogo"
          style={{ width: '200px' }}
        />
        <h3 className="font-weight-bold">{props.location.state.companyData.name}</h3>
        <div>{props.location.state.companyData.address}</div>
        <div>Phone : {props.location.state.companyData.phone}</div>
        <div>Email : {props.location.state.companyData.email}</div>
      </div>

      <div className="text-right">
        <h5 className="font-weight-bold">INVOICE</h5>
        <div>
          <div>Invoice #{props.location.state.invoiceData.id}</div>
          <div>Date : {props.location.state.invoiceData.date}</div>
          <div>{props.location.state.invoiceData.status}</div>
        </div>
      </div>
      <div className="float-left text-left">
        <div>{props.location.state.clientData.name}</div>
        <div>{props.location.state.clientData.address}</div>
      </div>
      <div className="my-5 py-5">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Qty</th>
              <th scope="col">Description</th>
              <th scope="col">Rate</th>
              <th scope="col">Sub total</th>
            </tr>
          </thead>
          <tbody>
            {props.location.state.timeData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.date}</th>
                <td>{item.qty}</td>
                <td>{item.description}</td>
                <td>&#8377;{item.rate}</td>
                <td>{item.subTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-5 py-5">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Duration</th>
              <th scope="col">Description</th>
              <th scope="col">Rate</th>
              <th scope="col">Sub total</th>
            </tr>
          </thead>
          <tbody>
            {props.location.state.expenseData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{item.date}</th>
                <td>{item.time}</td>
                <td>{item.description}</td>
                <td>&#8377;{item.rate}</td>
                <td>{item.subTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br><br></br>
            <h4>Total Amount : {props.location.state.Total.toFixed(2)}</h4>
      </div>
    </div>
    </Card>
  );

  return (
    <div>
      {invoiceForm()}
      <Button className="ml-auto " type="primary" onClick={exportPDF}>
        Download PDF
      </Button>
    </div>
  );
};
export default Invoice;
//Example use case
