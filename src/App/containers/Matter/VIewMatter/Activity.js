import React from 'react'
import { Table , Button, Modal , Card, notification, Space, Popconfirm } from 'antd'
import { useSelector , connect} from 'react-redux'
import ExpenseForm from '../../Activities/Form/expenseForm'
import TimeForm from '../../Activities/Form/timeForm'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Form, Col,Row } from 'react-bootstrap'
import api from '../../../../resources/api'
import { add } from 'lodash'

let matters = {}
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
            touched : true

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
      api.get('/activity/viewformatter/'+this.props.userId+'/'+ this.props.id).then((res)=>{
        activity = res.data.data
        /*
        api.get('/matter/view/' + this.props.id).then((res) => {
          const name = res.data.data.client.firstName + " " + res.data.data.client.lastName
          const address = res.data.data.client.address[0] ? res.data.data.client.address[0] : ""
          const matter = res.data.data.matterDescription
          this.setState({name  : name , address : address, matter : matter})
          
        });
        */
      
     
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
            console.log(val.time)
            console.log(sHours + " " + sMinutes)

            const time = {
                id : val._id,
                time : val.time ? val.time : "",
                matter : val.matter ? val.matter : "-",
                description : val.description? val.description : "-",
                rate : rate, 
                billable : val.billable ? "Yes" : "No" ,
                date : val.date.substring(0,10),
                invoiceStatus : "Unbilled",
               // invoiceStatus : val.invoiceStatus?  val.invoiceStatus : "-" ,
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
        window.localStorage.setItem('total' , this.state.total)

      })
      const time = window.localStorage.getItem('timer')
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor(time / 60);
      if(minutes >= 59){
        minutes = minutes % 60
      }
   //   const Seconds = time % 60;
      const data = this.state.data
      data.time = hours +":"+minutes
      this.setState({data:data, touched : true})
      console.log(this.state)
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
        console.log(timeError)
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
              console.log(this.state)
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
              console.log(this.state)
             
        }
       
      
      };

    render(){
       
          console.log(this.props)
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
            this.setState({touched : false})
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
                console.log(timeError)
              }
              else
              {
                  var sHours = timeValue.split(':')[0];
                  var sMinutes = timeValue.split(':')[1];
          
                  if(sHours == "" || isNaN(sHours) /*|| parseInt(sHours)>23 */)
                  {
                    timeError = "Inavlid Time"
                    console.log(timeError)
                  }
                  else if(parseInt(sHours) == 0)
                      sHours = "00";
                  else if (sHours <10)
                      sHours = "0"+sHours;
          
                  if(sMinutes == "" || isNaN(sMinutes) || parseInt(sMinutes)>59)
                  {
                    timeError = "Inavlid Time"
                    console.log(timeError)
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
            else
            if(name==="nonBillable" || name==="billable"){
                    newData.billable = ! newData.billable
                    console.log(newData.billable)
            }else{
                newData[name] = value
                this.setState({data : newData })   
            }

            console.log(this.state)
        }
        
        
        return <div className='p-2 '>
            
           <Card>
              <div className="d-flex justify-content-between">
              <h4 style={{ fontWeight: 'bold' }}>Acitivites</h4>
              <div></div>
               <Button onClick={exportPDF}>Export</Button>
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
          
            <Modal
                title="New Time Entry"
                visible={this.state.timeModal}
                onOk={()=>this.handleOk("time")}
                onCancel={()=>this.handleCancel("time")}
                afterClose = {()=>this.handleCancel("time")}
                >
                <TimeForm touched={this.state.touched} time={this.state.data.time} record={this.state.data} editmode={this.state.editmode} handleChange={handleChange}></TimeForm>
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