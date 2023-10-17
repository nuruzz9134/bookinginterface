import React, { useState } from 'react'
import "./Common.css"
import BusCard from './BusCard'

const SeatsList = (props) => {
    let allSearch = props.data
  return (
    <div>

    {
    allSearch ?.map((bus,index) => (
        <BusCard key={index} bus = {bus}/>
          )
        )
    }


    </div>
  )
}

export default SeatsList