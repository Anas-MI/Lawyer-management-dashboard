import React from 'react'
import { Table, Tag, Space, Button } from 'antd';


const Account = (props) =>{
    const columns = [
        {
          title: 'Name',
          dataIndex: 'Name',
          key: 'Name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'Email',
        },
        {
          title: 'Contact Info',
          dataIndex: 'Contact Info',
          key: 'ContactInfo',
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
          },
          {
            title: 'Currency',
            dataIndex: 'Currency',
            key: 'Currency',
          },
        {
          title: 'Action',
          key: 'Action',
          render: (text, record) => (
            <Space size="middle">
              <Button type="link">Edit</Button>
              <Button type="link">Delete</Button>
            </Space>
          ),
        },
      ];
      
      const data = [
        props.state
      ]
      
 return <Table columns={columns} dataSource={data} />
}
 export default Account