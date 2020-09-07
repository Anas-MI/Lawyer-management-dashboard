import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../resources/api';
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
    pdf.addPage(
      canvas,

      function () {
        pdf.save('invoice.pdf');
      }
    );
  };
  /*
  const street = props.location.state.clientData.address.street 
  ? props.location.state.clientData.address.street 
  : "" 

const city =   props.location.state.clientData.address.city 
  ? props.location.state.clientData.address.city 
  : "" 

const state =   props.location.state.clientData.address.state 
  ?
  props.location.state.clientData.address.state
  : 
  "" 

const zipCode = props.location.state.clientData.address.zipCode 
  ?
  props.location.state.clientData.address.zipCode
  : 
  "" 
  + " "
const country =  props.location.state.clientData.address.country 
  ?
  props.location.state.clientData.address.country
  : 
  "" 
*/

  const invoiceForm = () => (
    
    <Card  bodyStyle={{"padding": "30px"}} className="mb-3">
    <div id="canvas" className="text-center P-3">
        {
/* 
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
*/
        }
        

      <div className="text-right">
        <h5 className="font-weight-bold">INVOICE</h5>
        <div>
          <div>Invoice #</div>
          <div>Date : {props.location.state.date}</div>
          <div>Approved : {props.location.state.requestGranted}</div>
        </div>
      </div>
      <div className="float-left text-left">
        <div><h3 style={{fontWeight : "bold"}}>{props.location.state.name} </h3></div>
      
        <div>
          <span style={{fontWeight : "bold"}}>{props.location.state.userId.emailAddress}</span><br></br>
        </div>
  
        
        <br></br>
      <br></br>
      </div>
      <div className="my-5 py-5">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Reqest Type</th>
              <th scope="col">Approve status</th>
              <th scope="col">Amount</th>
              <th scope="col">Request Date</th>
            </tr>
          </thead>
          <tbody>
            
              <tr >
                <th scope="row">{props.location.state.subscriptionRequested}</th>
                <td>{props.location.state.requestGranted}</td>
                <td>{props.location.state.subscriptionRequested === "monthly" ? "$100" : "$1200" }</td>
                <td>{props.location.state.date}</td>
              </tr>
         
          </tbody>
        </table>
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
