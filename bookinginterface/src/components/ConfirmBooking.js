import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { acc_Token } from '../features/AuthSlice'

const ConfirmBooking = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const allData = location.state

  const acess_Token = useSelector(acc_Token)

  let seatNumber = allData.seatNumber

        let count = 0
        let seatList =''
        const allseat = [...new Set(seatNumber)]
        
        for (let i = 0; i <allseat.length; i++) {
          count +=1
          seatList += allseat[i] +" "
        }

        const [serverMsg,setServerMsg] = useState('')
        const [server_error,setServer_error] = useState('')


   const BookingComplete = async(e) =>{ 
               e.preventDefault()
               const data ={
                  busid:allData.busid,
                  busTransportDayId :allData.busTransportDayId,
                  seats:seatList,
                  date:allData.date
               }
               const config =  {
              
                headers: { Authorization: `Bearer ${acess_Token}` }
              }

               await axios.post("http://127.0.0.1:8000/seatbook/",data,config)
            
                .then((res)=>{
                  setServerMsg(res.data.msg)
                  console.log("userID>>>",res.data.userbookingid)
                  const userbookingid = res.data.userbookingid
                  navigate('/thankUpage',{state : userbookingid })
                  }
                )
                .catch((error)=>setServer_error(error.response.data.msg));
      }

  
  return (
  <div>
    <div className='booking-confirm'>
      <div className='conf-booking'>
        <br/>
        <br/>
        <div><b>Bus Number : </b> <span> </span>{allData.number}</div>
        <br/>
        <div><b>Start From : </b><span> </span>{allData.from}</div>
        <br/>
        <div><b>Reached To : </b><span> </span>{allData.to}</div>
        <br/>
        <div><b>Start At : </b><span> </span>{allData.time}</div>
        <br/>
        <div><b>Date : </b><span> </span>{allData.date}</div>
        <br/>
        <div><b>Seats : </b><span> </span>{seatList}</div>
        <br/>
        <div><b>Total Ticket Price : </b><span> </span>{allData.price * count}</div>
        <br/>
        <br/>
        <div><button onClick={BookingComplete}>confirm your booking</button></div>
   
        <br/>
        <br/>
      </div>
    </div>
    <p>{server_error ? <div>* {server_error}</div> : null}</p>
    <p>{serverMsg ? <div>* {serverMsg}</div> : null}</p>
    </div>
  )
}

export default ConfirmBooking