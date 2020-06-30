import React from 'react'
import { Button , Card} from 'antd'

const setting = (props) => {
    const clickHandler=(type)=>{
        props.history.push('/settings/'+type)
    }
    return <Card title="Settings">
        <div style={{display : "inline"}}>
        <div style={{float: "left"}}>
            <h4>System </h4>
            <Button onClick={()=>clickHandler("account&payment")} type="link">- Account And Payment Info</Button><br></br>
            <Button onClick={()=>clickHandler("customFeilds")} type="link">- Custom Feilds</Button><br></br>
            <Button onClick={()=>clickHandler("manageUser")} type="link">- Manage user</Button><br></br>
            <Button onClick={()=>clickHandler("recycleBin")} type="link">- Recycle Bin</Button><br></br>
            <Button onClick={()=>clickHandler("Document")} type="link">- Document</Button><br></br>
            <Button onClick={()=>clickHandler("security")} type="link">- Security</Button><br></br>
            <Button onClick={()=>clickHandler("billSyncing")} type="link">- Bill Syncing</Button><br></br>
        </div>
        <div >
            <h4>Personal</h4>
            <Button onClick={()=>clickHandler("profile")} type="link">- Profile</Button><br></br>
            <Button onClick={()=>clickHandler("ContactAndCalendarSyncing")} type="link">- Contact and Calendar syncing</Button><br></br>
            <Button onClick={()=>clickHandler("App")} type="link">- App</Button><br></br>
        </div>
        </div>
         
    </Card>
}

export default setting