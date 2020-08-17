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
  Popconfirm,
  Spin
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import api from '../../../resources/api';
import { findLast } from 'lodash';
const { Option } = Select;

//matters={props.location.state.matters}
// userId={props.location.state.userId}
// matterId={props.location.state.id}

const Documents = () => {
  const [docs, setDocs] = useState([]);
  const [Disable, setDisable] = useState(false)
  const [viewUpload, setViewUpload] = useState(false);
  const [Loading, setLoading] = useState(true)
  const [uploadData, setUploadData] = useState({
    document: '',
    _id: '',
    name: '',
    matter: '',
    contact: '',
    category: '',
  });
  const [modalFor, setModalFor] = useState('Upload');
  const userId = useSelector((state) => state.user.token.user._id);
  const [matters, setMatters] = useState([]);

  const columnsForDocuments = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: '1',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.name.length - b.name.length,
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
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.receivedDate > b.receivedDate,
    },
    {
      title: 'Last Edit',
      dataIndex: 'lastEdit',
      key: '5',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.lastEdit > b.lastEdit,
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
          <Popconfirm
                    title="Are you sure delete this Document?"
                    onConfirm={()=>deleteHandler(record._id)}
                    onCancel={()=>{}}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      className=" btn-outline-danger "
                    >
                      Delete
                    </Button>
                  </Popconfirm>
          
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
              downloadHandler(record);
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
    console.log(item)
    console.log(e)
    if (item === 'document') {
      setUploadData({ ...uploadData, document: e.target.files[0] });
    } else {
      if (item === 'matter') {
        if(modalFor === "Upload"){
          console.log("from the uploads")
          uploadData[`${item}`] = e;
          setUploadData({ ...uploadData });
          getMatterById(e);
        }else{
          console.log("from the edits")
          api.get(`/matter/view/${e}`).then((res) => {
            uploadData[`${item}`] = res.data.data ;
            setUploadData({ ...uploadData });
            getMatterById(e);
            });
        }
      } else {
        uploadData[`${item}`] = e.target.value;
        setUploadData({ ...uploadData });
      }
    }
    console.log(uploadData)
  };
  const getISTDate = (dateInUTC) => {
    var localDate = new Date(dateInUTC);
    return localDate.toLocaleString();
  };
  const getMatterById = async (matterId) => {
    await api.get(`/matter/view/${matterId}`).then((res) => {
      let data = res.data.data.client !== null ? res.data.data.client._id : '-';
      setUploadData({ ...uploadData, contact: data });
    });
  };
  const getDocuments = async () => {
    let tempDocs = [];
    await api.get(`/document/viewforuser/${userId}`).then((res) => {
      console.log(res.data.data)
      res.data.data.map((item, index) => {
        tempDocs = [
          ...tempDocs,
          {
            ...item,
            key: item._id,
            matter: item.matter !== null ? item.matter.matterDescription : '-',
            receivedDate: getISTDate(item.receivedDate),
            lastEdit: getISTDate(item.lastEdit),
          },
        ];
      });
    });
    setDocs(tempDocs);
    setLoading(false)
    tempDocs = [];
    await api.get(`/matter/viewforuser/${userId}`).then((res) => {
      res.data.data.map((item) => {
        tempDocs = [
          ...tempDocs,
          {
            ...item,
            key: item._id,
            client:
              item.client === null
                ? {
                    _id: '',
                    updated_at: '',
                    created_at: '-',
                    userId: '-',
                    title: '-',
                    lastName: '-',
                    firstName: '',
                    __v: 0,
                    image: '',
                    customFields: [
                      {
                        Email: '-',
                      },
                    ],
                    address: [],
                    website: [],
                    phone: [],
                    emailAddress: [],
                    company: ['-'],
                  }
                : item.client,
          },
        ];
      });
    });
    setMatters(tempDocs);
  };

  const handleSubmit = async () => {
    
    if(uploadData.category === ''){
      notification.warning({
        message : "Please provide a category."
      })
    }else
    if(uploadData.contact === ''){
      notification.warning({
        message : "Please provide a contact."
      })
    }else
    if(uploadData.document === '' ){
      notification.warning({
        message : "Please provide a document."
      })
    }else
    if(uploadData.matter === '' ){
      notification.warning({
        message : "Please provide a matter."
      })
    }else
    if(uploadData.name === ''){
      notification.warning({
        message : "Please provide a name."
      })
    }
    else{
      setDisable(true)
      var docFormData = new FormData();
    docFormData.set('document', uploadData.document);
    docFormData.set('name', uploadData.name);
    docFormData.set('matter', uploadData.matter);
    docFormData.set('contact', uploadData.contact);
    docFormData.set('category', uploadData.category);
    docFormData.set('userId', userId);
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
      setDisable(false)
    }, 600);
    }
    
  };

  const downloadHandler = async (record) => {
    window.open(record.document);
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
    if(uploadData.category === ''){
      notification.warning({
        message : "Please provide a category."
      })
    }else
    if(uploadData.contact === ''){
      notification.warning({
        message : "Please provide a contact."
      })
    }else
    if(uploadData.document === '' ){
      notification.warning({
        message : "Please provide a document."
      })
    }else
    if(uploadData.matter === '' ){
      notification.warning({
        message : "Please provide a matter."
      })
    }else
    if(uploadData.name === ''){
      notification.warning({
        message : "Please provide a name."
      })
    }
    else{
      setModalFor('Edit');
      setViewUpload(true);
      await api.get(`/document/view/${docId}`).then((response) => {
        
        setUploadData(response.data.data);
      });
    }

   
  };

  const handleEdit = async () => {
    setDisable(true)
    await api
      .post(`/document/edit/${uploadData._id}`, uploadData)
      .then(function (response) {
        notification.success({ message: 'Document edited.' });
        setDisable(false)
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
          disabled={Disable}
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
            value:
              modalFor === 'Edit' ? uploadData.matter._id : uploadData.matter,
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
            {matters.map((item, index) => (
              <Option key={index} value={item._id}>
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
             // value={uploadData.document}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
  return (
    <Spin size = "large" spinning={Loading}>
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
 
    </Spin>
     );
};

export default Documents;
