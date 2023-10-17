import React from 'react'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const fetchAsyncallTickets = createAsyncThunk(
    'getallTickets/fetchAsyncTickets',
    async (acess_Token) => {

        // const allStoredData = store.getState()
        // const access_Token = allStoredData.rootReducer.AuthSlice.access_token
        
        const config =  {
            headers: { Authorization: `Bearer ${acess_Token}` }
          }
      const response = await axios.get("http://127.0.0.1:8000/alltickets/",config)
            return response.data
    }
  )


  const initialState = {
    allTickets: [],
    allSeatsDict: []
  }

  export const TicketSlice = createSlice({
    name: 'Tickets',
    initialState,
    reducers: {
        
    },
    extraReducers:{
        [fetchAsyncallTickets.pending]:()=> {
            console.log("Pending");
        },
        [fetchAsyncallTickets.fulfilled]:(state,{payload})=> {
            console.log(" fetching fulfiled");
            return {...state, allTickets : payload}
        },
        [fetchAsyncallTickets.rejected]:()=> {
          console.log("rejected");
      },
    }
  })

  export const tickets = (state)=>state.rootReducer.TicketSlice.allTickets

  export const {setallSeatsDict} = TicketSlice.actions

  export default TicketSlice.reducer