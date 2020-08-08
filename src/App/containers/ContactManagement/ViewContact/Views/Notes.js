import React, {useState, useEffect} from 'react';
import { Card, Button, Tabs, Table, Modal, notification, Space, Popconfirm  } from 'antd';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../../resources/api';
import ReactDOM from 'react-dom'

const Notes = (props) => {
    const [visible, setVisible] = useState(false)
    const [data, setdata] = useState({})
    const [disable, setdisable] = useState(false)
    const userId = useSelector((state) => state.user.token.user._id);
    const [tableData, settableData] = useState([])
    const [editMode, seteditMode] = useState(false)
    const [record, setrecord] = useState({})
    const [editModal, seteditModal] = useState(false)
  
    const fetchNotes = ( ) => {
        api.get('/activity/viewformatter/'+userId+'/'+ props.id).then((res)=>{
            console.log(res)
            let notes = []
            res.data.data.map((value , index)=>{
                const temp = {
                    _id : value._id,
                    key : index,
                    notes : value.notes,
                    subject : value.subject,
                    date : value.date
                }
                notes.push(temp)
            })
            settableData(notes)
        })
    }
    useEffect(() => {
        fetchNotes()
    }, [])

    const handleOk = (e) =>{
        e.persist();
        notification.destroy();
        let valid = true
      
        if(data.subject === '' || data.subject === undefined ){
          valid = false
          notification.warning({
            message: 'Please provide a Subject',
          });
        }
        if(data.note === '' || data.note === undefined ){
            valid = false
            notification.warning({
              message: 'Please provide a Note',
            });
          }
        if(valid){
            let notess = data;
            notess.userId = userId
            notess.matter = props.id
            if(editMode){
                api.post('/notes/edit/' + record._id , notess).then((res)=>{
                    console.log(res)
                    fetchNotes()
                    notification.success({message : "Note Edited."})
                }).catch((err)=>{
                    notification.error({message : "Failure"})
                }).then(() => {
                    ReactDOM.findDOMNode(this.messageForm).reset()
                    seteditMode(false)
                    seteditModal(false)
                    setdata({})
                    setrecord({})
                 });
            }else{
                api.post('/notes/create', notess).then((res)=>{
                    console.log(res)
                    fetchNotes()
                    notification.success({message : "Note created."})
                }).catch((err)=>{
                    notification.error({message : "Failure"})
                }).then(() => {
                    ReactDOM.findDOMNode(this.messageForm).reset()
                    setVisible(false)
                    setdata({})
                    setrecord({})
                 });
            }

        }
    }

    const handleCancel = (e) =>{
        seteditMode(false)
        seteditModal(false)
        setVisible(false);
    }

    const handleDelete = record => {
        api.get('/notes/delete/' + record.id).then((res)=>{
          fetchNotes()
          notification.success({message : "Note Deleted !"})
        
        }).catch((err)=>{

          notification.error({message : "Failed to delete"})
        })
        
      }

      const handleEdit = (record) => {
        seteditMode(true)
        setrecord(record)
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
            dataIndex: 'note',
            key: '4',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: '5',
            render:(_,record)=>{
                return (
                    <Button variant='danger'>
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
                    <Button variant='danger'>
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
        newData[name] = value
        setdata(newData)
        console.log(data)
    }
    
    

    return(
        <div>
            <Card
                title="Notes"
                className="mb-4"
                extra={
                    <span style={{ float: 'right' }}>
                        <Button onClick={()=> setVisible(true)}>
                            New Notes
                        </Button>
                    </span> 
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
                 ref={ form => this.messageForm = form } 
                 className="form-details">
                    <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control name="subject" type="text" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Note</Form.Label>
                        <Form.Control name="notes" as="textarea" rows="4" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control name="date" type="date" onChange={handleChange} />
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
                      Edit
                    </Button>,
                  ]}
            >
                <Form 
                  id='myForm'
                  className="form"
                  ref={ form => this.messageForm = form }
                  className="form-details">
                    <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control name="subject" type="text" defaultValue = {record.subject} onChange={handleChange}/>
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
    )
}
export default Notes