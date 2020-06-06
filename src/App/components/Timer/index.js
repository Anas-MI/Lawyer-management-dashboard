import React, { useState,useRef } from 'react'
import './Timer.css'
import { useSelector,useDispatch } from 'react-redux'
import {updateTimer} from '../../../store/Actions'

const Timer = props => {

    const intervalId = useRef()
    const [started , setStarted] = useState(false)
    const [timer,setTimer] = useState((localStorage.getItem("timer") || 0))

    const dispatch = useDispatch()
    const updateTimer = () => dispatch(updateTimer())

    var measuredTime = new Date(null);
    // measuredTime.setSeconds(4995); // specify value of SECONDS
    // var MHSTime = measuredTime.toISOString().substr(11, 8);
    

    const handleStart = e => {
        setStarted(true)
        intervalId.current = setInterval(()=>{
            setTimer(s=>{
                var n = s+1
                localStorage.setItem('timer',n)
                return n
            })
        },1000)
    }

    const handlePause = e => {
        setStarted(false)
        clearInterval(intervalId.current)
    }


    return (
        <div className="cdh-fv cdh-auto uni-height">
        <div className="chd-trayico cdh-trayico-small cdh-tray-active">

            <div className="cdh-tray-primary">
                <div className="cdh-tray-xs-font cdh-tray-small-xs cdh-color-green">
                    {new Date(timer * 1000).toISOString().substr(11, 8)}
                </div>
            </div> 

            <div className="cdh-tray-secondary cdh-tray-ico-xs">
                <div style={{cursor:'pointer'}} className="cdh-timeaction--btn w-inline-block">

                {
                    started? 
                    <div className="cdh-ico cdh-tray-pauseico cdh-trayico-small" onClick={handlePause}
                    ></div>
                    :
                    <div className="cdh-ico cdh-tray-playico cdh-trayico-small" onClick={handleStart}
                    ></div>
                }

                </div>
            </div>

        </div>
    </div>


    )
}

export default Timer