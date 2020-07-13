import React from 'react'
import { Table , Button, Modal , Card, notification, Space } from 'antd'
import { useSelector , connect} from 'react-redux'
import ExpenseForm from './Form/expenseForm'
import TimeForm from './Form/timeForm'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Form, Col,Row } from 'react-bootstrap'
import api from '../../../resources/api'

let matters = {}
class Activity extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            expenseModal : false,
            timeModal : false,
            data : { 
                billable : false,
                nonBillable : false,
                date : "",
                rate : "",
                invoice : "Unbilled"
            },
            timeData : [],
            expenseData : [],
            completeData : [],
            tableData : []

        }
    }
    componentDidMount(){
      api.get('/matter/viewforuser/'+ this.props.userId).then((res)=>{matters = res })
      api.get('/activity/viewforuser/'+this.props.userId).then((res)=>{
        let timedata = []
        let expenseData = []
        let completeData =[]
        res.data.data.map((val, index)=>{
       
            const temp = {
              id : val._id,
              qty : val.qty,
              description : val.description,
              rate : val.rate, 
              nonBillable : val.nonBillable ? "Yes" : "No",
              billable : val.billable ? "Yes" : "No",
              date :val.date,
              invoiceStatus : val.invoiceStatus,
            }
            if(val.type ==="time"){
              timedata.push(temp)
            }else
            if(val.type ==="expense"){
              expenseData.push(temp)
            }
            completeData.push(temp)

        })
        this.setState({completeData : completeData, expenseData : expenseData , timeData : timedata, tableData: completeData  })
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
        if(this.state.data.date === ""){
            notification.error({message : "Please select a Date"})
        }else if(this.state.data.rate === ""){
            notification.error({message : "Please provide rate"})
        }else{
            if(type==="time"){
              let data = this.state.data
              data.type = "time"
              data.userId = this.props.userId
              api.post('/activity/create', data).then((res)=>{
                console.log(res);
                notification.success({message : "Expense Added !"})
              }).catch((err)=>{
                console.log(err)
                notification.error({message : "Failed"})
              }).then(()=>{
                this.setState({
                  timeModal : false,
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
                  console.log(res);
                  notification.success({message : "Expense Added !"})
                }).catch((err)=>{
                  console.log(err)
                  notification.error({message : "Failed"})
                }).then(()=>{
                  this.setState({
                    expenseModal : false,
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
              });
        }else
        if(type==="expense"){
            this.setState({
                expenseModal : false,
              });
        }
      
      };

    render(){
      console.log(this.props.userId)
        const handleEdit = record => {
 
              
          }
          
          const handleDelete = record => {
            api.get('/activity/delete/'+record.id).then((res)=>{
              console.log(res)
              notification.success({message : "Activity Deleted !"})
              setTimeout(()=>{
                window.location.reload()
              },1500)
            }).catch((err)=>{
              console.log(err)
              notification.error({message : "Failed to delete"})
            })
            
          }

          const columns = [
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
                title: 'Non Billable',
                dataIndex: 'nonBillable',
                key: 'nonBillable',
              },
              {
                title: 'Billable',
                dataIndex: 'billable',
                key: 'billable',
              },
              {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
              },
              {
                title: 'Invoice Status',
                dataIndex: 'invoiceStatus',
                key: 'invoiceStatus',
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
                          <Button variant='danger' onClick={()=>handleDelete(record)}>
                              Delete
                          </Button>
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
            const headers = [["Qty","Description","Non Billable","Billable", "Rate", "Date", "Invoice Status"]];
           
            let data = []
            /*
            state.tableData.map((val, index)=>{
              const td= [val.firstName, val.billingCustomRate , val.emailAddress]
              data.push(td)
            })
           */
        
            let content = {
              startY: 50,
              head: headers,
              body: data
            };
        
            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("contact.pdf")
          }
        const handleSorting = (e) => {
            e.persist()
        }
        const handleChange=(e)=>{
            e.persist()
            const { name, id, value , selectedIndex} = e.target
            console.log(e)
            let newData = this.state.data
            if(name==="matter"){
              if(selectedIndex >= 1){
                newData[name] = matters.data.data[selectedIndex-1]
              }else{
                newData[name] = ""
              }
              
            }else
            if(name==="nonBillable" || name==="billable"){
                    newData[name] = ! newData[name]
                    newData.billable = ! newData.nonBillable
            }else{
                newData[name] = value
                this.setState({data : newData })   
            }
            console.log(this.state.data)
        }
        const setTableData = (type)=>{
          if(type==="time"){
            this.setState({
              tableData : this.state.timeData
              });
         }else
         if(type==="expense"){
            this.setState({
              tableData : this.state.expenseData
              });
          }else
          if(type==="all"){
            this.setState({
                tableData : this.state.completeData
              });
          }
        }
        return <div className='p-2 '>
            
            <br></br>
            <br></br>
            
            <Card title="Activities" extra={<span style={{float : "right"}}>
                <Button className='ml-auto' color='success' onClick={exportPDF}>Export</Button>
                <Button onClick={()=>this.showModal("time")}>New Time Entry</Button>
                <Button onClick={()=>this.showModal("expense")}>New Expense</Button>
                </span>}>
                <Space>
                <Button onClick={()=>setTableData("all")}>All</Button>
                <Button onClick={()=>setTableData("time")}>Time</Button>
                <Button onClick={()=>setTableData("expense")}>Expense</Button>
                <Form>
                    <Row>
                    <Col md="2">
                    <Form.Group controlId="From">
                        <Form.Label>From</Form.Label>
                        <Form.Control 
                        size="sm"
                        type="date" 
                        name="from"
                        onChange= { handleSorting }  />
                    </Form.Group>
                    </Col>
                    <Col md="2" >
                    <Form.Group controlId="To">
                        <Form.Label>To</Form.Label>
                        <Form.Control 
                        size="sm"
                        type="date" 
                        name="To"  />
                    </Form.Group>
                    </Col>
                    <Col md="2">
                   
                    <Form.Group controlId="sorting">
                    <Form.Label >Sort</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="select"
                            name="sorting"
                            onChange= { handleSorting }  >
                        <option>Custom</option>
                        <option>This Week</option>
                        <option>This month</option>
                        <option>This year</option>
                        </Form.Control>
                    </Form.Group>
                    </Col>
                    </Row>
                </Form>
                </Space>
            </Card>
            <Card>                
              <Table columns={columns} dataSource={this.state.tableData}  />
            </Card>
           
            <Modal
                title="New Time Entry"
                visible={this.state.timeModal}
                onOk={()=>this.handleOk("time")}
                onCancel={()=>this.handleCancel("time")}
                >
                <TimeForm handleChange={handleChange}></TimeForm>
            </Modal>
            <Modal
                title="New Expense"
                visible={this.state.expenseModal}
                onOk={()=>this.handleOk("expense")}
                onCancel={()=>this.handleCancel("expense")}
                >
                <ExpenseForm handleChange={handleChange}></ExpenseForm>
            </Modal>
        </div>
    }
}

const mapStateToProps = state => ({
  userId: state.user.token.user._id
});

export default connect(mapStateToProps)(Activity)