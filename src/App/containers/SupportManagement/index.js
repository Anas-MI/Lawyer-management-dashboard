import React from 'react'
import { Table, Tag, Space } from 'antd';

const Support = () =>{

    const columns = [
        {
          title: 'Requested By',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Subject',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Issue',
          dataIndex: 'issue',
          key: 'issue',
        },
        {
          title: 'Status',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <>
              {tags.map(tag => {
                let color = '';
                if (tag === 'open') {
                  color = 'green';
                } else if ( tag == 'closed') {
                    color = 'geekblue'
                }

                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
       
      ];

    const data = [
        {
          key: '1',
          name: 'John Brown',
          id: 32,
          issue : 'new issue dasja fskdf dsfkk dsfh',
          address: 'New York No. 1 Lake Park',
          tags: ['open'],
        },
        {
          key: '2',
          name: 'Jim Green',
          id: 42,
          issue : 'new issue dasja fskdf dsfkk dsfh',
          address: 'London No. 1 Lake Park',
          tags: ['closed'],
        },
        {
          key: '3',
          name: 'Joe Black',
          id: 32,
          issue : 'new issue dasja fskdf dsfkk dsfh',
          address: 'Sidney No. 1 Lake Park',
          tags: ['open'],
        },
      ];



    return (
        <>
        <div className="mb-4">
            <h3>ALL Tickets</h3>
        </div>
        <Table columns={columns} dataSource={data} />
        </>
    );
}

export default Support