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
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';

import api from '../../../../resources/api';
const { Option } = Select;

const Documents = (props) => {
  const [docs, setDocs] = useState([]);
  const [viewUpload, setViewUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    document: '',
    _id: '',
    name: '',
    matter: '',
    category: '',
  });
  const [modalFor, setModalFor] = useState('Upload');

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
              deleteHandler(record._id);
            }}
          >
            Delete
          </Button>
        );
      },
    },
    {
      title: 'Download',
      dataIndex: 'download',
      key: '8',
      render: (_, record) => {
        return (
          <Button
            className="btn-outline-primary "
            onClick={() => {
              downloadHandler(record.id);
            }}
            icon={<DownloadOutlined />}
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
    let tempDocs = [];
    await api
      .get(`/document/viewformatter/${props.userId}/${props.matterId}`)
      .then((res) => {
        // setDocs(res.data.data);
        res.data.data.map((item, index) => {
          tempDocs = [
            ...tempDocs,
            {
              ...item,
              key: item._id,
              matter: item.matter.matterDescription,
            },
          ];
        });
      });
    setDocs(tempDocs);
  };

  const handleSubmit = async () => {
    var docFormData = new FormData();
    docFormData.set('document', uploadData.document);
    docFormData.set('name', uploadData.name);
    docFormData.set('matter', uploadData.matter);
    docFormData.set('category', uploadData.category);
    docFormData.set('userId', props.userId);
    await api
      .post('/document/upload/934894383948u43', docFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(function (response) {
        notification.success({ message: 'Document Uploaded.' });
        getDocuments();
      })
      .catch(function (response) {
        notification.error({ message: 'Document Upload Failed.' });
      });
    setTimeout(() => {
      setViewUpload(false);
    }, 600);
  };

  const downloadHandler = async (docId) => {
    window.open(docs.filter((item) => item.id === docId)[0].document);
  };

  const deleteHandler = async (docId) => {
    await api
      .get(`/document/delete/${docId}`)
      .then((res) => {
        notification.success({ message: 'Document Deleted SuccessFully.' });
        getDocuments();
      })
      .catch((res) => {
        notification.error({ message: 'Document Deletion Failed.' });
      });
  };
  const editHandler = async (docId) => {
    setModalFor('Edit');
    setViewUpload(true);
    await api.get(`/document/view/${docId}`, uploadData).then((response) => {
      setUploadData(response.data.data);
    });
  };

  const handleEdit = async () => {
    await api
      .post(`/document/edit/${uploadData._id}`, uploadData)
      .then(function (response) {
        notification.success({ message: 'Document Uploaded.' });
        getDocuments();
      })
      .catch(function (response) {
        notification.error({ message: 'Document Upload Failed.' });
      });
    setTimeout(() => {
      setViewUpload(false);
    }, 600);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  const uploadForm = () => (
    <Modal
      title={` ${modalFor} Document`}
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
          onClick={modalFor === 'Upload' ? handleSubmit : handleEdit}
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
            name: ['name'],
            value: uploadData.name,
          },
          {
            name: ['category'],
            value: uploadData.category,
          },
          {
            name: ['matter'],
            value: uploadData.matter._id,
          }, //todo
        ]}
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
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          <Input onChange={handleInput('category')} />
        </Form.Item>
        {modalFor === 'Upload' && (
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
        )}
      </Form>
    </Modal>
  );
  return (
    <Card
      title="Document"
      extra={
        <span style={{ float: 'right' }} className="">
          <Button
            onClick={() => {
              setUploadData({
                document: '',
                _id: '',
                name: '',
                matter: '',
                category: '',
              }); //todo

              setViewUpload(true);
              setModalFor('Upload');
            }}
          >
            Upload
          </Button>
        </span>
      }
    >
      {uploadForm()}
      <Table dataSource={docs} columns={columnsForDocuments} />
    </Card>
  );
};

export default Documents;
