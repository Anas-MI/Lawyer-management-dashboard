import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Card, notification } from 'antd';
import { useHistory } from 'react-router-dom';
// import { UploadOutlined } from '@ant-design/icons';
import api from '../../../resources/api';
import { flatMap } from 'lodash';
import { ThemeProvider } from 'react-bootstrap';

const HelpForm = () => {
  const history = useHistory();
  const [disable, setdisable] = useState(false)
  const user = useSelector((state) => state.user.token.user);
  const [ticketData, setTicketData] = useState({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddress,
    subject: '',
    issue: "",
    attachment: '',
    url: '',
  });
  // console.log(user._id);

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 14,
    },
  };
  const [form] = Form.useForm();

  const handleInput = (item) => (e) => {
    if (item === 'attachment') {
      setTicketData({ ...ticketData, attachment: e.target.files[0] });
    } else {
      ticketData[`${item}`] = e.target.value;
      setTicketData({ ...ticketData });
    }
  };

  const handleSubmit = async () => {
    notification.destroy()
    /*
    if(ticketData.firstName=== "" || ticketData.lastName === ""){
      notification.warning({
        message : "Please provide first name and last name"
      })
    }
    */
   console.log(ticketData)
   let valid = true
   if(ticketData.issue === ""){
     valid = false
      notification.warning({
        message : "Please provide a issue"
      })
    }else
    if(ticketData.subject === ""){
      valid = false
       notification.warning({
         message : "Please provide a subject"
       })
     }else
     if(ticketData.attachment === ""){
      console.log("yha pe bhi aa rha he")
      valid = false
       notification.warning({
         message : "Please provide a Attachment"
       })
     }else
    if(valid){
      setdisable(true)
      console.log('submit', ticketData);
    var formData = new FormData();
    formData.set('firstName', ticketData.firstName);
    formData.set('lastName', ticketData.lastName);
    formData.set('email', ticketData.firstName);
    formData.set('userId', ticketData.userId);
    formData.set('issue', ticketData.issue);
    formData.set('subject', ticketData.subject);
    formData.set('document', ticketData.attachment);
    console.log(formData.values);
    await api
      .post('/ticket/create/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(function (response) {
        setdisable(false)
        history.goBack();
        notification.success({ message: 'Ticket Generated.' });
      })
      .catch(function (response) {
        setdisable(false)
        notification.error({ message: 'Ticket Generation Failed.' });
      });
    }
  };

  return (
    <Card title="Create a new ticket">
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        initialValues={{
          remember: true,
        }}
        fields={[
          {
            name: ['firstName'],
            value: ticketData.firstName,
          },
          {
            name: ['lastName'],
            value: ticketData.lastName,
          },
          {
            name: ['email'],
            value: ticketData.email,
          },
          {
            name: ['subject'],
            value: ticketData.subject,
          },
          {
            name: ['issue'],
            value: ticketData.issue,
          },

          {
            name: ['url'],
            value: ticketData.url,
          },
        ]}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="subject"
          label="Subject"
          rules={[
            {
              required: true,
              message: 'Please write your Subject !',
            },
          ]}
        >
          <Input onChange={handleInput('subject')} />
        </Form.Item>
        <Form.Item
          name="issue"
          label="Issue"
          rules={[
            {
              required: true,
              message: 'Please explain your full Issue!',
            },
          ]}
        >
          <Input onChange={handleInput('issue')} />
        </Form.Item>
        <Form.Item name="attachment" label="Attachment">
          <Input
            type="file"
            onChange={handleInput('attachment')}
            value={ticketData.attachment}
          />
        </Form.Item>
        <Form.Item name="url" label="Url">
          <Input onChange={handleInput('url')} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button 
          disabled = {disable}
          type="primary" 
          htmlType="submit" 
          onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            htmlType="button"
            onClick={() => {
              history.goBack();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default HelpForm;
