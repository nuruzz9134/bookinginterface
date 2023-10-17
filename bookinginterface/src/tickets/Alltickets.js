import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { acc_Token } from '../features/AuthSlice'; 
import TicketsList from './TicketsList';
import './tickets.css'
import { fetchAsyncallTickets } from '../features/TicketSlice';
import { useDispatch } from 'react-redux';


const Alltickets = () => {

  const acess_Token = useSelector(acc_Token)
  const dispatch = useDispatch()

    useEffect((e)=>{
      dispatch(fetchAsyncallTickets(acess_Token))

    },[dispatch])

  return (
    <div className='all_tickets'>
        <div>All Tickets</div>
        <div><TicketsList/></div>
    </div>
  )
}


export default Alltickets ;
