import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAsyncallBuses } from '../features/BusSlice'
import "./Home.css"
import Bus from '../bus/Bus'

const Home = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAsyncallBuses())
  },[dispatch])
  return (
    <div>
      <Bus/>
    </div>
  )
}

export default Home
