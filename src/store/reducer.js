import * as actionTypes from './ActionTypes';
import config from './../config';
import { getPersistedState } from './persist';

const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change,
    //Auth 
    user:getPersistedState('user') || null,
    resetToken:null,
    //Add Target Modal
    targetModal :false,
    //TOSATER
    toaster: {
        msg:null,
        timeout:0,
        color:'green'
    },
    //Timer
    timeEditModal:false,
    timer: parseInt(localStorage.getItem('timer')) || 0,
    //CALENDAR
    Calendar:{
        Events:[]
    },
    //LAWYER MANAGEMENT
    lawyers:[],
    selectedLawyer: getPersistedState('selectedLawyer') || {},
    //BLOGS
    Blog : {
        blogs : [] , 
        selected : null
    },
    //features
    Feature : {
        features : [] , 
        selected : null
    },
    //Plan
    Plan : {
        plans : [] , 
        selected : null
    },
    //Conatcts
    Contact : {
        contacts : [] ,
        selected : null
    }

};


const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];

    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                isTrigger: trigger,
            };
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return {...state};
        case actionTypes.FULL_SCREEN :
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };
        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user:action.payload
            }
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                user:null
            }
        case actionTypes.TOGGLE_ADD_TARGET_MODAL:
            return {
                    ...state,
                    targetModal:!state.targetModal
            }
        // case actionTypes.UPDATE_TIMER:{
        //     return {
        //         ...state,
        //         timer:state.timer++
        //     }
        // }
        // case actionTypes.RESET_TIMER:{
        //     return {
        //         ...state,
        //         timer : 0
        //     }
        // }
        case actionTypes.SET_TIMER:
            return {
                ...state,
                timer : action.payload
            }
        case actionTypes.TOGGLE_TOASTER:
            return {
                ...state,
                toaster:{
                    msg:action.payload.msg,
                    timeout:action.payload.timeout || 3000,
                    color:action.payload.color
                }
            }
        case actionTypes.SET_EVENTS_SUCCESS:
            return {
                ...state,
                Calendar:{
                    Events:action.payload
                }
            }
        case actionTypes.SET_LAWYERS:
            return {
                ...state,
                lawyers:action.payload
            }
        case actionTypes.TOGGLE_TIME_EDIT_MODAL:
            return {
                ...state,
                timeEditModal:!state.timeEditModal
            }
        case actionTypes.BLOCK_USER_SUCCESS:
            return {
                ...state,
                lawyers:[...state.lawyers].map(l=>l._id===action.payload._id?action.payload:l)
            }
        case actionTypes.UNBLOCK_USER_SUCCESS:
            return {
                ...state,
                lawyers:[...state.lawyers].map(l=>l._id===action.payload._id?action.payload:l)
            }
        case actionTypes.SELECT_LAWYER:
            return {
                ...state,
                selectedLawyer:action.payload
            }
        case actionTypes.SET_BLOGS:{
            return {
                ...state,
                Blog : {
                    ...state.Blog,
                    blogs : action.payload
                }
            }
        }
        case actionTypes.CREATE_BLOG_SUCCESS:
            return {
                ...state,
                Blog:{
                    ...state.Blog,
                    blogs : [...state.Blog.blogs,action.payload]
                }
            }
        case actionTypes.UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                Blog : {
                    ...state.Blog,
                    blogs : [...state.Blog.blogs].map(f=>f._id===action.payload._id?action.payload:f)
                }
            }
        case actionTypes.DELETE_BLOG_SUCCESS:
            return {
                ...state,
                Blog : {
                    ...state.Blog,
                    blogs : [...state.Blog.blogs].filter(f=>f._id!==action.payload._id)
                }
            }
        case actionTypes.SET_FEATURES:
            return {
                ...state,
                Feature : {
                    ...state.Feature,
                    features : action.payload
                }
            }
        case actionTypes.CREATE_FEATURE_SUCCESS:
            return {
                ...state,
                Feature:{
                    ...state.Feature,
                    features : [...state.Feature.features,action.payload]
                }
            }
        case actionTypes.UPDATE_FEATURE_SUCCESS:
            return {
                ...state,
                Feature : {
                    ...state.Feature,
                    features : [...state.Feature.features].map(f=>f._id===action.payload._id?action.payload:f)
                }
            }
        case actionTypes.DELETE_FEATURE_SUCCESS:
            return {
                ...state,
                Feature : {
                    ...state.Feature,
                    features : [...state.Feature.features].filter(f=>f._id!==action.payload._id)
                }
            }
        case actionTypes.SET_PLANS:
            return {
                ...state,
                Plan : {
                    ...state.Plan,
                    plans : action.payload
                }
            }
        case actionTypes.CREATE_PLAN_SUCCESS:
            return {
                ...state,
                Plan:{
                    ...state.Plan,
                    plans : [...state.Plan.plans,action.payload]
                }
            }
        case actionTypes.UPDATE_PLAN_SUCCESS:
            return {
                ...state,
                Plan: {
                    ...state.Plan,
                    plans : [...state.Plan.plans].map(f=>f._id===action.payload._id?action.payload:f)
                }
            }
        case actionTypes.DELETE_PLAN_SUCCESS:
            return {
                ...state,
                Plan : {
                    ...state.Plan,
                    plans : [...state.Plan.plans].filter(f=>f._id!==action.payload._id)
                }
            }
        case actionTypes.SELECT_BLOG:
            return {
                ...state,
                Blog:{
                    ...state.Blog,
                    selected:action.payload
                }
            }
        case actionTypes.SELECT_FEATURE:
            return {
                ...state,
                Feature:{
                    ...state.Feature,
                    selected:action.payload
                }
            }
        case actionTypes.SELECT_PLAN:
            return {
                ...state,
                Plan:{
                    ...state.Plan,
                    selected:action.payload
                }
            }
        case actionTypes.SET_CONTACTS:
            return {
                ...state,
                Contact : {
                    ...state.Contact,
                    contacts : action.payload
                }
            }
            case actionTypes.CREATE_CONTACT_SUCCESS:
                return {
                    ...state,
                    Contact:{
                        ...state.Contact,
                        contacts : [...state.Contact.contacts,action.payload]
                    }
                }
            case actionTypes.UPDATE_CONTACT_SUCCESS:
                return {
                    ...state,
                    Contact: {
                        ...state.Contact,
                        contacts : [...state.Contact.contacts].map(f=>f._id===action.payload._id?action.payload:f)
                    }
                }
            case actionTypes.DELETE_CONTACT_SUCCESS:
                return {
                    ...state,
                    Contact : {
                        ...state.Contact,
                        contacts : [...state.Contact.contacts].filter(f=>f._id!==action.payload._id)
                    }
                }
            case actionTypes.SELECT_CONTACT:
                return {
                    ...state,
                    Contact:{
                        ...state.Contact,
                        selected:action.payload
                    }
                }
            case actionTypes.SET_RESET_TOKEN:
                return {
                    ...state,
                    resetToken:action.payload
                }

        default:
            return state;
    }
};

export default reducer;