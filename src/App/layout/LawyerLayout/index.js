import React, { Component, Suspense } from 'react';
import './app.scss';

import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/ActionTypes";
import api from '../../../resources/api'
import AddTargetModal from '../../components/AddTargetModal';
// import TimeEditModal from '../../components/EditTimerModal'


class LawyerLayout extends Component {

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    componentWillMount() {
      //  var now = new Date();
        const user = JSON.parse(window.localStorage.getItem('Case.user'))
        console.log("from layout")
        if(user != null){
            const updated_at = new Date(user.token.user.updated_at)
            console.log(updated_at)
    
            let last_update = updated_at
            last_update.setHours(updated_at.getHours() + 24 )
            console.log(last_update)
    
            const now = new Date()
    
            // if(last_update < now){
            //     //console.log(this.props)
            //     // this.props.logoutUser()
            //     localStorage.setItem('Case.user' , null)
            //     window.location.reload()
            //     //   this.props.history.push('/')
            // }
        }

        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onComponentWillMount();
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentWillMount();
        }
    }
    convertTime = (serverdate) => {
        var date = new Date(serverdate);
        // convert to utc time
        var toutc = date.toUTCString();
        //convert to local time
        var locdat = new Date(toutc + ' UTC');
        return locdat;
      };
    
    render() {
        setInterval(()=>{
            
            let data = window.localStorage.getItem('notifications')
            const user = JSON.parse(window.localStorage.getItem('Case.user'))
            if(user != null){
                api.get('/calendar/viewforuser/'+ user.token.user._id).then(res=>{
           
                    res.data.data.map((value, index)=>{
                       
                        const StartTime = value.startTime? value.startTime : ""
                        const Description = value.title
                        const matter = value.matter ?  value.matter.matterDescription : ""
                        const timeForReminder = value.timeForReminder ? value.timeForReminder : ""
                        
                        if(value.notification == true){
    
                            const alertdate =  this.convertTime(value.startTime)
                           
                            let ddd = alertdate.getDate();
                            let mmm = alertdate.getMonth()+1; 
                            let yyyyy = alertdate.getFullYear();
                           // let hourss = timeForReminder.getHours() > 12 ? timeForReminder.getHours() - 12 : timeForReminder.getHours()  ;
                          //  let minss = timeForReminder.getMinutes() ;
                            let hourss = timeForReminder.split(':')[0];
                            let minss = timeForReminder.split(':')[1];
                            minss = minss ?  minss.substring(0,2) : ""
                           
                           
                           
                            /*
                                if(ddd<10) {
                                    ddd = '0' + dd
                                }          
                                if(mmm<10) {
                                    mmm = '0' + mm
                                }
            */            
                            let today = new Date();
                            let dd = today.getDate();
                            let mm = today.getMonth()+1; 
                            let yyyy = today.getFullYear();
                            let hours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours() ;
                            let plusonehour = parseInt(hours) + 1
                            console.log(plusonehour)
                            let mins = today.getMinutes() < 10 ? '0' + today.getMinutes()  :  today.getMinutes()
                            let plusmins = parseInt(mins + 0)
                           
                            console.log("1" + ddd + "/" + mmm + "/" + yyyyy + " " + hourss + ":" + minss)
                            console.log("2" +dd + "/" + mm + "/" + yyyy + " " + hours + ":" + mins)
                            /*
                                if(dd<10) {
                                    dd = '0'+dd
                                } 
                                
                                if(mm<10) {
                                    mm = '0'+mm
                                } 
                            console.log("1" + ddd + "/" + mmm + "/" + yyyyy + " " + hourss + ":" + minss)
                            console.log("2" +dd + "/" + mm + "/" + yyyy + " " + hours + ":" + mins)
                            /*
                            if ( minss == "00" && ddd==dd && mmm==mm && yyyy==yyyyy && plusonehour  == hourss && ( plusmins == 00 )){
                                notification.open({
                                    message: Description,
                                    description:
                                        'Event assosiated to matter ' + matter + 'starts at ' + StartTime,
                                    className: 'custom-class',
                                    style: {
                                      width: 600,
                                    },
                                  });
                                console.log(value)
                            
                            }else
                            */
                            if(ddd==dd && mmm==mm && yyyy==yyyyy && hours == hourss &&  minss == mins  ){
                                alert("Event : " + Description + "\n" + 'Event assosiated to matter ' + matter + 'starts at ' + StartTime )
                                const notificationtoshow =  {
                                    description: Description,
                                    matter : matter,
                                    startTime : StartTime
                                }
    
                                if(data == null){
                                    window.localStorage.setItem('notification', JSON.stringify([{ 
                                        description: Description,
                                        matter : matter,
                                        startTime : StartTime
                                    }]))
                                }else{
                                    data.push(notificationtoshow)
                                    window.localStorage.setItem('notification', JSON.stringify(data))
                                }
                                
                               /*
                                notification.open({
                                    message: Description,
                                    description:
                                        'Event assosiated to matter ' + matter + 'starts at ' + StartTime,
                                    className: 'custom-class',
                                    style: {
                                      width: 600,
                                    },
                                  });
                                console.log(value)
                                */
                            }
                            else{
                                console.log("i min passed")
                            }   
                        }
                        /*
                        const tableData={
                            id: value._id,
                            Subject : value.title,
                           
                            TimeForReminder : value.timeForReminder,
                            Matter : value.matter ?  value.matter.matterDescription : "",
                            Email : value.email,
                            Notification : value.notification,
                        }
                       */
                    })
                })
            }

        },60*1000)
        const handleNavigation=(path, value)=>{
            this.props.history.push(path, value)
        }
        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });

        return (
            <Aux>
                <Fullscreen enabled={this.props.isFullScreen}>
                    <Navigation />
                    <NavBar handleNavigation={handleNavigation} />
                    <div className="pcoded-main-container" style={{"background": "#FCFDFF"}} onClick={() => this.mobileOutClickHandler}>
                        <div className="pcoded-wrapper" >
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <Breadcrumb />
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Suspense fallback={<Loader/>}>
                                                <Switch>
                                                    {menu}
                                                    <Redirect from="*" to='/dashboard/default' />
                                                </Switch>
                                            </Suspense>
                                            <AddTargetModal />
                                            {/* <TimeEditModal /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fullscreen>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
        onComponentWillMount: () => dispatch({type: actionTypes.COLLAPSE_MENU})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (windowSize(LawyerLayout));