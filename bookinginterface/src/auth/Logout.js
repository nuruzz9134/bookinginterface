import React from "react";
import { useNavigate } from "react-router-dom";
import { RemoveToken } from "./LocalStore_Token";
import { useDispatch } from "react-redux";
import { unsetUserToken } from "../features/AuthSlice";

const Logout =()=>{

    const navigate = useNavigate()
    const dispatch = useDispatch()

    dispatch(unsetUserToken({access_token: null}))
    RemoveToken()
    return(
        <div>
            <h1>you have logged out</h1>
        </div>
    )
}
export default Logout;