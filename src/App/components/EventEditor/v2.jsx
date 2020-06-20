import React, { useEffect } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";
import { notification } from "antd";

const EditorTemplate = props => {
  function onChange(args){
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
              id="Title"
              className="e-field e-input"
              type="text"
              name="Title"
              style={{ width: "100%" }}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">StartTime :</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="StartTime"
              data-name="StartTime"
              value={new Date(props.startTime || props.StartTime)}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">EndTime : </td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="EndTime"
              data-name="EndTime"
              value={new Date(props.endTime || props.EndTime)}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>

        <tr><td className="e-textlabel">Recurrence</td><td colSpan={4}>
        <RecurrenceEditorComponent id='RecurrenceEditor'
        ref={props.setRecurrenceRef}></RecurrenceEditorComponent>
      </td></tr>

        <tr>
          <td className="e-textlabel">Location</td>
          <td colSpan={4}>
            <input
              id="Location"
              className="e-field e-input"
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
              id="Matter"
              placeholder="Choose status"
              data-name="Matter"
              className="e-field"
              style={{ width: "100%" }}
              dataSource={["New", "Requested", "Confirmed"]}
              value={props.EventType || null}
            ></DropDownListComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Reason</td>
          <td colSpan={4}>
            <textarea
              id="Description"
              className="e-field e-input"
              name="Description"
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
          <td className="e-textlabel">Remind Before </td>
          <td colSpan={4}>
            <textarea
              id="Alert"
              className="e-field e-input"
              name="alert"
              rows={2}
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
                  <td className="e-textlabel">Show Reminder</td>
                  <td colSpan={4}>
                    <DropDownListComponent
                      id="ReminderState"
                      placeholder="Choose status"
                      data-name="ReminderState"
                      className="e-field"
                      style={{ width: "100%" }}
                      change={(e)=>onChange(e)}
                      dataSource={["via Email", "via Notification", "Before 10 mins"]}
                      value={props.EventType || null}
                    ></DropDownListComponent>
                  </td>
                </tr>
      </tbody>
    </table>
  ) : (
    <div></div>
  );
};
export default EditorTemplate;
