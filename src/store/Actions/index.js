import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    TOGGLE_ADD_TARGET_MODAL,
    SET_TIMER,
    RESET_TIMER,
    UPDATE_TIMER,
    SET_EVENTS_SUCCESS,
    SET_LAWYERS,
    BLOCK_USER,
    BLOCK_USER_SUCCESS,
    UNBLOCK_USER_SUCCESS,
} from '../ActionTypes'

import api from '../../resources/api'
import { toggleToaster } from 'h:/coot-apps/src/app/State/reducers/ToasterReducer'


//Auth
const setLoginSuccess = payload => ({type:LOGIN_USER_SUCCESS,payload})
const setRegisterSuccess = payload => ({type:LOGIN_USER_SUCCESS,payload})

//Dashboard
export const toggleAddTargetModal = payload => ({type:TOGGLE_ADD_TARGET_MODAL,payload})


//Timer
export const updateTimer = payload => ({type:UPDATE_TIMER,payload})
export const resetTimer = payload => ({type:RESET_TIMER,payload})
export const setTimer = payload => ({type:SET_TIMER,payload})



//calendar
const setEvents = payload => ({type:SET_EVENTS_SUCCESS,payload})

export const getEvents = payload => {
    return dispatch => {
        //Fetch Events

        
        dispatch(setEvents([{//Temp Data
            Id: 1,
            Subject: 'Explosion of Betelgeuse Star',
            StartTime: new Date(2018, 1, 15, 9, 30),
            EndTime: new Date(2018, 1, 15, 11, 0)
        }, {
            Id: 2,
            Subject: 'Thule Air Crash Report',
            StartTime: new Date(2018, 1, 12, 12, 0),
            EndTime: new Date(2018, 1, 12, 14, 0)
        }, {
            Id: 3,
            Subject: 'Blue Moon Eclipse',
            StartTime: new Date(2018, 1, 13, 9, 30),
            EndTime: new Date(2018, 1, 13, 11, 0)
        }, {
            Id: 4,
            Subject: 'Meteor Showers in 2018',
            StartTime: new Date(2018, 1, 14, 13, 0),
            EndTime: new Date(2018, 1, 14, 14, 30)
        }]))
    }
}



export const loginUser = payload => {
    return dispatch => {
        api.post('/auth/login' , payload)
        .then(res=>{
            dispatch(setLoginSuccess(res.data))
            dispatch(toggleToaster({
                msg:'Login Success',
                timeout:5000,
                color:'green',
            }))
        })
        .catch(err=>{
            console.log(Object.keys(err)) //Dispatch Toaster Notificaton
            dispatch(toggleToaster({
                msg:"Someting Went Wrong",
                color:'red',
            }))

        })
    }
}

export const register = payload => {
    return dispatch => {
        api.post('/auth/register',payload)
        .then(res=>{
            dispatch(toggleToaster({
                msg:res.data.message,
                color:'green',
            }))

        })
        .catch(err=>{
            console.log(err) //Dispatch Toaster Notificaton
            dispatch(toggleToaster({
                msg:"Someting Went Wrong",
                color:'red',
            }))

        })
    }
}

//Lawyers
const setLawyers = payload => ({type:SET_LAWYERS,payload})

export const getLawyers = payload => {
    return dispatch => {
        api.post('/admin/showall')
        .then(res=>{
            dispatch(setLawyers(res.data.data))
        })
        .catch(err=>{
            console.log(err) //Dispatch Toaster Notificaton
            dispatch(toggleToaster({
                msg:"Someting Went Wrong",
                color:'red',
            }))

        })
    }
}

//Block/Unblock
const blockUserSuccess = payload => ({type:BLOCK_USER_SUCCESS,payload})
const unblockUserSuccess = payload => ({type:UNBLOCK_USER_SUCCESS,payload})

export const blockUser = payload => {
    return dispatch => {
        api.get(`/admin/block/${payload}`)
        .then(res=>{
            dispatch(blockUserSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Blocked Successfully',
                timeout:5000,
                color:'green',
            }))
        })
        .catch(err=>{
            console.log(err) //Dispatch Toaster Notificaton
            dispatch(toggleToaster({
                msg:"Someting Went Wrong",
                color:'red',
            }))

        })
    }
}

export const unblockUser = payload => {
    return dispatch => {
        api.get(`/admin/unblock/${payload}`)
        .then(res=>{
            dispatch(unblockUserSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Unblocked Successfully',
                timeout:5000,
                color:'green',
            }))
            console.log(res.data)


        })
        .catch(err=>{
            console.log(err) //Dispatch Toaster Notificaton
            dispatch(toggleToaster({
                msg:"Someting Went Wrong",
                color:'red',
            }))

        })
    }
}

