import React, { useEffect, useState } from "react";
import { Table,Button,Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from "react-redux";
import { getLawyers, unblockUser, blockUser } from "../../../store/Actions";




const LawyerManagement = (props) => {

  const dispatch = useDispatch();
  const [tableData , setTableData] = useState(null)

  //Search Related 
  const [state,setState] = useState({})

  const lawyers = useSelector((state) => state.lawyers).filter((u) => !u.admin);

  useEffect(() => {
    dispatch(getLawyers());
  }, []);


  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            console.log('Node',node)
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

  
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "_id",
      ...getColumnSearchProps('firstName'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.firstname<b.firstname
        :a.firstname>b.firstname
      )
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "_id",
      ...getColumnSearchProps('lastName'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.lastname<b.lastname
        :a.lastname>b.lastname
      )


    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "_id",
      ...getColumnSearchProps('emailAddress'),
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.emailAddress<b.emailAddress
        :a.emailAddress>b.emailAddress
      )
    },
    {
      title:'Status',
      sorting:true,
      dataIndex: "block",
      key: "_id",
      render:(_,record)=>{
          return (
              <Button onClick={()=>handleBlock(record.blocked,record._id)}>{record.blocked?"Unblock":'Block'}</Button>
          )
      },
    },
    {
        title:'View',
        dataIndex: "view",
        key: "_id",
        render:(_,record)=>{
            return (
                <Button onClick={()=>props.history.push({pathname:`/lawyer/details/`,user:record})}>
                    View
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

  const handleBlock = (blocked,id)=>{
      if(blocked){
          dispatch(unblockUser(id))
      }else{
          dispatch(blockUser(id))
      }
  }

  const onSearch = value => {

    setTableData(lawyers.filter(o=>(
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .startsWith(value.toLowerCase())
      )
    )))
 

  };

  return (
    <div>
        <Input.Search
          // style={{ border: "1px solid grey", margin: "0 0 1px 0" }}
          placeholder="Search by..."
          enterButton
          onSearch={onSearch}
      />
      <Table dataSource={tableData || lawyers} columns={columns}
        onRow={(record, rowIndex) => {
            return {
            //   onClick: ()=>props.history.push({pathname:'/lawyer/details',user:record}),
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

export default LawyerManagement;
