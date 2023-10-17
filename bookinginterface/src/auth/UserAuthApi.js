
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
  
    registerUser:builder.mutation({
        query:(user)=>{
            return{
                url:'auth/register/',
                method:'POST',
                body:user,
                headers:{
                    'Content-type':'application/json',
                }
            }
        }
    }),
    loginUser:builder.mutation({
      query:(user)=>{
          return{
              url:'auth/login/',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
          }
      }
  }),
  verifyOTP:builder.mutation({
    query:(user)=>{
        return{
            url:'auth/verify_otp/',
            method:'POST',
            body:user,
            headers:{
                'Content-type':'application/json',
            }
        }
    }
}),


  }),
})

export const {  useRegisterUserMutation,
                useLoginUserMutation,
                useVerifyOTPMutation} = UserAuthApi
