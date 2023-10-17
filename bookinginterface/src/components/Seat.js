import React, { useState } from 'react'
import "./Common.css"
import SeatNumber from './SeatNumber'

const Seat = (props) => {


    let column1 = [], i = 0, target1 = 17;
    while (++i <= target1) column1.push(i);

    let column2 = [], j = 17, target2 = 40;
    while (++j <= target2) column2.push(j);

    const [id,setID] = useState([])

    const HandleID =(e)=>{
      setID([...id,e])
    }
    const SubmitallSeatsId= (e)=>{
      e.preventDefault()
      props.sendSeatsNumber(id)
    }


  return (

    <div>
      <div className='seat-booking-page'>
              <div className='choice-seat'>Chose Your Seats</div>
            <div className='seat'>
                <div className='left-side-seats'>
                {column1.map((i)=> {
                return  <div className='single-seat'>
                                <button 
                                onClick={()=>HandleID(i)} >
                                  <SeatNumber key={i} seat ={i}/>
                                </button> 
                              </div>
                  })}
                </div>

                <div className='right-side-seats'>
                {column2.map((j)=> {
                return  <div className='single-seat'>
                                <button onClick={()=>HandleID(j)}>
                                <SeatNumber key={j} seat ={j}/>
                                </button> 
                              </div>
                  })}
                </div>
            </div>
            <div><button className='confirn-seat-btn' onClick={SubmitallSeatsId}>Confirm Seats</button></div>
            
            </div>

    </div>
    
  )
}

export default Seat