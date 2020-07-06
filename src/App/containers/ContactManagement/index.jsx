import React, { useEffect, useState } from "react";
import { Table,Button,Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, deleteBlog,selectBlog } from "../../../store/Actions";
import api from '../../../resources/api'


const ContactsManage = (props) => {
  const userId = useSelector(state=>state.user.token.user._id)
  const [type , setType] = useState("contact")
  console.log(userId)
  const dispatch = useDispatch();
  const [companyData , setcompanyData] = useState([])
  const [searchData , setsearchData] = useState([])
  const [contactData , setcontactData] = useState([])
  let response = {}
  let company= {}
  //Search Related 
  const [state,setState] = useState({})
  const contacts = useSelector((state) => {
    return state.Contact.contacts;
  })
/*
  useEffect(()=>{
    setTableData(contacts)
    console.log(contacts)
  },[contacts])
  useEffect(() => {
    dispatch(getBlogs());
  }, []); */
  useEffect(() => {
    
    async function fetchData() {
      response = await api.get('/contact/viewforuser/'+ userId)
      company = await api.get('/company/viewforuser/'+ userId)
      console.log(response)
      console.log(company)
      setTable()
    }
    fetchData();
  }, []);
 
 
  const setTable=()=>{
    response.data.data.map((value,id)=>{
      let key=id
      const data={
        firstName : value.firstName + " " + value.lastName,
        billingCustomRate : value.billingCustomRate,
        emailAddress : value.emailAddress.map((value)=>{return <div>{value}<br></br></div>})
      }
      let newtableData = contactData
      newtableData.push(data)
      setcontactData(newtableData)
    }) 
    company.data.data.map((value,id)=>{
      let key=id
      const data={
        firstName : value.name ,
        billingCustomRate : value.billingCustomRate,
        emailAddress : value.emailAddress.map((value)=>{return <div>{value}<br></br></div>})
      }
      let newtableData = companyData
      newtableData.push(data)
      setcompanyData(newtableData)
    }) 
    setState({tableData : contactData})

  }
  

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            // console.log('Node',node)
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() =>handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>{
      console.log(dataIndex,record)
      return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    },
      
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
    state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ) : (
      text
    )
  })

//   const handleciSelect = (record) => {
//     // dispatch(selectBlog(record))
//     // props.history.push('/lawyer/details')
//   }

  const handleAddNew = (type) => {
   //  dispatch(selectBlog())
   if(type==="Person"){
    props.history.push('/manage/contacts/add/Person')
  }else if(type==="Company"){
    props.history.push('/manage/contacts/add/Company')
  }
  }
  const setTableData = (type) => {
    //  dispatch(selectBlog())
    if(company != {} && response !={}){
      if(type==="Person"){
        setState({tableData : contactData})
        setType("contact")
      }else if(type==="Company"){
      setState({tableData : companyData})
        setType("company")
      }
    }
   }

  const handleEdit = record => {
    //   dispatch(selectBlog(record))
    console.log(record)
      props.history.push('/manage/contacts/edit/person', record.key)
  }
  
  const handleDelete = record => {
    //   dispatch(deleteBlog({id:record._id}))
  }
  
  const columns = [
    
    {
      title: "Name",
      dataIndex: "firstName",
      key: "_id",
      ...getColumnSearchProps('firstName'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.author<b.author
        :a.author>b.author
      )


    },

    
    {
      title: "billingCustomRate",
      dataIndex: "billingCustomRate",
      key: "_id",
      ...getColumnSearchProps('billingCustomRate'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.shortDescription<b.shortDescription
        :a.shortDescription>b.shortDescription
      )
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "_id",
      ...getColumnSearchProps('emailAddress'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.shortDescription<b.shortDescription
        :a.shortDescription>b.shortDescription
      )
    },
    {
        title:'Delete',
        dataIndex: "delete",
        key: "_id",
        render:(_,record)=>{
            return (
                <Button variant='danger' onClick={()=>handleDelete(record)}>
                    Delete
                </Button>
            )
        }
    },
  ];



  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    state.tableData.map((value,id)=>{
      let key=id
     
      if(value[dataIndex] == selectedKeys){
        const data={
          firstName : value.firstName,
          billingCustomRate : value.billingCustomRate,
          emailAddress : value.emailAddress.map((value)=>{return <div>{value}<br></br></div>})
        }
    
        let newtableData = searchData
        newtableData.push(data)
        setsearchData(newtableData)
      }    
    })
    setState({tableData : searchData})
    
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
    setState({tableData : contactData})
    setsearchData([])
  };

const handleView = (i)=>{
    console.log(type)
      console.log(i)
      if(type==="contact"){
        props.history.push('/view/contact',i)
      }
      if(type==="company"){
        props.history.push('/view/company',i)
      }
  }
 
  return (
    <div>
      <div className='p-2 '>
        <Button className='ml-auto' color='success' >Export</Button>
        <Button className='ml-auto' color='success' onClick={()=>setTableData("Person")}>Person</Button>
        <Button className='ml-auto' color='success' onClick={()=>setTableData("Company")}>Company</Button>
        <Button className='ml-auto' color='success' style={{float : "right"}} onClick={()=>handleAddNew("Person")}>Add Person</Button>
        <Button className='ml-auto' color='success' style={{float : "right"}} onClick={()=>handleAddNew("Company")}>Add Company</Button>
      </div>
      <Table dataSource={state.tableData} columns={columns}
        onRow={(record, rowIndex) => {
            return {
              onDoubleClick: () => handleView(rowIndex), // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}>

      </Table>
    </div>
  );
};

export default ContactsManage;
