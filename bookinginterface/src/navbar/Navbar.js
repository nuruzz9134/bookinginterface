import React from 'react'
import "./Navbar.css"
import { ImSearch } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa';
import { useState } from 'react';
import bus_logo from '../images/th.jpeg';
import { useSelector } from 'react-redux';
import { GetToken } from '../auth/LocalStore_Token'

const Navbar = () => {
  let navigate = useNavigate()

  const [sidebar , setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const access_token = GetToken()

  return (
  <div>
    <div className='navbar'>
      <div className='nav-logo'>
      <img className ="logoid"  src={bus_logo} alt='logo'></img>
      </div>
      
      <div className='nav-search'>
        <button onClick={()=>{navigate("/search")}}><ImSearch/>Search your Bus</button></div>
      
      <div className='nav-profile'>
        <button onClick={()=>showSidebar()}>
        <FaUserCircle className='profile-logo'/>
        </button>
      </div>
    </div>
    <div className={sidebar ? 'Sidebar active' : 'Sidebar'}>
            <ul className="Sidebarlist">
                <li className='row' onClick={()=>{navigate("/login")}} >Login</li>
                <li className='row' onClick={()=>{navigate("/")}} >Home</li>
                <li className='row' onClick={access_token ? ()=>{navigate("/allnotifications")} : ()=>{navigate("/login")}}>
                    Notifications</li>
                <li className='row' onClick={access_token ? ()=>{navigate("/tickets")} : ()=>{navigate("/login")}}>
                    Tickets</li>
                <li className='row' onClick={()=>{navigate("/contactus")}} >Contact Us</li>
                <li className='row' onClick={()=>{navigate("/complainbox")}} >Complainbox</li>
                <li className='row' onClick={()=>{navigate("/logout")}} >Logout</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar