import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Input, Space, notification, Card, Popconfirm, Spin } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../resources/api';
const { Column, ColumnGroup } = Table;

const ContactsManage = (props) => {
    const userId = useSelector((state) => state.user.token.user._id);
    const [Loading, setLoading] = useState(true)
    const [contactData, setcontactData] = useState([]);

    const fetchActivity = async (_id) => {
        const res = await api.get('/activity/viewforuser/' + userId)
        const acitivites = res.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        const activity = acitivites.filter((activity) => {
            if (activity.matter && activity.matter.client) {
                if (activity.matter.client._id === _id)
                    return activity
            }
        })
        if (activity.length > 0)
            return activity[0]
        return {
            created_at: '',
            description: '-'
        }
    }
    const fetchEventData = () => {
        api.get('/contact/viewforuser/' + userId).then(async (res) => {
            let Clients = []
            await res.data.data.map(async (value, id) => {
                const clientdata = await fetchActivity(value._id)
                const practiseArea = clientdata.matter ?  clientdata.matter.practiseArea : "-";
                const data = {
                    client: value.firstName + ' ' + value.lastName,
                    _id: value._id,
                    key: id,
                    area: practiseArea,
                    description: clientdata.description,
                    date: clientdata.created_at === '' ? "-" : new Date(clientdata.created_at).toUTCString()
                };
                Clients.push(data)
                setcontactData(Clients) //Todo : check the async execution of this function
            })
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchEventData();
    }, []);

    return (
        <Spin size="large" spinning={Loading}>
            <Card>
                <Table dataSource={contactData}>
                    <Column
                        title="Client"
                        dataIndex="client"
                        key="client"
                    />
                    <ColumnGroup title="Last Activity">
                        <Column title="Description" dataIndex="description" key="description" />
                        <Column title="Date" dataIndex="date" key="date" />
                    </ColumnGroup>
                    <Column title="Practice Area" dataIndex="area" key="area" />
                </Table>
            </Card>

        </Spin>
    );
};

export default ContactsManage;
