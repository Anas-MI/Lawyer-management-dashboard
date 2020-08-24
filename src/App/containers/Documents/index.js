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
  Spin,
  Tabs,
  Menu,
  Dropdown,
  Space
} from 'antd';
import { DownOutlined , FolderTwoTone, DownloadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import api from '../../../resources/api';
import { findLast } from 'lodash';
const { Option } = Select;
const { TabPane } = Tabs;

//matters={props.location.state.matters}
// userId={props.location.state.userId}
// matterId={props.location.state.id}

const Documents = (props) => {
  
  const [docs, setDocs] = useState([]);
  const userId = useSelector((state) => state.user.token.user._id);

  const [FolderModal, setFolderModal] = useState(false)
  const [FolderTable, setFolderTable] = useState([])
  const [FolderData, setFolderData] = useState({
    name : "",
    userId : "",
    documents : []
  })
  const [TemplateTable, setTemplateTable] = useState([])
  const [TemplateModal, setTemplateModal] = useState(false)
  const [TemplateData, setTemplateData] = useState({
      name : "",
      userId : userId,
      document : "",
      category : ""
  })
  const [Disable, setDisable] = useState(false)
  const [viewUpload, setViewUpload] = useState(false);
  const [tabFor, settabFor] = useState("Document")
  const [Loading, setLoading] = useState(true)

  const [CatagoryData, setCatagoryData] = useState({
    name : '',
    userId : userId
  })
  const [tempDocxModal, settempDocxModal] = useState(false)
  const [tempDocx, settempDocx] = useState({
    document: '',
    _id: '',
    name: '',
    matter: '',
    contact: '',
    category: '',
    userId : userId
  });
  const [CatagoryTable, setCatagoryTable] = useState([])
  const [cataoryModal, setcataoryModal] = useState(false)
  const [uploadData, setUploadData] = useState({
    document: '',
    _id: '',
    name: '',
    matter: '',
    contact: '',
    category: '',
  });
  const [modalFor, setModalFor] = useState('Upload');
  const [matters, setMatters] = useState([]);
  const [Category, setCategory] = useState([])
  const [value, setValue] = useState('');
  const [dataSrc, setDataSrc] = useState([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [foldervalue, setfolderValue] = useState('');
  const [folderdataSrc, setfolderDataSrc] = useState([]);
  const [showfolderNameInput, setShowfolderNameInput] = useState(false);
  //funtions for document
  const FilterByNameInput = (
    <div>
      <SearchOutlined
      style={{"vertical-align": "revert"}}
        onClick={() => {
          var dump =
            showNameInput === false
              ? setShowNameInput(true)
              : setShowNameInput(false);
        }}
      />
      <span style={{paddingLeft : "8px"}}> Name </span>

      {showNameInput && (
        <div style={{paddingTop : "10px"}}>
          <input
            placeholder="Search"
            value={value}
            onChange={(e) => {
              let filteredData;
              setValue(e.target.value);
              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = docs.filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                );
                setDataSrc(filteredData);
              } else {
                setDataSrc(docs);
              }
            }}
          />
        </div>
      )}
    </div>
  );
  const columnsForDocuments = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: '0',
    },
    
    {
      title: FilterByNameInput,
      dataIndex: 'name',
      key: '1',
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0}}
          searchWords={[value]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ),
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
  const handleInput = (item) => (e) => {

    console.log(item)
    console.log(e)
    if (item === 'document') {
      e.persist()
      setUploadData({ ...uploadData, document: e.target.files[0] });
     
    } else
    if(item === "category"){
      uploadData[`${item}`] = e;
      setUploadData({ ...uploadData });
    }
    else {
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

  const handleViaTemplate = (item) => (e) => {
    console.log(item)
    console.log(e)
    if(item === "category" || item ==="document"){
      tempDocx[`${item}`] = e;
      settempDocx({ ...tempDocx });
    }else
    if(item === "category" || item ==="document"){
      tempDocx[`${item}`] = e;
      settempDocx({ ...tempDocx });
    }
    else {
      if (item === 'matter') {
        if(modalFor === "Upload"){
          console.log("from the uploads")
          tempDocx[`${item}`] = e;
          settempDocx({ ...tempDocx });
          getMatterById(e);
        }else{
          console.log("from the edits")
          api.get(`/matter/view/${e}`).then((res) => {
            tempDocx[`${item}`] = res.data.data ;
            settempDocx({ ...tempDocx });
            getMatterById(e);
            });
        }
      } else {
        tempDocx[`${item}`] = e.target.value;
        settempDocx({ ...tempDocx });
      }
    }
    console.log(tempDocx)
  };

  const getDocuments = async () => {
    let tempDocs = [];
    let template = []
    await api.get(`/document/viewforuser/${userId}`).then((res) => {
      console.log(res.data.data)
      res.data.data.map((item, index) => {
        if(item.matter == undefined){
          const data = {
            _id : item._id,
            key : index,
            document : item.document,
            category : item.category,
            name : item.name,
          }
          template.push(data)
        }
        else
        if(item.type != "folder"){
          tempDocs = [
            ...tempDocs,
            {
              ...item,
              type : "File",
              key: item._id,
              matter: item.matter !== null ? item.matter.matterDescription : '-',
              receivedDate: getISTDate(item.receivedDate),
              lastEdit: getISTDate(item.lastEdit),
            },
          ];
        }
      });
    });
    setDocs(tempDocs);
    setTemplateTable(template)
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
      console.log(docFormData)
    api
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
  const SubmitViaTemplate = async () => {
    
    if(tempDocx.category === ''){
      notification.warning({
        message : "Please provide a category."
      })
    }else
    if(tempDocx.contact === ''){
      notification.warning({
        message : "Please provide a contact."
      })
    }else
    if(tempDocx.document === '' ){
      notification.warning({
        message : "Please provide a document."
      })
    }else
    if(tempDocx.matter === '' ){
      notification.warning({
        message : "Please provide a matter."
      })
    }else
    if(tempDocx.name === ''){
      notification.warning({
        message : "Please provide a name."
      })
    }
    else{
      console.log(userId)
      setDisable(true)
    api
      .post('/document/uploadtemplate/934894383948u43', tempDocx)
      .then(function (response) {
        console.log(response)
        notification.success({ message: 'Document Uploaded.' });
        getDocuments();
      })
      .catch(function (response) {
        notification.error({ message: 'Document Upload Failed.' });
      });
    setTimeout(() => {
      settempDocxModal(false)
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
        console.log(res)
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
      await api.get(`/document/view/${docId}`).then((response) => {
        setUploadData(response.data.data);
        console.log(uploadData)
      });
  };

   const handleEdit = async () => {
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
        var formData = new FormData();
        formData.set('document', uploadData.document);
        formData.set('userId', userId);
        api
          .post(`/document/edit/${uploadData._id}`, formData,{
            headers: { 'Content-Type': 'multipart/form-data' },
          }).then(res=>{
            console.log(res)
          })
          const newUploadData = {
            _id: uploadData._id,
            name: uploadData.name,
            matter: uploadData.matter,
            contact: uploadData.contact,
            category: uploadData.category,
          }
        await api
          .post(`/document/edit/${uploadData._id}`, newUploadData)
          .then(function (response) {
            
            console.log(response)
            notification.success({ message: 'Document edited.' });
            
            getDocuments();
          })
          .catch(function (response) {
             console.log(response)
            notification.error({ message: 'Document Upload Failed.' });
          });
        setTimeout(() => {
          setDisable(false)
          setViewUpload(false);
        }, 600);
      }
  };

  //funtions for template
  const columnsForTemplate = [
    
    {
      title: 'Name',
      dataIndex: 'name',
      key: '1',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.name.length - b.name.length,
    },
    
    {
      title: 'Category',
      dataIndex: 'category',
      key: '3',
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
              editTemplate(record);
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
                    title="Are you sure delete this Template?"
                    onConfirm={()=>deleteTemplate(record._id)}
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
  const editTemplate = async (record) => {   
    setModalFor('Edit');
    setTemplateModal(true)
    setTemplateData(record)
};

const deleteTemplate = async (docId) => {
  await api
    .get(`/document/delete/${docId}`)
    .then((res) => {
      notification.success({ message: 'Template Deleted SuccessFully.' });
      getDocuments();
    })
    .catch((res) => {
      notification.error({ message: 'Template Deletion Failed.' });
    });
};
 const EditTemplate = async () => {
  if(TemplateData.name === '' ){
    notification.warning({
      message : "Please provide a name."
    })
  
  }else
      if(TemplateData.category === ''){
        notification.warning({
          message : "Please provide a category."
        })
      }else
      
      if(TemplateData.document === '' ){
        notification.warning({
          message : "Please provide a document."
        })
      
      }
      else{
      
      setDisable(true)

      var formData = new FormData();
        formData.set('document', TemplateData.document);
        formData.set('userId', userId);
        api
          .post(`/document/edit/${TemplateData._id}`, formData,{
            headers: { 'Content-Type': 'multipart/form-data' },
          }).then(res=>{
            console.log(res)
          })

          const newUploadData = {
            _id: TemplateData._id,
            name: TemplateData.name,
            category: TemplateData.category,
          }
       
      await api
        .post(`/document/edit/${TemplateData._id}`, newUploadData)
        .then(function (response) {
          notification.success({ message: 'Template edited.' });
          getDocuments();
          setDisable(false)
          setTemplateModal(false);
         
        })
        .catch(function (response) {
          notification.error({ message: 'Template Upload Failed.' });
          setDisable(false)
          setTemplateModal(false);
        });
     
    }
};
  const handleTemplate = (item) => (e) => {
    console.log(item)
    console.log(e)
    if (item === 'document') {
      setTemplateData({ ...TemplateData, document: e.target.files[0] });
    } else
    if(item === "category"){
      TemplateData[`${item}`] = e;
      setTemplateData({ ...TemplateData });
    }else{
      TemplateData[`${item}`] = e.target.value;
      setTemplateData({ ...TemplateData });
    }
    
    console.log(TemplateData)
  };
  const submitTemplate = async () => {
    if(TemplateData.name === '' ){
      notification.warning({
        message : "Please provide a name."
      })
    
    }else
    if(TemplateData.category === ''){
      notification.warning({
        message : "Please provide a category."
      })
    }else
    if(TemplateData.document === '' ){
      notification.warning({
        message : "Please provide a document."
      })
    }
    else{
      setDisable(true)
      var docFormData = new FormData();
    docFormData.set('document', TemplateData.document);
    docFormData.set('category', TemplateData.category);
    docFormData.set('name' , TemplateData.name)
    docFormData.set('userId', userId);
    api
      .post('/document/upload/934894383948u43', docFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(function (response) {
        notification.success({ message: 'Template Uploaded.' });
        getDocuments();
      })
      .catch(function (response) {
        notification.error({ message: 'Template Upload Failed.' });
      });
    setTimeout(() => {
      setTemplateModal(false);
      setDisable(false)
    }, 600);
    }
    
  };

  //funtions for category
  const columnsForCatagory = [
    
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: '1',
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
              editCategory(record);
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
                    title="Are you sure delete this Catagory?"
                    onConfirm={()=>deleteCategory(record._id)}
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
    
  ];
  
  const handleCategory = (item) => (e) => {
    console.log("chnage")
    console.log(item)
    console.log(e)
  
        CatagoryData[`${item}`] = e.target.value;
        setCatagoryData({ ...CatagoryData });
  
    console.log(CatagoryData)
  };

  const deleteCategory = async (docId) => {
    await api
      .get(`/document/category/delete/${docId}`)
      .then((res) => {
        notification.success({ message: 'Catagory Deleted SuccessFully.' });
        getCategory();
      })
      .catch((res) => {
        notification.error({ message: 'Catagory Deletion Failed.' });
      });
  };
  
  const editCategory =  (record) => {
    
    setModalFor('Edit');
    setcataoryModal(true)
    setCatagoryData(record)

};
  
  

  const getCategory = ( ) =>{
    let tempCatagory = [];
    api.get(`/document/category/viewforuser/${userId}`).then((res) => {
      setCategory(res.data.data)
      console.log(res)
      res.data.data.map((item, index) => {
        const data = {
          name : item.name,
          key : index,
          _id : item._id,
          userId :userId
        }
        tempCatagory.push(data)
      });
      setCatagoryTable(tempCatagory);
    });
  
   
    //setLoading(false)
  }
  const AddCategory = ( ) =>{
    if(CatagoryData.name === ''){
      notification.warning({
        message : "Please provide a name."
      })
    }
    else{
      setDisable(true)
      console.log(CatagoryData)
    api
      .post('/document/category/create/' , CatagoryData)
      .then(function (response) {
        console.log(response)
        getCategory()
        notification.success({ message: 'Category created.' });

        //getDocuments();
      })
      .catch(function (response) {
        notification.error({ message: 'Failed.' });
      });
    setTimeout(() => {
      setcataoryModal(false)
      setDisable(false)
    }, 600);
    }
    
  }
  const EditCategory = ( ) =>{
    if(CatagoryData.name === ''){
      notification.warning({
        message : "Please provide a name."
      })
    }
    else{
      setDisable(true)
      console.log(CatagoryData)
    api
      .post('/document/category/edit/' + CatagoryData._id , CatagoryData)
      .then(function (response) {
        console.log(response)
        getCategory()
        notification.success({ message: 'Category Edited.' });

        //getDocuments();
      })
      .catch(function (response) {
        notification.error({ message: 'Failed.' });
      });
    setTimeout(() => {
      setcataoryModal(false)
      setDisable(false)
      console.log(CatagoryTable)
    }, 600);
    }
    
  }

  const CatagoryForm = () => (
    <Modal
      title={` ${modalFor} Catagory`}
      visible={cataoryModal}
      onCancel={() => setcataoryModal(false)}
      footer={[
        <Button key="back" onClick={() => setcataoryModal(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          disabled={Disable}
          onClick={modalFor === 'Upload' ? AddCategory : EditCategory}
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
            value: CatagoryData.name,
          },
          
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
          <Input onChange={handleCategory('name')} value={CatagoryData.name} />
        </Form.Item>
      </Form>
    </Modal>
  );

  //funtions for folder
  const FilterFolderByNameInput = (
    <div>
      <SearchOutlined
      style={{"vertical-align": "revert"}}
        onClick={() => {
          var dump =
            showfolderNameInput === false
              ? setShowfolderNameInput(true)
              : setShowfolderNameInput(false);
        }}
      />
      <span style={{paddingLeft : "8px"}}> Folder Name </span>

      {showfolderNameInput && (
        <div style={{paddingTop : "10px"}}>
          <input
            placeholder="Search"
            value={foldervalue}
            onChange={(e) => {
              let filteredData;
              setfolderValue(e.target.value);
              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = FolderTable.filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                );
                setfolderDataSrc(filteredData);
              } else {
                setfolderDataSrc(FolderTable);
              }
            }}
          />
        </div>
      )}
    </div>
  );
  const columnsForFolder = [
    {
      title: "Type"  ,
      dataIndex: 'type',
      key: '1',
    },
    {
    //  title: FilterFolderByNameInput,
      title : "Folder Name",
      dataIndex: 'name',
      key: '1',
      render: (_ , record) => {
        return (
          <Space>
            <FolderTwoTone />
            <a style={{color : "skyblue", fontSize : "15px" , fontWeight : "600"}} >{record.name}</a>
          </Space>  
        );
      },
    },
    {
      title: 'Open',
      dataIndex: 'open',
      key: '6',
      render: (_, record) => {
        return (
          <Button
            className="btn-outline-info "
            onClick={() => {
              props.history.push('/documents/view' , record)
            }}
          >
            Open
          </Button>
        );
      },
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
              editFolder(record);
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
                    title="Are you sure delete this Folder?"
                    onConfirm={()=>deleteFolder(record._id)}
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
              
            }}
            icon={<DownloadOutlined />}
          >
            Download
          </Button>
        );
      },
    }
    
  ];

  const deleteFolder = async (docId) => {
    await api
      .get(`/document/folder/delete/${docId}`)
      .then((res) => {
        notification.success({ message: 'Folder Deleted SuccessFully.' });
        getFolder()
      })
      .catch((res) => {
        notification.error({ message: 'Folder Deletion Failed.' });
      });
  };

  const handleFolder = (item) => (e) => {
    console.log("chnage")
    console.log(item)
    console.log(e)
  
        FolderData[`${item}`] = e.target.value;
        setCatagoryData({ ...FolderData });
  
    console.log(FolderData)
  };

  const getFolder = ( ) =>{
    let tempFolder = [];
    api.get(`/document/folder/viewforuser/${userId}`).then((res) => {
      console.log(res)
      res.data.data.map((item, index) => {
        if(item.type != "folder"){
          const data = {
            type: "Folder",
            name : item.name,
            documents : item.documents,
            folder : item.folder,
            key : index,
            _id : item._id,
            userId :userId
          }
          tempFolder.push(data)
        }
      });
      setFolderTable(tempFolder);
      console.log(FolderTable)
      //getDocuments()
    });
  
   
    //setLoading(false)
  }

  const addFolder = ( ) =>{
    if(FolderData.name === ''){
      notification.warning({
        message : "Please provide a name."
      })
    }
    else{
      setDisable(true)
      console.log(FolderData)
    api
      .post('/document/folder/create' , FolderData)
      .then(function (response) {
        console.log(response)
        getFolder()
        notification.success({ message: 'Folder created.' });

        //getDocuments();
      })
      .catch(function (response) {
        notification.error({ message: 'Failed.' });
      });
    setTimeout(() => {
      setFolderModal(false)
      setDisable(false)
    }, 600);
    }
    
  }
  const editFolder = async (record) => {   
    setModalFor('Edit');
    setFolderModal(true);
    setFolderData(record)
};
  const EditFolder = ( ) =>{
    if(FolderData.name === ''){
      notification.warning({
        message : "Please provide a name."
      })
    }
    else{
      setDisable(true)
      console.log(CatagoryData)
    api
      .post('/document/folder/edit/' + FolderData._id , FolderData)
      .then(function (response) {
        console.log(response)
        getFolder()
        notification.success({ message: 'Folder Edited.' });

        //getDocuments();
      })
      .catch(function (response) {
        notification.error({ message: 'Failed.' });
      });
    setTimeout(() => {
      setFolderModal(false)
      setDisable(false)
      console.log(CatagoryTable)
    }, 600);
    }
    
  }

  const uploadFolder = () => (
    <Modal
      title={`${modalFor === "Upload" ? "Create" : "Update"} Folder`}
      visible={FolderModal}
      onCancel={() => setFolderModal(false)}
      footer={[
        <Button key="back" onClick={() => setFolderModal(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          disabled={Disable}
          onClick={modalFor === 'Upload' ? addFolder : EditFolder}
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
            value: FolderData.name,
          },
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
          <Input onChange={handleFolder('name')} value={FolderData.name} />
        </Form.Item>

        </Form>
    </Modal>
  );
  //common funtions
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
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
  
  
  

  useEffect(() => {
    getDocuments();
    getCategory()
    getFolder()
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
          {
  
            name: ['document'],
           // value: uploadData.document,
          }
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
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Catagory"
            optionFilterProp="children"
            onChange={handleInput('category')}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Category.map((item, index) => (
              <Option key={index} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        
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
             // value={uploadData.document}
            />
          </Form.Item>
      </Form>
    </Modal>
  );
  const uploadTempDoc = () => (
    <Modal
      title={` ${modalFor} Document`}
      visible={tempDocxModal}
      onCancel={() => settempDocxModal(false)}
      footer={[
        <Button key="back" onClick={() => settempDocxModal(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          disabled={Disable}
          onClick={modalFor === 'Upload' ? SubmitViaTemplate : handleEdit}
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
            value: tempDocx.name,
          },
          {
            name: ['category'],
            value: tempDocx.category,
          },
          {
            name: ['matter'],
            value:
              modalFor === 'Edit' ? tempDocx.matter._id : tempDocx.matter,
          }, //todo
          {
  
            name: ['document'],
            //value: uploadData.document,
          }
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
          <Input onChange={handleViaTemplate('name')} value={tempDocx.name} />
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
            onChange={handleViaTemplate('matter')}
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
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Catagory"
            optionFilterProp="children"
            onChange={handleViaTemplate('category')}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Category.map((item, index) => (
              <Option key={index} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        
        </Form.Item>
      
        <Form.Item
          key="document"
          label="Document"
          name="document"
          rules={[
            {
              required: true,
              message: 'Please input document',
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a document"
            optionFilterProp="children"
            onChange={handleViaTemplate('document')}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {TemplateTable.map((item, index) => (
              <Option key={index} value={item.document}>
                {item.name}
              </Option>
            ))}
          </Select>
        
        </Form.Item>
      
      </Form>
    </Modal>
  );
  const uploadTemplate = () => (
    <Modal
      title={` ${modalFor} Template`}
      visible={TemplateModal}
      onCancel={() => setTemplateModal(false)}
      footer={[
        <Button key="back" onClick={() => setTemplateModal(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          disabled={Disable}
          onClick={modalFor === 'Upload' ? submitTemplate : EditTemplate}
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
            value: TemplateData.name,
          },
          {
            name: ['category'],
            value: TemplateData.category,
          },
         
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
          <Input onChange={handleTemplate('name')} value={TemplateData.name} />
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
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Catagory"
            optionFilterProp="children"
            onChange={handleTemplate('category')}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Category.map((item, index) => (
              <Option key={index} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        
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
              onChange={handleTemplate('document')}
             // value={uploadData.document}
            />
          </Form.Item>
    
      </Form>
    </Modal>
  );

 
  
  
  const menu = (
    <Menu>
      <Menu.Item 
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
        key="0">
        <span>Upload File</span>
      </Menu.Item>

      <Menu.Item
      onClick = {()=>{
        setFolderData({
          name : "",
          userId : userId,
          documents : []
        })
        setFolderModal(true)
        setModalFor('Upload');
      }}
       key="1">
        <span>Create Folder</span>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item 
      onClick={() => {
        settempDocx({
          document: '',
          _id: '',
          name: '',
          matter: '',
          category: '',
          userId : userId
        }); //todo

        settempDocxModal(true);
        setModalFor('Upload');
      }}
      key="3">Document from Template</Menu.Item>
    </Menu>
  );
  
  const ButtonForDocument = (
    <div className="d-flex justify-content-center">
      <Dropdown overlay={menu} trigger={['click']}>
        <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Upload <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  
  );
  const ButtonForCatagory = (
    <div className="d-flex justify-content-center">
           <Button
            onClick={()=>setcataoryModal(true)}
          >
            Add Category
          </Button>
      </div>
  
  );
  const ButtonForTemplate = (
    <div className="d-flex justify-content-center">
          <Button
            onClick={() => {
              setTemplateData({
                document: '',
                name :'',
                userId : userId,
                category: '',
              }); //todo

              setTemplateModal(true);
              setModalFor('Upload');
            }}
          >
            Upload 
          </Button>
      </div>
  
  );
  
  const [operations, setoperations] = useState(ButtonForDocument)
  const callback = ( key ) => {
    console.log(key);
    if(key == 1){
      setoperations(ButtonForDocument)
    }else if(key == 2){
      setoperations(ButtonForCatagory)
    }if(key == 3){
      setoperations(ButtonForTemplate)
    }
  }
  return (
    <Spin size = "large" spinning={Loading}>
      
      <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={operations}
          onChange={callback}
          className="card p-4 overflow-auto"
        >
          <TabPane tab="Document" key="1">
            {
              uploadForm()
            }
            {
              uploadFolder()
            }
            {
              uploadTempDoc()
            }
             <Table 
             onRow={(record, rowIndex) => {
              return {
                onDoubleClick: () => { props.history.push('/documents/view' , record)}, // double click row
              };
            }}
             dataSource={FolderTable} 
             columns={columnsForFolder} />

            <Table 
            dataSource={
              dataSrc.length === 0 && value === '' ? docs : dataSrc
            }
            columns={columnsForDocuments} />
          </TabPane>
          <TabPane tab="Category" key="2">
            {CatagoryForm()}
           <Table dataSource={CatagoryTable} columns={columnsForCatagory} />
          </TabPane>
          <TabPane tab="Template" key="3">
            {uploadTemplate()}
            <Table dataSource={TemplateTable} columns={columnsForTemplate} />
          </TabPane>
      </Tabs>
     
 
    </Spin>
     );
};

export default Documents;
