import React, { useEffect } from "react";
import { Table,Button } from "antd";

import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getLawyers, unblockUser, blockUser } from "../../../store/Actions";




const LawyerManagement = (props) => {
  const dispatch = useDispatch();

  const lawyers = useSelector((state) => state.lawyers).filter((u) => !u.admin);

  useEffect(() => {
    dispatch(getLawyers());
  }, []);


  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "_id",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "_id",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "_id",
    },
    {
      title:'Status',
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

  return (
    <div>
      <Table dataSource={lawyers} columns={columns}
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
