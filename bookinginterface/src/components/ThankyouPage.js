import React, { useEffect,useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState,useCallback } from 'react'
import Noti_Popup from './Noti_Popup'

const ThankyouPage = () => {

  const location = useLocation()
  const  navigate = useNavigate()
  const userbookingid = location.state


  const socketRef = useRef()

  const [notification, setNotification] = useState(null);


    useEffect (()=> {
       socketRef.current = new WebSocket(`ws://127.0.0.1:8000/notifications/${userbookingid}/`)

       socketRef.current.onopen = e=>{
        console.log('opened',e)
       }
       socketRef.current.onmessage = e =>{
        console.log('messeges are...>>>',e.data)
        setNotification(e.data)
       }
       socketRef.current.onerror = e=>{
        console.log('errors....',e)
       }
       socketRef.current.onclose = e=>{
        console.log('closed')
       }

    },[]);

    const handleNotificationClose = () => {
      setNotification(null);
    };


  return (
    <div className='thankyouPage'>
    <div><h4>You Have Booked Successfully</h4></div>
    <div>...Now Go To Tickets Page And Check Your Tickets...</div>
    <div>
      {
        notification && (
          <Noti_Popup message={notification} onClose = {handleNotificationClose} />
        )
      }
    </div>
    </div>
    
    
  )
}

export default ThankyouPage