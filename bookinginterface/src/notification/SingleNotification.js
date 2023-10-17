import React from 'react';
import './notification.css';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { acc_Token } from '../features/AuthSlice'; 
import { deleteNotification } from '../features/NotificationSlice';

const SingleNotification = ({items}) => {
  const {notifications,id} = items
  const acess_Token = useSelector(acc_Token)
  const dispatch = useDispatch()

    const HandledeleteNotification = (e)=>{
      e.preventDefault()
      const config =  {
              
        headers: { Authorization: `Bearer ${acess_Token}` }
      }

        axios.delete( `http://127.0.0.1:8000/delete_notifications/${id}/`,config)
    
        .then((res)=>{
          console.log(res.data)
          dispatch(deleteNotification(id))
          }
        )
        .catch((error)=>console.log(error.response.data));

    }

  return (
    <div className='single_notification'>
      <div>{notifications}</div>
      <div className='notification_delete'>
        <button onClick={HandledeleteNotification}>DELETE</button></div>   
    </div>
  )
}

export default SingleNotification