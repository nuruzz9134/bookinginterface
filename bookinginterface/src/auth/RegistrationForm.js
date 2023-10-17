import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRegisterUserMutation } from './UserAuthApi';
import "./RegistrationForm.css"
import { StoreToken } from './LocalStore_Token';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = ()=>{

    const [enteredName,SetenteredName] = useState('')
    const [enteredEmail,SetenteredEmail] = useState('')
    const [enteredPhone,SetenteredPhone] = useState('')
    const [enteredPassword,SetenteredPassword] = useState('')
    const [enteredConfirmPassword,SetenteredConfirmPassword] = useState('')

	const navigate = useNavigate()

    const [server_error,setServer_error] = useState('')
    const [registerUser,{isLoading}] = useRegisterUserMutation()



    const handleSubmit =async (e)=>{
        e.preventDefault()
        const Data = {
            name:enteredName,
            email:enteredEmail,
            phone:enteredPhone,
            password:enteredPassword,
            password2:enteredConfirmPassword
        }
        
		SetenteredName('')
		SetenteredEmail('')
		SetenteredPhone('')
		SetenteredPassword('')
		SetenteredConfirmPassword('')

		
		const res = await registerUser(Data)

		if (res.error){
			console.log(res.error.data)
			setServer_error(res.error.data)
		}
		if (res.data){
			// navigate('/login',{state : res.data})
			navigate('/login',{state : res.data})
		}
    }

    return(
		
        <div>
                <div className="wrapper">
	<div className="registration_form">
		<div className="title">
			Registration Form
		</div>

		<form onSubmit={handleSubmit}>
			<div className="form_wrap">

				<p>{server_error.non_field_errors ? <div className='errors'>* {server_error.non_field_errors[0]}</div> : null}</p>

				<div className="input_wrap">
					<label for="fname">Full Name</label>
					<input type="text" id="fname" onChange={e=>SetenteredName(e.target.value)} value={enteredName} />
				</div>
				
				<div className="input_wrap">
					<label for="email">Email Address</label>
					<input type="text" id="email" onChange={e=>SetenteredEmail(e.target.value)} value={enteredEmail} />
					<p>{server_error.email ? <div className='errors'>* {server_error.email[0]}</div> : null}</p>
				</div>
				
                <div className="input_wrap">
					<label for="phonenum">Phone Number</label>
					<input id="phonenum" type="tel" pattern="[0-9]{10}" onChange={e=>SetenteredPhone(e.target.value)} value={enteredPhone} />
					<p>{server_error.phone ? <div className='errors'>* {server_error.phone[0]}</div> : null}</p>
				</div>

                <div className="input_wrap">
					<label for="password">Password</label>
					<input type="password" id="password" onChange={e=>SetenteredPassword(e.target.value)} value={enteredPassword} />
					<p>{server_error.password ? <div className='errors'>* {server_error.password[0]}</div> : null}</p>
				</div>

                <div className="input_wrap">
					<label for="confirmpassword">Confirm Password</label>
					<input type="password" id="confirmpassword" onChange={e=>SetenteredConfirmPassword(e.target.value)} value={enteredConfirmPassword}/>
					<p>{server_error.password2 ? <div className='errors'>* {server_error.password2[0]}</div> : null}</p>
				</div>
				
				<div className="input_wrap">
					<input type="submit" className="submit_btn"/>
				</div>
			</div>
		</form>
		<div className='alter-to-login-form'><Link to='/login'><p>*** already login </p></Link></div>
	</div>
</div>
        </div>
    );
}
export default RegistrationForm ; 