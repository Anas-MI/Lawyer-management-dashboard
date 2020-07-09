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
      console.log(res)
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
    console.log("date")
    console.log(args.itemData.value)
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
  return props !== undefined ? (
    <table
      className="custom-event-editor"
      style={{ width: "100%", cellpadding: "5" }}
    >
      <tbody>
        <tr>
          <td className="e-textlabel">Title</td>
          <td colSpan={4}>
            <input
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
                    <label>
                      <input type="checkbox" id="allday" name="allday" data-name="AllDay"
                      onChange={props.handleChange}
                        //onChange={() => setChecked(!checked)}
                      />
                      All day
                    </label>
             
                    <label>
                      <input type="checkbox" id="repeat" name="repeat" data-name="Repeat"
                        onChange={props.handleChange}
                        //onChange={() => setChecked(!checked)}
                      />
                      Repeat
                    </label>
                  </td>
                 
                </tr>
        <tr>
          <td className="e-textlabel">Location</td>
          <td colSpan={4}>
            <input
              onChange={props.handleChange}
              id="location"
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
              id="description"
              className="e-field e-input"
              name="Description"
              data-name="Description"
              rows={3}
              cols={50}
              style={{
                width: "100%",
                height: "60px !important",
                resize: "vertical",
              }}
            ></textarea>
          </td>
        </tr>
        <tr>    
                  <td className="e-textlabel">Remind via : </td>
                    <td colSpan={4}>
                    <label>
                      <input type="checkbox" id="email" name="email" data-name="email"
                        onChange={props.handleChange}
                        //onChange={() => setChecked(!checked)}
                      />
                      Email
                    </label>
             
                    <label>
                      <input type="checkbox" id="notification" name="notification" data-name="Notification"
                        onChange={props.handleChange}
                        //onChange={() => setChecked(!checked)}
                      />
                      Notification
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
          value={new Date(props.timeForReminder || props.timeForReminder)}
          placeholder="Select a Time"
          className="e-field"  />
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div></div>
  );
};
export default EditorTemplate;
