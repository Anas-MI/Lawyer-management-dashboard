import React from 'react'
import { Card, Form } from 'react-bootstrap'
import {Button , Table , notification, Popconfirm, Modal} from 'antd'
import {connect} from 'react-redux'
import api from '../../../../resources/api';

let activity = {

}
class CreateBill extends React.Component{
  constructor(){
    super()
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
            disable : false
    }
  }
    componentDidMount(){
      api.get('/activity/viewforuser/' + this.props.userId).then((res) => {
        activity = res.data.data;
        console.log(activity)
        var now = new Date();
  /*
        var end_of_week = new Date(
          now.getTime() + (6 - now.getDay()) * 24 * 60 * 60 * 1000
        );
        end_of_week.setHours(23);
        end_of_week.setMinutes(59);
        end_of_week.setSeconds(59);

        var start_of_week = new Date(now.setDate(now.getDate() - now.getDay()));
  */
        let timedata = [];
        let expenseData = [];
        let completeData = [];
        let tableData = []
        let selected = []
        let id = 0

       // let today = [];
       // let thisWeek = [];
       // let thisMonth = [];
       // let thisYear = [];
        res.data.data.map((val, index) => {
          //const date = this.convertTime(val.date);
          
          if(val.billed == false){
            selected.push(false)
           
            let sHours = ""
            let sMinutes = ""
            let rate = val.rate
              if(rate.includes("$")){
                rate = rate.substring(0, rate.length - 1)
              }
              if(val.type === "time" && val.time !=undefined ){
             
                sHours = val.time.split(':')[0];
                sMinutes = val.time.split(':')[1];
              }
            let temp = {
              key: id,
              index : index,
              type: val.type,
              id: val._id,
              hours : val.type === 'time' ? val.time : val.qty,
              client : val.matter.client.firstName + " " + val.matter.client.lastName ,
              matter : val.matter,
              rate: val.rate,
              billable: val.billable ? 'Yes' : 'No',
              invoiceStatus: 'Unbilled',
              amount :  val.type === 'time' ? (rate * sHours + ((rate/60)*sMinutes)).toFixed(2) : (rate * val.qty).toFixed(2),
              trustAmount : "$0.00"
              //  invoiceStatus :  val.invoiceStatus?  val.invoiceStatus : "-" ,
            };
            id++
            tableData.push(temp);
          }
        });
        this.setState({
          completeData: completeData,
          tableData: tableData,
          selected : selected
        });
      });
      
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
                dataIndex : "amount",
                key :"amount"
            },
            {
                title : "Amount in trust",
                dataIndex : "trustAmount",
                key :"trustAmount"
            }
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

        const handleSubmit = ( ) =>{
          
         
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
            const data = {
              userId : this.props.userId,
              status : "draft",
            //  invoiceId: this.state.invoiceId,
              client : activity[value.index].matter.client._id,
              matter : value.matter._id ,
              issueDate : this.state.dates.issueDate,
              dueDate : this.state.dates.dueDate,
              balance : value.amount,
            //  from : thisMatter.data.data.client ,
            //  to : this.state.to         
            }
            api.post('/billing/bill/create', data).then((res=>{
              value.billed = true
              console.log(res)
                api
              .post('/activity/edit/' + value.id, value )
              .then((activity) => {
                console.log(activity)
                this.setState({
                  disableExpense : false,
                  disabletime : false
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
           })
           
           
          }
          

        }
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
                    
                    <Card.Footer>
                         <Table dataSource={this.state.tableData} columns={column}></Table>
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