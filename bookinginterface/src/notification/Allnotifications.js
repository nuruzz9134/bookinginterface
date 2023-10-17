import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { acc_Token } from '../features/AuthSlice';
import { allNotifications } from '../features/NotificationSlice';
import axios from 'axios';
import NotificationsList from './NotificationsList';
import './notification.css'
import { fetchAsyncallNotifications } from '../features/NotificationSlice';


const Allnotifications = () => {

    const acess_Token = useSelector(acc_Token)
    const [serverMsg,setServerMsg] = useState([])
    const [server_error,setServer_error] = useState('')
    const dispatch = useDispatch()

    useEffect((e)=>{
          console.log("entered")
        dispatch(fetchAsyncallNotifications(acess_Token))
    },[])


  return (
    <div className='all_notifications'>
        <div>Allnotifications</div>
        <div><NotificationsList/></div>
    </div>
  )
}

export default Allnotifications