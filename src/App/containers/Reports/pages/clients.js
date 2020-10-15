import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Input, Space, notification, Card, Popconfirm, Spin } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../resources/api';

const ContactsManage = (props) => {
    const userId = useSelector((state) => state.user.token.user._id);
    const [Loading, setLoading] = useState(true)
    const [contactData, setcontactData] = useState([]);
    let response = {};

    function fetchEventData() {
        api.get('/contact/viewforuser/' + userId).then((res) => {
        console.log(res, '.........res')
        let Clients = []
        setLoading(false)
          res.data.data.map((value, id)=>{
            const data = {
                Client: value.firstName + ' ' + value.lastName,
                _id: value._id,
                key : id
            };
            Clients.push(data)
          })
          setcontactData(Clients)
        })
    }
    useEffect(() => {
        fetchEventData();
    }, []);

    const columns = [
        {
            title: 'Client',
            dataIndex: 'Client',
            key: 'name',

        },
        {
            title: 'Practice Area',
            dataIndex: 'emailAddress',
            key: '_id',

        },
        {
            title: 'Last Activity',
            dataIndex: 'activity',
            key: 'activity',

        },

    ];


    return (
        <Spin size="large" spinning={Loading}>

            <Card>
                <Table
                    className="table-responsive"
                    dataSource={contactData}
                    columns={columns}
                    onRow={(record, rowIndex) => {
                        return {
                            onDoubleClick: () => { }, // double click row
                            onContextMenu: (event) => { }, // right button click row
                            onMouseEnter: (event) => { }, // mouse enter row
                            onMouseLeave: (event) => { }, // mouse leave row
                        };
                    }}
                ></Table>
            </Card>

        </Spin>
    );
};

export default ContactsManage;
