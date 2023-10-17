import React from 'react'
import { useSelector } from 'react-redux'
import { searchedBuses } from '../features/BusSlice'
import SeatsList from './SeatsList'


const SearchBus = () => {
    const buses = useSelector(searchedBuses)

  return (
    <div>
       {
          <SeatsList data={buses.msz}/>
        }
    </div>
  )
  
}

export default SearchBus