import React from 'react'
import { Card, Form } from 'react-bootstrap'
import {Button , Table , notification, Popconfirm, Modal} from 'antd'
import {connect} from 'react-redux'
import api from '../../../../resources/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas'
import ReactToPdf from "react-to-pdf";

let activity = {

}
class CreateBill extends React.Component{
  constructor(){
    super()
  //  this.divRef = React.createRef();
    this.state = {     
            data : { 
                billable : false,
                qty : "1.0",
                date : "",
                rate : "",
                invoice : "Unbilled",
            },
            dates : {
                issueDate : "",
                dueDate : ""
            },
            tableData : [],
            record : "",
            name : "",
            Matter : "",
            LName : "",
            touched : true,
            selected : [],
            visible : false,
            disable : false,
            invoice : {},
            invoiceId : 0
    }
  }
    componentDidMount(){
      let invoiceId = 0
      api.get('/billing/bill/showall').then((res)=>{
        console.log(res)
        invoiceId  = res.data.data.length + 1
        this.setState({invoiceId : res.data.data.length + 1})

        api.get('/activity/viewforbill/' + this.props.userId).then((res) => {
          console.log(res)
          let tableData = []
          let selected = []
          let sel = 0
          if(res.data.c !== undefined){
            Object.keys(res.data.c).map(function(key, index) {
              let val = res.data.c[key][0]
              
              let temp = {
                key: sel,
                total : 0,
                index : index,
                type: val.type,
                invoiceId : invoiceId + 1 ,
                hours : val.type === 'time' ? val.time : val.qty,
                client : val.matter ? val.matter.client.firstName + " " + val.matter.client.lastName : "-" ,
                clientId :  val.matter ? val.matter.client._id : "" ,
                emailAddress : val.matter ? val.matter.client.emailAddress[0].emailAddress : "",
                matter : val.matter._id,
                matterDescription : val.matter.matterDescription,
                rate: val.rate,
                billable: val.billable ? 'Yes' : 'No',
                invoiceStatus: 'Unbilled',
                trustAmount : "$0.00",
                activity : []
              }
             
              
              res.data.c[key].map((activity , i)=>{
                temp.activity.push(activity._id)
                let sHours = ""
                let sMinutes = ""
                let sSecs = ""
                let rate = parseFloat(activity.rate)
                if(activity.billed == false && activity.billable == true){
                     
                    
                      if(activity.type === "time" && activity.time != undefined ){ 
                        sHours = parseInt(activity.time.split(':')[0])
                        sMinutes = parseInt(activity.time.split(':')[1])
                        sSecs = parseInt(activity.time.split(':')[2])
                      }
                      let amount =  activity.type === 'time' ? rate * sHours + ((rate/60)*sMinutes) + ((rate/3600)*sSecs): rate * parseInt(activity.qty)
                      temp.total = parseFloat(temp.total) + parseFloat(amount)
                      temp.total = temp.total.toFixed('2')
                   }
   
              })
              if(temp.total != 0){
                selected.push(false)
                invoiceId++
                sel++
                tableData.push(temp)
              }   
          })
          }
          this.setState({
            tableData
          })
          console.log(tableData)
        })
        
      })
      
      const time = window.localStorage.getItem('timer');
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor(time / 60);
      if (minutes >= 59) {
        minutes = minutes % 60;
      }
  
      //   const Seconds = time % 60;
      const data = this.state.data;
      data.time = hours + ':' + minutes;
      this.setState({ data: data, touched: true });
      console.log(this.state);
    }
    render(){
      
        const handelAction = (record) => {
          console.log(record.key)
          let selectedActivities = this.state.selected
          selectedActivities[record.key] = !selectedActivities[record.key]
          this.setState({
            selected : selectedActivities
          })
          console.log(this.state.selected)
        }

        const column = [
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (_, record) => {
                  return (
                    <Form.Check type="checkbox" onChange={()=>handelAction(record)}  />
                   
                  );
                },
              },
            {
                title : "Client",
                dataIndex : "client",
                key :"client"
            },
            {
                title : "Unbilled hours",
                dataIndex : "hours",
                key :"hours"
            },
            {
                title : "Amount Due",
                dataIndex : "total",
                key :"total"
            },
            /*
            {
                title : "Amount in trust",
                dataIndex : "trustAmount",
                key :"trustAmount"
            }
            */
        ]

        const handleCancel = ( ) =>{
          this.setState({visible: false})
        }

        const handleChange = (e) =>{
          const { value, name } = e.target
          let dates = this.state.dates
          dates[name] = value
          this.setState({
            dates : dates
          })

        }
        const handleModal = ( ) => {
          notification.destroy()
          let billSelected = []
            this.state.tableData.map((item, index)=>{
             if( this.state.selected[index] ){
                billSelected.push(item)
             }
            })

          if(billSelected.length == 0){
            notification.warning({message : "Please select a activity to bill"})
          }else{
            this.setState({visible: true})
          }
        }
        
        const uploadInvoice = () => {
        console.log("pdf")
        var canvas = document.getElementById('canvas');
        var pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addHTML(
          canvas,
          function () {
            pdf.save('invoice.pdf')
            }
        );
         /*
            const input = document.getElementById('divToPrint');
            html2canvas(input)
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF();
            //  const imgProps= pdf.getImageProperties(imgData);
           //   const pdfWidth = pdf.internal.pageSize.getWidth() ;
            //  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
              pdf.addImage(imgData, 'PNG', 0, 0);
              pdf.save('Invoice.pdf');
         
              var docFormData = new FormData();
              docFormData.set('image', pdf);
              api
              .post('/footer/upload', docFormData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              })
              .then((response)=>{
                console.log(response)
                notification.success({message : "Invoice uploaded"})
                return response.data.message
              }).catch((err)=>{
                console.log(err)
                notification.warning({message : "Cannot upload invoice, Please try again later"})
                return ""
              })

            });
            */
        }
        const handleSubmit = ( ) =>{
          
         notification.destroy()
          let valid = true
          
          if(this.state.dates.issueDate === ""){
            valid = false
            notification.warning({message : "Please select a issue date."})
          }else
          if(this.state.dates.dueDate === ""){
            valid = false
            notification.warning({message : "Please select a due date."})
          }

          if(valid){
            this.setState({
              disable : true
            })
            
            let billSelected = []
            this.state.tableData.map((item, index)=>{
             if( this.state.selected[index] ){
                billSelected.push(item)
             }
            })

           billSelected.map((value, index)=>{
            this.setState({
              invoice : value
            })
            setTimeout(async() => {
              const url = await uploadInvoice()
            console.log(url)
            const data = {
              userId : this.props.userId,
              status : "draft",
              invoiceId: value.invoiceId,
              name : value.client,
              client : value.clientId,
            //  billUrl : url,
              matter : value.matter ,
              issueDate : this.state.dates.issueDate,
              dueDate : this.state.dates.dueDate,
              balance : value.total,
            //  from : thisMatter.data.data.client ,
            //  to : this.state.to         
            }
            console.log(data)
            api.post('/billing/bill/create', data).then((res=>{
              value.billed = true
              console.log(res)
               
             value.activity.map((item)=>{
              api
              .post('/activity/edit/' + item, value )
              .then((activity) => {
                console.log(activity)
                this.setState({
                  disableExpense : false,
                  disabletime : false
                })
               
              })
             })
              
              notification.success({message : "Bill Generated!"})
              this.setState({
                visible : false,
                disable: false
              })
              this.props.history.goBack()
            })).catch((err)=>{
              notification.error({message : "Failure"})
            })
            }, 1000);
           })          
          }
        }
        return <div>
          <Card id = "canvas" bodyStyle={{"padding": "100px"}} className="mb-3">
                <div id="divToPrint"  className="text-center P-3">
                  <div className="text-right">
                    {
                      console.log("invoice", this.state.invoice)
                    }
                    <h5 className="font-weight-bold">INVOICE</h5>
                    <div>
                      <div>Invoice #{this.state.invoice.invoiceId}</div>
                      <div>Date : {this.state.dates.issueDate}</div>
                    </div>
                  </div>
                  <div className="float-left text-left">
                    <div><h3 style={{fontWeight : "bold"}}>{this.state.invoice.client} </h3></div>              
                    <div>
                      <span style={{fontWeight : "bold"}}>{this.state.invoice.emailAddress}</span><br></br>
                    </div>             
                    <br></br>
                  <br></br>
                  </div>
                  <div className="my-5 py-5">
                    <table class="table">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col">Issue Date</th>
                          <th scope="col">Due Date</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Matter</th>
                        </tr>
                      </thead>
                      <tbody>        
                          <tr >
                            <th scope="row">{this.state.dates.issueDate}</th>
                            <td>{this.state.dates.dueDate}</td>
                            <td>{this.state.invoice.total}</td>
                            <td>{this.state.invoice.matterDescription}</td>
                          </tr>            
                      </tbody>
                    </table>
                  </div>
                </div>
            </Card>
                <Card style={{widht : "110%"}}>
                    <Card.Header>
                        <Button type="link" onClick={()=>{this.props.history.goBack()}}>Back to bills</Button>
                    </Card.Header>
                </Card>
                <Card>
                    <Card.Header>
                        <h4>
                        Select billable clients to generate new bills
                        </h4>
                    </Card.Header>
                    
                    <Card.Footer>
                         <Table className="table-responsive" dataSource={this.state.tableData} columns={column}></Table>
                    </Card.Footer>
                </Card>
                <Button type="primary" onClick={handleModal}>Generate</Button>
                <Modal
                  title="Add details"
                  visible={this.state.visible}
                  onOk={handleSubmit}
                  onCancel={handleCancel}
                  afterClose={handleCancel}
                  footer={[
                    <Button  onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button type="primary" 
                    disabled = {this.state.disable} 
                    onClick={handleSubmit}>
                      Submit
                    </Button>,
                  ]}
                >
                      <Form 
                      id='myForm'
                      className="form"
                      ref={ form => this.messageForm = form } >
                         <Form.Group controlId="issueDate">
                              <Form.Label>Issue Date</Form.Label>
                              <Form.Control 
                              required
                              type="date" 
                              name="issueDate" 
                              defaultValue = {this.state.dates.issueDate}
                              onChange={handleChange}/>
                          </Form.Group>
                        <Form.Group controlId="dueDate">
                              <Form.Label>Due Date</Form.Label>
                              <Form.Control 
                              required
                              type="date" 
                              name="dueDate" 
                              placeholder = "Select a date" 
                              onChange={handleChange}/>
                          </Form.Group>
                    </Form>

                </Modal>

            </div>
    }
}

const mapStateToProps = state => ({
  userId: state.user.token.user._id
});

export default connect(mapStateToProps)(CreateBill)