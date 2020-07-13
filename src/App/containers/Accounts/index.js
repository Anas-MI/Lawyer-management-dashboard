import React, {useState} from  'react'
import { Table, Modal, Space, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Accounts = () => {
    const history = useHistory()

    const columns = [
        {
          title: 'Account Name',
          dataIndex: 'Account Name',
          key: 'AccountName',
        },
        {
          title: 'Currency',
          dataIndex: 'Currency',
          key: 'Currency',
        },
        {
          title: 'Balance',
          dataIndex: 'Balance',
          key: 'Balance',
        },
        {
            title: 'Default Account',
            dataIndex: 'Default Account',
            key: 'Defaultaccount',
          },
        {
          title: 'Action',
          key: 'Action',
          render: (text, record) => (
            <Space size="middle">
              <Button type="button" class="btn btn-info">Edit</Button>
              <Button type="button" class="btn btn-danger">Delete</Button>
            </Space>
          ),
        },
      ];



    return(
        <>
            <div className='p-2 '>
                <Button className='ml-auto' color='success'>Export</Button>
                <Button className='ml-auto' color='success' style={{float : "right"}} onClick={() => { history.push('/accounts/add')}} >Add</Button>
            </div>
            <Table columns={columns} />
        </>
    )
}

export default Accounts