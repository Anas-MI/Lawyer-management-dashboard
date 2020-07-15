import React from 'react';
import { Card, Tabs, Button, Modal, Table, Upload, notification } from 'antd';

const Documents = (props) => {
  const columnsForDocuments = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: '1',
    },
    {
      title: 'Matter',
      dataIndex: 'matter',
      key: '2',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: '3',
    },
    {
      title: 'Received Date',
      dataIndex: 'receivedDate',
      key: '4',
    },
    {
      title: 'Last Edit',
      dataIndex: 'lastEdit',
      key: '5',
    },
    {
      title: 'Action',
      dataIndex: 'download',
      key: '6',
      render: () => {
        return (
          <Button
            variant="danger"
            onClick={() => {
              notification.success({ message: 'Document Downloaded.' });
            }}
          >
            Download
          </Button>
        );
      },
    },
  ];
  return (
    <Card
      title="Document"
      extra={
        <span style={{ float: 'right' }}>
          <Upload name="file">
            <Button
              onClick={() => {
                notification.success({ message: 'Document Uploaded.' });
              }}
            >
              Upload
            </Button>
          </Upload>
        </span>
      }
      className="form-width mb-4"
    >
      <Table dataSource={props.dataSource} columns={columnsForDocuments} />
    </Card>
  );
};
export default Documents;
