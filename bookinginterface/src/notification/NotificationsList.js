import React, { useEffect } from 'react'
import SingleNotification from './SingleNotification'
import './notification.css'
import { useSelector} from 'react-redux/es/hooks/useSelector'
import { allNotices } from '../features/NotificationSlice'
import { tickets } from '../features/TicketSlice'

const NotificationsList = () => {
   const allNot = useSelector(allNotices)
 
    return(
        <div className='notifications_list'>
            {
                allNot.map((item,index)=>(
                    <SingleNotification key={index} items={item}/>
                ))
            }
        </div>
    )
}

export default NotificationsList