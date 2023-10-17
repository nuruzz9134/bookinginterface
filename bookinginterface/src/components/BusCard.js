import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { fetchAsyncbookedBuses } from '../features/BusSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const BusCard = ({bus}) => {

  const [searchParams,setsearchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let route = bus.route.split("_")
  let from = route[0]
  let to = route[1]
  
  let busId =bus.id
  let busTransportDayId =   bus.number + busId + bus.date + bus.time

  let data={
    bus : busId,
    number: bus.number,
    busTransportDayId : busTransportDayId,
    from: from,
    to:to,
    time:bus.time,
    date:bus.date,
    price : bus.travel_fee
  }

  const BookYourseatsHandle =async(e)=>{
    e.preventDefault();
    setsearchParams({id:busTransportDayId,date:bus.date})
  }
  useEffect(()=>{
      let busid = searchParams.get('id')
      if(busid != null){
        dispatch(fetchAsyncbookedBuses(searchParams))
        navigate(`/bookyourSeats`,{state:data})
      }
    },[searchParams])

  return (
  <div>
    <div className='card-container'>
        <div className='left-container'>
        <p></p>
            <div><b>Bus Number </b><span> : </span>{bus.number}</div>
            <p></p>
            <div><b>from</b><span> : </span>{from}</div>
            <div><b>to</b><span> : </span>{to}</div>
            <div>{bus.day}</div>
            <div><b>start at</b> <span> : </span>{bus.time}</div>
            <div><b>available seats</b> <span> : </span>{bus.seats}</div>
            <div><b>ticket price</b><span> : </span>{bus.travel_fee}</div>
        </div>
        <div className='right-container'>

        <button onClick={BookYourseatsHandle}>
        book your seat
        </button>

        </div>
    </div>
    </div>
  )
}

export default BusCard