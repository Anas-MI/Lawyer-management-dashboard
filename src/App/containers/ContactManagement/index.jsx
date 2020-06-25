import React, { useEffect, useState } from "react";
import { Table,Button,Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, deleteBlog,selectBlog } from "../../../store/Actions";




const ContactsManage = (props) => {

  const dispatch = useDispatch();
  const [tableData , setTableData] = useState([])

  //Search Related 
  const [state,setState] = useState({})
  const contacts = useSelector((state) => {
    return state.Contact.contacts;
  })


  useEffect(()=>{
    setTableData(contacts)
  },[contacts])

  useEffect(() => {
    dispatch(getBlogs());
  }, []);


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
      props.history.push('/manage/contacts/edit')
  }
  
  const handleDelete = record => {
    //   dispatch(deleteBlog({id:record._id}))
  }
  const columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "_id",
      ...getColumnSearchProps('Title'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.title<b.title
        :a.title>b.title
      )
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "_id",
      ...getColumnSearchProps('FirstName'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.author<b.author
        :a.author>b.author
      )


    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "_id",
      ...getColumnSearchProps('Email'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.shortDescription<b.shortDescription
        :a.shortDescription>b.shortDescription
      )
    },
    {
        title: "Last Name",
        dataIndex: "LastName",
        key: "_id",
        ...getColumnSearchProps('LastName'),
        sorter: (a, b ,c) => ( 
          c==='ascend'
          ?a.description<b.description
          :a.description>b.description
        )
    },
    {
        title:'Edit',
        dataIndex: "edit",
        key: "_id",
        render:(_,record)=>{
            return (
                <Button color='warning' onClick={()=>handleEdit(record)}>
                    Edit
                </Button>
            )
        }
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


  return (
    <div>
      <div className='p-2 '>
        <Button className='ml-auto' color='success' >Export</Button>
        <Button className='ml-auto' color='success' onClick={()=>handleAddNew("Person")}>Add Person</Button>
        <Button className='ml-auto' color='success' onClick={()=>handleAddNew("Company")}>Add Company</Button>
      </div>
      <Table dataSource={tableData} columns={columns}
        onRow={(record, rowIndex) => {
            return {
              onDoubleClick: event => {}, // double click row
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
