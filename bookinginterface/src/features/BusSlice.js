import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchAsyncallBuses = createAsyncThunk(
    'getallBuses/fetchAsyncBuses',
    async () => {
      const response = await axios.get('http://127.0.0.1:8000/buses/')
            return response.data
    }
  )

export const fetchAsyncsearchBuses = createAsyncThunk(
    'getsearchBuses/fetchAsyncsearchedBuses',
    async (query) => {
      const response = await axios.get(`http://127.0.0.1:8000/search/?${query}`)
            return response.data
    }
  )

  export const fetchAsyncbookedBuses = createAsyncThunk(
    'getbookedBuses/fetchAsyncbookedBuses',
    async (query) => {
      const response = await axios.get(`http://127.0.0.1:8000/bookedseats/?${query}`)
            return response.data
    }
  )


const initialState = {
    allbuses: [],
    searchedBus:[],
    bookedSeats:[]
  }

export const BusSlice = createSlice({
    name: 'buses',
    initialState,
    reducers: {
      
    },
    extraReducers:{
      [fetchAsyncallBuses.pending]:()=> {
          console.log("Pending");
      },
      [fetchAsyncallBuses.fulfilled]:(state,{payload})=> {
        console.log(" fetching fulfiled");
        return {...state, allbuses : payload}
    },
    [fetchAsyncallBuses.rejected]:()=> {
      console.log("rejected");
  },
  [fetchAsyncsearchBuses.fulfilled]:(state,{payload})=> {
    console.log("searching datas fetching fulfiled");
    return {...state, searchedBus: payload}
},
[fetchAsyncbookedBuses.fulfilled]:(state,{payload})=> {
  console.log("booked bus seats data fetching fulfiled");
  return {...state, bookedSeats: payload}
},
    }
  })


export const {searched_bus,addSeats,bookedSeats} = BusSlice.actions

export const allBuses = (state)=>state.rootReducer.BusSlice.allbuses
export const searchedBuses = (state)=>state.rootReducer.BusSlice.searchedBus
export const busbookedSeats = (state)=>state.rootReducer.BusSlice.bookedSeats

export default BusSlice.reducer