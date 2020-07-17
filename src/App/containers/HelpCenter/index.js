import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../resources/api';
import { useSelector } from 'react-redux';
import { Card, Table, Button } from 'antd';

export default function Index() {
  const user = useSelector((state) => state.user.token.user);

  const [tickets, setTickets] = useState([]);
  const getISTDate = (dateInUTC) => {
    var localDate = new Date(dateInUTC);
    return localDate.toLocaleString();
  };
  const columns = [
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      key: '1',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.created_at > b.created_at,
    },
    {
      title: 'Ticket Id',
      dataIndex: '_id',
      key: '2',
    },
    {
      title: 'Issue',
      dataIndex: 'issue',
      key: '3',
    },

    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: '4',
    // },
  ];
  const getTickets = async () => {
    let tempData = [];
    await api
      .get(`/ticket/viewforuser/${user._id}`)
      .then(function (response) {
        response.data.data.map((item, index) => {
          tempData = [
            ...tempData,
            {
              ...item,
              key: item._id,
              created_at: getISTDate(item.created_at),
            },
          ];
        });
      })
      .catch(function (response) {
        console.log(response);
      });
    setTickets(tempData);
  };

  useEffect(() => {
    getTickets();
  }, []);

  // const modalForTicket = () => (
  //   <Modal
  //     title="Ticket"
  //     visible={visible}
  //     onCancel={() => {
  //       setVisible(false);
  //     }}
  //     footer={null}
  //   >
  //     <div>Subject</div>
  //     <p>{ticket.subject}</p>
  //     <div>Isssue</div>
  //     <p>{ticket.issue}</p>
  //     <div>Url</div>
  //     <p>{ticket.url}</p>
  //   </Modal>
  // );

  return (
    <div>
      <Card
        title="Help Center"
        extra={
          <span style={{ float: 'right' }} className="">
            <Button>
              <Link to="/help/createticket"> Create a new ticket</Link>
            </Button>
          </span>
        }
      >
        <Table dataSource={tickets} columns={columns} />
      </Card>
    </div>
  );
}
