import React from 'react'
import { Card, Form } from 'react-bootstrap'
import {Button , Table , notification, Popconfirm} from 'antd'
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
    
            tableData : [],
    
            record : "",
            name : "",
            Matter : "",
            LName : "",
            touched : true
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
       // let today = [];
       // let thisWeek = [];
       // let thisMonth = [];
       // let thisYear = [];
        res.data.data.map((val, index) => {
          //const date = this.convertTime(val.date);
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
            key: index,
            type: val.type,
            id: val._id,
            hours : val.type === 'time' ? val.time : val.qty,
            client : val.matter,
            rate: val.rate,
            billable: val.billable ? 'Yes' : 'No',
            invoiceStatus: 'Unbilled',
            amount :  val.type === 'time' ? (rate * sHours + ((rate/60)*sMinutes)).toFixed(2) : (rate * val.qty).toFixed(2),
            trustAmount : "$0.00"
            //  invoiceStatus :  val.invoiceStatus?  val.invoiceStatus : "-" ,
          };
         
          
          tableData.push(temp);
        });
        this.setState({
          completeData: completeData,
          tableData: tableData,
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
            
          }
        const column = [
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (_, record) => {
                  return (
                    <Popconfirm
                      title="Generate bill"
                      onConfirm={() => handelAction(record)}
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
                         <Table dataSource={this.state.tableData} columns={column}></Table>
                    </Card.Footer>
                </Card>
                

            </div>
    }
}

const mapStateToProps = state => ({
  userId: state.user.token.user._id
});

export default connect(mapStateToProps)(CreateBill)