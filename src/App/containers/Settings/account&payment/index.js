import React from 'react'
import { Tabs, Button,Modal , Card } from 'antd';
import Account from '../account&payment/Account/account'
import Payment from '../account&payment/PaymentInfo/payment'
import { Form } from 'react-bootstrap'
const { TabPane } = Tabs;


class customFeilds extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        modal1Visible: false,
        modal2Visible: false,
        Data : {
            Name: '',
            Email : '',
            ContactInfo : '',
            Date : '',
            Currency : '', 
          },
        
      }
  }



  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  render() {
    const HandleChange=(e)=>{
        e.persist()
        let newstate=this.state
        
        newstate.Data[e.target.id] = e.target.value
        this.setState({Data : newstate.Data})
        console.log(this.state.Data)
    }
    const HandleOk=()=>{
        this.setState({dataStatus : true})
        this.setModal2Visible(false)

    }
    const operations = <Button onClick={() => this.setModal2Visible(true)}>Add</Button>
  
    return (
      <Card>
      
      <Tabs tabBarExtraContent={operations}>
             <TabPane tab="Account" key="1">
                <Account state={this.state.Data}></Account>
              </TabPane>
              <TabPane tab="Payment Info" key="2">
                <Payment></Payment>
             </TabPane>
        </Tabs>
        <Modal
          title="Add Custom Feild"
          centered
          visible={this.state.modal2Visible}
          onOk={HandleOk}
          onCancel={() => this.setModal2Visible(false)}
        >
          <Form>
            <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name"  onChange={HandleChange} />
            </Form.Group>
            <Form.Group controlId="Email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email"  onChange={HandleChange}/>
            </Form.Group>
            <Form.Group controlId="Name">
                <Form.Label>Contact</Form.Label>
                <Form.Control type="text" placeholder="Contact"  onChange={HandleChange}/>
            </Form.Group>
            <Form.Group controlId="Date">
                <Form.Label>Date</Form.Label>
                <Form.Control type="Date" placeholder="Date"  onChange={HandleChange}/>
            </Form.Group>
            <Form.Group controlId="Currency Format">
                <Form.Label>Currency Format</Form.Label>
                <Form.Control type="text" placeholder="Currency Format" onChange={HandleChange} />
            </Form.Group>
            </Form>
        </Modal>
      </Card>
    );
  }
}


export default customFeilds