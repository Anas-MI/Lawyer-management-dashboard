import React from 'react';
import { Tabs } from 'antd';
import ClientListing from './pages/clients';
import Activity from './pages/Activity';
import Earnings from './pages/Earnings';
const { TabPane } = Tabs;

const Reports = () => {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Clients Listing" key="1">
                <ClientListing />
            </TabPane>
            <TabPane tab="Activity" key="2">
                <Activity></Activity>
            </TabPane>
            <TabPane tab="Total Earnings" key="3">
                <Earnings />
            </TabPane>
        </Tabs>
    )
}

export default Reports