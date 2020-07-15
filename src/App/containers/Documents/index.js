import React, {useState} from  'react'
import { Card , Table} from 'antd';
import { useHistory } from 'react-router-dom';
import { Upload, message, Breadcrumb } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

const Documents = () =>{

    const { Dragger } = Upload;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'Matter',
            dataIndex: 'Matter',
            key: 'Matter',
        },
        {
            title: 'Category',
             dataIndex: 'Category',
             key: 'Category',
        },
        {
            title: 'Received Date',
             dataIndex: 'ReceivedDate',
             key: 'ReceivedDate',
        }, 
        {
            title: 'Last Edit',
             dataIndex: 'LastEdit',
             key: 'LastEdit',
        },
        {
            title: 'Author',
             dataIndex: 'Author',
             key: 'Author',
        },   
      ];

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

    return(
        <>  
        <div className="d-flex justify-content-between">
            <div>
                <Breadcrumb style={{"font-size": "16px", "font-weight": "bold", "color": "#000"}} >
                    <Breadcrumb.Item>ALL Files</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="" style={{"font-size": "16px", "font-weight": "bold", "color": "#007bff"}}>xyz file</a></Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="d-flex">
                <DropdownButton id="dropdown-basic-button" title="New">
                    <Dropdown.Item {...props} >File Upload</Dropdown.Item>
                    <Dropdown.Item >Folder Upload</Dropdown.Item>
                </DropdownButton>
                <Button >Download</Button>
            </div>
        </div>
            <Card title="Documents" extra={<span style={{float : "right"}}> 
            </span>}
            bodyStyle={{"padding": "0px"}} className="overflow-auto">
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Add files by using the New button or dragging and dropping into this window.
                    </p>
                </Dragger>
                <Table  columns={columns} />
            </Card>
            
        </>
    )
}
export default Documents 