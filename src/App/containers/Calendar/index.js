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
import {notification, Button, Card, message} from 'antd'

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
    const [ID, setID] = useState("")
    let startTime = ""
    let endTime = ""
    const [ state, setState ] = useState({tableData : []})
    const [ data, setData ] = useState({email : false, notification : false, startTime : "", title: ""})
    const [listEvent, setListEvent] = useState([])
    let instance = new Internationalization();

    async function fetchEventData(){
        console.log("Set event")
        res =  await api.get('/calendar/viewforuser/'+userId)
        response =  await api.get('matter/viewforuser/'+userId)
        setListEvent(res.data.data)
        setOptions(response.data.data)
        setdata()
      }
    useEffect(()=>{
      fetchEventData()
    },[])
    const setdata = () =>{
        let newTableData = []
        res.data.data.map(async(value, index)=>{
            let matter = ""
            if(value.matter != undefined){
                matter = value.matter.matterDescription
            }
            let allday = false
            if(value.type === "allday"){
                allday= true
            }
            let repeat = false
            if(value.type === "repeat"){
                repeat= true
            }
            const tableData={
                id: value._id,
                Subject : value.title,
                StartTime : value.startTime,
                EndTime : value.endTime,
                Location : value.location,
                Description : value.description,
                TimeForReminder : value.timeForReminder,
                Matter : matter,
                Email : value.email,
                Notification : value.notification,
                Allday : allday,
                Repeat : repeat

            }
 
            newTableData.push(tableData)
        })
        setState({tableData : newTableData })

    }

    function onPopupOpen(args) {
        if (args.type === 'Editor') {
            SchedulerRef.current.eventWindow.recurrenceEditor = recurrenceRef.current;
        }
        /*
        if (args.type == "QuickInfo") {
            var dialogObj = args.element.ej2_instances[0];
            dialogObj.hide();
            var currentAction = args.target.classList.contains("e-work-cells") ? "Add" : "Save";
            SchedulerRef.openEditor(args.data, currentAction);
        }
        */
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
        console.log(data)
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
        console.log(e)
        if(e.requestType==="eventRemoved"){
            const id = e.data[0].id
            api.get('/calendar/delete/'+id).then(()=>{
                fetchEventData()
                openNotificationWithIcon('success')
            }
           ).catch(()=>openNotificationWithfailure('error'))
            setTimeout(()=>{
                //window.location.reload()
                
            },1500)
        }
        if(e.requestType==="eventChanged"){
            console.log(e.data.id)
            let eventdata = data
            eventdata.userId = userId 
            eventdata.startTime = startTime
            eventdata.endTime = endTime
           
            api.post('/calendar/update/'+ e.data.id , eventdata )
            .then((res)=>{
                fetchEventData()
                notification.success({message : "Event Edited"})
            }).catch((err)=>{
                console.log(err)
                notification.error({message : "Failed"})
            })
            setData({})
            setTimeout(()=>{
               // window.location.reload()
            },1500)
            
        }
        if(e.requestType==="eventCreated"){
    
            let eventdata = data
            eventdata.userId = userId
            eventdata.startTime = startTime
            eventdata.endTime = endTime
            console.log(data)
            if(data.title == ""){
                    notification.warning({message : "Please provide a title" })
            }else{
            
                api.post('/calendar/create', eventdata).then((res)=>{
                    console.log(res)
                    fetchEventData()
                    notification.success({message : "Evented Added"})
                 }).catch((err)=>{
                    console.log(err)
                    notification.error({message : "Failed!"})
                 })
                 setData({})
                 setTimeout(()=>{
                    //window.location.reload()
                },1500)
            
                 }
              
            }
        
    }
    
    
    const setInit = (args) =>{
        console.log(args)
    
        if(args.StartTime != undefined){
            const props = args
             startTime = props.StartTime
             endTime = props.EndTime
             if((startTime.toLocaleString()).includes("AM") || (startTime.toLocaleString()).includes("PM")){
                 console.log("Windows")
                startTime = startTime.toLocaleString()
                endTime = props.EndTime.toLocaleString()
             }else{
                 console.log("Mac")
                if(startTime.getHours() > 12 || endTime.getHours() > 12){
                    startTime.setHours(startTime.getHours()-12)
                    startTime = startTime.toLocaleString() + " AM"
                    endTime.setHours(endTime.getHours()-12)
                    endTime = endTime.toLocaleString() + " AM"
                 }else{
                    startTime = startTime.toLocaleString() + " PM"
                    endTime = endTime.toLocaleString() + " PM"
                 }
             }
             
             
             
        }      
    }
   
   
    return (        
        <div className="row">
            <div className="col-lg-8">
                <Card bodyStyle={{"padding" : "0px"}}>
                    <ScheduleComponent height='550px' actionComplete={handleSubmit}  ref={cal=>SchedulerRef.current=cal }
                        showQuickInfo={false} 
                        popupOpen={onPopupOpen}
                        eventSettings={{dataSource : state.tableData}}
                        
                        editorTemplate={pr=><EditorTemplate {...pr} setInit = {setInit(pr)} userId={userId} setInit={setInit}  handleChange={handleChange} DateTimeChange={DateTimeChange} setRecurrenceRef={ref=>recurrenceRef.current=ref} />}>
                        <ViewsDirective>
                        <ViewDirective option='Day'/>
                            <ViewDirective option='Week'/>
                            <ViewDirective option='WorkWeek'/>
                            <ViewDirective option='Month'/>
                        </ViewsDirective>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} currentView={"Month"}/>
                    </ScheduleComponent>
                 </Card>
            </div>
            <div className="col-lg-4">
                <Card title="Events" style={{"height" : "550px"}} className="overflow-auto" bodyStyle={{"padding" : "15px"}}>
                    {listEvent.map((eventlist) => <div key={eventlist._id} style={{ "border-bottom" : "1px solid #e5e5e5"}} className="pb-2 mb-2">
                        <span style={{"font-size" : "18px" , "color": "#3f51b5"}}><b>{eventlist.title}</b></span>
                        <div className="d-flex justify-content-between">
                            <span style={{ "padding-right" : "5%", "border-right" : "1px solid #e5e5e5"}}>
                                <span><b>{eventlist.startTime}</b></span><br /> 
                                <span style={{"font-size" : "11px"}}>(Starting Date & Time)</span>
                            </span>
                            <span>
                                <span><b>{eventlist.endTime}</b></span><br /> 
                                <span style={{"font-size" : "11px"}}>(Ending Date & Time)</span>
                            </span>                            
                        </div>
                    </div> 
                    )}
                </Card>
            </div>
        </div>
    )
}

export default CalendarContainer
