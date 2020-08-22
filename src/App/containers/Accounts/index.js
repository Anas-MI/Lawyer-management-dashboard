import React, {useState, useEffect} from  'react'
import { Table, notification, Button, Popconfirm, Spin, Space, Card } from 'antd';
import { } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import api from '../../../resources/api'
import { useSelector } from 'react-redux'
import ExportExcel from './ExcelExport'
import jsPDF from 'jspdf';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import 'jspdf-autotable';

const Accounts = () => {
    const history = useHistory()
    const [state, setState] = useState([])
    const [Loading, setLoading] = useState(true)
    const userId = useSelector((state) => state.user.token.user._id);
    const [value, setValue] = useState('');
    const [dataSrc, setDataSrc] = useState([]);
    const [showNameInput, setShowNameInput] = useState(false);
    
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
        <span style={{paddingLeft : "8px"}}> Account Name </span>
  
        {showNameInput && (
          <div style={{paddingTop : "10px"}}>
            <input
              placeholder="Search"
              value={value}
              onChange={(e) => {
                let filteredData;
                setValue(e.target.value);
                if (e.target.value.length !== 0 || e.target.value === '') {
                  filteredData = state.filter((item) =>
                    item.accountName
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  setDataSrc(filteredData);
                } else {
                  setDataSrc(state);
                }
              }}
            />
          </div>
        )}
      </div>
    );
    const columns = [
        {
          title: FilterByNameInput,
          dataIndex: 'accountName',
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
          title: 'Currency',
          dataIndex: 'currency',
        },
        {
          title: 'Balance',
          dataIndex: 'openingBalance',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.openingBalance - b.openingBalance,
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
             <Table 
             columns={columns} 
             dataSource={
              dataSrc.length === 0 && value === '' ? state : dataSrc
            }/>
          </Card>
        </Spin>
            
        </>
    )
}

export default Accounts