import React from 'react';
import { useSelector } from 'react-redux';
import "./Bus.css";
import BusCard from '../components/BusCard'
import AllBusCard from './AllBusCard';

const Bus = () => {
  
  const buses = useSelector((state)=>state.rootReducer.BusSlice.allbuses)
  return (
    <div>
      {
        buses ?.map((bus,index) => (
            <AllBusCard key={index} bus = {bus}/>
           
                 )
        )
    }
    </div>
  )
}

export default Bus