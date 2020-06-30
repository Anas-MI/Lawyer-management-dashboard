import React from 'react'
import {Card, Button, Progress} from 'antd'
const Payment = () =>{
    return <div>
        <Card title="Setup Your Subscriptions">
            <h4>Subscription</h4>
            <table class="table table-borderless form-width">
                <tbody>
                    <tr>
                        <td className="border-0" style={{"padding-top": "20px"}}><span className="table-span-dark">Current Plan</span></td>
                        <td className="border-0"><span className="table-span-light">Elite</span> <Button type="link">View Plan</Button></td>
                    </tr>
                    <tr>
                        <td className="border-0"><span className="table-span-dark">Pay on next Bill</span></td>
                        <td className="border-0"><span className="table-span-light">7 users, paid yearly</span></td>
                    </tr>
                    <tr>
                        <td className="border-0"><span className="table-span-dark">License</span></td>
                        <td className="border-0"><span className="table-span-light">User License used 7/7</span> <br /> 
                            <Progress percent={100} /> <br />
                            <Button type="link" style={{"padding": "0"}}>Buy More License</Button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border-0"><span className="table-span-dark">License</span></td>
                        <td className="border-0"><span className="table-span-light">User License used 7/7</span></td>
                    </tr>
                    <tr>
                        <td className="border-0"><span className="table-span-dark">Amount on next Bill</span></td>
                        <td className="border-0"><span className="table-span-light">$8,212 on 03/01/20</span></td>
                    </tr>
                </tbody>
            </table>
        </Card>
    </div>
}
 export default Payment