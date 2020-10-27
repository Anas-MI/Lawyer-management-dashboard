import React, { useState, useEffect } from 'react'
import { Table, Card } from 'antd';
import api from '../../../resources/api'
import { useSelector } from 'react-redux'
import { data } from 'jquery';
const Statement = (props) => {
    const [state, setstate] = useState([])
    const userId = useSelector((state) => state.user.token.user._id);

    const fetchLogs = () => {
        api.get(`/logs/viewforaccount/${userId}/${props.location.state}`)
            .then(res => {
                let logs = []
                res.data.data.map((log, index)=>{
                    const data = {
                        date : new Date(log.created_at).toLocaleString(),
                        previous : log.before,
                        current : log.after,
                        key: index + 1
                    }
                    logs.push(data)
                })
                setstate(logs)
            })
    }
    useEffect(() => {
        fetchLogs()
    }, [])
    const columns = [
        {
            title: 'S.N',
            dataIndex: 'key',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Previous amount',
            dataIndex: 'previous',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.openingBalance - b.openingBalance,
        },
        {
            title: 'Current Amount',
            dataIndex: 'current',
        },/*
        {
          title: 'Edit',
          dataIndex: "edit",
          key: "_id",
          render: (_, record) => {
            return (
              <Button onClick={() => { history.push('/edit/accounts', record._id) }} >
                Edit
              </Button>
            )
          }
        },*//*
        {
          title: 'Delete',
          dataIndex: "delete",
          key: "_id",
          render: (_, record) => {
            return (
              <Popconfirm
                title="Are you sure delete this Account?"
                onConfirm={() => handleDelete(record)}
                onCancel={() => { }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>
                  Delete
                      </Button>
              </Popconfirm>
            )
          }
        },*/
    ];
    return (
        <div>
            <Table
                className="table-responsive"
                columns={columns}
                dataSource={state} />
        </div>
    )
}

export default Statement