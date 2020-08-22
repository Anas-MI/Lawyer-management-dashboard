import React, {useState, useEffect} from  'react'
import { Table, notification, Button, Popconfirm, Spin, Space, Card } from 'antd';
import { } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import api from '../../../resources/api'
import { useSelector } from 'react-redux'
import ExportExcel from './ExcelExport'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
      const exportPDF = () => {
        const unit = 'pt';
        const size = 'A4'; // Use A1, A2, A3 or A4
        const orientation = 'portrait'; // portrait or landscape
  
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
  
        doc.setFontSize(15);
  
        const title = 'Accounts';
        const headers = [
          [
            'Account Name',
            'Currency',
            'Balance',
            'Default Account',
          ],
        ];
  
        let data = [];
  
        state.map((val, index) => {
          const td = [
            val.accountName,
            val.currency,
            val.openingBalance,
            val.type,
          ];
          data.push(td);
        });
  
        let content = {
          startY: 50,
          head: headers,
          body: data,
        };
  
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save('Accounts.pdf');
      };
    return(
        <>
        <Spin size = "large" spinning={Loading}>
          <Card
           title = "Accounts"
           extra={
            <div className="d-flex justify-content-center">
                  <button
                      className="ml-auto btn  btn-outline-primary   btn-sm"
                      onClick={exportPDF}
                  >
                      Export to Pdf
                  </button>
                  <ExportExcel dataSource={state || []} />
                  <button
                      className="ml-auto btn  btn-outline-primary   btn-sm"
                      onClick={() => { history.push('/add/accounts')}}
                  >
                      Add Account
                  </button>
        
            </div>
         
        }
           >
             <Table columns={columns} dataSource={state}/>
          </Card>
        </Spin>
            
        </>
    )
}

export default Accounts