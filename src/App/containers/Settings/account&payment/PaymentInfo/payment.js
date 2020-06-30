import React from 'react'
import {Card, Button, Progress} from 'antd'
const Payment = () =>{
    return <div>
        <Card title="Setup Your Subscriptions">
        <h4>Subscription</h4>
        <p><strong>Current Plan </strong>  :   Elite </p><Button type="link">View Plan</Button>
        <p><strong>Pay on next Bill </strong>  :   7 users, paid yearly </p>
        <p><strong>License </strong>  :   User License used 7/7 </p>
                                        <br></br><Progress percent={100} /><br></br>
                                         <Button type="link">Buy More License</Button>
       <p><strong>Amount on next Bill </strong>  :   $8,212 on 03/01/20 </p>
        </Card>
    </div>
}
 export default Payment