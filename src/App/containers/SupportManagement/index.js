import React, { useEffect , useState }from 'react'
import { Table, Tag, Space } from 'antd';
import { Card } from 'react-bootstrap'
import api from '../../../resources/api';

const Support = (props) =>{
  const [Data, setData] = useState([])
    useEffect(() => {
      let tableData = []
      api.get('/ticket/showall').then((res)=>{
        console.log(res)
        res.data.data.map((value, index)=>{
          const data = {
            key : index,
            _id : value._id,
            name : value.firstName +  " " + value.lastName,
            firstName : value.firstName,
            lastName : value.lastName,
            attachment : value.document,
            email : value.email ,
            issue : value.issue ? value.issue : "-",
            url : value.url ?  value.url : 'No URL'
          }
          tableData.push(data)
        })
        setData(tableData)
      })
     
    }, [])
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a style={{"color" : "blue"}}>{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Issue',
          dataIndex: 'issue',
          key: 'issue',
        },
        {
          title: 'URL',
          dataIndex: 'url',
          key: 'url',
        },
        /*
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
        */
       
      ];

    
    
      const handleView = (record) => {
        props.history.push('/view/ticket', record);
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
             dataSource={Data} 
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