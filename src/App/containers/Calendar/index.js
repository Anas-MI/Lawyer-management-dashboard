import React , {useEffect,useRef,forwardRef, useState} from 'react'
import { 
    ScheduleComponent, 
    Day, Week, WorkWeek, 
    Month, Agenda, Inject 
} from '@syncfusion/ej2-react-schedule';

import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import api from '../../../resources/api'
import {notification, Button} from 'antd'
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import EditorTemplate from '../../components/EventEditor/v2';
import { extend } from '@syncfusion/ej2-base';
import { useDispatch, useSelector, connectAdvanced } from 'react-redux';
import { getEvents } from '../../../store/Actions';
import {  L10n } from '@syncfusion/ej2-base';

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Add',
            'cancelButton': 'Close',
            'deleteButton': 'Remove',
            'newEvent': 'Add Event',
        },
    }
});
const fields = {
    id: 'Id',
    subject: { name: 'Title' },
    isAllDay: { name: 'IsAllDay' },
    startTime: { name: 'StartTime' },
    endTime: { name: 'EndTime' },
}




const CalendarContainer = props => {
    
    //Refs
    const SchedulerRef = useRef()
    const recurrenceRef = useRef()
    let res = {}
    //State
    const dispatch = useDispatch()
    const userId = useSelector(state=>state.user.token.user._id)
    console.log(userId)
    const Events = useSelector(state=>state.Calendar.Events)
    console.log(Events)
    const [ state, setState ] = useState({tableData : []})
    const [ data, setData ] = useState({})

    useEffect(()=>{
        dispatch(getEvents())
    },[])
    useEffect(()=>{
      async function fetchData(){
        res =  await api.get('calendar/viewforuser/'+userId)
        console.log(res)
        setdata()
      }
      fetchData()
    },[])
    
    const setdata = () =>{
        let newTableData = []
        res.data.data.map((value, index)=>{
            const tableData={
                id: value._id,
                Subject : value.title,
                StartTime : value.startTime,
                EndTime : value.endTime,
            }
 
            newTableData.push(tableData)
        })
        setState({tableData : newTableData })
    }
    function onPopupOpen(args) {
        if (args.type === 'Editor') {
            SchedulerRef.current.eventWindow.recurrenceEditor = recurrenceRef.current;
        }
    }
    const handleChange = (e) =>{
        e.persist()
        const { value, id } = e.target
        let newdata  = data
        if(id === "allday" || id==="repeat"){
            if(value==="on"){
                newdata.type = id
            }
        }else if(id === "email" || id==="notification"){
            if(value==="on"){
                newdata[id] = "true"
            }
        }
        else{
        newdata[id] = value
        setData(newdata)
        }
        console.log(data)
    }

    const change = (e) =>{
        console.log(e)
        const { value, id } = e.element
        let newData  = data
        newData[id] = value
        setData(newData)
        console.log(data)

    }
    const openNotificationWithIcon=(type) =>{
        notification[type]({
          message: 'Event Saved',
          });
      };
    const openNotificationWithfailure = type => {
        notification[type]({
          message: 'Failure'});
      };
    const handleSubmit = () =>{
        let newdata = data
        newdata.userId = userId
        api.post('/calendar/create', newdata).then(res=>console.log(res)).then(()=>openNotificationWithIcon('success')).catch(()=>openNotificationWithfailure('error'))
    }
    console.log(state.tableData)
    const footer=(props)=>{
        return (<div>
      {props.elementType === 'cell' ?
            <div className="e-cell-footer">
            <button className="e-event-details" title="Extra Details">Extra Details</button>
            <button className="e-event-create" title="Add">Add</button>
          </div>
            :
                <div className="e-event-footer">
            <button className="e-event-edit" title="Edit">Edit</button>
            <button className="e-event-delete" title="Delete">Delete</button>
          </div>}
    </div>);
    }
    return <ScheduleComponent height='550px'  ref={cal=>SchedulerRef.current=cal }
          showQuickInfo={false} popupOpen={onPopupOpen}
          eventSettings={{dataSource : state.tableData}}
            editorTemplate={pr=><EditorTemplate {...pr}  handleChange={handleChange} change={change} setRecurrenceRef={ref=>recurrenceRef.current=ref} />}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} currentView={"Month"}/>
         </ScheduleComponent>
    
}

export default CalendarContainer
