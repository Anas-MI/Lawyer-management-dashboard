import React, { useEffect, useState } from "react";
import { Table,Button,Input, Space, notification , Popconfirm, Modal} from "antd";
import { Card, Form } from 'react-bootstrap'
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Highlighter from 'react-highlight-words';
import api from "../../../resources/api"

import { Tabs } from 'antd';

const { TabPane } = Tabs;

const SubscriptionManagement = (props) => {

    //Search Related 
    const [state,setState] = useState({
      imageFile : ""
    })
    const [tableData, settableData] = useState([])
    const [dataSrc, setDataSrc] = useState([]);
    const [dataSrcforApp, setDataSrcforApp] = useState([]);
    const [Approved, setApproved] = useState([])
    const [value, setValue] = useState('');
    const [Declined, setDeclined] = useState([])
    const [dataSrcforDec, setDataSrcforDec] = useState([]);
    const [planName, setPlanName] = useState([])
    const [planAmount, setPlanAmount] = useState([])
    const [showNameInput, setShowNameInput] = useState(false);
    const [visible, setvisible] = useState(false)
    const [email, setemail] = useState("")
    const [disable, setdisable] = useState(false)
    const [image, setimage] = useState({})
    // fetch the subscription plan name and amount to filter the data in table. 
    const fetchSubs = ( ) =>{
      api.get(`subscription/showall`).then((res)=>{
        let tableData = []
        let approved = []
        let declined = []
        console.log(res)
        res.data.data.map((val, i)=>{
         if( val.userId != null ){
          val.key = i
          val.date= (val.created_at).substr(0,10)
          val.name = val.userId.firstName + " " + val.userId.lastName
          val.email = val.userId.emailAddress
        //  val.requestGranted = val.requestGranted ? "YES" : "NO"

          if(val.requestGranted === "Yes"){
            val.requestGranted = "Yes"
            approved.push(val)
           }else
           if(val.requestGranted === "Declined"){
             val.requestGranted = "Declined"
             declined.push(val)
           }else
           {
             val.requestGranted = "No"
             tableData.push(val)
           }
          }
        })
       
        settableData(tableData)
        setApproved(approved)
        setDeclined(declined)
        
      })
    }
    useEffect(() => {
      fetchSubs()
       /*
        api.get('/plans/showall').then(res => {
            console.log(res.data.data)
            res.data.data.map( (fetchvalue) => {
                setPlanName(planName => [...planName, { text : fetchvalue.planName, value : fetchvalue.planName}])
                setPlanAmount(planAmount => [...planAmount, {text : fetchvalue.price, value: fetchvalue.price}])
            }) 
            })
            */
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
     const  deleteHandler = (_id) => {
       console.log(_id)
        api.get('subscription/delete/' + _id ).then((res)=>{
          console.log(res)
          notification.success({message : "Request Deleted"})
          fetchSubs()
        }).catch((err)=>{
          notification.error({message : "Failed to delete"})
        })
       
      }
      const  handleDecline = (record) => {
        record.requestGranted = "Declined"
        console.log(record)

        const userData = {
          registeredOn : record
      }
        api.post(`user/update/${record.userId._id}` , userData).then((res=>{
                console.log(res)
            })).catch((err)=>{
                console.log(err)
            })

        api.post('subscription/edit/' + record._id , record).then((res)=>{
          console.log(res)
          notification.success({message : "Request Declined"})
          fetchSubs()
        }).catch((err)=>{
          notification.error({message : "Failed to Decline request"})
        })
       
      }
      const  handleApprove = (record) => {
        record.requestGranted = "Yes"
        record.date = new Date()
        console.log(record)
        const userData = {
          registeredOn : record
      }
        api.post(`user/update/${record.userId._id}` , userData).then((res=>{
                console.log(res)
            })).catch((err)=>{
                console.log(err)
            })
            
        api.post('subscription/edit/' + record._id , record).then((res)=>{
          console.log(res)
          notification.success({message : "Request Approved"})
          fetchSubs()
        }).catch((err)=>{
          notification.error({message : "Failed to approve request"})
        })
       
      }
      const FilterByNameInput = (
        <div>
          <SearchOutlined
          style={{"vertical-align": "revert"}}
            onClick={() => {
              var dump =
                showNameInput === false
                  ? setShowNameInput(true)
                  : setShowNameInput(false);
            }}
          />
          <span style={{paddingLeft : "8px"}}> Username </span>
    
          {showNameInput && (
            <div style={{paddingTop : "10px"}}>
              <input
                placeholder="Search"
                value={value}
                onChange={(e) => {
                  let filteredData;
                  setValue(e.target.value);
                  if (e.target.value.length !== 0 || e.target.value === '') {
                    filteredData = tableData.filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setDataSrc(filteredData);
                  } else {
                    setDataSrc(tableData);
                  }
                }}
              />
            </div>
          )}
        </div>
      );
      const FilterByNameInputForApproved = (
        <div>
          <SearchOutlined
          style={{"vertical-align": "revert"}}
            onClick={() => {
              var dump =
                showNameInput === false
                  ? setShowNameInput(true)
                  : setShowNameInput(false);
            }}
          />
          <span style={{paddingLeft : "8px"}}> Username </span>
    
          {showNameInput && (
            <div style={{paddingTop : "10px"}}>
              <input
                placeholder="Search"
                value={value}
                onChange={(e) => {
                  let filteredData;
                  setValue(e.target.value);
                  if (e.target.value.length !== 0 || e.target.value === '') {
                    filteredData = Approved.filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setDataSrcforApp(filteredData);
                  } else {
                    setDataSrcforApp(Approved);
                  }
                }}
              />
            </div>
          )}
        </div>
      );
      const FilterByNameInputForDec = (
        <div>
          <SearchOutlined
          style={{"vertical-align": "revert"}}
            onClick={() => {
              var dump =
                showNameInput === false
                  ? setShowNameInput(true)
                  : setShowNameInput(false);
            }}
          />
          <span style={{paddingLeft : "8px"}}> Username </span>
    
          {showNameInput && (
            <div style={{paddingTop : "10px"}}>
              <input
                placeholder="Search"
                value={value}
                onChange={(e) => {
                  let filteredData;
                  setValue(e.target.value);
                  if (e.target.value.length !== 0 || e.target.value === '') {
                    filteredData = Declined.filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    );
                    setDataSrcforDec(filteredData);
                  } else {
                    setDataSrcforDec(Declined);
                  }
                }}
              />
            </div>
          )}
        </div>
      );
      const columnsForApproved = [
      
      
       {
           title: "Email",
           dataIndex: "email",
           key: "email",
       },
      
       {
        title: FilterByNameInputForApproved,
        dataIndex: 'name',
        key: '_id',
  
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0}}
            searchWords={[value]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ),
      },
      {
       title: "Request Date",
       dataIndex: "date",
       key: "_id",
       /* 
       filters: planName,
         onFilter: (value, record) => record.subscriptionName.indexOf(value) === 0,
         sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
         sortDirections: ['descend'],
         */
   },
  
       {
           title: "Subscription Type",
           dataIndex: "subscriptionRequested",
           key: "_id",
           /* 
           filters: planName,
             onFilter: (value, record) => record.subscriptionName.indexOf(value) === 0,
             sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
             sortDirections: ['descend'],
             */
       },
       
       {
         title: "Request Granted",
         dataIndex: "requestGranted",
         key: "requestGranted",
         //render: text => <a style={{"color" : "blue"}}>{text}</a>,
         //sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
         //  sortDirections: ['descend'],
     },
     {
       title: 'Decline',
       dataIndex: 'Decline',
       key: 'Decline',
       render: (_, record) => {
         return (
           <Popconfirm
             title="Are you sure you want to Decline this Request?"
             onConfirm={() => handleDecline(record)}
             okText="Yes"
             cancelText="No"
           >
             <Button>Decline</Button>
           </Popconfirm>
         );
       },
     },
     {
      title: 'SendInvoice',
      dataIndex: 'SendInvoice',
      key: 'send',
      render: (_, record) => {
        return (
          
            <Button onClick={()=>{
              setemail(record.email)
              setvisible(true)}}>Send Invoice</Button>
         
        );
      },
    },
     {
      title: 'Invoice',
      dataIndex: 'Invoice',
      key: 'Invoice',
      render: (_, record) => {
        return (
          
            <Button onClick={()=>{props.history.push('/subscription/invoice', record)}}>View</Button>
         
        );
      },
    },
     {
       title: 'Delete',
       dataIndex: 'delete',
       key: 'delete',
       render: (_, record) => {
         return (
           <Popconfirm
             title="Are you sure?"
             onConfirm={() => deleteHandler(record._id)}
             okText="Yes"
             cancelText="No"
           >
             <Button danger>Delete</Button>
           </Popconfirm>
         );
       },
     },
     

       /*
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
       },*/
   ]
    const columns = [
      
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
       {
        title: FilterByNameInput,
        dataIndex: 'name',
        key: '_id',
  
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0}}
            searchWords={[value]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ),
      },
       {
        title: "Request Date",
        dataIndex: "date",
        key: "_id",
        /* 
        filters: planName,
          onFilter: (value, record) => record.subscriptionName.indexOf(value) === 0,
          sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
          sortDirections: ['descend'],
          */
    },
   
        {
            title: "Subscription Type",
            dataIndex: "subscriptionRequested",
            key: "_id",
            /* 
            filters: planName,
              onFilter: (value, record) => record.subscriptionName.indexOf(value) === 0,
              sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
              sortDirections: ['descend'],
              */
        },
        
        {
          title: "Request Granted",
          dataIndex: "requestGranted",
          key: "requestGranted",
          //render: text => <a style={{"color" : "blue"}}>{text}</a>,
          //sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
          //  sortDirections: ['descend'],
      },
      {
        title: 'Approve',
        dataIndex: 'Approve',
        key: 'Approve',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Are you sure you want to Approve this Request?"
              onConfirm={() => handleApprove(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Approve</Button>
            </Popconfirm>
          );
        },
      },
      {
        title: 'SendInvoice',
        dataIndex: 'SendInvoice',
        key: 'send',
        render: (_, record) => {
          return (
            
              <Button onClick={()=>{
                setemail(record.email)
                setvisible(true)}}>Send Invoice</Button>
           
          );
        },
      },
      {
        title: 'Invoice',
        dataIndex: 'Invoice',
        key: 'Invoice',
        render: (_, record) => {
          return (
            
              <Button onClick={()=>{props.history.push('/subscription/invoice', record)}}>View</Button>
           
          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => deleteHandler(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          );
        },
      },
      

        /*
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
        },*/
    ]
    const columnsforDec = [
      
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
       {
        title: FilterByNameInputForDec,
        dataIndex: 'name',
        key: '_id',
  
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0}}
            searchWords={[value]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ),
      },
       {
        title: "Request Date",
        dataIndex: "date",
        key: "_id",
        /* 
        filters: planName,
          onFilter: (value, record) => record.subscriptionName.indexOf(value) === 0,
          sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
          sortDirections: ['descend'],
          */
    },
   
        {
            title: "Subscription Type",
            dataIndex: "subscriptionRequested",
            key: "_id",
            /* 
            filters: planName,
              onFilter: (value, record) => record.subscriptionName.indexOf(value) === 0,
              sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
              sortDirections: ['descend'],
              */
        },
        
        {
          title: "Request Granted",
          dataIndex: "requestGranted",
          key: "requestGranted",
          //render: text => <a style={{"color" : "blue"}}>{text}</a>,
          //sorter: (a, b) => a.subscriptionName.length - b.subscriptionName.length,
          //  sortDirections: ['descend'],
      },
      {
        title: 'SendInvoice',
        dataIndex: 'SendInvoice',
        key: 'send',
        render: (_, record) => {
          return (
            
              <Button onClick={()=>{
                setemail(record.email)
                setvisible(true)}}>Send Invoice</Button>
           
          );
        },
      },
      {
        title: 'Invoice',
        dataIndex: 'Invoice',
        key: 'Invoice',
        render: (_, record) => {
          return (
            
              <Button onClick={()=>{props.history.push('/subscription/invoice', record)}}>View</Button>
           
          );
        },
      },
      {
        title: 'Approve',
        dataIndex: 'Approve',
        key: 'Approve',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Are you sure you want to Approve this Request?"
              onConfirm={() => handleApprove(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Approve</Button>
            </Popconfirm>
          );
        },
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        render: (_, record) => {
          return (
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => deleteHandler(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          );
        },
      },
      

        /*
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
        },*/
    ]

    // sample data 
    

      const handleView = (record) => {
        props.history.push('/view/subscription', record);
      };
      const uploadImage = (e) => {
        setimage(e.target.files[0])
      //  setState({ ...state, imageFile: e.target.files[0] });
      };

      const handleInvoice = ( ) => {
        notification.destroy()
        if(image === {} ){
          
          notification.warning({message : "Please upload a document"})
        }else{
          setdisable(true)
          var docFormData = new FormData();
              docFormData.set('image', image)
          api
                .post('/footer/upload', docFormData, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((response)=>{
                  console.log(response)
                 notification.success({ message: 'Sending Email...' });
           //       console.log(response.data.message)
                     let data = {
                        to: email,
                        subject : "Invoice",
                        text : response.data.message,
                        date  : new Date()
                     }
                     console.log(data)
                     setvisible(false)
                     api.post(`/communication/sendemail`, data ).then((email)=>{
                      console.log(email)
                      setdisable(false)
                      notification.success({
                        message : "Invoice sent"
                      })
                    })
                    
                }).catch( (err)=>{
                  console.log(err)
                  setdisable(false)
                  setvisible(false)
                  notification.error({ message: 'Try again later.' });
                })
             
              
        }
      }

    return (
      
        <div>

          <Card>
            <Card.Header>
                <div className="mb-4">
                    <h5>SUBSCRIPTIONS</h5>
                </div>
            </Card.Header>
            <Card.Body>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Approved" key="1">
              <Table
                 className="table-responsive"
                 dataSource={
                  dataSrcforApp.length === 0 && value === '' ? Approved : dataSrcforApp
                }
                   columns={columnsForApproved}
                   onRow={(record, rowIndex) => {
                    return {
                      onDoubleClick: () => handleView(record), // double click row
                      onContextMenu: (event) => {}, // right button click row
                      onMouseEnter: (event) => {}, // mouse enter row
                      onMouseLeave: (event) => {}, // mouse leave row
                    };
                  }}>

                  </Table>
              </TabPane>
              <TabPane tab="Pending" key="2">
                <Table
                 className="table-responsive"
                 dataSource={
                  dataSrc.length === 0 && value === '' ? tableData : dataSrc
                }
                   columns={columns}
                   onRow={(record, rowIndex) => {
                    return {
                      onDoubleClick: () => handleView(record), // double click row
                      onContextMenu: (event) => {}, // right button click row
                      onMouseEnter: (event) => {}, // mouse enter row
                      onMouseLeave: (event) => {}, // mouse leave row
                    };
                  }}>

                  </Table>
              </TabPane>
              <TabPane tab="Declined" key="3">
              <Table
                 className="table-responsive"
                 dataSource={
                  dataSrc.length === 0 && value === '' ? Declined : dataSrcforDec
                }
                   columns={columnsforDec}
                   onRow={(record, rowIndex) => {
                    return {
                      onDoubleClick: () => handleView(record), // double click row
                      onContextMenu: (event) => {}, // right button click row
                      onMouseEnter: (event) => {}, // mouse enter row
                      onMouseLeave: (event) => {}, // mouse leave row
                    };
                  }}>

                  </Table>
              </TabPane>
            </Tabs>
                 
            </Card.Body>
            <Modal
          title="Send Invoice"
          visible={visible}
          onCancel={()=>{setvisible(false)}}
          onOk={handleInvoice}
          footer={[
            <Button  onClick={()=>{setvisible(false)}}>
              Cancel
            </Button>,
            <Button type="primary" disabled = {disable} onClick={handleInvoice}>
              Send
            </Button>,
          ]}
        >
          <Form 
           id='myForm'
           className="form"
           className="form-details">
                  <Form.Group controlId="formGroupEmail">
                  <input
                    type="file"
                    name="File"
                    onChange={uploadImage}
                    placeholder="Upload Image"
                  />
                </Form.Group>
            </Form>
    
        </Modal>
      
          </Card>
            
           
        </div>
    )
}
export default SubscriptionManagement