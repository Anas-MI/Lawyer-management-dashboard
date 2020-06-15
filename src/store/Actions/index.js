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
  SELECT_PLAN,
  SELECT_CONTACT,
  SET_CONTACTS,
  CREATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_SUCCESS,
  RESET_PASS_SUCCESS,
  SET_RESET_TOKEN,
  DELETE_CONTACT_SUCCESS,
} from "../ActionTypes";

import api from "../../resources/api";

//Auth
export const setLoginSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});
const setRegisterSuccess = (payload) => ({ type: LOGIN_USER_SUCCESS, payload });

//Dashboard
export const toggleAddTargetModal = (payload) => ({
  type: TOGGLE_ADD_TARGET_MODAL,
  payload,
});
export const toggleTimeEditModal = (payload) => ({
  type: TOGGLE_TIME_EDIT_MODAL,
  payload,
});

//Timer
export const updateTimer = (payload) => ({ type: UPDATE_TIMER, payload });
export const resetTimer = (payload) => ({ type: RESET_TIMER, payload });
export const setTimer = (payload) => ({ type: SET_TIMER, payload });

export const toggleToaster = (payload) => ({
  type: TOGGLE_TOASTER,
  payload,
});

//calendar
const setEvents = (payload) => ({ type: SET_EVENTS_SUCCESS, payload });

export const getEvents = (payload) => {
  return (dispatch) => {
    //Fetch Events

    dispatch(
      setEvents([
        {
          //Temp Data
          Id: 1,
          Subject: "Explosion of Betelgeuse Star",
          StartTime: new Date(2018, 1, 15, 9, 30),
          EndTime: new Date(2018, 1, 15, 11, 0),
        },
        {
          Id: 2,
          Subject: "Thule Air Crash Report",
          StartTime: new Date(2018, 1, 12, 12, 0),
          EndTime: new Date(2018, 1, 12, 14, 0),
        },
        {
          Id: 3,
          Subject: "Blue Moon Eclipse",
          StartTime: new Date(2018, 1, 13, 9, 30),
          EndTime: new Date(2018, 1, 13, 11, 0),
        },
        {
          Id: 4,
          Subject: "Meteor Showers in 2018",
          StartTime: new Date(2018, 1, 14, 13, 0),
          EndTime: new Date(2018, 1, 14, 14, 30),
        },
      ])
    );
  };
};

export const loginUser = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/auth/login", payload)
      .then((res) => {
        if (payload.type === "user") {
          if (res.data.token.user.admin) {
            return cb({
              message: "Only For Users",
            });
          }
          if (res.data.token.user.blocked) {
            return cb({
              message: "Blocked",
            });
          }
          if (!res.data.token.user.verified) {
            return cb({
              message: "E-Mail not Verified",
            });
          }
        } else {
          if (!res.data.token.user.admin) {
            return cb({
              message: "Only For Admin",
            });
          }
        }
        dispatch(setLoginSuccess(res.data));
        cb(null, {
          message: "Logged In",
        });
      })
      .catch((err) => {
        console.log(err);
        cb({
          message: err.response.data.message,
        });
      });
  };
};

export const logoutUser = (payload) => ({ type: LOGOUT_USER, payload });

export const register = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/auth/register", payload)
      .then((res) => {
        console.log(res.data);
        cb(null, {
          message: "Registered Successfully",
        });
      })
      .catch((err) => {
        //Dispatch Toaster Notificaton
        console.log(err.response);
        cb({
          message: err.response.data.message,
        });
      });
  };
};

export const verifyEmail = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/user/verify", { userid: payload })
      .then((res) => {
        if (res.data.success) {
          cb(null, {
            message: res.data.message,
          });
        } else {
          throw Error("Try Again Later");
        }
      })
      .catch((err) => {
        cb({
          message: err.message,
        });
      });
  };
};

//Forgot
// const forgotPassSuccess = payload => ({type:FORGOT_PASS_SUCCESS,payload})
// const resetPassSuccess = payload => ({type:RESET_PASS_SUCCESS,payload})
export const setResetToken = (payload) => ({ type: SET_RESET_TOKEN, payload });
export const resetPass = (payload, cb) => {
  console.log(payload);
  return (dispatch) => {
    api
      .post("/user/resetpassword", payload)
      .then((res) => {
        cb(null, {
          message: "Check your email to reset your password",
        });
      })
      .catch((err) => {
        console.log(err);
        cb({
          message: err.response.data.message,
        });
      });
  };
};

export const setNewPass = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/user/setpassword", payload)
      .then((res) => {
        if (!res.data.success) {
          throw Error("Invalid User");
        } else {
          cb(null, {
            message: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        cb({
          message: err.message,
        });
      });
  };
};

//Lawyers
const setLawyers = (payload) => ({ type: SET_LAWYERS, payload });

export const selectLawyer = (payload) => ({ type: SELECT_LAWYER, payload });

export const getLawyers = (payload) => {
  return (dispatch) => {
    api
      .get("/admin/showall")
      .then((res) => {
        dispatch(setLawyers(res.data.data));
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        dispatch(
          toggleToaster({
            msg: "Someting Went Wrong",
            color: "red",
          })
        );
      });
  };
};

//Block/Unblock
const blockUserSuccess = (payload) => ({ type: BLOCK_USER_SUCCESS, payload });
const unblockUserSuccess = (payload) => ({
  type: UNBLOCK_USER_SUCCESS,
  payload,
});

export const blockUser = (payload, cb) => {
  return (dispatch) => {
    api
      .get(`/admin/block/${payload}`)
      .then((res) => {
        dispatch(blockUserSuccess(res.data.data));
        cb(null, {
          message: "Blocked Successfully",
        });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
          message: "Try Again Later",
        });
      });
  };
};

export const unblockUser = (payload, cb) => {
  return (dispatch) => {
    api
      .get(`/admin/unblock/${payload}`)
      .then((res) => {
        dispatch(unblockUserSuccess(res.data.data));
        cb(null, {
          message: "Unblocked Successfully",
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
          message: "Try Again Later",
        });
      });
  };
};

//Blogs
const setBlogs = (payload) => ({ type: SET_BLOGS, payload });
export const getBlogs = (payload, cb) => {
  return (dispatch) => {
    api
      .get("/blogs/showall")
      .then((res) => {
        dispatch(setBlogs(res.data.data));
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
      });
  };
};

const createBlogSuccess = (payload) => ({ type: CREATE_BLOG_SUCCESS, payload });
export const createBlog = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/blogs/create", payload)
      .then((res) => {
        dispatch(createBlogSuccess(res.data.data));
        cb(null, {
          message: "Blog Created",
        });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
          message: "Try Again Later",
        });
      });
  };
};

const updateBlogSuccess = (payload) => ({ type: UPDATE_BLOG_SUCCESS, payload });
export const updateBlog = (payload, cb) => {
  var { id, body } = payload;
  return (dispatch) => {
    api
      .post(`/blogs/edit/${id}`, body)
      .then((res) => {
        dispatch(updateBlogSuccess(res.data.data));
        cb(null, {
          message: "Blog Updated",
        });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
            cb({
                message: "Try Again Later",
              });
              
      });
  };
};

const deleteBlogSuccess = (payload) => ({ type: UPDATE_BLOG_SUCCESS, payload });
export const deleteBlog = (payload, cb)=> {
  var { id } = payload;
  return (dispatch) => {
    api
      .get(`/blogs/delete/${id}`)
      .then((res) => {
        dispatch(deleteBlogSuccess(res.data.data));
        cb(null,{
            message: "Blog Deleted",
          });
  })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
            message: "Try Again Later",
          });
  });
  };
};

//Features
const setFeatures = (payload) => ({ type: SET_FEATURES, payload });
export const getFeatures = (payload, cb) => {
  return (dispatch) => {
    api
      .get("/features/showall")
      .then((res) => {
        dispatch(setFeatures(res.data.data));
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
            message: "Try Again Later",
          });
  });
  };
};

const createFeatureSuccess = (payload) => ({
  type: CREATE_FEATURE_SUCCESS,
  payload,
});
export const createFeature = (payload, cb) => {
  return (dispatch) => {
    api
      .post("/features/createlist", payload)
      .then((res) => {
          dispatch(createFeatureSuccess(res.data))
        cb(null,{
            message: "Features Created",
          });
  })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
            message: "Features Created",
          });
      });
  };
};

const updateFeatureSuccess = (payload) => ({
  type: UPDATE_FEATURE_SUCCESS,
  payload,
});
export const updateFeature = (payload, cb) => {
  var { id, body } = payload;
  return (dispatch) => {
    api
      .post(`/features/edit/${id}`, body)
      .then((res) => {
        dispatch(updateFeatureSuccess(res.data.data));
        cb(null,{
            message: "Features Updated",
          });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
            message: "Try Again Later",
          });
      });
  };
};

const deleteFeatureSuccess = (payload) => ({
  type: DELETE_FEATURE_SUCCESS,
  payload,
});
export const deleteFeature = (payload, cb)=> {
  var { id } = payload;
  return (dispatch) => {
    api
      .get(`/features/deletelist/${id}`)
      .then((res) => {
        dispatch(deleteFeatureSuccess(res.data.data));
        cb(null,{
            message: "Features Deleted",
          });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
            message: "Try Again Later",
          });
      });
  };
};

//Features
const setPlans = (payload) => ({ type: SET_PLANS, payload });
export const getPlans = (payload, cb) => {
  return (dispatch) => {
    api
      .get("/plans/showall")
      .then((res) => {
        dispatch(setPlans(res.data.data));
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
            message: "Try Again Later",
          });
      });
  };
};

const createPlanSuccess = (payload) => ({ type: CREATE_PLAN_SUCCESS, payload });
export const createPlan = (payload, cb) => {
  return (dispatch) => {
    console.log(payload);
    api
      .post("/plans/createlist", payload)
      .then((res) => {
        dispatch(createPlanSuccess(res.data.data));
        cb(null,{
            message: "Plans Created",
          });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
            message: "Try Again Later",
          });
      });
  };
};

const updatePlanSuccess = (payload) => ({ type: UPDATE_PLAN_SUCCESS, payload });
export const updatePlan = (payload, cb) => {
  var { id, body } = payload;
  return (dispatch) => {
    api
      .post(`/plans/edit/${id}`, body)
      .then((res) => {
        dispatch(updatePlanSuccess(res.data.data));
        cb(null,{
            message: "Plan Updated",
          });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
            message: "Try Again Later",
          });
      });
  };
};

const deletePlanSuccess = (payload) => ({ type: DELETE_PLAN_SUCCESS, payload });
export const deletePlan = (payload, cb) => {
  var { id } = payload;
  return (dispatch) => {
    api
      .get(`/plans/deletelist/${id}`)
      .then((res) => {
        dispatch(deletePlanSuccess(res.data.data));
        cb(null,{
            message: "Plan Deleted",
          });
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        cb({
            message: "Try Again Later",
          });
      });
  };
};

//Selection
export const selectBlog = (payload) => ({ type: SELECT_BLOG, payload });
export const selectFeature = (payload) => ({ type: SELECT_FEATURE, payload });
export const selectPlan = (payload) => ({ type: SELECT_PLAN, payload });

//Contacts
export const selectContact = (payload) => ({ type: SELECT_CONTACT, payload });

const setContacts = (payload) => ({ type: SET_CONTACTS, payload });
const createContactSuccess = (payload) => ({
  type: CREATE_CONTACT_SUCCESS,
  payload,
});
const updateContactSuccess = (payload) => ({
  type: UPDATE_CONTACT_SUCCESS,
  payload,
});
const deleteContactSuccess = (payload) => ({
  type: DELETE_CONTACT_SUCCESS,
  payload,
});

export const getContacts = (payload) => {
  return (dispatch) => {
    api
      .get("/contacts/showall")
      .then((res) => {
        setContacts(res.data.data);
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        dispatch(
          toggleToaster({
            msg: "Someting Went Wrong",
            color: "red",
          })
        );
      });
  };
};

export const createContact = (payload) => {
  return (dispatch) => {
    console.log(payload);
    api
      .post("/contactus/create", payload)
      .then((res) => {
        dispatch(createPlanSuccess(res.data.data));
        dispatch(
          toggleToaster({
            msg: "Conatct Added",
            timeout: 5000,
            color: "#38BF1D",
          })
        );
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        dispatch(
          toggleToaster({
            msg: "Someting Went Wrong",
            color: "red",
          })
        );
      });
  };
};

// const updateContactSuccess = payload => ({type:UPDATE_CONTACT_SUCCESS,payload})
// export const updateContact = payload => {
//     var {id,body} = payload
//     return dispatch => {
//         api.post(`/plans/edit/${id}`,body)
//         .then(res=>{
//            dispatch(updatePlanSuccess(res.data.data))
//             dispatch(toggleToaster({
//                 msg:'Plan Updated',
//                 timeout:5000,
//                 color:'#38BF1D',
//             }))

//         })
//         .catch(err=>{
//             console.log(err) //Dispatch Toaster Notificaton
//             dispatch(toggleToaster({
//                 msg:"Someting Went Wrong",
//                 color:'red',
//             }))
//         })
//     }
// }

export const deleteContact = (payload) => {
  var { id } = payload;
  return (dispatch) => {
    api
      .get(`/contactus/deletelist/${id}`)
      .then((res) => {
        dispatch(deleteContactSuccess(res.data.data));
        dispatch(
          toggleToaster({
            msg: "Contact Deleted",
            timeout: 5000,
            color: "#38BF1D",
          })
        );
      })
      .catch((err) => {
        console.log(err); //Dispatch Toaster Notificaton
        dispatch(
          toggleToaster({
            msg: "Someting Went Wrong",
            color: "red",
          })
        );
      });
  };
};
