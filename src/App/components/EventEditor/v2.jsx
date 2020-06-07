import React, { useEffect } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";

const EditorTemplate = props => {

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
      </tbody>
    </table>
  ) : (
    <div></div>
  );
};
export default EditorTemplate;
