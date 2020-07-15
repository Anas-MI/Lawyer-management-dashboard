import React from 'react';
import { Form, Input, Button, Card, Upload } from 'antd';

const HelpForm = () => {
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

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();

    form.setFieldsValue({
      fName: 'Akshat',
      lName: 'Aggarwal',
      email: 'a@gmail.com',
    });
  };

  form.setFieldsValue({
    fName: 'Akshat',
    lName: 'Aggarwal',
    email: 'a@gmail.com',
  });
  return (
    <Card title="Create a new ticket">
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="fName"
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lName"
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
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
          <Input />
        </Form.Item>
        <Form.Item
          name="subject"
          label="Subject"
          value="Ant Design"
          rules={[
            {
              required: true,
              message: "Please write your issue'Subject !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="issue"
          label="Issue"
          rules={[
            {
              required: true,
              message: 'Please write your issue!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="attachment" label="Attachment">
          <Upload>
            <Button>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="url" label="Url">
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default HelpForm;
