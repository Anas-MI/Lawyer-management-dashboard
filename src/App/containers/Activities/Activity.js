import React from 'react'
import { Table , Button, Modal , Card, notification } from 'antd'
import ExpenseForm from './Form/expenseForm'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Form, Col,Row } from 'react-bootstrap'

class Activity extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            expenseModal : false,
            timeModal : false,
            data : { 
             //   billable : false,
                nonBillable : false,
                date : "",
                rate : ""
            }
        }
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
                this.setState({
                    timeModal : false,
                  });
            }else
            if(type==="expense"){
                this.setState({
                    expenseModal : false,
                  });
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
        const handleEdit = record => {
 
              
          }
          
          const handleDelete = record => {

            
          }
         
        const data = [

          ];
          
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
            const { name, id, value} = e.target
            let newData = this.state.data
            if(name==="nonBillable" || name==="billable"){
                    newData[name] = ! newData[name]
            }else{
                newData[name] = value
                this.setState({data : newData})   
            }
            console.log(this.state.data)
        }
        return <div>
            <span>
                <Button className='ml-auto' color='success' onClick={exportPDF}>Export</Button>
                <Button onClick={()=>this.showModal("time")}>New Time Entry</Button>
                <Button onClick={()=>this.showModal("expense")}>New Expense</Button>
            </span>
            
            <Card>
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
                        <Form.Control 
                            siz= "sm"
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
              <Table columns={columns} dataSource={data}  />
            </Card>
           
            <Modal
                title="New Time Entry"
                visible={this.state.timeModal}
                onOk={()=>this.handleOk("time")}
                onCancel={()=>this.handleCancel("time")}
                >
                <ExpenseForm handleChange={handleChange}></ExpenseForm>
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

export default Activity