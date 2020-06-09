import React, { useEffect, useState } from "react";
import { Table,Button,Input } from "antd";

import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getLawyers, unblockUser, blockUser } from "../../../store/Actions";




const LawyerManagement = (props) => {

  const dispatch = useDispatch();
  const [tableData , setTableData] = useState(null)

  const lawyers = useSelector((state) => state.lawyers).filter((u) => !u.admin);

  useEffect(() => {
    dispatch(getLawyers());
  }, []);


  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "_id",
      sorter: (a, b ,c) => ( 
        c==='ascend'
        ?a.firstname<b.firstname
        :a.firstname>b.firstname
      )
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "_id",
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
