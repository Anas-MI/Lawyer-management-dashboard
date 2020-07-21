import React from 'react';
import { Table, Button, Input, Space, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import api from '../../../resources/api';
import { connect } from 'react-redux';

let response = {};
let tableData = [];

class matterManage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      tableData: [],
      searchData: [],
      showSearchMatter: false,
      showSearchClient: false,
      showSearchPractise: false,
      value: '',
      finalData: [],
    };
    this.filterByMatterInput = this.filterByMatterInput.bind(this);
  }
  async componentDidMount() {
    window.localStorage.setItem('total', this.state.total);
    const data = [];
    await api
      .get('/matter/viewforuser/' + this.props.userId)
      .then((res) => (response = res.data.data));
    response.map((value, index) => {
      let newData = {
        key: index,
        id: value._id,
        matterDescription: value.matterDescription,
        Client: value.client.firstName + ' ' + value.client.lastName,
        PractiseArea: value.practiseArea ? value.practiseArea : '-',
        OpenDate: value.openDate ? value.openDate : '-',
      };
      data.push(newData);
    });
    if (this.state.tableData != []) {
      this.setState({ tableData: data });
    }
  }
  filterByMatterInput = () => (
    <div>
      <SearchOutlined
        onClick={() => {
          this.state.showSearchMatter === false
            ? this.setState({ ...this.state, showSearchMatter: true })
            : this.setState({ ...this.state, showSearchMatter: false });
        }}
      />
      <span> Matter Description </span>

      <div>
        {this.state.showSearchMatter && (
          <input
            placeholder="Search Matter "
            value={this.state.value}
            onChange={(e) => {
              let filteredData = [];
              this.setState({ value: e.target.value });
              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = this.state.tableData.filter(
                  (item) =>
                    item.matterDescription !== undefined &&
                    item.matterDescription
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                );
                this.setState({ finalData: filteredData });
              } else {
                this.setState({
                  finalData: this.state.tableData,
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
  filterByClientInput = () => (
    <div>
      <SearchOutlined
        onClick={() => {
          this.state.showSearchClient === false
            ? this.setState({ ...this.state, showSearchClient: true })
            : this.setState({ ...this.state, showSearchClient: false });
        }}
      />
      <span> Client </span>

      <div>
        {this.state.showSearchClient && (
          <input
            placeholder="Search Client "
            value={this.state.value}
            onChange={(e) => {
              let filteredData = [];
              this.setState({ value: e.target.value });

              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = this.state.tableData.filter(
                  (item) =>
                    item.Client !== undefined &&
                    item.Client.toLowerCase().includes(
                      e.target.value.toLowerCase()
                    )
                );
                this.setState({ finalData: filteredData });
              } else {
                this.setState({
                  finalData: this.state.tableData,
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
  filterByPractiseInput = () => (
    <div>
      <SearchOutlined
        onClick={() => {
          this.state.showSearchPractise === false
            ? this.setState({ ...this.state, showSearchPractise: true })
            : this.setState({ ...this.state, showSearchPractise: false });
        }}
      />
      <span> Practise Area </span>

      <div>
        {this.state.showSearchPractise && (
          <input
            placeholder="Search Practise Area "
            value={this.state.value}
            onChange={(e) => {
              let filteredData = [];
              this.setState({ value: e.target.value });

              if (e.target.value.length !== 0 || e.target.value === '') {
                filteredData = this.state.tableData.filter(
                  (item) =>
                    item.PractiseArea !== undefined &&
                    item.PractiseArea.toLowerCase().includes(
                      e.target.value.toLowerCase()
                    )
                );
                this.setState({ finalData: filteredData });
              } else {
                this.setState({
                  finalData: this.state.tableData,
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
  render() {
    //Search Related

    /*
  useEffect(() => {
    
    async function fetchData() {
     response = await api.get('/contact/showall')
      setTable()
    }
    fetchData();
  }, []);
 */

    //   const handleciSelect = (record) => {
    //     // dispatch(selectBlog(record))
    //     // this.props.history.push('/lawyer/details')
    //   }

    const handleAddNew = (type) => {
      //  dispatch(selectBlog())
      this.props.history.push('/manage/Matter/add');
    };

    const handleEdit = (record) => {
      this.props.history.push('/edit/matter', record.id);
    };

    const handleDelete = (record) => {
      api
        .get('/matter/delete/' + record.id)
        .then(() => notification.success({ message: 'Matter deleted.' }))
        .catch(() => notification.error({ message: 'Failed to delete' }));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };

    const columns = [
      {
        title: this.filterByMatterInput,
        dataIndex: 'matterDescription',
        key: '_id',
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.value]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ),
      },
      {
        title: this.filterByClientInput,
        dataIndex: 'Client',
        key: '_id',
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.value]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ),
      },
      {
        title: this.filterByPractiseInput,
        dataIndex: 'PractiseArea',
        key: '_id',
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.value]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ),
      },
      {
        title: 'Open Date',
        dataIndex: 'OpenDate',
        key: '_id',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.OpenDate.length - b.OpenDate.length,
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        key: '_id',
        render: (_, record) => {
          return (
            <Button color="warning" onClick={() => handleEdit(record)}>
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
            <Button variant="danger" onClick={() => handleDelete(record)}>
              Delete
            </Button>
          );
        },
      },
    ];

    const handleView = (rec) => {
      let data = {};
      data.id = response[rec.key]._id;
      data.userId = this.props.userId;
      data.matters = this.state.tableData;
      this.props.history.push('/view/matter', data);
    };

    return (
      <div>
        <div className="p-2 ">
          <Button
            className="ml-auto"
            color="success"
            onClick={() => handleAddNew()}
          >
            Add Matter
          </Button>
        </div>
        <Table
          dataSource={
            this.state.finalData.length === 0 && this.state.value.length === 0
              ? this.state.tableData
              : this.state.finalData
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.token.user._id,
});
export default connect(mapStateToProps)(matterManage);
