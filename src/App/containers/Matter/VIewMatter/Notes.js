import React, {useState} from 'react';
import { Card, Button, Tabs, Table, Modal, notification, Space, Popconfirm  } from 'antd';
import { Form } from 'react-bootstrap';

const Notes = (props) => {
    const [visible, setVisible] = useState(false)
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

    const handleOk = (e) =>{
        setVisible(false);
    }

    const handleCancel = (e) =>{
        setVisible(false);
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
                <Table  columns={columnsNotes}/>
            </Card>
            <Modal
                title="New Note"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form className="form-details">
                    <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control name="Subject" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Note</Form.Label>
                        <Form.Control as="textarea" rows="4" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control name="date" type="date" />
                    </Form.Group>
                </Form>
            </Modal>
        </div>
    )
}
export default Notes