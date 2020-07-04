import React, { useEffect, useState } from "react";
import { Table,Button,Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, deleteBlog,selectBlog } from "../../../store/Actions";
import api from '../../../resources/api'



const ContactsManage = (props) => {

  const dispatch = useDispatch();
  const [tableData , setTableData] = useState([])
  let response = {}
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
      response = await api.get('/contact/showall')
      setTable()
    }
    fetchData();
  }, []);
 
 
  const setTable=()=>{
    response.data.data.map((value,id)=>{
      let key=id
      const data={
        firstName : value.firstName ,
        lastName : value.lastName,
        billingCustomRate : value.billingCustomRate,
        company : value.company.name
      }
      let newtableData = tableData
      newtableData.push(data)
      setTableData(newtableData)
      console.log(tableData)
    }) 
    setState({tableData : tableData})
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
      title: "First Name",
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
        title: "Last Name",
        dataIndex: "lastName",
        key: "_id",
        ...getColumnSearchProps('lastName'),
        sorter: (a, b ,c) => ( 
          c==='ascend'
          ?a.description<b.description
          :a.description>b.description
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
      title: "Company",
      dataIndex: "company",
      key: "_id",
      ...getColumnSearchProps('company'),
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
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };

const handleView = (i)=>{
  
      console.log(i)
      /*
      if(type==="Person"){
        props.history.push('/manage/contacts/add/Person')
      }else if(type==="Company"){
        props.history.push('/manage/contacts/add/Company')
      }
      */
     props.history.push('/view/company',i)
  }
 
  return (
    <div>
      <div className='p-2 '>
        <Button className='ml-auto' color='success' >Export</Button>
        <Button className='ml-auto' color='success' onClick={()=>handleAddNew("Person")}>Add Person</Button>
        <Button className='ml-auto' color='success' onClick={()=>handleAddNew("Company")}>Add Company</Button>
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
