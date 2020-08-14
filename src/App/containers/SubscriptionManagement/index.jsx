import React, { useEffect, useState } from "react";
import { Table,Button,Input, Space, notification} from "antd";
import { Card } from 'react-bootstrap'
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Highlighter from 'react-highlight-words';
import api from "../../../resources/api"

const SubscriptionManagement = (props) => {

    //Search Related 
    const [state,setState] = useState({})
    const [planName, setPlanName] = useState([])
    const [planAmount, setPlanAmount] = useState([])

    // fetch the subscription plan name and amount to filter the data in table. 
    useEffect(() => {
        api.get('/plans/showall').then(res => {
            console.log(res.data.data)
            res.data.data.map( (fetchvalue) => {
                setPlanName(planName => [...planName, { text : fetchvalue.planName, value : fetchvalue.planName}])
                setPlanAmount(planAmount => [...planAmount, {text : fetchvalue.price, value: fetchvalue.price}])
            }) 
            })
      }, []);

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                // console.log('Node',node)
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
          return( record[dataIndex] || '').toString().toLowerCase().includes((value || '').toLowerCase())
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
            textToHighlight={(text || '').toString()}
          />
        ) : (
          text
        )
      })

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

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "_id",
            //render: text => <a style={{"color" : "blue"}}>{text}</a>,
            ...getColumnSearchProps('name'),
            sorter: (a, b ,c) => ( 
                c==='ascend'
                ?a.name<b.name
                :a.name>b.name
            )
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "_id",
            ...getColumnSearchProps('email'),
            sorter: (a, b ,c) => ( 
                c==='ascend'
                ?a.email<b.email
                :a.email>b.email
            )
        },
        {
            title: "Subscription Name",
            dataIndex: "subscriptionName",
            key: "_id",
            filters: planName,
              onFilter: (value, record) => record.subscriptionName.indexOf(value) === 0,
              sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
              sortDirections: ['descend'],
        },
        {
            title: "Subscription Amount",
            dataIndex: "subscriptionPlan",
            key: "_id",
            filters: planAmount,
              onFilter: (value, record) => record.subscriptionPlan.indexOf(value) === 0,
              sorter: (a, b) => a.subscriptionPlan.length - b.subscriptionPlan.length,
              sortDirections: ['descend'],
        },
        {
            title: "Download Invoice",
            dataIndex: "DownloadInvoice",
            key: "_id",
            render:(_,record)=>{
                return (
                    <Button>Download</Button>
                )
            }
        },
        {
            title: "Send Invoice",
            dataIndex: "Send Invoice",
            key: "_id",
            render:(_,record)=>{
                return (
                    <Button>Send</Button>
                )
            }
        },
    ]

    // sample data 
    const data = [
        {
          key: '1',
          name: 'John Brown',
          email : "xyzw@gm.com",
          subscriptionPlan : "200$",
          subscriptionName : "Advance",
        },
        {
            key: '2',
            name: 'xyz Brown',
            email : "sdss@gm.com",
            subscriptionPlan : "400$",
            subscriptionName : "Pro Plus",
          },
      ];

      const handleView = (record) => {
        props.history.push('/view/subscription', record._id);
      };

    return (
      
        <div>
          <Card>
            <Card.Header>
                <div className="mb-4">
                    <h3>SUBSCRIPTIONS</h3>
                </div>
            </Card.Header>
            <Card.Body>
                 <Table
                  dataSource={data}
                   columns={columns}
                   onRow={(record, rowIndex) => {
                    return {
                      onDoubleClick: () => handleView(record), // double click row
                      onContextMenu: (event) => {}, // right button click row
                      onMouseEnter: (event) => {}, // mouse enter row
                      onMouseLeave: (event) => {}, // mouse leave row
                    };
                  }}></Table>
            </Card.Body>
          </Card>
            
           
        </div>
    )
}
export default SubscriptionManagement