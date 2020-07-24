import React from 'react'
import { Table , Button, Modal , Card, notification, Space, Popconfirm } from 'antd'
import { useSelector , connect} from 'react-redux'
import AddressForm from './AddressForm/Form'
import ExpenseForm from '../../Activities/Form/expenseForm'
import TimeForm from '../../Activities/Form/timeForm'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Form, Col,Row } from 'react-bootstrap'
import api from '../../../../resources/api'


let matters = {}
let thisMatter = {}
let activity = {}
let timeError = ""
class Activity extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            expenseModal : false,
            timeModal : false,
            data : { 
                billable : false,
                qty : "1.0",
                date : "",
                rate : "",
                invoice : "Unbilled",

            },
            to : {
              type : "Work"
            },
            issueDate : new Date(),
            dueDate : "",
            timeData : [],
            expenseData : [],
            completeData : [],
            tableData : [],
            editmode : false,
            record : "",
            name : "",
            address : {
              city : "",
              state : "",
              zipCode : "",
              street: ""
            },
            Matter : "",
            LName : "",
            invoiceId : ""

        }
    }
    convertTime=(serverdate)=>{
      var date = new Date(serverdate);
      // convert to utc time
      var toutc = date.toUTCString();
      //convert to local time
      var locdat = new Date(toutc + " UTC");
      return locdat;
    }
    componentDidMount(){
   
      api.get('/matter/viewforuser/'+ this.props.userId).then((res)=>{
        matters = res 
      
      })
      api.get('/billing/bill/viewforuser/'+this.props.userId).then((res)=>{
        console.log()
        this.setState({invoiceId : res.data.data.length + 1})
      })
      api.get('/activity/viewformatter/'+this.props.userId+'/'+ this.props.location.state).then((res)=>{
        activity = res.data.data
        
        api.get('/matter/view/' + this.props.location.state).then((res) => {
          thisMatter = res
          const name = res.data.data.client.firstName + " " + res.data.data.client.lastName
          const address = res.data.data.client.address[0] ? res.data.data.client.address[0] : ""
          const matter = res.data.data.matterDescription
          this.setState({name  : name , address : address, matter : matter})
          
        });
      
     
        let timedata = []
        let expenseData = []
  
        let total = 0;
        res.data.data.map((val, index)=>{
     
            let rate = val.rate
            if(rate.includes("$")){
              rate = rate.substring(0, rate.length - 1)
            }
           if(val.type === "time" && val.time !=undefined ){
           
            const sHours = val.time.split(':')[0];
            const sMinutes = val.time.split(':')[1];
          

            const time = {
                id : val._id,
                time : val.time ? val.time : "",
                matter : val.matter ? val.matter : "-",
                description : val.description? val.description : "-",
                rate : rate, 
                billable : val.billable ? "Yes" : "No" ,
                date : val.date.substring(0,10),
                invoiceStatus : val.invoiceStatus?  val.invoiceStatus : "-" ,
                subTotal : (rate * sHours + ((rate/60)*sMinutes)).toFixed(2)
           }
           total = total + rate * sHours + ((rate/60)*sMinutes)
           timedata.push(time)
        }
           
            if(val.type ==="expense"){
                const expense = {
                    id : val._id,
                    qty : val.qty,
                    matter : val.matter ? val.matter : "-",
                    description : val.description? val.description : "-",
                    rate : val.rate, 
                    billable : val.billable ? "Yes" : "No" ,
                    date : val.date.substring(0,10),
                    invoiceStatus : val.invoiceStatus?  val.invoiceStatus : "-" ,
                    subTotal : (rate * val.qty).toFixed(2)
                  }
              total = total + rate * val.qty
              expenseData.push(expense)
            }
 

        })
        const localData = JSON.parse(window.localStorage.getItem("Case.user"))
        const Lname = localData.token.user.firstName + " " +localData.token.user.firstName
        this.setState({ expenseData : expenseData , timeData : timedata, total : total , LName : Lname })
      })
    }
    showModal = (type) => {
        if(type==="time"){
            this.setState({
                timeModal : true,
              });
        }else
        if(type==="expense"){
            this.setState({
                expenseModal : true,
              });
        }
      
      };
    
      handleOk = type => {
   
        notification.destroy()
        if(timeError !== ""){
          notification.error({message : "Invalid time"})
        }else
        if(this.state.data.date === ""){
            notification.error({message : "Please select a Date"})
        }else if(this.state.data.rate === ""){
            notification.error({message : "Please provide rate"})
        }else
        {
         
            if(type==="time"){
              let data = this.state.data
              data.type = "time"
              data.userId = this.props.userId
              api.post('/activity/create', data).then((res)=>{
           
                notification.success({message : "Time entry Added !"})
              }).catch((err)=>{
  
                notification.error({message : "Failed"})
              }).then(()=>{
                this.setState({
                  timeModal : false,
                  editmode : false,
                  data :  { 
                    billable : true,
                    nonBillable : false,
                    date : "",
                    qty : "1.0",
                    rate : "",
                    invoice : "Unbilled",
                },
                });
                setTimeout(()=>{
                    window.location.reload()
                },1500)
              })
            }else
            if(type==="expense"){
                let data = this.state.data
                data.type = "expense"
                data.userId = this.props.userId
                api.post('/activity/create', data).then((res)=>{
  
                  notification.success({message : "Expense Added !"})
                }).catch((err)=>{
   
                  notification.error({message : "Failed"})
                }).then(()=>{
                  this.setState({
                    expenseModal : false,
                    editmode : false,
                    data :  { 
                      billable : true,
                      nonBillable : false,
                      date : "",
                      qty : "1.0",
                      rate : "",
                      invoice : "Unbilled",
                  },
               
                  });
                  setTimeout(()=>{
                      window.location.reload()
                  },1500)
                })
            
          }
   

        }
             
        
      
      };
    
      handleCancel = type => {
        if(type==="time"){
            this.setState({
                timeModal : false,
                editmode : false,
                data :  { 
                  billable : true,
                  nonBillable : false,
                  date : "",
                  qty : "1.0",
                  rate : "",
                  invoice : "Unbilled",
              },
              });
            
        }else
        if(type==="expense"){
            this.setState({
                expenseModal : false,
                editmode : false,
                data :  { 
                  billable : true,
                  nonBillable : false,
                  date : "",
                  qty : "1.0",
                  rate : "",
                  invoice : "Unbilled",
              },
  
              });
     
             
        }
       
      
      };

    render(){
       
        
          const handleDelete = record => {
            api.get('/activity/delete/'+record.id).then((res)=>{

              notification.success({message : "Activity Deleted !"})
              setTimeout(()=>{
                window.location.reload()
              },1500)
            }).catch((err)=>{
  
              notification.error({message : "Failed to delete"})
            })
            
          }

          const columnsForTime = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
              },
            {
              title: 'Duration',
              dataIndex: 'time',
              key: 'time',
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Rate',
              dataIndex: 'rate',
              key: 'rate',
            },
            {
                title: 'Sub total',
                dataIndex: 'subTotal',
                key: 'subTotal',
              },
            
            
             
              
              {
                  title:'Delete',
                  dataIndex: "delete",
                  key: "_id",
                  render:(_,record)=>{
                      return (
                        <Popconfirm
                          title="Are you sure delete this task?"
                          onConfirm={()=>handleDelete(record)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button danger>
                              Delete
                          </Button>
                        </Popconfirm>
                          
                      )
                  }
              },
          ]
          const columnsForExpense = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
              },
            
            {
              title: 'Qty',
              dataIndex: 'qty',
              key: 'qty',
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Rate',
              dataIndex: 'rate',
              key: 'rate',
            },
            {
                title: 'Sub total',
                dataIndex: 'subTotal',
                key: 'subTotal',
              },
           
             
              
              {
                  title:'Delete',
                  dataIndex: "delete",
                  key: "_id",
                  render:(_,record)=>{
                      return (
                        <Popconfirm
                          title="Are you sure delete this task?"
                          onConfirm={()=>handleDelete(record)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button danger>
                              Delete
                          </Button>
                        </Popconfirm>
                          
                      )
                  }
              },
          ];;
          const exportPDF = () => {
            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "portrait"; // portrait or landscape
        
            const marginLeft = 40;
            const doc = new jsPDF(orientation, unit, size);
        
            doc.setFontSize(15);
        
            const title = "Activity";
            const headers = [["type","Qty","Description","Billable", "Rate", "Date", "Invoice Status"]];
           
            let data = []
            
            this.state.tableData.map((val, index)=>{
              const td= [val.type , val.qty, val.description , val.billable, val.rate, val.date, val.invoiceStatus]
              data.push(td)
            })
          
        
            let content = {
              startY: 50,
              head: headers,
              body: data
            };
        
            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("Activity.pdf")
          }
   
     
        const handleChange=(e)=>{
            e.persist()
            const { name, id, value , selectedIndex} = e.target
            let newData = this.state.data
            if(name==="matter"){
              if(selectedIndex >= 1){
                newData[name] = matters.data.data[selectedIndex-1]
              }else{
                newData[name] = ""
              }
              
            }else if(name==="time"){
              timeError = ""
              var timeValue = value;
              if(timeValue == "" || timeValue.indexOf(":")<0)
              {
                timeError = "Inavlid Time"
               
              }
              else
              {
                  var sHours = timeValue.split(':')[0];
                  var sMinutes = timeValue.split(':')[1];
          
                  if(sHours == "" || isNaN(sHours) /*|| parseInt(sHours)>23 */)
                  {
                    timeError = "Inavlid Time"
                
                  }
                  else if(parseInt(sHours) == 0)
                      sHours = "00";
                  else if (sHours <10)
                      sHours = "0"+sHours;
          
                  if(sMinutes == "" || isNaN(sMinutes) || parseInt(sMinutes)>59)
                  {
                    timeError = "Inavlid Time"
                  
                  }
                  else if(parseInt(sMinutes) == 0)
                      sMinutes = "00";
                  else if (sMinutes <10)
                      sMinutes = "0"+sMinutes;    
                  
                 timeValue = sHours + ":" + sMinutes;   
                    
              }
              newData[name] = timeValue
              this.setState({data : newData})
            }
           else{
                newData[name] = value
                this.setState({data : newData })   
            }

      
        }
        const invoiceProps = {
          invoiceData : { id: this.state.invoiceId, status: 'Unpaid', date: new Date().getDate() +"/"+ new Date().getMonth()+1 + "/" +  new Date().getFullYear()  , dueDate : this.state.dueDate},
          companyData: {
            logo: 'https://uilogos.co/img/logotype/hexa.png',
            name: 'ABC Company',
            address: '4354  Settlers Lane, New York',
            phone: '917-821-3450',
            email: 'w9lk6p927j@temporary-mail.net',
          },
          clientData : {
            name: this.state.name,
            address: this.state.address,
          },
          matter : this.state.matter,
          timeData: this.state.timeData,
          expenseData : this.state.expenseData,
          Total : this.state.total
        }
        const HandleAddressChange = (e) => {
        
          e.persist();
          const { id, value, name } = e.target;
    
          let newState = this.state;
          newState.to[name] = value;
          this.setState(newState);

      
        }
        const handleDateChange = (e) => {
          e.persist();
          const { id, value, name } = e.target;
    
          let newState = this.state;
          newState[name] = this.convertTime(value);
          this.setState(newState);
        }
        const handleBill = (e) =>{
            notification.destroy() 
            //

            const data = {
              userId : this.props.userId,
              status : "Unpaid",
              invoiceId: this.state.invoiceId,
              client : thisMatter.data.data.client._id,
              matter : thisMatter.data.data._id,
              issueDate : this.state.issueDate,
              dueDate : this.state.dueDate,
              balance : this.state.total ? this.state.total.toFixed(2) : "0",
              from : thisMatter.data.data.client ,
              to : this.state.to         
            }
            console.log(data)
            
            if(this.state.dueDate == ""){
              notification.error({message : "Please select a due date"})
            }else{
              api.post('/billing/bill/create', data).then((res=>{
                console.log(res)
                notification.success({message : "success"})
                this.props.history.push('/view/matter/invoice', invoiceProps)
              })).catch((err)=>{
                notification.error({message : "Failure"})
              })
            }
            
  
        }
        const today = new Date()
        const issueDate = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
        
        return <div className='p-2 '>
            
            <Card title="New Quick Bill" className="overflow-auto mb-3">
              <div className="d-flex justify-content-between">
                  <div>
                    <p><b>FROM</b></p>
                    <p style={{fontWeight : '600'}}>{this.state.LName}</p>
                 </div>
                 <div>
                    <p><b>TO</b></p>
                    <p style={{fontWeight : '600'}}>{this.state.name}</p><br/>
                    <AddressForm HandleAddressChange={HandleAddressChange} type="To"></AddressForm>            
                 </div>
                 <div>
                    <p><b>Matter</b></p>
                    <Form className="quickBill">
                     <Form.Control  type="text" placeholder="Small text" value={this.state.matter} />
                    </Form>
                    <p style={{fontWeight : '600'}}>{}</p><br/>
                 </div>
              </div>
            </Card>
            
            <Card bodyStyle={{"padding": "0px"}} className="overflow-auto  mb-3" title="Time Entries"> 
              <Table columns={columnsForTime} dataSource={this.state.timeData}  />
            </Card>
            <div className="form-add mb-4">
                <span onClick={() => this.setState({ timeModal: true })}>
                  Add Time Entry
                </span>
              </div>

            <Card bodyStyle={{"padding": "0px"}} className="overflow-auto" title="Expense Entries">                
              <Table columns={columnsForExpense} dataSource={this.state.expenseData}  />
             </Card><br></br>
             <div className="form-add mb-4">
                <span onClick={() => this.setState({ expenseModal: true })}>
                  Add Expense Entry
                </span>
              </div>

            <Card className="mb-3" >
                <div className="d-flex justify-content-between">
                  <h4><b>Bill Total : </b></h4>    
                  <h4><b>{this.state.total ? this.state.total.toFixed(2) : "0"}</b></h4>
                </div>
            </Card>
            <Card>
              <div>
                 <h4>Bill Options</h4>
                 <Form>
                    <Row>
                      {/*
                          <Col md="4">
                          <Form.Group controlId="issueDate">
                              <Form.Label>Issue Date</Form.Label>
                              <Form.Control 
                              required
                              type="date" 
                              name="issueDate" 
                              defaultValue = {issueDate} 
                              onChange={handleDateChange}/>
                          </Form.Group>
                      </Col>
*/
                      }
                      
                    </Row>
                    <Row>
                      <Col md="4">
                          <Form.Group controlId="dueDate">
                              <Form.Label>Due Date</Form.Label>
                              <Form.Control 
                              required
                              type="date" 
                              name="dueDate" 
                              placeholder = "Select a date" 
                              onChange={handleDateChange}/>
                          </Form.Group>
                      </Col>

                    </Row>
                 </Form>
              </div>
              
            </Card>

            <Button onClick={handleBill} type="primary" className="mr-2">Generate Bill</Button>
            <span>or</span>
            <Button onClick={()=>{this.props.history.goBack()}} className="ml-2">Cancel</Button>
            
            <Modal
                title="New Time Entry"
                visible={this.state.timeModal}
                onOk={()=>this.handleOk("time")}
                onCancel={()=>this.handleCancel("time")}
                afterClose = {()=>this.handleCancel("time")}
                >
                <TimeForm record={this.state.data} editmode={this.state.editmode} handleChange={handleChange}></TimeForm>
            </Modal>
            <Modal
                title="New Expense"
                visible={this.state.expenseModal}
                onOk={()=>this.handleOk("expense")}
                onCancel={()=>this.handleCancel("expense")}
                afterClose = {()=>this.handleCancel("expense")}
                >
                <ExpenseForm record={this.state.data} editmode={this.state.editmode} handleChange={handleChange}></ExpenseForm>
            </Modal>
        </div>
    }
}

const mapStateToProps = state => ({
  userId: state.user.token.user._id
});

export default connect(mapStateToProps)(Activity)