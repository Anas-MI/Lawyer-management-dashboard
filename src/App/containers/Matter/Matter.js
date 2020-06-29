import React, { useEffect, useState } from "react";
import { Table,Button,Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, deleteBlog,selectBlog } from "../../../store/Actions";
import api from '../../../resources/api'



class matterManage extends React.Component{
   constructor(props){
       super(props)
       this.state= {}
   }
   render(){


 
  let response = {}
  //Search Related 

 /*
  useEffect(() => {
    
    async function fetchData() {
     response = await api.get('/contact/showall')
      setTable()
    }
    fetchData();
  }, []);
 */
 
  const setTable=()=>{
    
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
    this.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ) : (
      text
    )
  })

//   const handleciSelect = (record) => {
//     // dispatch(selectBlog(record))
//     // this.props.history.push('/lawyer/details')
//   }

  const handleAddNew = (type) => {
   //  dispatch(selectBlog())
    this.props.history.push('/manage/Matter/add')
  }

  const handleEdit = record => {
    //   dispatch(selectBlog(record))
      this.props.history.push('/manage/Matter/edit')
  }
  
  const handleDelete = record => {
    //   dispatch(deleteBlog({id:record._id}))
  }
  
  const columns = [
    
    {
      title: "Action",
      dataIndex: "Action",
      key: "_id",
      ...getColumnSearchProps('Action'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.author<b.author
        :a.author>b.author
      )


    },

    {
        title: "Matter Name",
        dataIndex: "MatterName",
        key: "_id",
        ...getColumnSearchProps('MatterName'),
        sorter: (a, b ,c) => ( 
          c==='ascend'
          ?a.description<b.description
          :a.description>b.description
        )
    },
    {
      title: "Client",
      dataIndex: "Client",
      key: "_id",
      ...getColumnSearchProps('Client'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.shortDescription<b.shortDescription
        :a.shortDescription>b.shortDescription
      )
    },
    {
        title: "Matter Notification",
        dataIndex: "MatterNotification",
        key: "_id",
        ...getColumnSearchProps('MatterNotification'),
        sorter: (a, b ,c) => ( 
          c==='ascend'
          ?a.shortDescription<b.shortDescription
          :a.shortDescription>b.shortDescription
        )
      },
    {
      title: "Practise Area",
      dataIndex: "PractiseArea",
      key: "_id",
      ...getColumnSearchProps('PractiseArea'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.shortDescription<b.shortDescription
        :a.shortDescription>b.shortDescription
      )
    },
    {
        title: "Open Date",
        dataIndex: "OpenDate",
        key: "_id",
        ...getColumnSearchProps('OpenDate'),
        sorter: (a, b ,c) => ( 
          c==='ascend'
          ?a.shortDescription<b.shortDescription
          :a.shortDescription>b.shortDescription
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
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

const handleView = (e)=>{
  
      console.log(e)
      /*
      if(type==="Person"){
        props.history.push('/manage/contacts/add/Person')
      }else if(type==="Company"){
        props.history.push('/manage/contacts/add/Company')
      }
      */
     this.props.history.push('/view/company')
  }

  return (
    <div>{console.log("2nd")}
      <div className='p-2 '>
        <Button className='ml-auto' color='success' onClick={()=>handleAddNew()}>Add Matter</Button>
      </div>
      <Table columns={columns}
        onRow={(record, rowIndex) => {
            return {
              onDoubleClick: event => handleView(event), // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            };
          }}>

      </Table>
    </div>
  );}
};

export default matterManage;