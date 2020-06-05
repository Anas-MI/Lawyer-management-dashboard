import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    TOGGLE_ADD_TARGET_MODAL
} from '../ActionTypes'

import api from '../../resources/api'


const setLoginSuccess = payload => ({type:LOGIN_USER_SUCCESS,payload})
const setRegisterSuccess = payload => ({type:LOGIN_USER_SUCCESS,payload})




export const toggleAddTargetModal = payload => ({type:TOGGLE_ADD_TARGET_MODAL,payload})






export const loginUser = payload => {
    return dispatch => {
        api.post('/auth/login' , payload)
        .then(res=>{
            dispatch(setLoginSuccess(res.data))
        })
        .catch(err=>{
            console.log(err) //Dispatch Toaster Notificaton
        })
    }
}

export const register = payload => {
    return dispatch => {
        api.post('/auth/register',payload)
        .then(res=>{
            console.log(res.data)

        })
        .catch(err=>{
            console.log(err) //Dispatch Toaster Notificaton
        })
    }
}