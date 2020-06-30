import React from 'react'
import { Tabs, Button,Modal , Card } from 'antd';
import Matter from './Matter/matter'
import Contact from './Contact/contact'
import { Form } from 'react-bootstrap'
const { TabPane } = Tabs;


class customFeilds extends React.Component {
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
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
        >
          <Form>
            <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="Name" placeholder="Name" />
            </Form.Group>
            <Form.Group controlId="Type">
                <Form.Label>Select Custom Feild type</Form.Label>
                <Form.Control as="select">
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
                /><br></br>
                <Form.Check 
                    type="checkbox"
                    id={`Required`}
                    label={`Required`}
                />

            </Form.Group>
            </Form>
        </Modal>
      </Card>
    );
  }
}


export default customFeilds