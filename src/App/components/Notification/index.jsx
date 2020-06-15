import React from 'react';
import 'antd/dist/antd.css';
import { notification } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Notification = props => {

    const toaster = useSelector(state => state.toaster.msg)

    useEffect(()=>{
  
    },[])

    return (<div></div>)
}

export default  Notification