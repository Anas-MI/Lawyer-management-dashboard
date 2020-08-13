import React from 'react'
import { Table, Tag, Space } from 'antd';
import { Card } from 'react-bootstrap'

const Support = (props) =>{

    const columns = [
        {
          title: 'Requested By',
          dataIndex: 'name',
          key: 'name',
          render: text => <a style={{"color" : "blue"}}>{text}</a>,
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
    
      const handleView = (record) => {
        props.history.push('/view/ticket', record._id);
      };


    return (
        <>
        <Card>
          <Card.Header>
            <div className="mb-4">
                <h3>ALL TICKETS</h3>
            </div>
          </Card.Header>
          <Card.Body>
             <Table 
             columns={columns} 
             dataSource={data} 
             onRow={(record, rowIndex) => {
              return {
                onDoubleClick: () => handleView(record), // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}/>
          </Card.Body>
        </Card>
        </>
    );
}

export default Support