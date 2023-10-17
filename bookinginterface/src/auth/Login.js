import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLoginUserMutation } from './UserAuthApi';
import "./Login.css"
import { GetToken, StoreToken } from './LocalStore_Token';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../features/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = ()=>{

	
    const [enteredEmail,SetenteredEmail] = useState('')
    const [enteredPassword,SetenteredPassword] = useState('')


    const [server_error,setServer_error] = useState('')
    const [loginUser,{isLoading}] = useLoginUserMutation()


	const dispatch = useDispatch()
	const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
		const Data = {
            email:enteredEmail,
            password:enteredPassword
        }
		
		SetenteredEmail('')
		SetenteredPassword('')

		const res = await loginUser(Data)
		
		if (res.error){
			setServer_error(res.error.data)
			console.log("errors.....",res.error.data)
		}
		if (res.data){
			const data = res.data
			navigate('/verifyOTP',{state : data})
		}
    }
	let { access_token } = GetToken()
		useEffect(()=>{
				dispatch(setUserToken({access_token:access_token}))
		},[access_token,dispatch])


    return(

    <div>
    <div className="wrapper">
	<div className="registration_form">
		<div className="title">
			Log In
		</div>
		<form  onSubmit={handleSubmit}>
			<div className="form_wrap">

			<p>{server_error.non_field_errors ? <div className='errors'>* {server_error.non_field_errors[0]}</div> : null}</p>
			<p>{server_error.errors ? <div className='errors'>* {server_error.errors}</div> : null}</p>

			<p>{server_error.msg ? <div className='errors'>* {server_error.msg}</div> : null}</p>
				<div className="input_wrap">
					<label >Email Address</label>
					<input type="text" id="email" onChange={e=>SetenteredEmail(e.target.value)} value={enteredEmail} />
					<p>{server_error.email ? <div className='errors'>* {server_error.email[0]}</div> : null}</p>
				</div>

                <div className="input_wrap">
					<label>Password</label>
					<input type="password" id="password" onChange={e=>SetenteredPassword(e.target.value)} value={enteredPassword} />
					<p>{server_error.password ? <div className='errors'>* {server_error.password[0]}</div> : null}</p>
				</div>
				
				<div className="input_wrap">
					<input type="submit" value="Log In" className="submit_btn"/>
				</div>
			</div>
		</form>
		<div className='alter-to-register-form'><Link to='/registration'><p>*** registration form</p></Link></div>
	</div>
</div>
        </div>
    );
}
export default Login ; 