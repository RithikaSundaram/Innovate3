import React from "react";
import "./Signup.css";

const Register = () => {
	return (
		<form className='form'>
			<p className='title'>Register</p>
			<p className='message'>Signup now</p>

			{/* Firstname & Lastname */}
			<div className='flex'>
				<label>
					<input
						className='input'
						type='text'
						placeholder=''
						required
					/>
					<span>Firstname</span>
				</label>

				<label>
					<input
						className='input'
						type='text'
						placeholder=''
						required
					/>
					<span>Lastname</span>
				</label>
			</div>

			{/* Email */}
			<label>
				<input
					className='input'
					type='email'
					placeholder=''
					required
				/>
				<span>Email</span>
			</label>

			{/* Password */}
			<label>
				<input
					className='input'
					type='password'
					placeholder=''
					required
				/>
				<span>Password</span>
			</label>

			{/* Confirm Password */}
			<label>
				<input
					className='input'
					type='password'
					placeholder=''
					required
				/>
				<span>Confirm password</span>
			</label>

			{/* Submit Button */}
			<button className='submit'>Submit</button>

			{/* Sign In Link */}
			<p className='signin'>
				Already have an account? <a href='#'>Signin</a>
			</p>
		</form>
	);
};

export default Register;
