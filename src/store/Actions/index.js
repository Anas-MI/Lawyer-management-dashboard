import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    TOGGLE_ADD_TARGET_MODAL,
    SET_TIMER,
    RESET_TIMER,
    UPDATE_TIMER,
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