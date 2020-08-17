import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Input, Space, notification, Card , Popconfirm , Spin} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ExportExcel from './ExportExcel';

import api from '../../../resources/api';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  console.log(ref.current)
  return ref.current;

}
const ContactsManage = (props) => {
  console.log(props)
  const userId = useSelector((state) => state.user.token.user._id);
  const [type, setType] = useState('contact');
  const dispatch = useDispatch();
  const prevLocation = usePrevious(props.location)
  const [companyData, setcompanyData] = useState([]);
  const [value, setValue] = useState('');
  const [Loading, setLoading] = useState(true)
  const [contactData, setcontactData] = useState([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  let response = {};
  let company = {};
  //Search Related
  const [state, setState] = useState({
    tableData: [],
  });
  const [dataSrc, setDataSrc] = useState([]);
  const contacts = useSelector((state) => {
    return state.Contact.contacts;
  });
  const [searchInput, setSearchInput] = useState();
  /*
  useEffect(()=>{
    setTableData(contacts)
    console.log(contacts)
  },[contacts])
  useEffect(() => {
    dispatch(getBlogs());
  }, []); */
  
  async function fetchEventData() {
    response = await api.get('/contact/viewforuser/' + userId);
    company = await api.get('/company/viewforuser/' + userId);
 
    setTable();
  }
  useEffect(() => {
    fetchEventData();
  }, []);

  const setTable = () => {
    response.data.data.map((value, id) => {
      let key = id;

      const data = {
        firstName: value.firstName + ' ' + value.lastName,
        billingCustomRate: value.billingCustomRate,
        _id: value._id,
        emailAddress: value.emailAddress.map((value) => {
          return value.emailType + ' : ' + value.emailAddress + ' ,\n ';
        }),
      };
      let newtableData = contactData;
      newtableData.push(data);
      setcontactData(newtableData);
    });
    company.data.data.map((value, id) => {
      let key = id;
      const data = {
        firstName: value.name,
        _id: value._id,
        billingCustomRate: value.billingCustomRate,
        emailAddress: value.emailAddress.map((value) => {
          return value.emailType + ' : ' + value.emailAddress + ' ,\n ';
        }),
      };
      let newtableData = companyData;
      newtableData.push(data);
      setcompanyData(newtableData);
    });
    const nav = window.localStorage.getItem('company')
    if(nav === "true"){
      setState({ tableData: companyData });
      setType('company')
    }else{
      setState({ tableData: contactData });
      setType('contact')
    }
    setLoading(false)
    window.localStorage.setItem('company', "false")
    
  };

  //   const handleciSelect = (record) => {
  //     // dispatch(selectBlog(record))
  //     // props.history.push('/lawyer/details')
  //   }

  const handleAddNew = (type) => {
    //  dispatch(selectBlog())
    if (type === 'Person') {
      props.history.push('/manage/contacts/add/Person');
    } else if (type === 'Company') {
      props.history.push('/manage/contacts/add/Company');
    }
  };
  const setTableData = (type) => {
    //  dispatch(selectBlog())
    if (company != {} && response != {}) {
      if (type === 'Person') {
        setState({ tableData: contactData });

        setType('contact');
      } else if (type === 'Company') {
        setState({ tableData: companyData });
        setType('company');
      }
    }
  };

  const handleEdit = (record) => {
    //   dispatch(selectBlog(record))
 
    if (type === 'contact') {
      props.history.push('/edit/contact', record);
    } else if (type === 'company') {
      props.history.push('/edit/company', record);
    }
  };

  const handleDelete = (record) => {

    if (type === 'contact') {
      api
        .get('/contact/delete/' + record._id)
        .then(() =>{
          //fetchEventData()
          notification.success({ message: 'Contact deleted.' })
        }
        )
        .catch(() => notification.error({ message: 'Failed to delete' }));
    } else if (type === 'company') {
      api
        .get('/company/delete/' + record._id)
        .then(() => notification.success({ message: 'Company deleted.' }))
        .catch(() => notification.error({ message: 'Failed to delete' }));
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
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
      <span style={{paddingLeft : "8px"}}> Name </span>

      {showNameInput && (
        <div style={{paddingTop : "10px"}}>
          <input
            placeholder="Search"
            value={value}
            onChange={(e) => {
              let filteredData;
              setValue(e.target.value);
              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = state.tableData.filter((item) =>
                  item.firstName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                );
                setDataSrc(filteredData);
              } else {
                setDataSrc(state.tableData);
              }
            }}
          />
        </div>
      )}
    </div>
  );
  const FilterByEmailInput = (
    <div>
      <SearchOutlined
        onClick={() => {
          showEmailInput === false
            ? setShowEmailInput(true)
            : setShowEmailInput(false);
        }}
      />
      <span> Email </span>

      {showEmailInput && (
        <div>
          <input
            placeholder="Search Email"
            value={value}
            onChange={(e) => {
              let filteredData;
              setValue(e.target.value);
              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = state.tableData.filter(
                  (item) =>
                    item.emailAddress !== undefined &&
                    item.emailAddress
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                );
                setDataSrc(filteredData);
              } else {
                setDataSrc(state.tableData);
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
      dataIndex: 'firstName',
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
      title: 'Email',
      dataIndex: 'emailAddress',
      key: '_id',
      // render: (_, record) => {
      //   console.log(record);
      //   return <div>hi{record.emailAddress[0].emailAddress}</div>;
      // },
      // render: (text) => (
      //   <Highlighter
      //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      //     searchWords={[value]}
      //     autoEscape
      //     textToHighlight={text ? text.toString() : ''}
      //   />
      // ),
    },

    {
      title: 'Edit',
      dataIndex: 'edit',
      key: '_id',
      render: (_, record) => {
        return (
          <Button variant="danger" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        );
      },
    },

    {
      title: 'Delete',
      dataIndex: 'delete',
      key: '_id',
      render: (_, record) => {
        return (
          <Popconfirm
          title="Are you sure delete this contact?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>
            Delete
          </Button>
        </Popconfirm>
          
        );
      },
    },
  ];

  const handleView = (i) => {
    if (type === 'contact') {
      props.history.push('/view/contact', i._id);
    }
    if (type === 'company') {
      props.history.push('/view/company', i._id);
    }
  };
  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = 'Contacts';
    const headers = [['Name', 'Email']];

    let data = [];
    state.tableData.map((val, index) => {
      const td = [val.firstName, val.emailAddress];
      data.push(td);
    });

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('contact.pdf');
  };
  return (
    <Spin size = "large" spinning={Loading}>
      <Card
      title="Contacts"
      extra={
        <div className="d-flex justify-content-center">
          <button
            className="ml-auto btn  btn-outline-primary   btn-sm"
            onClick={exportPDF}
          >
            Export to Pdf
          </button>
          <ExportExcel dataSource={state.tableData || []} />
        </div>
      }
    >
      <div className="p-2 ">
        <Button
          className="ml-auto"
          color="success"
          onClick={() => setTableData('Person')}
        >
          Person
        </Button>
        <Button
          className="ml-auto"
          color="success"
          onClick={() => setTableData('Company')}
        >
          Company
        </Button>
        <Button
          className="ml-auto"
          color="success"
          style={{ float: 'right' }}
          onClick={() => handleAddNew('Person')}
        >
          Add Person
        </Button>
        <Button
          className="ml-auto"
          color="success"
          style={{ float: 'right' }}
          onClick={() => handleAddNew('Company')}
        >
          Add Company
        </Button>
      </div>
      <Table
        dataSource={
          dataSrc.length === 0 && value === '' ? state.tableData : dataSrc
        }
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => handleView(record), // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
      ></Table>
    </Card>
  
    </Spin>
    );
};

export default ContactsManage;
