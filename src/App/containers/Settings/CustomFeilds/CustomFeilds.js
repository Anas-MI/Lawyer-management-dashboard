import React from 'react'
import { Tabs, Button,Modal , Card, notification } from 'antd';
import Matter from './Matter/matter'
import Contact from './Contact/contact'
import { Form } from 'react-bootstrap'
import api from '../../../../resources/api'
import {connect} from 'react-redux'
const { TabPane } = Tabs;
let res = null
let data = {
  customFields : []
}
class customFeilds extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
  }

  async componentDidMount(){
    res = await api.get('/user/view/'+this.props.userId)
    data.customFields = res.data.data.customFields
    console.log(data)
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
  openNotificationWithFailure = type => {
    notification[type]({
      message: 'Failure',
        });
  };
   openNotificationWithSucces = type => {
    notification[type]({
      message: 'success',
    });
  };

  render() {
    const HandleChange=(e)=>{
      e.persist()
      this.setState(st=>({...st,[e.target.name]:e.target.value}))
      if(this.state.required === "on"){
        this.state.required = true
      }else{
        this.state.required = false 
      }
      if(this.state.default === "on"){
        this.state.default = true
      }else{
        this.state.default = false
      }
      console.log(this.state)
    }
    const HandleOk=()=>{
      notification.destroy()
   
      const newdata = {
        name : this.state.name,
        type : this.state.type,
        default : this.state.default,
        required : this.state.required
      }

      console.log(res.data.data.customFields)
      if(res!==null){
        data.customFields.push(newdata)
      }
      if ((newdata.name ==="" ||newdata.name ===undefined) || (newdata.type ==="" ||newdata.type ===undefined) || (newdata.required ===true && newdata.default ===true) || (newdata.required ===false && newdata.default ===false) ) {
        return notification.warning({
          message: "Fields Should Not Be Empty",
        });
      }else{
       api.post('/user/update/'+this.props.userId, data).then(()=>this.openNotificationWithSucces('success')).catch(()=>{this.openNotificationWithFailure('error')})
      this.setModal2Visible(false)
      setTimeout(() => {
        window.location.reload()
      }, 1000);
      }

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
                <Form.Control type="name" placeholder="Name" name="name" onChange={HandleChange}/>
            </Form.Group>
            <Form.Group controlId="Type">
                <Form.Label>Select Custom Feild type</Form.Label>
                <Form.Control as="select" name="type" onChange={HandleChange}>
                <option>Checkbox</option>
                <option>Date</option>
                <option>password</option>
                <option>Integer</option>
                <option>Matter</option>
                <option>number</option>
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

const mapStateToProps = state => ({
  userId: state.user.token.user._id
});
export default connect(mapStateToProps)(customFeilds)
