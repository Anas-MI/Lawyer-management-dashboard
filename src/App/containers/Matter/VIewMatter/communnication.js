import React from 'react'
import { Table , Button, Modal , Card, notification, Space, Popconfirm, Spin } from 'antd'
import { useSelector, connect } from 'react-redux';
import jsPDF from "jspdf";
import "jspdf-autotable";
import api from '../../../../resources/api'
import { Form, Col, Row } from 'react-bootstrap'
import ReactDOM from 'react-dom'


let timeError = "" ;
let matters = {};
let communication = {};
let contact = {}
let option = null
let optns = null
let matterkey = null
let fromKey = null
let toKey = null
const user = JSON.parse(window.localStorage.getItem('Case.user'))
const name = user.token.user.firstName + " " + user.token.user.lastName;
console.log(user.token.user)

class Communication extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            phone : false,
            email : false,
            tableData : [],
            data : {
                subject : "",
                body : "",
                from : user.token.user._id
            },
            emailData : [],
            phoneData : [],
            completeData : [],
            tableData : [],
            loading : true,
            editEmail : false,
            editPhone : false,
            disable : false
        
        }
    }
    convertTime = (serverdate) => {
      var date = new Date(serverdate);
      // convert to utc time
      var toutc = date.toUTCString();
      //convert to local time
      var locdat = new Date(toutc + ' UTC');
      return locdat;
    };
    componentDidMount() {
     
     api.get('/matter/viewforuser/'+ this.props.userId).then((res)=>{
       matters = res
            option = res.data.data.map((val, index)=>{
                 return <option>{val.matterDescription}</option>
             })
         }).then(()=>{
             console.log(option)
             this.setState({option : option})
         })

      api.get('/contact/viewforuser/'+this.props.userId).then((res)=>{
        contact = res
          optns = res.data.data.map((value, index)=>{
  
              return <option id={index}>{value.firstName + " " + value.lastName}</option>
             })
       }).then(()=>{this.setState({contacts : optns})})

      api.get('/communication/viewformatter/' + this.props.userId + '/' + this.props.id).then((res) => {
        communication = res.data.data;
       console.log(communication)

        let emailData = [];
        let phoneData = [];
        let completeData = [];
        
        res.data.data.map((val, index) => {
        
          const temp = {
            key: index,
            logType: val.logType,
            id: val._id,
            addTime : val.addTime ? val.addTime : "-",
            time: val.time ? val.time : '',
            matter: val.matter ? val.matter.matterDescription : '-',
            matterId : val.matter ? val.matter._id : "",
            from: val.from ? val.from.firstName + " " + val.from.lastName  : '-',
            fromId : val.from ? val.from._id : "",
            to: val.to ? val.to.firstName + " " + val.to.lastName  : '-',
            toId : val.to ? val.to._id : "",
            subject: val.subject ? val.subject : '-',
            body: val.body,
            date: val.date ? val.date.substring(0,10) : "-"      
          };
          if (val.logType === 'email') {
            emailData.push(temp);
          }
          if (val.logType === 'phone') {
            phoneData.push(temp);
          }
          
          completeData.push(temp);
        });
        this.setState({
          completeData: completeData,
          phoneData: phoneData,
          emailData: emailData,
          tableData: completeData,
          loading : false
        });
      });
      /*
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
      */

    }
    showModal = (type) => {
        if(type==="email"){
            this.setState({
                email : true,
              });
        }else
        if(type==="phone"){
            this.setState({
                phone : true,
              });
        }
      
      };
    
      handleOk = type => {    
        notification.destroy()
        if (timeError !== '') {
          notification.error({ message: 'Invalid time' });
        }else
        if(this.state.data.subject == ""){
            notification.error({message : "Please add a subject"})
        }else
        if(this.state.data.body == ""){
            notification.error({message : "Please add a body"})
        }else{
          this.setState({
            disable : true
          })
           
            if(this.state.editEmail || this.state.editPhone){

              let data = this.state.data
              console.log(data)
              if(matterkey == null){
                data.matter = data.matterId
              }
              if(fromKey == null){
                data.from = data.fromId
              }
              if(toKey == null){
                data.to = data.toId
              }
            if(type === "email"){
              data.logType = "email"
              this.setState({email : false})
            }else
            if(type === "phone"){
              data.logType = "phone"
              this.setState({phone : false})
            }
            data.userId = this.props.userId;
            console.log(data)
            api
              .post('/communication/edit/'+ this.state.data.id, data)
              .then((res) => {
                console.log(res)
                this.componentDidMount()
                this.setState({
                  disable : false
                })
                notification.success({ message: 'Log Edited !' });
              })
              .catch((err) => {
                notification.error({ message: 'Failed' });
              })
              .then(() => {
                ReactDOM.findDOMNode(this.messageForm).reset()
                matterkey = null
                fromKey = null
                toKey = null
                
                this.setState({
                  editPhone : false,
                  editEmail: false,
                  disable : false,
                  data: {
                    billable: true,
                    nonBillable: false,
                    date: '',
                    qty: '1.0',
                    rate: '',
                    invoice: 'Unbilled',
                  },
                });
                
               
                setTimeout(() => {
                  //window.location.reload();
                }, 1500)
              });
  

            }else{
              let data = this.state.data
            if(type === "email"){
              data.logType = "email"
              this.setState({email : false})
            }else
            if(type === "phone"){
              data.logType = "phone"
              this.setState({phone : false})
            }
            data.userId = this.props.userId;
            console.log(data)
            api
              .post('/communication/create', data)
              .then((res) => {
                console.log(res)
                this.setState({
                  disable : false
                })
                this.componentDidMount()
                notification.success({ message: 'Log Added !' });
              })
              .catch((err) => {
                notification.error({ message: 'Failed' });
              }).then(()=>{
                
                ReactDOM.findDOMNode(this.messageForm).reset()
              })
             
  
            }
        }   
      };
    
      handleCancel = type => {
        ReactDOM.findDOMNode(this.messageForm).reset()
        matterkey = null
        fromKey = null
        toKey = null
        if(type==="email"){
            this.setState({
                email : false,
                editEmail: false,
                data : {
                  subject : "",
                  body : "",
                  from : name
              },
         
              });
              console.log(this.state)
        }else
        if(type==="phone"){
            this.setState({
                phone : false,
                editPhone: false,
                data : {
                  subject : "",
                  body : "",
                  from : name
              },
              });
              console.log(this.state)
        
        }
        
        setTimeout(() => {
        //  window.location.reload();
        }, 500);
        
       
      
      };

    render(){
      const handleChange = (e) => {
        e.persist();
        this.setState({ touched: false });
        const { name, id, value, selectedIndex } = e.target;
        let newData = this.state.data;

        if (name === 'matter') {

          console.log("inside matter")
          if (selectedIndex >= 1) {
            matterkey = ""
            console.log(matters.data.data[selectedIndex - 1]._id)
            newData[name] = matters.data.data[selectedIndex - 1]._id;
            console.log("inside matter > 1 ")
          } else {
            newData[name] = '';
            console.log("inside matte.....r")
          }

        }else
        if (name === 'to' || name === 'from') {
          console.log(matters)
          if (selectedIndex >= 1) {
            name === 'to' ? toKey = "" : fromKey = ""
            newData[name] = contact.data.data[selectedIndex - 1]._id;
          } else {
            newData[name] = '';
          }

        } else 
         if (name === 'addTime') {
          timeError = '';
          var timeValue = value;
          if (timeValue == '' || timeValue.indexOf(':') < 0) {
            timeError = 'Inavlid Time';
            console.log(timeError);
          } else {
            var sHours = timeValue.split(':')[0];
            var sMinutes = timeValue.split(':')[1];
            var sSecs = timeValue.split(':')[2];
            console.log(sSecs)
            if (sHours == '' || isNaN(sHours) /*|| parseInt(sHours)>23 */) {
              timeError = 'Inavlid Time';
              console.log(timeError);
            } else if (parseInt(sHours) == 0) sHours = '00';
            else if (sHours < 10) sHours = '0' + sHours;
  
            if (sMinutes == '' || isNaN(sMinutes) || parseInt(sMinutes) > 59) {
              timeError = 'Inavlid Time';
              console.log(timeError);
            } else if (parseInt(sMinutes) == 0) sMinutes = '00';
            else if (sMinutes < 10) sMinutes = '0' + sMinutes;
  
            if (sSecs == '' || isNaN(sSecs) /*|| parseInt(sHours)>23 */) {
              timeError = 'Inavlid Time';
              console.log(timeError);
            } else if (parseInt(sSecs) == 0) sSecs = '00';
            else if (sSecs < 10) sSecs = '0' + sSecs;
            timeValue = sHours + ':' + sMinutes +':' + sSecs;
          }
          newData[name] = timeValue;
          this.setState({ data: newData });
        } 
        else 
        {
            console.log("inside last")
            newData[name] = value;
            this.setState({ data: newData });
          }
    
        console.log(this.state);
      };
        const handleEdit = record => {
            
            if(record.logType==="email"){
              this.setState({
                editEmail : true,
                  data : record ,
                });
            }else
            if(record.logType==="phone"){
              this.setState({
                editPhone : true,
                  data : record  
                });
            }
            console.log(record)
                
          }
            
            const handleDelete = record => {
            
              api.get('/communication/delete/'+record.id).then((res)=>{
                this.componentDidMount()
                notification.success({message : "Log Deleted !"})
                setTimeout(()=>{
                  //window.location.reload()
                },1500)
              }).catch((err)=>{
    
                notification.error({message : "Failed to delete"})
              })
              
            }
        const setTableData = (type)=>{
            if(type==="email"){
              this.setState({
                tableData: this.state.emailData,
              });
           }else
           if(type==="phone"){
            this.setState({
              tableData: this.state.phoneData,
            });
            }else
            if(type==="all"){
              this.setState({
                tableData: this.state.completeData,
              });
            }
          }
        const columns = [
            {
                title: 'Hours',
                dataIndex: 'addTime',
                key: 'addTime',
              },
            {
              title: 'Type',
              dataIndex: 'logType',
              key: 'logType',
            },
            {
              title: 'Time',
              dataIndex: 'time',
              key: 'time',
            },
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Subject',
              dataIndex: 'subject',
              key: 'subject',
            },
            {
                title: 'Matter',
                dataIndex: 'matter',
                key: 'matter',
              },
            {
              title: 'From',
              dataIndex: 'from',
              key: 'from',
            },
              {
                title: 'To',
                dataIndex: 'to',
                key: 'to',
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
                        <Popconfirm
                          title="Are you sure delete this task?"
                          onConfirm={()=>handleDelete(record)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button danger>
                              Delete
                          </Button>
                        </Popconfirm>
                          
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
            const headers = [["Hours", "Type","Date and time","Attachment","Matter","From", "To"] ];
           
            let data = []
            /*
            this.state.tableData.map((val, index)=>{
              const td= [val.type , val.qty, val.description , val.billable, val.rate, val.date, val.invoiceStatus]
              data.push(td)
            })*/
          
        
            let content = {
              startY: 50,
              head: headers,
              body: data
            };
        
            doc.text(title, marginLeft, 40);
            doc.autoTable(content);
            doc.save("Activity.pdf")
          }
        return <Spin size="large" spinning = {this.state.loading}>
          <div className='p-2 '>
            
            <br></br>
            <br></br>
            
            <Card title="Communication" bodyStyle={{"padding": "14px 10px 0px 10px"}}extra={<span style={{float : "right"}}>
                <Button className='ml-auto' color='success' onClick={exportPDF}>Export</Button>
                <Button onClick={()=>this.showModal("email")}>New email log</Button>
                <Button onClick={()=>this.showModal("phone")}>New phone log</Button>
                </span>}>
                <div style={{"display": "flex", "flex-wrap": "wrap", "justify-content": "space-between" }}>
                  <div className="mb-2">
                  <Button  onClick={()=>setTableData("all")}>All</Button>
                  <Button onClick={()=>setTableData("email")}>Email</Button>
                  <Button onClick={()=>setTableData("phone")}>Phone</Button>
                  </div>
                </div>
            </Card>
            <Card bodyStyle={{"padding": "0px"}} className="overflow-auto">                
              <Table columns={columns} dataSource={this.state.tableData}  />
            </Card>
           
            <Modal
                title={this.state.editEmail ? "Edit email log" : "Add a email log"}
                visible={this.state.editEmail}
                onOk={()=>this.handleOk("email")}
                onCancel={()=>this.handleCancel("email")}
                footer={[
                  <Button  onClick={()=>this.handleCancel("email")}>
                    Cancel
                  </Button>,
                  <Button type="primary" disabled = {this.state.disable} onClick={()=>this.handleOk("email")}>
                    {this.state.editEmail ? "Edit Log" : "Save Log"}
                  </Button>,
                ]}
                >
                  {
                      this.state.editEmail ?
                      <Form 
                      id='myForm'
                      className="form"
                      ref={ form => this.messageForm = form }>
                       <Row>
                           
                           <Col>
                           <Form.Group>
                       <Form.Label>Matter</Form.Label>
                              <Form.Control 
                                  as="select"
                                  name="matter" 
                                  defaultValue = {this.state.data.matter}
                                  onChange={handleChange}>
                              <option>Select a matter</option>
                              {this.state.option}
                              </Form.Control>
                       </Form.Group>
                           </Col>
                       </Row>
                     
                      <Row>
                          <Col >
                          <Form.Group>
                               <Form.Label>From</Form.Label>
                               <Form.Control 
                                   as="select"
                                   name="from" 
                                   defaultValue = {this.state.data.from}
                                   onChange={handleChange}>
                                   <option>Select a contact</option>    
                               {this.state.contacts}
                               </Form.Control>
                               </Form.Group>
                          </Col>
                          
                          <Col>
                          <Form.Group >
                               <Form.Label>To</Form.Label>
                               <Form.Control 
                                   as="select"
                                   name="to" 
                                   defaultValue = {this.state.data.to}
                                   onChange={handleChange}>
                                   <option>Select a contact</option>
                                   {this.state.contacts}
                               </Form.Control>
                               </Form.Group>
                          </Col>
                      </Row>
                       <Row>
                           <Col>
                           <Form.Group controlId="date">
                              <Form.Label>Time</Form.Label>
                              <Form.Control 
                              required
                              type="time" 
                              name="time" 
                              defaultValue = {this.state.data.time}
                              onChange={handleChange}/>
                          </Form.Group>
                           </Col>
                           <Col>
                           <Form.Group controlId="date">
                              <Form.Label>Date</Form.Label>
                              <Form.Control 
                              required
                              type="date" 
                              name="date" 
                              defaultValue = {this.state.data.date} 
                              onChange={handleChange}/>
                          </Form.Group>
                           </Col>
               
                       </Row>
                     
                      <Form.Group controlId="subject">
                               <Form.Label>Subject</Form.Label>
                               <Form.Control 
                               name="subject" 
                               rows="3"
                               defaultValue = {this.state.data.subject}
                               onChange={handleChange} />
                           </Form.Group>  
                   
                      
                           <Form.Group controlId="body">
                               <Form.Label>Body</Form.Label>
                               <Form.Control 
                               name="body" 
                               as="textarea" 
                               rows="3"
                               defaultValue = {this.state.data.body}
                               onChange={handleChange} />
                           </Form.Group>
                      
                   
                     </Form>    
                  
                      :
                      null
                  }
            </Modal>
            <Modal
                title={this.state.editEmail ? "Edit email log" : "Add a email log"}
                visible={this.state.email}
                onOk={()=>this.handleOk("email")}
                onCancel={()=>this.handleCancel("email")}
                footer={[
                  <Button  onClick={()=>this.handleCancel("email")}>
                    Cancel
                  </Button>,
                  <Button type="primary" disabled = {this.state.disable} onClick={()=>this.handleOk("email")}>
                    {this.state.editEmail ? "Edit Log" : "Save Log"}
                  </Button>,
                ]}
                >
                  {           
        
                      <Form  
                      id='myForm'
                      className="form"
                      ref={ form => this.messageForm = form }>
                       <Row>
                           
                           <Col>
                           <Form.Group>
                       <Form.Label>Matter</Form.Label>
                              <Form.Control 
                                  as="select"
                                  name="matter" 
                                  placeholder="Matter"
                                  onChange={handleChange}>
                              <option>Select a matter</option>
                              {this.state.option}
                              </Form.Control>
                       </Form.Group>
                           </Col>
                       </Row>
                     
                      <Row>
                          <Col >
                          <Form.Group>
                               <Form.Label>From</Form.Label>
                               <Form.Control 
                                   as="select"
                                   name="from" 
                                   placeholder="Select a contact"
                                   onChange={handleChange}>
                              <option>Select a contact</option>    
                             {this.state.contacts}
                               </Form.Control>
                               </Form.Group>
                          </Col>
                          
                          <Col>
                          <Form.Group >
                               <Form.Label>To</Form.Label>
                               <Form.Control 
                                   as="select"
                                   name="to" 
                                   placeholder="Select a contact"
                                   onChange={handleChange}>
                                   <option>Select a contact</option>
                                   {this.state.contacts}
                               </Form.Control>
                               </Form.Group>
                          </Col>
                      </Row>
                       <Row>
                           <Col>
                           <Form.Group controlId="date">
                              <Form.Label>Time</Form.Label>
                              <Form.Control 
                              required
                              type="time" 
                              name="time" 
                              placeholder="Time" 
                              onChange={handleChange}/>
                          </Form.Group>
                           </Col>
                           <Col>
                           <Form.Group controlId="date">
                              <Form.Label>Date</Form.Label>
                              <Form.Control 
                              required
                              type="date" 
                              name="date" 
                              placeholder="Date" 
                              onChange={handleChange}/>
                          </Form.Group>
                           </Col>
               
                       </Row>
                     
                      <Form.Group controlId="subject">
                               <Form.Label>Subject</Form.Label>
                               <Form.Control 
                               name="subject" 
                               rows="3"
                               placeholder="subject"
                               onChange={handleChange} />
                           </Form.Group>  
                   
                      
                           <Form.Group controlId="body">
                               <Form.Label>Body</Form.Label>
                               <Form.Control 
                               name="body" 
                               as="textarea" 
                               rows="3"
                               placeholder="body"
                               onChange={handleChange} />
                           </Form.Group>
                      
                   
                  </Form>    
                   
                  }
            </Modal>
            <Modal
                title={this.state.editPhone ? "Edit phone log" : "Add a phone log"}
                visible={this.state.editPhone}
                onOk={()=>this.handleOk("phone")}
                onCancel={()=>this.handleCancel("phone")}
                footer={[
                  <Button  onClick={()=>this.handleCancel("phone")}>
                    Cancel
                  </Button>,
                  <Button type="primary" disabled = {this.state.disable} onClick={()=>this.handleOk("phone")}>
                    {this.state.editPhone ? "Edit Log" : "Save Log"}
                  </Button>,
                ]}
                >
                {
                
                  <Form 
                  id='myForm'
                  className="form"
                  ref={ form => this.messageForm = form }>
                   <Row>
                       <Col>
                       <Form.Group controlId="duration">
                          <Form.Label>Duration</Form.Label>
                          <Form.Control 
                          type="text" 
                          name="addTime" 
                          defaultValue = {this.state.data.addTime}
                          onChange={handleChange}/>
                      </Form.Group>
                       </Col>
                       <Col>
                       <Form.Group>
                   <Form.Label>Matter</Form.Label>
                          <Form.Control 
                              as="select"
                              name="matter" 
                              defaultValue = {this.state.data.matter}
                              onChange={handleChange}>
                          <option>Select a matter</option>
                          {this.state.option}
                          </Form.Control>
                   </Form.Group>
                       </Col>
                   </Row>
                 
                  <Row>
                      <Col >
                      <Form.Group>
                           <Form.Label>From</Form.Label>
                           <Form.Control 
                               as="select"
                               name="from" 
                               defaultValue = {this.state.data.from}
                               onChange={handleChange}>
                               <option>Select a contact</option> 
                           {this.state.contacts}
                           </Form.Control>
                           </Form.Group>
                      </Col>
                      
                      <Col>
                      <Form.Group >
                           <Form.Label>To</Form.Label>
                           <Form.Control 
                               as="select"
                               name="to" 
                               defaultValue = {this.state.data.to}
                               onChange={handleChange}>
                               <option>Select a contact</option>
                               {this.state.contacts}
                           </Form.Control>
                           </Form.Group>
                      </Col>
                  </Row>
                   <Row>
                       <Col>
                       <Form.Group controlId="date">
                          <Form.Label>Time</Form.Label>
                          <Form.Control 
                          required
                          type="time" 
                          name="time" 
                          defaultValue = {this.state.data.time}
                          onChange={handleChange}/>
                      </Form.Group>
                       </Col>
                       <Col>
                       <Form.Group controlId="date">
                          <Form.Label>Date</Form.Label>
                          <Form.Control 
                          required
                          type="date" 
                          name="date" 
                          defaultValue = {this.state.data.date} 
                          onChange={handleChange}/>
                      </Form.Group>
                       </Col>
           
                   </Row>
                 
                  <Form.Group controlId="subject">
                           <Form.Label>Subject</Form.Label>
                           <Form.Control 
                           name="subject" 
                           rows="3"
                           defaultValue = {this.state.data.subject}
                           onChange={handleChange} />
                       </Form.Group>  
               
                  
                       <Form.Group controlId="body">
                           <Form.Label>Body</Form.Label>
                           <Form.Control 
                           name="body" 
                           as="textarea" 
                           rows="3"
                           defaultValue = {this.state.data.body}
                           onChange={handleChange} />
                       </Form.Group>
                  
               
                  </Form>    
              
               
                }
                  
            </Modal>
            <Modal
                title={this.state.editPhone ? "Edit phone log" : "Add a phone log"}
                visible={this.state.phone}
                onOk={()=>this.handleOk("phone")}
                onCancel={()=>this.handleCancel("phone")}
                footer={[
                  <Button  onClick={()=>this.handleCancel("phone")}>
                    Cancel
                  </Button>,
                  <Button type="primary" disabled = {this.state.disable} onClick={()=>this.handleOk("phone")}>
                    {this.state.editPhone ? "Edit Log" : "Save Log"}
                  </Button>,
                ]}
                >
                {
                 
                  <Form 
                  id='myForm'
                             className="form"
                             ref={ form => this.messageForm = form }>
                   <Row>
                       <Col>
                       <Form.Group controlId="duration">
                          <Form.Label>Duration</Form.Label>
                          <Form.Control 
                          type="text" 
                          name="addTime" 
                          placeholder="hh:mm:ss" 
                          onChange={handleChange}/>
                      </Form.Group>
                       </Col>
                       <Col>
                       <Form.Group>
                   <Form.Label>Matter</Form.Label>
                          <Form.Control 
                              as="select"
                              name="matter" 
                              placeholder="Matter"
                              onChange={handleChange}>
                          <option>Select a matter</option>
                          {this.state.option}
                          </Form.Control>
                   </Form.Group>
                       </Col>
                   </Row>
                 
                  <Row>
                      <Col >
                      <Form.Group>
                           <Form.Label>From</Form.Label>
                           <Form.Control 
                               as="select"
                               name="from" 
                               placeholder="Select a contact"
                               onChange={handleChange}>
                          <option>Select a contact</option>     
                         {this.state.contacts}
                           </Form.Control>
                           </Form.Group>
                      </Col>
                      
                      <Col>
                      <Form.Group >
                           <Form.Label>To</Form.Label>
                           <Form.Control 
                               as="select"
                               name="to" 
                               placeholder="Select a contact"
                               onChange={handleChange}>
                               <option>Select a contact</option>
                               {this.state.contacts}
                           </Form.Control>
                           </Form.Group>
                      </Col>
                  </Row>
                   <Row>
                       <Col>
                       <Form.Group controlId="date">
                          <Form.Label>Time</Form.Label>
                          <Form.Control 
                          required
                          type="time" 
                          name="time" 
                          placeholder="Time" 
                          onChange={handleChange}/>
                      </Form.Group>
                       </Col>
                       <Col>
                       <Form.Group controlId="date">
                          <Form.Label>Date</Form.Label>
                          <Form.Control 
                          required
                          type="date" 
                          name="date" 
                          placeholder="Date" 
                          onChange={handleChange}/>
                      </Form.Group>
                       </Col>
           
                   </Row>
                 
                  <Form.Group controlId="subject">
                           <Form.Label>Subject</Form.Label>
                           <Form.Control 
                           name="subject" 
                           rows="3"
                           placeholder="subject"
                           onChange={handleChange} />
                       </Form.Group>  
               
                  
                       <Form.Group controlId="body">
                           <Form.Label>Body</Form.Label>
                           <Form.Control 
                           name="body" 
                           as="textarea" 
                           rows="3"
                           placeholder="body"
                           onChange={handleChange} />
                       </Form.Group>
                  
               
              </Form>    
                }
                  
            </Modal>
        </div>
        
        </Spin>}
}

const mapStateToProps = (state) => ({
  userId: state.user.token.user._id,
});

export default connect(mapStateToProps)(Communication);
