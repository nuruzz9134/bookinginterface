import React from 'react'
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const fetchAsyncallNotifications = createAsyncThunk(
    'getallNotifications/fetchAsyncNotifications',
    async (acess_Token) => {

        // const allStoredData = store.getState()
        // const access_Token = allStoredData.rootReducer.AuthSlice.access_token
        
        const config =  {
            headers: { Authorization: `Bearer ${acess_Token}` }
          }

      const response = await axios.get("http://127.0.0.1:8000/allnotifications/",config)
            return response.data
    }
  )


  const initialState = {
    allNotice: [],
  }

  export const NotificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      deleteNotification:(state,action)=>{
        console.log("action..",action)
        state.allNotice = state.allNotice.filter((element)=>element.id != action.payload)
    },
    },
    extraReducers:{
        [fetchAsyncallNotifications.pending]:()=> {
            console.log("Pending");
        },
        [fetchAsyncallNotifications.fulfilled]:(state,{payload})=> {
            console.log(" fetching fulfiled");
            return {...state, allNotice : payload}
        },
        [fetchAsyncallNotifications.rejected]:()=> {
          console.log("rejected");
      },
    }
  })

  export const allNotices = (state)=>state.rootReducer.NotificationSlice.allNotice

  export const {deleteNotification} = NotificationSlice.actions

  export default NotificationSlice.reducer