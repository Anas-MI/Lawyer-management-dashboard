import React from 'react'
import { Tabs, Button,Modal , Card } from 'antd';
import Matter from './Matter/matter'
import Contact from './Contact/contact'
import { Form } from 'react-bootstrap'
import api from '../../../../resources/api'
const { TabPane } = Tabs;


class customFeilds extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  state = {
    modal1Visible: false,
    modal2Visible: false,
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  

  render() {
    const HandleChange=(e)=>{
      e.persist()
      this.setState(st=>({...st,[e.target.name]:e.target.value}))
    }
    const HandleOk=()=>{
    api.post('http://localhost:3002/api/user/update/5eecb08eaec6f1001765f8d5',this.state)
      this.setModal2Visible(false)
    }
    const operations = <Button onClick={() => this.setModal2Visible(true)}>Add</Button>
    return (
      <Card>
      
      <Tabs tabBarExtraContent={operations}>
             <TabPane tab="Matter Custom Feild" key="1">
                <Matter></Matter>
              </TabPane>
              <TabPane tab="Contact Custom Feild" key="2">
                <Contact></Contact>
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
                <Form.Control type="Name" placeholder="Name" name="name" onChange={HandleChange}/>
            </Form.Group>
            <Form.Group controlId="Type">
                <Form.Label>Select Custom Feild type</Form.Label>
                <Form.Control as="select" name="type" onChange={HandleChange}>
                <option>Checkbox</option>
                <option>Contact Select</option>
                <option>Date</option>
                <option>Email Address</option>
                <option>Integer</option>
                <option>Matter</option>
                <option>Money</option>
                <option>Picklist</option>
                <option>Text</option>
                </Form.Control>
                <br></br>
                <Form.Check 
                    type="checkbox"
                    id={`Default`}
                    label={`Default`}
                    name="default"
                    onChange={HandleChange}
                /><br></br>
                <Form.Check 
                    type="checkbox"
                    id={`Required`}
                    label={`Required`}
                    name="required"
                    onChange={HandleChange}
                />

            </Form.Group>
            </Form>
        </Modal>
      </Card>
    );
  }
}


export default customFeilds
