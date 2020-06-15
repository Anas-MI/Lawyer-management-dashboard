import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, deleteBlog, selectBlog } from "../../../../store/Actions";

const BlogsManage = (props) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);

  //Search Related
  const [state, setState] = useState({});
  const blogs = useSelector((state) => state.Blog.blogs);

  useEffect(() => {
    setTableData(blogs);
  }, [blogs]);

  useEffect(() => {
    dispatch(
      getBlogs(null, (err, response) => {
        if (err) {
          notification.error(err);
        } else {
          notification.success(response);
        }
      })
    );
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            // console.log('Node',node)
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      console.log(dataIndex, record);
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        // setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  // const handleBlogSelect = (record) => {
  //   // dispatch(selectBlog(record))
  //   // props.history.push('/lawyer/details')
  // }

  const handleAddNew = () => {
    dispatch(selectBlog());
    props.history.push("/manage/blogs/add");
  };

  const handleEdit = (record) => {
    dispatch(selectBlog(record));
    props.history.push("/manage/blogs/edit");
  };

  const handleDelete = (record) => {
    dispatch(
      deleteBlog({ id: record._id }, (err, response) => {
        if (err) {
          notification.error(err);
        } else {
          notification.success(response);
        }
      })
    );
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "_id",
      ...getColumnSearchProps("title"),
      sorter: (a, b, c) =>
        c === "ascend" ? a.title < b.title : a.title > b.title,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "_id",
      ...getColumnSearchProps("author"),
      sorter: (a, b, c) =>
        c === "ascend" ? a.author < b.author : a.author > b.author,
    },
    {
      title: "Short Description",
      dataIndex: "shortDescription",
      key: "_id",
      ...getColumnSearchProps("shortDescription"),
      sorter: (a, b, c) =>
        c === "ascend"
          ? a.shortDescription < b.shortDescription
          : a.shortDescription > b.shortDescription,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "_id",
      ...getColumnSearchProps("description"),
      sorter: (a, b, c) =>
        c === "ascend"
          ? a.description < b.description
          : a.description > b.description,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "_id",
      render: (_, record) => {
        return (
          <Button color="warning" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "_id",
      render: (_, record) => {
        return (
          <Button variant="danger" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        );
      },
    },
  ];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

  return (
    <div>
      <div className="p-2 ">
        <Button className="ml-auto" color="success" onClick={handleAddNew}>
          Add New
        </Button>
      </div>
      <Table
        dataSource={tableData}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
      ></Table>
    </div>
  );
};

export default BlogsManage;
