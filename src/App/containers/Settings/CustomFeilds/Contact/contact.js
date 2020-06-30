import React from 'react'
import { Tabs, Button } from 'antd';
import Tables from '../table'
const { TabPane } = Tabs;

const customFeilds = (props) => {
    return <Tabs>
             <TabPane tab="Individual Feild" key="1">
               <Tables></Tables>
              </TabPane>
              <TabPane tab="Feild Sets" key="2">
               <Tables></Tables>
              </TabPane>
           </Tabs>

}

export default customFeilds