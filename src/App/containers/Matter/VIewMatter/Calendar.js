import React, { useState, useEffect } from 'react';
import api from '../../../../resources/api';
import {
  Card,
  Modal,
  Form,
  Table,
  Button,
  notification,
  Input,
  Checkbox,
} from 'antd';

export default function Calendar(props) {
  const [calendar, setCalendar] = useState([]);
  const [visible, setVisible] = useState(false);
  const [calEvent, setcalEvent] = useState({
    id: '',
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    type: '',
    location: '',
    matter: props.matterId,
    userId: props.userId,
    notification: 'true',
    email: 'true',
    timeForReminder: '',
    description: '',
  });
  const [modalFor, setModalFor] = useState('Add');

  const columns = [
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: '1',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.startDate > b.startDate,
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: '1',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.startTime > b.startTime,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: '2',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.endDate > b.endDate,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: '3',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.endTime > b.endTime,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: '4',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: '5',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: '6',
      render: (_, record) => {
        return (
          <Button
            className="btn-outline-info "
            onClick={() => {
              editHandler(record._id);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: '7',
      render: (_, record) => {
        return (
          <Button
            className=" btn-outline-danger "
            onClick={() => {
              handleDelete(record._id);
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const handleInput = (item) => (e) => {
    calEvent[`${item}`] =
      item === 'email' || item === 'notification'
        ? e.target.checked
        : e.target.value;
    setcalEvent({ ...calEvent });
  };
  const handleEdit = async () => {
    await api
      .post(`/calendar/update/${calEvent.id}`, calEvent)
      .then(function (response) {
        notification.success({ message: 'Event Updated.' });
        getCalendar();
      })
      .catch(function (response) {
        notification.error({ message: 'Event Update Failed.' });
      });
    setTimeout(() => {
      setVisible(false);
    }, 600);
  };

  const handleDelete = async (id) => {
    await api
      .get(`/calendar/delete/${id}`)
      .then((res) => {
        getCalendar();
        notification.success({ message: 'Event Deleted SuccessFully.' });
      })
      .catch((err) =>
        notification.success({ message: 'Event Deletion Failed.' })
      );
  };

  const handleSubmit = async () => {
    await api
      .post('/calendar/create', calEvent)
      .then((res) => {
        notification.success({ message: 'Event Added.' });
        console.log(res);

        getCalendar();
      })
      .catch((err) => {
        notification.error({ message: 'Event Addition Failed.' });
        console.log(err);
      });
    setTimeout(() => {
      setVisible(false);
    }, 600);
  };

  const editHandler = async (docId) => {
    setVisible(true);
    setModalFor('Edit');
    await api.get(`/calendar/view/${docId}`).then((response) => {
      console.log('updateDate', response.data.data);
      setcalEvent({ ...response.data.data, id: docId });
    });
  };
  const modalForm = () => (
    <Modal
      title={` ${modalFor} Event`}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={[
        <Button key="back" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={modalFor === 'Add' ? handleSubmit : handleEdit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        {...layout}
        name="basic"
        fields={[
          {
            name: 'title',
            value: calEvent.title,
          },
          {
            name: 'description',
            value: calEvent.description,
          },
          {
            name: ['startDate'],
            value: calEvent.startDate,
          },
          {
            name: ['startTime'],
            value: calEvent.startTime,
          },
          {
            name: ['endDate'],
            value: calEvent.endDate,
          },
          {
            name: ['endTime'],
            value: calEvent.endTime,
          },
          {
            name: ['type'],
            value: calEvent.type,
          },
          {
            name: ['location'],
            value: calEvent.location,
          },
          {
            name: ['notification'],
            checked: calEvent.notification,
          },
          {
            name: ['email'],
            checked: calEvent.email,
          },
          {
            name: ['timeForReminder'],
            value: calEvent.timeForReminder,
          },
        ]}
      >
        <Form.Item key="title" label="Title" name="title">
          <Input onChange={handleInput('title')} />
        </Form.Item>
        <Form.Item key="description" label="Description" name="description">
          <Input onChange={handleInput('description')} />
        </Form.Item>
        <Form.Item key="startDate" label="Start Date" name="startDate">
          <Input type="Date" onChange={handleInput('startDate')} />
        </Form.Item>
        <Form.Item key="startTime" label="Start Time" name="startTime">
          <Input type="Time" onChange={handleInput('startTime')} />
        </Form.Item>
        <Form.Item key="endDate" label="End Date" name="EndDate">
          <Input type="Date" onChange={handleInput('endDate')} />
        </Form.Item>
        <Form.Item key="endTime" label="End Time" name="endTime">
          <Input type="Time" onChange={handleInput('endTime')} />
        </Form.Item>
        <Form.Item
          key="timeForReminder"
          label="Time For Reminder"
          name="timeForReminder"
        >
          <Input type="Time" onChange={handleInput('timeForReminder')} />
        </Form.Item>
        <Form.Item key="location" label="Location" name="location">
          <Input onChange={handleInput('location')} />
        </Form.Item>
        <Form.Item key="type" label="Type" name="type">
          <Input onChange={handleInput('type')} />
        </Form.Item>
        <Form.Item key="text" label="Get Notified on" name="text"></Form.Item>
        <Form.Item key="email" label="Email" name="email">
          <Checkbox defaultChecked onChange={handleInput('email')} />
        </Form.Item>
        <Form.Item key="notification" label="Notification" name="notification">
          <Checkbox defaultChecked onChange={handleInput('notification')} />
        </Form.Item>
      </Form>
    </Modal>
  );

  const getCalendar = async () => {
    let cal = [];
    await api
      .get(`/calendar/viewforuser/${props.userId}`)
      .then((res) => {
        res.data.data
          .filter(
            (item) =>
              item.matter !== null &&
              item.matter !== undefined &&
              item.matter._id === props.matterId
          )
          .map((item, index) => {
            cal = [...cal, { ...item, key: index }];
          });
      })
      .catch((err) => console.log(err));
    setCalendar(cal);
  };

  useEffect(() => {
    getCalendar();
  }, []);

  return (
    <div>
      <Card
        title="Calendar"
        extra={
          <span style={{ float: 'right' }}>
            <Button
              onClick={() => {
                setVisible(true);
                setModalFor('Add');
                setcalEvent({
                  id: '',
                  title: '',
                  startDate: '',
                  startTime: '',
                  endDate: '',
                  endTime: '',
                  type: '',
                  location: '',
                  matter: props.matterId,
                  userId: props.userId,
                  notification: 'true',
                  email: 'true',
                  timeForReminder: '',
                  description: '',
                });
              }}
            >
              Add +
            </Button>
          </span>
        }
      >
        {modalForm()}
        <Table dataSource={calendar} columns={columns} />
      </Card>
    </div>
  );
}
