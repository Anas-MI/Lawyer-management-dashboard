import React from 'react'
import { Tabs } from 'antd';
import ClientListing from './pages/clients'
const { TabPane } = Tabs;

const Reports = () => {
    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Clients Listing" key="1">
                <ClientListing />
        </TabPane>
            <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
        </TabPane>
            <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
        </TabPane>
        </Tabs>
    )
}

export default Reports