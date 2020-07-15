import React from 'react'
import { Table , Button, Modal , Card, notification, Space, Popconfirm } from 'antd'
import jsPDF from "jspdf";
import "jspdf-autotable";
import Emailform from './form/emailform'
import api from '../../../resources/api'

class Communication extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            phone : false,
            email : false,
            tableData : [],
            data : {
                subject : "",
                body : ""
            }
        }
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
        if(this.state.data.subject == ""){
            notification.error({message : "Please add a subject"})
        }else
        if(this.state.data.body == ""){
            notification.error({message : "Please add a subject"})
        }else{
            this.setState({email : false, phone : false})
        }   
      };
    
      handleCancel = type => {
        if(type==="email"){
            this.setState({
                email : false,
         
              });
              console.log(this.state)
        }else
        if(type==="phone"){
            this.setState({
                phone : false,
              });
              console.log(this.state)
             
        }
       
      
      };

    render(){
        const handleEdit = record => {
            /*
            if(record.type==="time"){
              this.setState({
                editmode : true,
                  timeModal : true,
                  data : record ,
                });
          }else
          if(record.type==="expense"){
              this.setState({
                editmode : true,
                  expenseModal : true,
                  data : record  
                });
          }
          */
                
            }
            
            const handleDelete = record => {
                /*
              api.get('/activity/delete/'+record.id).then((res)=>{
  
                notification.success({message : "Activity Deleted !"})
                setTimeout(()=>{
                  window.location.reload()
                },1500)
              }).catch((err)=>{
    
                notification.error({message : "Failed to delete"})
              })
              */
            }
        const setTableData = (type)=>{
            if(type==="time"){
             
           }else
           if(type==="expense"){
              
            }else
            if(type==="all"){
             
            }
          }
        const columns = [
            {
                title: 'Hours',
                dataIndex: 'hours',
                key: 'hours',
              },
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: 'Date and time',
              dataIndex: 'dateAndTime',
              key: 'dateAndTime',
            },
            {
              title: 'Subject, body, attachment',
              dataIndex: 'attachment',
              key: 'attachment',
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
        
        <Card title="Activities" bodyStyle={{"padding": "14px 10px 0px 10px"}}extra={<span style={{float : "right"}}>
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
            <Emailform></Emailform>
       {/*     <TimeForm  record={this.state.data} editmode={this.state.editmode} handleChange={handleChange}></TimeForm> */}
        </Modal>
        <Modal
            title="New phone log"
            visible={this.state.phone}
            onOk={()=>this.handleOk("phone")}
            onCancel={()=>this.handleCancel("phone")}
            >
            <Emailform></Emailform>
        </Modal>
    </div>
    }
}
export default Communication