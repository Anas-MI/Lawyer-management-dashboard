import React from 'react'
import { Card, Form } from 'react-bootstrap'
import {Button , Table , notification, Popconfirm} from 'antd'
import api from '../../../../resources/api';
class CreateBill extends React.Component{

    render(){
        const handelAction = (record, type) => {
            const data = record
            if(type === "fromDraft"){
              data.status = "Unpaid"
              
            }else
            if(type === "fromUnpaid"){
              data.status = "Paid"
            }
            api.post('/billing/bill/edit/'+record._id , data).then((res)=>{
              console.log(res)
              if(type=="fromDraft"){
                const newState = this.state
                newState.draftBills.splice(record.key, 1)
                newState.unpaidBills.push(res.data.data)
              }
              if(type=="fromUnpaid"){
                const newState = this.state
                newState.unpaidBills.splice(record.key, 1)
                newState.paidBills.push(res.data.data)
              }
      
              notification.success({message : "Success"})
              setTimeout(()=>{
                window.location.reload()
      
              },1000)
      
            }).catch((err)=>{
              console.log(err)
              notification.error("Failed")
            })
            
          }
        const column = [
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (_, record) => {
                  return (
                    <Popconfirm
                      title="Mark as Paid"
                      onConfirm={() => handelAction(record, "fromUnpaid")}
                      onCancel={this.cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Form.Check type="checkbox"  />
                    </Popconfirm>
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
                dataIndex : "amount",
                key :"amount"
            },
            {
                title : "Amount in trust",
                dataIndex : "trustAmount",
                key :"trustAmount"
            }
        ]
        return <div>
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
                    <Card.Body>
                        
                    </Card.Body>
                    <Card.Footer>
                         <Table columns={column}></Table>
                    </Card.Footer>
                </Card>
                

            </div>
    }
}
export default CreateBill