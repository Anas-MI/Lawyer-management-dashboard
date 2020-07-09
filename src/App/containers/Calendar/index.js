import React , {useEffect,useRef,forwardRef, useState} from 'react'
import { 
    ScheduleComponent, 
    Day, Week, WorkWeek, 
    Month, Agenda, Inject , ViewDirective,ViewsDirective
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
import {  L10n, Internationalization } from '@syncfusion/ej2-base';

const Add = <Button type="link">Add</Button>
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
    let response = {}
    const [options, setOptions] = useState([])
    //State
    const dispatch = useDispatch()
    const userId = useSelector(state=>state.user.token.user._id)

    const [ state, setState ] = useState({tableData : []})
    const [ data, setData ] = useState({email : false, notification : false})
    let instance = new Internationalization();
    useEffect(()=>{
      async function fetchData(){
        res =  await api.get('/calendar/viewforuser/'+userId)
        response =  await api.get('matter/viewforuser/'+userId)
        setOptions(response.data.data)
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
            newdata[id]= !newdata[id]
        }
        else{
        newdata[id] = value
        setData(newdata)
        }
    }

    const DateTimeChange = (e) =>{
        const { value, id} = e.element
        let newData  = data
        if(id==="matter" && e.itemData!=null){
            newData[id]=options[e.itemData.value]._id
        }else{
        newData[id] = value
        setData(newData)
        }
        console.log(data)
    }
    const openNotificationWithIcon=(type) =>{
        notification[type]({
          message: 'Success',
          });
      };
    const openNotificationWithfailure = type => {
        notification[type]({
          message: 'Failure'});
      };
    const handleSubmit = (e) =>{
        if(e.requestType==="eventRemoved"){
            const id = e.data[0].id
            api.get('/calendar/delete/'+id).then(()=>openNotificationWithIcon('success')).catch(()=>openNotificationWithfailure('error'))

        }
        if(e.requestType==="eventChanged"){
            console.log(e)
            const id = e.data.id 
            let eventdata = e.data
            eventdata.userId = userId 
            console.log(eventdata)
            api.post('/calendar/update/'+id, eventdata ).then(()=>openNotificationWithIcon('success')).catch(()=>openNotificationWithfailure('error'))
            setData({})
            
        }
        if(e.requestType==="eventCreated"){
            let eventdata = data
            eventdata.userId = userId
        api.post('/calendar/create', eventdata).then(res=>console.log(res)).then(()=>openNotificationWithIcon('success')).catch(()=>openNotificationWithfailure('error'))
        setData({})
        }
    }
   
   
    return <ScheduleComponent height='550px'   actionComplete={handleSubmit}  ref={cal=>SchedulerRef.current=cal }
          showQuickInfo={false} popupOpen={onPopupOpen}
          eventSettings={{dataSource : state.tableData}}
            editorTemplate={pr=><EditorTemplate {...pr} userId={userId}  handleChange={handleChange} DateTimeChange={DateTimeChange} setRecurrenceRef={ref=>recurrenceRef.current=ref} />}>
                <ViewsDirective>
                   <ViewDirective option='Day'/>
                    <ViewDirective option='Week'/>
                    <ViewDirective option='WorkWeek'/>
                    <ViewDirective option='Month'/>
                </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} currentView={"Month"}/>
         </ScheduleComponent>
    
}

export default CalendarContainer
