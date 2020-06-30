import { Table, Tag, Space, Button } from 'antd';
import React from 'react'
import {Form} from 'react-bootstrap'

const tables = (props) => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Type',
          dataIndex: 'Type',
          key: 'Type',
        },
        {
            title: 'Default',
            dataIndex: 'Default',
            key: 'Default',
          },
          {
            title: 'Required',
            dataIndex: 'Required',
            key: 'Required',
          },
        
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <Button type="link">Edit</Button>
              <Button type="link">Delete</Button>
            </Space>
          ),
        },
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          Type : 'Checkbox',
          Default : <Form.Check 
                    type="checkbox"
                    id={`Default`}
                   
                />,
            Required : <Form.Check 
                    type="checkbox"
                    id={`required`}
                   
                />
        },
        {
          key: '2',
          name: 'Jim Green',
          Type : 'Date',
          Default : <Form.Check 
                    type="checkbox"
                    id={`Default`}
             
                />,
            Required : <Form.Check 
                    type="checkbox"
                    id={`required`}
    
                />
        },
        {
          key: '3',
          name: 'Joe Black',
          Type : 'CheckBox',
          Default : <Form.Check 
                    type="checkbox"
                    id={`Default`}
                    
                />, 
            Required : <Form.Check 
                    type="checkbox"
                    id={`required`}
                
                />      
        },
      ];
 return <Table columns={columns} dataSource={data} />
}

export default tables