import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Input, Space, notification, Card, Popconfirm, Spin } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../../resources/api';
const { Column, ColumnGroup } = Table;

const ContactsManage = (props) => {
    const userId = useSelector((state) => state.user.token.user._id);
    const [Loading, setLoading] = useState(true)
    const [tableData, settableData] = useState([])

    const fetchBills = async (_id) => {
        const res = await api.get('/billing/bill/viewforuser/' + userId + '/' + _id)
        console.log(res)
        let earning = 0
        const bills = res.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        bills.map((bill, index) => {
            if(bill.status === "Paid")
              earning = earning + parseFloat(bill.balance)
        })
        if (bills.length > 0)
            return {
                earning: earning,
                last_invoice: bills[0].issueDate
            }
        return {
            earning: earning,
            last_invoice: ''
        }
    }
    const fetchEventData = () => {
        api.get('/matter/viewforuser/' + userId).then(async (res) => {
            let matters = []
            res.data.data.map(async (item, index) => {
                const details = await fetchBills(item._id)
                if(details.earning > 0){
                    const matter = {
                        matter: item.matterDescription,
                        client: item.client.firstName + " " + item.client.lastName,
                        startDate: item.openDate,
                        endDate: item.closeDate,
                        earning: details.earning,
                        invoice: details.last_invoice === '' ? "-" : new Date(details.last_invoice).toUTCString()
                    }
                    matters.push(matter)
                    settableData(matters) //Todo : check the async execution of this function
                }
            })
            setLoading(false);
        })
    }
    useEffect(() => {
        fetchEventData();
    }, []);

    return (
        <Spin size="large" spinning={Loading}>
            <Card>
                <Table className="table-responsive" dataSource={tableData}>
                    <Column
                        title="Client"
                        dataIndex="client"
                        key="client"
                    />
                    <Column
                        title="Matter"
                        dataIndex="matter"
                        key="matter"
                    />
                    <Column
                        title="Start Date"
                        dataIndex="startDate"
                        key="startDate"
                    />
                    <Column
                        title="End Date"
                        dataIndex="endDate"
                        key="endDate"
                    />
                    <Column title="Total Earning" dataIndex="earning" key="earning" />
                    <Column title="Last Invoice" dataIndex="invoice" key="invoice" />
                </Table>
            </Card>

        </Spin>
    );
};

export default ContactsManage;
