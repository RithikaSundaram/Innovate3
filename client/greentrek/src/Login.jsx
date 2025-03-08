import React from "react";
import "./login.css";

const Login = () => {
	return (
		<form className='form'>
			<p className='title'>Login</p>
			<label>
				<input
					className='input'
					type='email'
					placeholder=''
					required
				/>
				<span>Email</span>
			</label>
			<label>
				<input
					className='input'
					type='password'
					placeholder=''
					required
				/>
				<span>Password</span>
			</label>
			<button className='submit'>Submit</button>
			<p className='signin'>
				Don't have an account? <a href='#'>Register</a>
			</p>
		</form>
	);
};

export default Login;
