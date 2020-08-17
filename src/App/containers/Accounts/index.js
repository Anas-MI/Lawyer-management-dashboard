import React, {useState, useEffect} from  'react'
import { Table, notification, Button, Popconfirm, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import api from '../../../resources/api'
import { useSelector } from 'react-redux'

const Accounts = () => {
    const history = useHistory()
    const [state, setState] = useState([])
    const [Loading, setLoading] = useState(true)
    const userId = useSelector((state) => state.user.token.user._id);
    
    const fetchAccount = ( ) =>{
      api
      .get('/account/viewforuser/' + userId)
      .then((res) => {
        console.log(res)
        const tableData = []
        res.data.data.map((value, index) => {
          console.log(value.defaultAccount)
          const data = {
            _id : value._id,
            key : index,
            accountName : value.accountName,
            currency : value.currency,
            openingBalance : value.openingBalance,
            type :  value.defaultAccount ? "Yes" : "No"
          }
          tableData.push(data)
        })
        setState(tableData)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err); 
      });
    }
    useEffect(() => {
      fetchAccount()
    }, []);

    const handleDelete = (record) =>{
        console.log(record)
        api.get('/account/delete/'+record._id)
        .then((res)=>{
          fetchAccount()
          notification.success({message : "Account Deleted !"})
          setTimeout(() => {
           // window.location.reload()
          }, 1000);
        })
        .catch((err)=>{
          notification.error({message : "Failed to delete"})
        })
    }


    const columns = [
        {
          title: 'Account Name',
          dataIndex: 'accountName',
        },
        {
          title: 'Currency',
          dataIndex: 'currency',
        },
        {
          title: 'Balance',
          dataIndex: 'openingBalance',
        },
        {
            title: 'Default Account',
            dataIndex: 'type',
        },
        {
          title:'Delete',
          dataIndex: "delete",
          key: "_id",
          render:(_,record)=>{
              return (
                <Popconfirm
                    title="Are you sure delete this Account?"
                    onConfirm={()=>handleDelete(record)}
                    onCancel={()=>{}}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button  danger>
                      Delete
                  </Button>
                  </Popconfirm>
                  
                  )
              }
        },
        {
            title:'Edit',
            dataIndex: "edit",
            key: "_id",
            render:(_,record)=>{
                return (
                    <Button  onClick={() => { history.push('/edit/accounts', record._id)}} >
                        Edit
                    </Button>
                )
            }
        },
      ];

    return(
        <>
        <Spin size = "large" spinning={Loading}>
          <div className='p-2 '>
                <Button className='ml-auto' color='success'>Export</Button>
                <Button className='ml-auto' color='success' style={{float : "right"}} onClick={() => { history.push('/add/accounts')}} >Add</Button>
            </div>
            <Table columns={columns} dataSource={state}/>
        </Spin>
            
        </>
    )
}

export default Accounts