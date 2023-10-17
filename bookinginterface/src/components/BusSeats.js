import React, { useEffect } from 'react'
import Seat from './Seat'
import { useLocation } from 'react-router-dom';
 import { useNavigate } from 'react-router-dom';

const BusSeats = () => {
  
  let location = useLocation()
  let allData = location.state

  const navigate = useNavigate()

  const ManageSeatsNumber = (seats)=>{
    let data = {
      busid : allData.bus,
      number:allData.number,
      busTransportDayId : allData.busTransportDayId,
      from:allData.from,
      to:allData.to,
      time:allData.time,
      date:allData.date,
      seatNumber : seats,
      price:allData.price
    }
    if(data.seatNumber.length > 0){
      navigate('/confirmbooking', {state:data} )
    }else{
      alert(" please select your seat number ")
    }
  }

  return (
          <div>
            <Seat sendSeatsNumber={ManageSeatsNumber}/>
          </div>
  )
}

export default BusSeats