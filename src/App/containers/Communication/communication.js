import React from 'react'
import { Table , Button, Modal , Card, notification, Space, Popconfirm } from 'antd'
import { useSelector, connect } from 'react-redux';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Emailform from './form/emailform'
import PhoneLog from './form/phoneLog'
import api from '../../../resources/api'

let timeError = "" ;
let matters = {};
let communication = {};
let contact = {}
const user = JSON.parse(window.localStorage.getItem('Case.user'))
const name = user.token.user.firstName + " " + user.token.user.lastName;
console.log(user.token.user)

class Communication extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            phone : false,
            email : false,
            tableData : [],
            data : {
                subject : "",
                body : "",
                from : user.token.user._id
            },
            emailData : [],
            phoneData : [],
            completeData : [],
            tableData : [],
            editmode : false
        
        }
    }
    convertTime = (serverdate) => {
      var date = new Date(serverdate);
      // convert to utc time
      var toutc = date.toUTCString();
      //convert to local time
      var locdat = new Date(toutc + ' UTC');
      return locdat;
    };
    componentDidMount() {

      api.get('/matter/viewforuser/' + this.props.userId).then((res) => {
        matters = res;
      });
      api.get('/contact/viewforuser/' + this.props.userId).then((res) => {
        contact = res;
      });
    
      api.get('/communication/viewforuser/' + this.props.userId).then((res) => {
        communication = res.data.data;
       console.log(communication)

        let emailData = [];
        let phoneData = [];
        let completeData = [];
        
        res.data.data.map((val, index) => {
          
          const date = this.convertTime(val.date);
          const temp = {
            key: index,
            logType: val.logType,
            id: val._id,
            addTime : val.addTime ? val.addTime : "-",
            time: val.time ? val.time : '',
            matter: val.matter ? val.matter.matterDescription : '-',
            from: val.from ? val.from.firstName + " " + val.from.lastName  : '-',
            to: val.to ? val.to.firstName + " " + val.to.lastName  : '-',
            subject: val.subject ? val.subject : '-',
            body: val.body,
            date: date          
          };
          if (val.logType === 'email') {
            emailData.push(temp);
          }
          if (val.logType === 'phone') {
            phoneData.push(temp);
          }
          
          completeData.push(temp);
        });
        this.setState({
          completeData: completeData,
          phoneData: phoneData,
          emailData: emailData,
          tableData: completeData,
        });
      });
      /*
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
      */

    }
    showModal = (type) => {
        if(type==="email"){
            this.setState({
                email : true,
              });
        }else
        if(type==="phone"){
            this.setState({
                phone : true,
              });
        }
      
      };
    
      handleOk = type => {    
        notification.destroy()
        if (timeError !== '') {
          notification.error({ message: 'Invalid time' });
        }else
        if(this.state.data.subject == ""){
            notification.error({message : "Please add a subject"})
        }else
        if(this.state.data.body == ""){
            notification.error({message : "Please add a body"})
        }else{
            if(this.state.editmode){

              let data = this.state.data
              data.from = user.token.user._id
            if(type === "email"){
              data.logType = "email"
              this.setState({email : false})
            }else
            if(type === "phone"){
              data.logType = "phone"
              this.setState({phone : false})
            }
            data.userId = this.props.userId;
            console.log(data)
            api
              .post('/communication/edit/'+this.state.data.id, data)
              .then((res) => {
                console.log(res)
                const newData = this.state.tableData
                newData.push(res.data.data)
                this.setState({tableData : newData, data : {
                  subject : "",
                  body : "",
                  from : user.token.user._id
              }})
                notification.success({ message: 'Log Edited !' });
              })
              .catch((err) => {
                notification.error({ message: 'Failed' });
              })
              .then(() => {
              
                /*
                this.setState({
                  timeModal: false,
                  editmode: false,
                  data: {
                    billable: true,
                    nonBillable: false,
                    date: '',
                    qty: '1.0',
                    rate: '',
                    invoice: 'Unbilled',
                  },
                });
                */
               
                setTimeout(() => {
                  window.location.reload();
                }, 1500)
              });
  

            }else{
              let data = this.state.data
            if(type === "email"){
              data.logType = "email"
              this.setState({email : false})
            }else
            if(type === "phone"){
              data.logType = "phone"
              this.setState({phone : false})
            }
            data.userId = this.props.userId;
            console.log(data)
            api
              .post('/communication/create', data)
              .then((res) => {
                console.log(res)
                const newData = this.state.tableData
                newData.push(res.data.data)
                this.setState({tableData : newData})
                notification.success({ message: 'Log Added !' });
              })
              .catch((err) => {
                notification.error({ message: 'Failed' });
              })
              .then(() => {
              
                /*
                this.setState({
                  timeModal: false,
                  editmode: false,
                  data: {
                    billable: true,
                    nonBillable: false,
                    date: '',
                    qty: '1.0',
                    rate: '',
                    invoice: 'Unbilled',
                  },
                });
                */
               
                setTimeout(() => {
                  window.location.reload();
                }, 1500)
              });
  
            }
        }   
      };
    
      handleCancel = type => {
        if(type==="email"){
            this.setState({
                email : false,
                editmode: false,
                data : {
                  subject : "",
                  body : "",
                  from : name
              },
         
              });
              console.log(this.state)
        }else
        if(type==="phone"){
            this.setState({
                phone : false,
                editmode: false,
                data : {
                  subject : "",
                  body : "",
                  from : name
              },
              });
              console.log(this.state)
        
        }
        
        setTimeout(() => {
          window.location.reload();
        }, 500);
        
       
      
      };

    render(){
      const handleChange = (e) => {
        e.persist();
        this.setState({ touched: false });
        const { name, id, value, selectedIndex } = e.target;
        let newData = this.state.data;

        if (name === 'matter') {
          console.log("inside matter")
          if (selectedIndex >= 1) {
            console.log(matters.data.data[selectedIndex - 1]._id)
            newData[name] = matters.data.data[selectedIndex - 1]._id;
            console.log("inside matter > 1 ")
          } else {
            newData[name] = '';
            console.log("inside matte.....r")
          }

        }else
        if (name === 'to' || name === 'from') {
          console.log(matters)
          if (selectedIndex >= 1) {
            newData[name] = contact.data.data[selectedIndex - 1]._id;
          } else {
            newData[name] = '';
          }

        } else 
        if (name === 'addTime') {
            timeError = '';
            var timeValue = value;
            if (timeValue == '' || timeValue.indexOf(':') < 0) {
              timeError = 'Inavlid Time';
              console.log(timeError);
            } else {
              var sHours = timeValue.split(':')[0];
              var sMinutes = timeValue.split(':')[1];
              var sSeconds = timeValue.split(':')[1];

              
    
              if (sHours == '' || isNaN(sHours) /*|| parseInt(sHours)>23 */) {
                timeError = 'Inavlid Time';
                console.log(timeError);
              } else if (parseInt(sHours) == 0) sHours = '00';
              else if (sHours < 10) sHours = '0' + sHours;
    
              if (sMinutes == '' || isNaN(sMinutes) || parseInt(sMinutes) > 59) {
                timeError = 'Inavlid Time';
                console.log(timeError);
              } else if (parseInt(sMinutes) == 0) sMinutes = '00';
              else if (sMinutes < 10) sMinutes = '0' + sMinutes;

              if (sSeconds == '' || isNaN(sSeconds) || parseInt(sSeconds) > 59) {
                timeError = 'Inavlid Time';
                console.log(timeError);
              } /*else if (parseInt(sSeconds) == 0) sSeconds = '00';
              else if (sSeconds < 10) sSeconds = '0' + sSeconds;
    
              timeValue = sHours + ':' + sMinutes + ':' + sSeconds;*/
            }
            newData[name] = timeValue;
            this.setState({ data: newData });
          } 
        else 
        {
            console.log("inside last")
            newData[name] = value;
            this.setState({ data: newData });
          }
    
        console.log(this.state);
      };
        const handleEdit = record => {
            
            if(record.logType==="email"){
              this.setState({
                editmode : true,
                  email : true,
                  data : record ,
                });
            }else
            if(record.logType==="phone"){
              this.setState({
                editmode : true,
                  phone : true,
                  data : record  
                });
            }
        
                
          }
            
            const handleDelete = record => {
            
              api.get('/communication/delete/'+record.id).then((res)=>{
  
                notification.success({message : "Log Deleted !"})
                setTimeout(()=>{
                  window.location.reload()
                },1500)
              }).catch((err)=>{
    
                notification.error({message : "Failed to delete"})
              })
              
            }
        const setTableData = (type)=>{
            if(type==="email"){
              this.setState({
                tableData: this.state.emailData,
              });
           }else
           if(type==="phone"){
            this.setState({
              tableData: this.state.phoneData,
            });
            }else
            if(type==="all"){
              this.setState({
                tableData: this.state.completeData,
              });
            }
          }
        const columns = [
            {
                title: 'Hours',
                dataIndex: 'addTime',
                key: 'addTime',
              },
            {
              title: 'Type',
              dataIndex: 'logType',
              key: 'logType',
            },
            {
              title: 'Time',
              dataIndex: 'time',
              key: 'time',
            },
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Subject',
              dataIndex: 'subject',
              key: 'subject',
            },
            {
                title: 'Matter',
                dataIndex: 'matter',
                key: 'matter',
              },
            {
              title: 'From',
              dataIndex: 'from',
              key: 'from',
            },
              {
                title: 'To',
                dataIndex: 'to',
                key: 'to',
              },
            
              {
                title:'Edit',
                dataIndex: "edit",
                key: "_id",
                render:(_,record)=>{
                    return (
                        <Button variant='danger' onClick={()=>handleEdit(record)}>
                            Edit
                        </Button>
                    )
                }
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
          ];
          const exportPDF = () => {
            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "portrait"; // portrait or landscape
        
            const marginLeft = 40;
            const doc = new jsPDF(orientation, unit, size);
        
            doc.setFontSize(15);
        
            const title = "Activity";
            const headers = [["Hours", "Type","Date and time","Attachment","Matter","From", "To"] ];
           
            let data = []
            /*
            this.state.tableData.map((val, index)=>{
              const td= [val.type , val.qty, val.description , val.billable, val.rate, val.date, val.invoiceStatus]
              data.push(td)
            })*/
          
        
            let content = {
              startY: 50,
              head: headers,
              body: data
            };
        
            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("Activity.pdf")
          }
        return <div className='p-2 '>
            
        <br></br>
        <br></br>
        
        <Card title="Communication" bodyStyle={{"padding": "14px 10px 0px 10px"}}extra={<span style={{float : "right"}}>
            <Button className='ml-auto' color='success' onClick={exportPDF}>Export</Button>
            <Button onClick={()=>this.showModal("email")}>New email log</Button>
            <Button onClick={()=>this.showModal("phone")}>New phone log</Button>
            </span>}>
            <div style={{"display": "flex", "flex-wrap": "wrap", "justify-content": "space-between" }}>
              <div className="mb-2">
              <Button  onClick={()=>setTableData("all")}>All</Button>
              <Button onClick={()=>setTableData("email")}>Email</Button>
              <Button onClick={()=>setTableData("phone")}>Phone</Button>
              </div>
            </div>
        </Card>
        <Card bodyStyle={{"padding": "0px"}} className="overflow-auto">                
          <Table columns={columns} dataSource={this.state.tableData}  />
        </Card>
       
        <Modal
            title="New email log"
            visible={this.state.email}
            onOk={()=>this.handleOk("email")}
            onCancel={()=>this.handleCancel("email")}
            >
            <Emailform from={name} record={this.state.data} editmode={this.state.editmode} handleChange={handleChange}></Emailform>
       {/*     <TimeForm  record={this.state.data} editmode={this.state.editmode} handleChange={handleChange}></TimeForm> */}
        </Modal>
        <Modal
            title="New phone log"
            visible={this.state.phone}
            onOk={()=>this.handleOk("phone")}
            onCancel={()=>this.handleCancel("phone")}
            >
            <PhoneLog from={name} record={this.state.data} editmode={this.state.editmode} handleChange={handleChange}></PhoneLog>
        </Modal>
    </div>
    }
}

const mapStateToProps = (state) => ({
  userId: state.user.token.user._id,
});

export default connect(mapStateToProps)(Communication);
