import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  notification,
  Modal,
  Input,
  Form,
  Select,
} from 'antd';

import api from '../../../../resources/api';
const { Option } = Select;

const Documents = (props) => {
  const [docs, setDocs] = useState([]);
  const [viewUpload, setViewUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    document: '',
    name: '',
    matter: '',
    category: '',
  });

  const columnsForDocuments = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: '1',
    },
    {
      title: 'Matter',
      dataIndex: 'matter',
      key: '2',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: '3',
    },
    {
      title: 'Received Date',
      dataIndex: 'receivedDate',
      key: '4',
    },
    {
      title: 'Last Edit',
      dataIndex: 'lastEdit',
      key: '5',
    },
    {
      title: 'Action',
      dataIndex: 'download',
      key: '6',
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              downloadHandler(record.id);
            }}
          >
            Download
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
    if (item === 'document') {
      setUploadData({ ...uploadData, document: e.target.files[0] });
    } else {
      uploadData[`${item}`] = item === 'matter' ? e : e.target.value;

      setUploadData({ ...uploadData });
    }
  };

  const getDocuments = async () => {
    console.log('user matter', props.userId, props.matterId);
    await api
      .get(`/document/viewformatter/${props.userId}/${props.matterId}`)
      .then((res) =>
        res.data.data.map((item, index) =>
          setDocs([
            ...docs,
            {
              key: index,
              id: item._id,
              name: item.name,
              matterDetail: item.matter,
              matter: item.matter.matterDescription,
              category: item.category,
              receivedDate: `${item.receivedDate.substring(
                0,
                10
              )}  ${item.receivedDate.substring(12, 19)}`,
              lastEdit: `${item.lastEdit.substring(
                0,
                10
              )}  ${item.lastEdit.substring(12, 19)}`,
              document: item.document,
            },
          ])
        )
      );
  };

  const handleSubmit = async () => {
    var docFormData = new FormData();
    docFormData.set('document', uploadData.document);
    docFormData.set('name', uploadData.name);
    docFormData.set('matter', uploadData.matter);
    docFormData.set('category', uploadData.category);
    await api
      .post('/document/upload/934894383948u43', docFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(function (response) {
        setUploadData({
          document: '',
          name: '',
          matter: '',
          category: '',
        });
        notification.success({ message: 'Document Uploaded.' });
      })
      .catch(function (response) {
        notification.warning({ message: 'Document Upload Failed.' });
      });
    setTimeout(() => {
      setViewUpload(false);
    }, 600);
  };

  const downloadHandler = async (docId) => {
    window.open(docs.filter((item) => item.id === docId)[0].document);
  };

  useEffect(() => {
    getDocuments();
  }, []);
  return (
    <Card
      title="Document"
      extra={
        <span style={{ float: 'right' }} className="">
          <Button onClick={() => setViewUpload(true)}>Upload</Button>
          <Modal
            title="Upload Document"
            visible={viewUpload}
            onCancel={() => setViewUpload(false)}
            footer={[
              <Button key="back" onClick={() => setViewUpload(false)}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>,
            ]}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                key="name"
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input name!',
                  },
                ]}
              >
                <Input onChange={handleInput('name')} value={uploadData.name} />
              </Form.Item>

              <Form.Item
                key="matter"
                label="Matter"
                name="matter"
                rules={[
                  {
                    required: true,
                    message: 'Please input matter',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a Matter"
                  optionFilterProp="children"
                  onChange={handleInput('matter')}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.matters.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.matterDescription}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                key="category"
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: 'Please input category',
                  },
                ]}
              >
                <Input
                  onChange={handleInput('category')}
                  value={uploadData.category}
                />
              </Form.Item>
              <Form.Item
                key="document"
                label="Document"
                name="document"
                rules={[
                  {
                    required: true,
                    message: 'Please input your File!',
                  },
                ]}
              >
                <Input
                  type="file"
                  onChange={handleInput('document')}
                  value={uploadData.document}
                />
              </Form.Item>
            </Form>
          </Modal>
        </span>
      }
    >
      <Table dataSource={docs} columns={columnsForDocuments} />
    </Card>
  );
};

export default Documents;
