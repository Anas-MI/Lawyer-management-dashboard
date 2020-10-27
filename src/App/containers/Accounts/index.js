import React, { useState, useEffect } from 'react'
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
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Accounts = (props) => {
  const history = useHistory()
  const [state, setState] = useState([])
  const [Loading, setLoading] = useState(true)
  const userId = useSelector((state) => state.user.token.user._id);
  const [value, setValue] = useState('');
  const [dataSrc, setDataSrc] = useState([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [trustAccount, settrustAccount] = useState([])
  const [operatingAccount, setoperatingAccount] = useState([])
  const [Active, setActive] = useState(0)

  const fetchAccount = () => {
    api
      .get('/account/viewforuser/' + userId)
      .then((res) => {
        let tableData = []
        let secound = []
        let third = []
        console.log(res, '.........')
        res.data.data.map((value, index) => {
          const data = {
            _id: value._id,
            key: index,
            accountName: value.accountName,
            accountHolder: value.contactId ? value.contactId.firstName + " " + value.contactId.lastName : "-",
            currency: value.currency,
            balance: value.balance,
            openingBalance: value.openingBalance,
            default: value.defaultAccount ? "Yes" : "No",
            type: value.type
          }
          if (data.type === "Client Account") {
            tableData.push(data)
          }
          if (data.type === "Trust Account") {
            secound.push(data)
          }
          if (data.type === "Operating Account") {
            third.push(data)
          }
        })
        settrustAccount(secound)
        setoperatingAccount(third)
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

  const handleDelete = (record) => {
    console.log(record)
    api.get('/account/delete/' + record._id)
      .then((res) => {
        fetchAccount()
        notification.success({ message: "Account Deleted !" })
        setTimeout(() => {
          // window.location.reload()
        }, 1000);
      })
      .catch((err) => {
        notification.error({ message: "Failed to delete" })
      })
  }

  const FilterByNameInput = (
    <div>
      <SearchOutlined
        style={{ "vertical-align": "revert" }}
        onClick={() => {
          var dump =
            showNameInput === false
              ? setShowNameInput(true)
              : setShowNameInput(false);
        }}
      />
      <span style={{ paddingLeft: "8px" }}> Account Name </span>

      {showNameInput && (
        <div style={{ paddingTop: "10px" }}>
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[value]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ),
    },
    {
      title: 'Account Holder',
      dataIndex: 'accountHolder',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
    },
    {
      title: 'Opening Balance',
      dataIndex: 'openingBalance',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.openingBalance - b.openingBalance,
    },
    {
      title: 'Default Account',
      dataIndex: 'default',
    },
    {
      title: 'Edit',
      dataIndex: "edit",
      key: "_id",
      render: (_, record) => {
        return (
          <Button onClick={() => { history.push('/edit/accounts', record._id) }} >
            Edit
          </Button>
        )
      }
    },
    {
      title: 'View',
      key: "view",
      render: (_, record) => {
        return (
          <Button onClick={() => { handleView(record) }} >
            View
          </Button>
        )
      }
    },
    {
      title: 'Delete',
      dataIndex: "delete",
      key: "_id",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Are you sure delete this Account?"
            onConfirm={() => handleDelete(record)}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Delete
                  </Button>
          </Popconfirm>
        )
      }
    },
  ];
  const columns2 = [
    {
      title: "Account Name",
      dataIndex: 'accountName'
    },
    {
      title: 'Account Holder',
      dataIndex: 'accountHolder',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
    },
    {
      title: 'Opening Balance',
      dataIndex: 'openingBalance',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.openingBalance - b.openingBalance,
    },
    {
      title: 'Default Account',
      dataIndex: 'default',
    },
    {
      title: 'Edit',
      dataIndex: "edit",
      key: "_id",
      render: (_, record) => {
        return (
          <Button onClick={() => { history.push('/edit/accounts', record._id) }} >
            Edit
          </Button>
        )
      }
    },
    {
      title: 'View',
      key: "view",
      render: (_, record) => {
        return (
          <Button onClick={() => { handleView(record) }} >
            View
          </Button>
        )
      }
    },
    {
      title: 'Delete',
      dataIndex: "delete",
      key: "_id",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Are you sure delete this Account?"
            onConfirm={() => handleDelete(record)}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Delete
                  </Button>
          </Popconfirm>
        )
      }
    },
  ];
  const columns3 = [
    {
      title: "Account Name",
      dataIndex: 'accountName'
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
    },
    {
      title: 'Opening Balance',
      dataIndex: 'openingBalance',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.openingBalance - b.openingBalance,
    },
    {
      title: 'Default Account',
      dataIndex: 'default',
    },
    {
      title: 'Edit',
      dataIndex: "edit",
      key: "_id",
      render: (_, record) => {
        return (
          <Button onClick={() => { history.push('/edit/accounts', record._id) }} >
            Edit
          </Button>
        )
      }
    },
    {
      title: 'View',
      key: "view",
      render: (_, record) => {
        return (
          <Button onClick={() => { handleView(record) }} >
            View
          </Button>
        )
      }
    },
    {
      title: 'Delete',
      dataIndex: "delete",
      key: "_id",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Are you sure delete this Account?"
            onConfirm={() => handleDelete(record)}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Delete
                  </Button>
          </Popconfirm>
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
        val.default,
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
  const callBack = (key) => {
    setActive(key)
    console.log(Active)
  }

  const handleView = (record) => {
    props.history.push('/account/statements', record._id)
  }
  return (
    <>
      <Spin size="large" spinning={Loading}>
        <div className="d-flex mb-2 title-component-header">
          <div className="title-header-name">
            <h5>Accounts</h5>
          </div>
          <div className="d-flex extra-iteam-div">
            <button
              className="btn  btn-outline-primary   btn-sm"
              onClick={exportPDF}
            >
              Export to Pdf
                  </button>
            <ExportExcel dataSource={state || []} />
            <button
              className="btn  btn-outline-primary   btn-sm"
              onClick={() => { history.push('/add/accounts', Active) }}
            >
              Add Account
                  </button>
          </div>
        </div>
        <Card>
          <Tabs defaultActiveKey="1" onChange={callBack}>
            <TabPane tab="Client Account" key="1">
              <Table
                className="table-responsive"
                columns={columns}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => handleView(record), // double click row
                  };
                }}
                dataSource={
                  dataSrc.length === 0 && value === '' ? state : dataSrc
                } />
            </TabPane>
            <TabPane tab="Trust Account" key="2">
              <Table
                className="table-responsive"
                columns={columns2}
                dataSource={trustAccount}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => handleView(record), // double click row
                  };
                }}
              />
            </TabPane>
            <TabPane tab="Operating Acount" key="3">
              <Table
                className="table-responsive"
                columns={columns3}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => handleView(record), // double click row
                  };
                }}
                dataSource={operatingAccount} />
            </TabPane>
          </Tabs>

        </Card>
      </Spin>

    </>
  )
}

export default Accounts