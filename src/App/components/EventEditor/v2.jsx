import React, { useEffect } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";
import { notification, Button } from "antd";
import api from '../../../resources/api'


const EditorTemplate = props => {

  let options = []
  let res = {}
  useEffect(()=>{
    async function fetchData(){
      res =  await api.get('matter/viewforuser/'+props.userId)
      setdata()
    }
    

    fetchData()
  },[])
  const setdata = ()=>{
    res.data.data.map((value,item)=>{
      options.push({text :value.matterDescription, value : item})
    })
  }
  function onChange(args){
    {/*
    if(args.itemData.value==='via Email'){

    }else 
    if(args.itemData.value==='via Notification'){
      const args = {
        message: 'Appointment',
        description:
          'You have A appointment Ahead',
        duration: 0,
      };
      notification.open(args)
    }else  
    if(args.itemData.value==='Before 10 mins'){

    } */}
    
  }
  console.log(props)
  return props.Subject == undefined ? (
    <>
    <div>
    {console.log("undefined nahi he")}

          <table
      className="custom-event-editor"
      style={{ width: "100%", cellpadding: "5" }}
    >
      <tbody>
        <tr>
          <td className="e-textlabel">Title</td>
          <td colSpan={4}>
            <input
              required
              id="title"
              className="e-field e-input"
              type="text"
              name="Subject"
              onChange = {props.handleChange}
              style={{ width: "100%" }}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">StartTime :</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="MM/dd/yy hh:mm a"
              id="startTime"
              data-name="StartTime"
              change = {props.DateTimeChange}
              value={props.startTime || props.StartTime}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">EndTime : </td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="MM/dd/yy hh:mm a"
              id="endTime"
              data-name="EndTime"
              change={props.DateTimeChange}
              value={props.endTime || props.EndTime}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>    
                  <td className="e-textlabel">type </td>
                    <td colSpan={4}>
                    <label className="my-2">
                      <input type="checkbox" id="allday" name="allday" data-name="AllDay"
                      onChange={props.handleChange} defaultChecked = {props.Allday} className="mr-2"
                        //onChange={() => setChecked(!checked)}
                      />
                      <span style={{"vertical-align": "text-top", "line-height": "1"}}>All day</span>
                    </label>
             
                    <label className="m-2">
                      <input type="checkbox" id="repeat" name="repeat" data-name="Repeat"
                        onChange={props.handleChange} defaultChecked = {props.Repeat} className="mr-2"
                        //onChange={() => setChecked(!checked)}
                      />
                      <span style={{"vertical-align": "text-top", "line-height": "1"}}>Repeat</span>
                      
                    </label>
                  </td>
                 
                </tr>
        <tr>
          <td className="e-textlabel">Location</td>
          <td colSpan={4}>
            <input
              onChange={props.handleChange}
              id="location"
              placeholder={props.location || props.Location}
              className="e-field e-input"
              data-name="Location"
              type="text"
              name="Location"
              style={{ width: "100%" }}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Matter</td>
          <td colSpan={4}>
            <DropDownListComponent
              id="matter"
              placeholder="Choose status"
              data-name="Matter"
              change={props.DateTimeChange}
              placeholder={props.matter|| props.Matter}
              className="e-field"
              data-name="Matter"
              style={{ width: "100%" }}
              dataSource={options}
              value={props.EventType || null}
            ></DropDownListComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Description</td>
          <td colSpan={4}>
            <textarea
             onChange={props.handleChange}
              placeholder={props.Description || props.description}
              id="description"
              className="e-field e-input"
              name="Description"
              data-name="Description"
              rows={5}
              cols={50}
              style={{
                width: "100%",
                height: "100px !important",
                resize: "none",
              }}
            ></textarea>
          </td>
        </tr>
        <tr>    
                  <td className="e-textlabel">Remind via : </td>
                    <td colSpan={4}>
                    <label className="my-2">
                      <input type="checkbox" id="email" name="email" data-name="email" defaultChecked = {props.Email}
                        onChange={props.handleChange} className="mr-2"
                        //onChange={() => setChecked(!checked)}
                      />
                      <span style={{"vertical-align": "text-top", "line-height": "1"}}>Email</span>
                      
                    </label>
             
                    <label className="m-2">
                      <input type="checkbox" id="notification" name="notification" data-name="Notification" defaultChecked={props.Notification}
                        onChange={props.handleChange} className="mr-2"
                        //onChange={() => setChecked(!checked)}
                      />
                      <span style={{"vertical-align": "text-top", "line-height": "1"}}>Notification</span>
                      
                    </label>
                  </td>
                 
                </tr>
                <tr>
                  <td className="e-textlabel">Time For Reminder :</td>
                  <td colSpan={4}>
                  
                  <TimePickerComponent 
                  id="timeForReminder" 
                  change={props.DateTimeChange}
                  data-name="TimeForReminder"
                  value={props.timeForReminder || props.TimeForReminder}
                  placeholder="Select a Time"
                  className="e-field"  />
                  </td>
                </tr>
                {
                    /* 
                       <tr>
                <td className="e-textlabel">Time for Reminder</td>
                  <td colSpan={6}>
                    <input
                      id="timeForReminder" 
                      change={props.DateTimeChange}
                      data-name="TimeForReminder"
                      value={props.timeForReminder || props.TimeForReminder}
                      placeholder="Time (in mins)"
                         style={{ width: "100%" }}
                    />
                  </td>
                  
                 </tr>
          
                    */
                }
                     </tbody>
    </table>
    </div>
    <Button type="link" onClick={props.onClickButton2} danger style={{ "z-index": "1009","bottom": "-6px"}}><p style={{fontWeight : "500"}}>SAVE AND CREATE NEW</p></Button>
</>
  ) : (
    <>
    {console.log("undefined")}
    <div>
          <table
      className="custom-event-editor"
      style={{ width: "100%", cellpadding: "5" }}
    >
      <tbody>
        <tr>
          <td className="e-textlabel">Title</td>
          <td colSpan={4}>
            <input
              required
              id="title"
              className="e-field e-input"
              type="text"
              name="Subject"
              onChange = {props.handleChange}
              style={{ width: "100%" }}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">StartTime :</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="MM/dd/yy hh:mm a"
              id="startTime"
              data-name="StartTime"
              change = {props.DateTimeChange}
              value={props.startTime || props.StartTime}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">EndTime : </td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="MM/dd/yy hh:mm a"
              id="endTime"
              data-name="EndTime"
              change={props.DateTimeChange}
              value={props.endTime || props.EndTime}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>    
                  <td className="e-textlabel">type </td>
                    <td colSpan={4}>
                    <label className="my-2">
                      <input type="checkbox" id="allday" name="allday" data-name="AllDay"
                      onChange={props.handleChange} defaultChecked = {props.Allday} className="mr-2"
                        //onChange={() => setChecked(!checked)}
                      />
                      <span style={{"vertical-align": "text-top", "line-height": "1"}}>All day</span>
                    </label>
             
                    <label className="m-2">
                      <input type="checkbox" id="repeat" name="repeat" data-name="Repeat"
                        onChange={props.handleChange} defaultChecked = {props.Repeat} className="mr-2"
                        //onChange={() => setChecked(!checked)}
                      />
                      <span style={{"vertical-align": "text-top", "line-height": "1"}}>Repeat</span>
                      
                    </label>
                  </td>
                 
                </tr>
        <tr>
          <td className="e-textlabel">Location</td>
          <td colSpan={4}>
            <input
              onChange={props.handleChange}
              id="location"
              placeholder={props.location || props.Location}
              className="e-field e-input"
              data-name="Location"
              type="text"
              name="Location"
              style={{ width: "100%" }}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Matter</td>
          <td colSpan={4}>
            <DropDownListComponent
              id="matter"
              placeholder="Choose status"
              data-name="Matter"
              change={props.DateTimeChange}
              placeholder={props.matter|| props.Matter}
              className="e-field"
              data-name="Matter"
              style={{ width: "100%" }}
              dataSource={options}
              value={props.EventType || null}
            ></DropDownListComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Description</td>
          <td colSpan={4}>
            <textarea
             onChange={props.handleChange}
              placeholder={props.Description || props.description}
              id="description"
              className="e-field e-input"
              name="Description"
              data-name="Description"
              rows={5}
              cols={50}
              style={{
                width: "100%",
                height: "100px !important",
                resize: "none",
              }}
            ></textarea>
          </td>
        </tr>
        <tr>    
                  <td className="e-textlabel">Remind via : </td>
                    <td colSpan={4}>
                    <label className="my-2">
                      <input type="checkbox" id="email" name="email" data-name="email" defaultChecked = {props.Email}
                        onChange={props.handleChange} className="mr-2"
                        //onChange={() => setChecked(!checked)}
                      />
                      <span style={{"vertical-align": "text-top", "line-height": "1"}}>Email</span>
                      
                    </label>
             
                    <label className="m-2">
                      <input type="checkbox" id="notification" name="notification" data-name="Notification" defaultChecked={props.Notification}
                        onChange={props.handleChange} className="mr-2"
                        //onChange={() => setChecked(!checked)}
                      />
                      <span style={{"vertical-align": "text-top", "line-height": "1"}}>Notification</span>
                      
                    </label>
                  </td>
                 
                </tr>
                <tr>
                  <td className="e-textlabel">Time For Reminder :</td>
                  <td colSpan={4}>
                  
                  <TimePickerComponent 
                  id="timeForReminder" 
                  change={props.DateTimeChange}
                  data-name="TimeForReminder"
                  value={props.timeForReminder || props.TimeForReminder}
                  placeholder="Select a Time"
                  className="e-field"  />
                  </td>
                </tr>
                {
                    /* 
                       <tr>
                <td className="e-textlabel">Time for Reminder</td>
                  <td colSpan={6}>
                    <input
                      id="timeForReminder" 
                      change={props.DateTimeChange}
                      data-name="TimeForReminder"
                      value={props.timeForReminder || props.TimeForReminder}
                      placeholder="Time (in mins)"
                         style={{ width: "100%" }}
                    />
                  </td>
                  
                 </tr>
          
                    */
                }
                     </tbody>
    </table>
    </div>
</>
  );
};
export default EditorTemplate;
