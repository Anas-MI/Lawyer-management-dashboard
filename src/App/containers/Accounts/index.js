import React, {useState, useEffect} from  'react'
import { Table, notification, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import api from '../../../resources/api'

const Accounts = () => {
    const history = useHistory()
    const [state, setState] = useState([])
    
    useEffect(() => {
      api
      .get("/account/showall")
      .then((res) => {
        setState([...state, ...res.data.data])
      })
      .catch((err) => {
        console.log(err); 
      });
    }, []);

    const handleDelete = (record) =>{
        console.log(record)
        api.get('/account/delete/'+record._id)
        .then((res)=>{
          notification.success({message : "Account Deleted !"})
          setTimeout(() => {
            window.location.reload()
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
                  <Button variant='danger' onClick={()=>handleDelete(record)}>
                      Delete
                  </Button>
                  )
              }
        },
        {
            title:'Edit',
            dataIndex: "edit",
            key: "_id",
            render:(_,record)=>{
                return (
                    <Button variant='danger' onClick={() => { history.push('/edit/accounts', record._id)}} >
                        Edit
                    </Button>
                )
            }
        },
      ];

    return(
        <>
            <div className='p-2 '>
                <Button className='ml-auto' color='success'>Export</Button>
                <Button className='ml-auto' color='success' style={{float : "right"}} onClick={() => { history.push('/add/accounts')}} >Add</Button>
            </div>
            <Table columns={columns} dataSource={state}/>
        </>
    )
}

export default Accounts