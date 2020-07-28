import React from 'react';
import { Tabs, Card, Table, Button } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from '../../../../../resources/api';
import { connect } from 'react-redux'
const { TabPane } = Tabs;

class billing extends React.Component {
  constructor(){
    super()
    this.state = {
      tableData : []
    }
  }
  handelBills = (type) => {
    if (type === 'record') {
      this.props.history.push('/manage/billing/record');
    }
  };

  componentDidMount(){
      console.log(this.props)
    api.get('/billing/bill/viewforcontact/'+this.props.userId+'/'+ this.props.id).then((res)=>{
      console.log(res.data.data)
      let tableData = []
      let paidBills = []
      let unpaidBills = []
      res.data.data.map((value , index)=>{
     
    //    const issueDate = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear()
        const temp = {
          lastSeen : value.lastSeen ? value.lastSeen.substring(0,10) : "-",
          status : value.status,
          dueDate : value.dueDate.substring(0,10),
          id : value.invoiceId,
          client : value.client,
          matter : value.matter,
          issueDate : value.issueDate.substring(0,10) ,
          balance : value.balance
        }
        if(value.status=="Paid"){
          paidBills.push(temp)
        }
        if(value.status=="Unpaid"){
          unpaidBills.push(temp)
        }
        tableData.push(temp)
      })
      this.setState({tableData :  tableData, paidBills : paidBills , unpaidBills : unpaidBills})
    })
  }

  render() {
    const callback = () => {};
   

    const columns = [
      {
        title: 'Last Seen',
        dataIndex: 'lastSeen',
        key: 'lastSeen',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
      },
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
      },
      {
        title: 'Matter',
        dataIndex: 'matter',
        key: 'matter',
      },
      {
        title: 'Issue Date',
        dataIndex: 'issueDate',
        key: 'issueDate',
      },
      {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
      },
    ];
    const exportPDF = () => {
      const unit = 'pt';
      const size = 'A4'; // Use A1, A2, A3 or A4
      const orientation = 'portrait'; // portrait or landscape

      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);

      doc.setFontSize(15);

      const title = 'Bills';
      const headers = [
        [
          'Last Seen',
          'Status',
          'Due Date',
          'ID',
          'Client',
          'Matter',
          'Issue Date',
          'Balance',
        ],
      ];
    
      let data = 
            this.state.tableData.map((val, index)=>{
              const td= [val.lastSeen, val.status , val.dueDate , val.id ,val.client , val.matter , val.issueDate , val.balance]
              data.push(td)
            })
     

      let content = {
        startY: 50,
        head: headers,
        body: data,
      };

      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save('Bill.pdf');
    };

    return (
      <div className="p-2 ">
        <Card
          title="Billing"
          extra={
            <span style={{ float: 'right' }}>
              <Button className="ml-auto" color="success" onClick={exportPDF}>
                Export
              </Button>
              <Button onClick={() => this.handelBills('record')}>
                Record Payment
              </Button>
              {/*  <Button onClick={()=>this.showModal("expense")}>New Expense</Button>*/}
            </span>
          }
        >
          <Tabs defaultActiveKey="4" onChange={callback}>
            {
              /* 
               <TabPane tab="Draft" key="1">
              <Table dataSource={this.state.tableData} columns={columns} />;
            </TabPane>
              */
            }
           
            <TabPane tab="Paid" key="2">
              <Table dataSource={this.state.paidBills} columns={columns} />;
            </TabPane>
            <TabPane tab="Unpaid" key="3">
              <Table dataSource={this.state.unpaidBills} columns={columns} />;
            </TabPane>
            <TabPane tab="All" key="4">
              <Table dataSource={this.state.tableData} columns={columns} />;
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.token.user._id
});

export default connect(mapStateToProps)(billing)