import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
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
    TOGGLE_TOASTER,
    TOGGLE_TIME_EDIT_MODAL,
    SELECT_LAWYER,
    SET_BLOGS,
    CREATE_BLOG_SUCCESS,
    UPDATE_BLOG_SUCCESS,
    DELETE_BLOG_SUCCESS,
    SET_FEATURES,
    CREATE_FEATURE_SUCCESS,
    UPDATE_FEATURE_SUCCESS,
    DELETE_FEATURE_SUCCESS,
    SET_PLANS,
    CREATE_PLAN_SUCCESS,
    UPDATE_PLAN_SUCCESS,
    DELETE_PLAN_SUCCESS,
    SELECT_BLOG,
    SELECT_FEATURE,
    SELECT_PLAN
} from '../ActionTypes'

import api from '../../resources/api'


//Auth
export const setLoginSuccess = payload => ({type:LOGIN_USER_SUCCESS,payload})
const setRegisterSuccess = payload => ({type:LOGIN_USER_SUCCESS,payload})

//Dashboard
export const toggleAddTargetModal = payload => ({type:TOGGLE_ADD_TARGET_MODAL,payload})
export const toggleTimeEditModal = payload => ({type:TOGGLE_TIME_EDIT_MODAL,payload})


//Timer
export const updateTimer = payload => ({type:UPDATE_TIMER,payload})
export const resetTimer = payload => ({type:RESET_TIMER,payload})
export const setTimer = payload => ({type:SET_TIMER,payload})

export const toggleToaster = (payload) => ({
    type: TOGGLE_TOASTER,
    payload,
  });


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
            console.log(res.data)
            if(res.data.token.user.blocked){
                throw Error('Blocked')
            }
            dispatch(setLoginSuccess(res.data))
            dispatch(toggleToaster({
                msg:'Login Success',
                timeout:5000,
                color:'#38BF1D',
            }))
        })
        .catch(err=>{
            console.log(err)
            //Dispatch Toaster Notificaton
            dispatch(toggleToaster({
                msg:err.message || "Someting Went Wrong",
                color:'red',
            }))

        })
    }
}

export const logoutUser = payload => ({type:LOGOUT_USER,payload})

export const register = payload => {
    return dispatch => {
        api.post('/auth/register',payload)
        .then(res=>{
            dispatch(toggleToaster({
                msg:res.data.message,
                color:'#38BF1D',
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

export const selectLawyer = payload => ({type:SELECT_LAWYER,payload})

export const getLawyers = payload => {
    return dispatch => {
        api.get('/admin/showall')
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
                color:'#38BF1D',
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
                color:'#38BF1D',
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

//Blogs
const setBlogs = payload => ({type:SET_BLOGS,payload})
export const getBlogs = payload => {
    return dispatch => {
        api.get('/blogs/showall')
        .then(res => {
            dispatch(setBlogs(res.data.data))
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

const createBlogSuccess = payload => ({type:CREATE_BLOG_SUCCESS,payload})
export const createBlog = payload => {
    return dispatch => {
        api.post('/blogs/create',payload)
        .then(res=>{
           dispatch(createBlogSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Blog Created',
                timeout:5000,
                color:'#38BF1D',
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

const updateBlogSuccess = payload => ({type:UPDATE_BLOG_SUCCESS,payload})
export const updateBlog = payload => {
    var {id,body} = payload
    return dispatch => {
        api.post(`/blogs/edit/${id}`,body)
        .then(res=>{
           dispatch(updateBlogSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Blog Updated',
                timeout:5000,
                color:'#38BF1D',
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

const deleteBlogSuccess = payload => ({type:UPDATE_BLOG_SUCCESS,payload})
export const deleteBlog = payload => {
    var {id} = payload
    return dispatch => {
        api.get(`/blogs/delete/${id}`)
        .then(res=>{
            dispatch(deleteBlogSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Blog Deleted',
                timeout:5000,
                color:'#38BF1D',
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

//Features
const setFeatures = payload => ({type:SET_FEATURES,payload})
export const getFeatures= payload => {
    return dispatch => {
        api.get('/features/showall')
        .then(res => {
            dispatch(setFeatures(res.data.data))
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

const createFeatureSuccess = payload => ({type:CREATE_FEATURE_SUCCESS,payload})
export const createFeature = payload => {
    return dispatch => {
        api.post('/features/createlist',payload)
        .then(res=>{
           dispatch(createFeatureSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Feature Created',
                timeout:5000,
                color:'#38BF1D',
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

const updateFeatureSuccess = payload => ({type:UPDATE_FEATURE_SUCCESS,payload})
export const updateFeature = payload => {
    var {id,body} = payload
    return dispatch => {
        api.post(`/features/edit/${id}`,body)
        .then(res=>{
           dispatch(updateFeatureSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Feature Updated',
                timeout:5000,
                color:'#38BF1D',
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

const deleteFeatureSuccess = payload => ({type:DELETE_FEATURE_SUCCESS,payload})
export const deleteFeature= payload => {
    var {id} = payload
    return dispatch => {
        api.get(`/features/deletelist/${id}`)
        .then(res=>{
            dispatch(deleteFeatureSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Feature Deleted',
                timeout:5000,
                color:'#38BF1D',
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

//Features
const setPlans = payload => ({type:SET_PLANS,payload})
export const getPlans = payload => {
    return dispatch => {
        api.get('/plans/showall')
        .then(res => {
            dispatch(setPlans(res.data.data))
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

const createPlanSuccess = payload => ({type:CREATE_PLAN_SUCCESS,payload})
export const createPlan = payload => {
    return dispatch => {
        console.log(payload)
        api.post('/plans/createlist',payload)
        .then(res=>{
           dispatch(createPlanSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Plan Created',
                timeout:5000,
                color:'#38BF1D',
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

const updatePlanSuccess = payload => ({type:UPDATE_PLAN_SUCCESS,payload})
export const updatePlan = payload => {
    var {id,body} = payload
    return dispatch => {
        api.post(`/plans/edit/${id}`,body)
        .then(res=>{
           dispatch(updatePlanSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Plan Updated',
                timeout:5000,
                color:'#38BF1D',
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

const deletePlanSuccess = payload => ({type:DELETE_PLAN_SUCCESS,payload})
export const deletePlan = payload => {
    var {id} = payload
    return dispatch => {
        api.get(`/plans/deletelist/${id}`)
        .then(res=>{
            dispatch(deletePlanSuccess(res.data.data))
            dispatch(toggleToaster({
                msg:'Feature Deleted',
                timeout:5000,
                color:'#38BF1D',
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

//Selection
export const selectBlog = payload => ({type:SELECT_BLOG,payload})
export const selectFeature = payload => ({type:SELECT_FEATURE,payload})
export const selectPlan = payload => ({type:SELECT_PLAN,payload})






