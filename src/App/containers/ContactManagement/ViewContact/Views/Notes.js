import React, {useState, useEffect, useRef} from 'react';
import { Card, Button, Tabs, Table, Modal, notification, Space, Popconfirm, Spin  } from 'antd';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../../resources/api';
import ReactDOM from 'react-dom'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ExportExcel from './ExportExcel';


const Notes = (props) => {
    const [visible, setVisible] = useState(false)
    const [data, setdata] = useState({})
    const [disable, setdisable] = useState(false)
    const userId = useSelector((state) => state.user.token.user._id);
    const [tableData, settableData] = useState([])
    const [editMode, seteditMode] = useState(false)
    const [record, setrecord] = useState({})
    const [editModal, seteditModal] = useState(false)
    const formRef = useRef(null)
    const [Loading, setLoading] = useState(true)
    let timeError = ""
  
    const fetchNotes = ( ) => {
        console.log(props)
        api.get('/notes/viewforcontact/'+userId + '/' + props.id).then((res)=>{
            console.log(res)
            let notes = []
            res.data.data.map((value , index)=>{
                const temp = {
                    _id : value._id,
                    key : index,
                    notes : value.notes,
                    subject : value.subject,
                    hours : value.hours ? value.hours : "-",
                    date : value.date ? value.date.substring(0,10) : "-"
                }
                notes.push(temp)
            })
            settableData(notes)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchNotes()
    }, [])

    const handleOk = (e) =>{
        e.persist();
        notification.destroy();
        let valid = true
        if (timeError !== '') {
            valid = false
            notification.error({ message: 'Invalid time' });
          }else
        if(data.subject === '' || data.subject === undefined ){
          valid = false
          notification.warning({
            message: 'Please provide a Subject',
          });
        }else
        if(data.notes === '' || data.notes === undefined ){
            valid = false
            notification.warning({
              message: 'Please provide a Note',
            });
          }

        if(valid){
            setdisable(true)
            let notess = data;
            notess.userId = userId
            notess.contact = props.id
            if(editMode){
                api.post('/notes/edit/' + record._id , notess).then((res)=>{
                    console.log(res)
                    fetchNotes()
                    notification.success({message : "Note Edited."})
                }).catch((err)=>{
                    notification.error({message : "Failure"})
                }).then(() => {
                    ReactDOM.findDOMNode(formRef.current).reset()
                    seteditMode(false)
                    seteditModal(false)
                    setdata({})
                    setrecord({})
                    setdisable(false)
                 });
            }else{
                api.post('/notes/create', notess).then((res)=>{
                    console.log(res)
                    fetchNotes()
                    notification.success({message : "Note created."})
                }).catch((err)=>{
                    notification.error({message : "Failure"})
                }).then(() => {
                    ReactDOM.findDOMNode(formRef.current).reset()
                    setVisible(false)
                    setdata({})
                    setrecord({})
                    setdisable(false)
                 });
            }

        }
    }

    const handleCancel = (e) =>{
        
        seteditMode(false)
        seteditModal(false)
        setVisible(false);
        ReactDOM.findDOMNode(formRef.current).reset()
    }

    const handleDelete = record => {
        api.get('/notes/delete/' + record._id).then((res)=>{
        console.log(res)
          fetchNotes()
          notification.success({message : "Note Deleted !"})
        
        }).catch((err)=>{

          notification.error({message : "Failed to delete"})
        })
        
      }

      const handleEdit = (record) => {
        seteditMode(true)
        seteditModal(true)
        setrecord(record)
        setdata(record)
        console.log(record)
      };

    const columnsNotes = [
        {
            title: 'Hours',
            dataIndex: 'hours',
            key: '1',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: '2',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: '3',
        },
        {
            title: 'Note',
            dataIndex: 'notes',
            key: '4',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: '5',
            render:(_,record)=>{
                return (
                    <Button onClick = {()=>handleEdit(record)} >
                        Edit
                    </Button>
                )
            }
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: '5',
            render:(_,record)=>{
                return (
                  <Popconfirm
                    title="Are you sure delete this Note?"
                    onConfirm={() => handleDelete(record)}
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
    ]

    const handleChange=(e)=>{
        e.persist()
        const { name, id, value , selectedIndex} = e.target
        let newData = data
        if (name === 'hours') {
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
             // else if (sHours < 10) sHours = '0' + sHours;
    
              if (sMinutes == '' || isNaN(sMinutes) || parseInt(sMinutes) > 59) {
                timeError = 'Inavlid Time';
                console.log(timeError);
              } else if (parseInt(sMinutes) == 0) sMinutes = '00';
             // else if (sMinutes < 10) sMinutes = '0' + sMinutes;
    
              if (sSecs == '' || isNaN(sSecs) /*|| parseInt(sHours)>23 */) {
                timeError = 'Inavlid Time';
                console.log(timeError);
              } else if (parseInt(sSecs) == 0) sSecs = '00';
             // else if (sSecs < 10) sSecs = '0' + sSecs;
              timeValue = sHours + ':' + sMinutes +':' + sSecs;
            }
            newData[name] = timeValue;
            
          }else{
            newData[name] = value
          }
       
        setdata(newData)
        console.log(data)
    }
    
    const exportPDF = () => {
      console.log(tableData.length)
      if(tableData.length == 0 ){
        notification.warning({message : "Please add notes before exporting"})
      }else{
        const unit = 'pt';
        const size = 'A4'; // Use A1, A2, A3 or A4
        const orientation = 'portrait'; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = 'Notes';
        const headers = [['Hours','Subject', 'Note', 'Date']];
    
        let data = [];
        tableData.map((val, index) => {
          const td = [val.hours, val.subject, val.note , val.date];
          data.push(td);
        });
    
        let content = {
          startY: 50,
          head: headers,
          body: data,
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save('notes.pdf');
      }
    };

    return(
      <Spin spinning={Loading} size = "large">
        <div>
            <Card
                title="Notes"
                className="mb-4"
                extra={
                    <div className="d-flex justify-content-center">
                    <button
                        className="ml-auto btn  btn-outline-primary   btn-sm"
                        onClick={exportPDF}
                    >
                        Export to Pdf
                    </button>
                    <ExportExcel dataSource={tableData || []} />
                    <button
                        className="ml-auto btn  btn-outline-primary   btn-sm"
                        onClick={()=> setVisible(true)}
                    >
                        Add Notes
                    </button>
                
                    </div>
                 
                }
            >
                <Table dataSource={tableData}  columns={columnsNotes}/>
            </Card>
            <Modal
                title="New Note"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button  onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button type="primary" disabled = {disable} onClick={handleOk}>
                      Create
                    </Button>,
                  ]}
            >
                <Form
                 id='myForm'
                 className="form"
                 ref={ formRef } 
                 className="form-details">
                     <Form.Group controlId="duration">
                        <Form.Label>Hours</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="hours" 
                        placeholder = "hh:mm:ss"
                        //defaultValue = {this.state.data.time}
                        onChange={handleChange}/>
                     </Form.Group>   
                    <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                         name="subject" 
                         type="text"
                         placeholder = "Subject"
                         onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Note</Form.Label>
                        <Form.Control 
                        name="notes" 
                        as="textarea" 
                        rows="4"
                        placeholder = "Note"
                        onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                        name="date" 
                        type="date" 
                        onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal>
            <Modal
                title="Edit Note"
                visible={editModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button  onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button type="primary" disabled = {disable} onClick={handleOk}>
                      Save
                    </Button>,
                  ]}
            >
                <Form 
                  id='myForm'
                  className="form"
                  ref={ formRef }
                  className="form-details">
                      <Form.Group controlId="duration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control 
                        type="text" 
                        name="hours" 
                        defaultValue = {record.hours}
                        onChange={handleChange}/>
                     </Form.Group>
                    <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control 
                        name="subject" 
                        type="text" 
                        defaultValue = {record.subject} 
                        onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Note</Form.Label>
                        <Form.Control name="notes" as="textarea" rows="4" defaultValue = {record.notes} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control name="date" type="date" defaultValue = {record.date} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal>
        </div>
   
      </Spin>
         )
}
export default Notes