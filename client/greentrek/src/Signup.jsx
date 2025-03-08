import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

const Register = () => {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [message, setMessage] = useState("");

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setMessage("Passwords do not match");
			return;
		}

		try {
			const response = await fetch("http://localhost:3000/api/users/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				setMessage("Registration successful!");
			} else {
				setMessage(data.message || "Registration failed");
			}
		} catch (error) {
			setMessage("Error connecting to server");
		}
	};

	return (
		<form
			className='form'
			onSubmit={handleSubmit}>
			<p className='title'>Register</p>
			<p className='message'>Signup now</p>

			<div className='flex'>
				<label>
					<input
						className='input'
						type='text'
						name='firstname'
						value={formData.firstname}
						onChange={handleChange}
						required
					/>
					<span>Firstname</span>
				</label>

				<label>
					<input
						className='input'
						type='text'
						name='lastname'
						value={formData.lastname}
						onChange={handleChange}
						required
					/>
					<span>Lastname</span>
				</label>
			</div>

			<label>
				<input
					className='input'
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<span>Email</span>
			</label>

			<label>
				<input
					className='input'
					type='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<span>Password</span>
			</label>

			<label>
				<input
					className='input'
					type='password'
					name='confirmPassword'
					value={formData.confirmPassword}
					onChange={handleChange}
					required
				/>
				<span>Confirm password</span>
			</label>

			{message && <p className='error'>{message}</p>}

			<button
				className='submit'
				type='submit'>
				Submit
			</button>

			<p className='signin'>
				Already have an account? <Link to='/login'>Signin</Link>{" "}
			</p>
		</form>
	);
};

export default Register;
