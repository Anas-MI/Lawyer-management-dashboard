import React , {useEffect,useRef,forwardRef} from 'react'
import { 
    ScheduleComponent, 
    Day, Week, WorkWeek, 
    Month, Agenda, Inject 
} from '@syncfusion/ej2-react-schedule';

import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { RecurrenceEditorComponent } from "@syncfusion/ej2-react-schedule";


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
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../../store/Actions';


const fields = {
    id: 'Id',
    subject: { name: 'Title' },
    isAllDay: { name: 'IsAllDay' },
    startTime: { name: 'StartTime' },
    endTime: { name: 'EndTime' },
    recurrence:{name:'Recurrence'}
}




const CalendarContainer = props => {
    
    //Refs
    const SchedulerRef = useRef()
    const recurrenceRef = useRef()

    //State
    const dispatch = useDispatch()
    const Events = useSelector(state=>state.Calendar.Events)

    useEffect(()=>{
        dispatch(getEvents())
    },[])

    function onPopupOpen(args) {
        if (args.type === 'Editor') {
            SchedulerRef.current.eventWindow.recurrenceEditor = recurrenceRef.current;
        }
    }



    return (
        <ScheduleComponent height='550px' ref={cal=>SchedulerRef.current=cal}
        showQuickInfo={false} popupOpen={onPopupOpen}
        eventSettings={{fields,dataSource:extend([], Events, null, true)}}
            editorTemplate={pr=><EditorTemplate {...pr} setRecurrenceRef={ref=>recurrenceRef.current=ref} />}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} currentView={"Month"}/>
    </ScheduleComponent>
    )
}

export default CalendarContainer
