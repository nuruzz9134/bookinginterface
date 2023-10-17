import React from 'react';
import  { useState } from 'react'
import './tickets.css';
import axios from 'axios';
import { GetToken } from '../auth/LocalStore_Token'
import { useSelector } from 'react-redux';
import { acc_Token } from '../features/AuthSlice'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAsyncallTickets } from '../features/TicketSlice';

const SingleTicket = ({items}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const acess_Token = useSelector(acc_Token)
  const [data,setData] = useState(items)
  const [selectedItems,setSelectedItems] = useState([])
  const { bustransportDayId , busid , bookingId , number , start , end , date , time , seats , fees  } = data

  const split_seats = seats.split(' ') 
  const allSeats_array = split_seats.filter(function(entry) { return entry.trim() != ''; });


  function CheckboxHandler(e){

    let isSelected = e.target.checked;
    let value = parseInt(e.target.value);

    if(isSelected){
        setSelectedItems([...selectedItems,value ])
    }else{
      setSelectedItems(selectedItems.filter((e)=> e != value))
    }
  }

  

  
    const CancelTicketHandler = (e)=>{
      // e.preventDefault()

      const data ={
        transportdayid : bustransportDayId,
        bookingid : bookingId,
        seatNumbers : selectedItems,
        date : date
     }

      const config =  {
        headers: { Authorization: `Bearer ${acess_Token}` }
      }

        axios.put( `http://127.0.0.1:8000/delete_tickets/${busid}/`,data,config)
    
        .then((res)=>{
          dispatch(fetchAsyncallTickets(acess_Token))
          navigate('/blankpage')
      
          }
        )
        .catch((error)=>console.log("error..",error.response.data));

    }

  return (
    <>
    <div className='single_ticket'>
      <div>Booking ID : <b>{bookingId}</b></div>
      <div>Bus Number : <b>{number}</b></div>
      <div>Bus Time : <b>{time}</b></div>
      <div>Start From : <b>{start}</b></div>
      <div>Dstination : <b>{end}</b></div>
      <div>Date : <b>{date}</b></div>
      <div>Fare Fees /Seat : <b>{fees}</b></div>
      <div className='cancel_seats_number_box'>
        <div>Cancel Seats Number : </div>
        <div>
        <b className='cancel_seat_number'>
            {
                allSeats_array.map((item,index)=><div key={index} >
                  <label>{item}
                    <input type='checkbox' value={item} onChange={CheckboxHandler}></input>
                  </label>
                  </div>
                )
            }      </b>
          </div>
    </div>

      <div className='ticket_delete'>
        <button onClick={CancelTicketHandler}>cancel ticket</button></div>   
    </div>
    </>
  )
}

export default SingleTicket