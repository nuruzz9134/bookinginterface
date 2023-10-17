import React, { useEffect,useState } from 'react'
import SingleTicket from './SingleTicket'
import './tickets.css'
import { tickets } from '../features/TicketSlice'
import { useSelector} from 'react-redux/es/hooks/useSelector'

const TicketsList = () => {
    const alltickets = useSelector(tickets)
 
    return(
        
        <div className='tickets_list'>
            {
                alltickets.map((item,index)=>(
                    <SingleTicket key={index} items={item}/>
                ))
            }
        </div>
    )
}

export default TicketsList