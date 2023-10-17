import React, { useEffect, useState } from 'react'
import "./Search.css"
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { fetchAsyncsearchBuses } from '../features/BusSlice';
import { useSearchParams } from 'react-router-dom';
import { searched_bus } from '../features/BusSlice';
import SearchBus from '../components/SearchBus';

const Search = () => {

    const navigate = useNavigate()

    const weekday = ["sun","mon","tues","wed","thus","fri","sat"];
    
    const [searchParams,setsearchParams] = useSearchParams()

    const [enteredfrom,setFrom] = useState('')
    const [enteredTo,setTo] = useState('')
    const [enteredDate,setDate] = useState('')

    const dispatch = useDispatch()
  
    const BussearchHandler = async(e)=>{
      e.preventDefault();

      let from = enteredfrom
      let to = enteredTo

      let newDate = new Date(enteredDate)
      let day = weekday[newDate.getDay()];
    
      setsearchParams({from:from,to:to,day:day,date:enteredDate})
    }

    useEffect(()=>{
      let fromm = searchParams.get('from')
      if(fromm != null){
        dispatch(fetchAsyncsearchBuses(searchParams))
        navigate("/searchedBus")
      }
    },[searchParams])

    // ---------------------------------------------------------------------------

    return (
      <div className='home'>
        <form onSubmit={BussearchHandler}>
          <div className='search-bus'>
              <div className='input-bus-searching'>
                <label htmlFor='journy-from'>From  : <span> </span> </label>
                <select name='journy-from' id='journy-from' onClick={e=>setFrom(e.target.value)}>
                <option value="#" ></option>
                  <option value="bankura">Bankura</option>
                  <option value="durgapur">Durgapur</option>
                  <option value="karunamoyee">Karunamoyee</option>
                  <option value="birbhum">Birbhum</option>
                  <option value="purulia">Purulia</option>
                  <option value="east mednapur">East Mednapur</option>
                  <option value="west mednapur">West Mednapur</option>
                  <option value="howra">Howra</option>
                  <option value="kolkata">Kolkata</option>
                  <option value="maldha">Maldha</option>
                  <option value="mursidabad">Mursidabad</option>
                  <option value="jalpaiguri">Jalpaiguri</option>
                </select>
                </div>
              <div className='input-bus-searching'>
                <label htmlFor='reached-at'>To  : <span> </span> </label>
                <select name='reached-at' id='reached-at' onClick={e=>setTo(e.target.value)}>
                  <option value="#"></option>           
                  <option value="bankura">Bankura</option>
                  <option value="durgapur">Durgapur</option>
                  <option value="karunamoyee">Karunamoyee</option>
                  <option value="birbhum">Birbhum</option>
                  <option value="purulia">Purulia</option>
                  <option value="east mednapur">East Mednapur</option>
                  <option value="west mednapur">West Mednapur</option>
                  <option value="howra">Howra</option>
                  <option value="maldha">Maldha</option>
                  <option value="mursidabad">Mursidabad</option>
                  <option value="jalpaiguri">Jalpaiguri</option>
                  <option value="bankura">Bankura</option>
                  
                </select>
                </div>
              <div className='input-bus-searching'>
              <label htmlFor="select-date">Date  : <span> </span> </label>
                <input type="date" id='select-date' onChange={e=>setDate(e.target.value)} value={enteredDate}/>
              </div>
          </div>
          <div className='search-bus-btn'><input type="submit"/></div>
        </form>
      </div>
    )
}

export default Search