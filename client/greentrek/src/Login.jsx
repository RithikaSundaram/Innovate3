import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async e => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("http://localhost:3000/api/users/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Login failed");
			}

			localStorage.setItem("token", data.token);
			localStorage.setItem("user", JSON.stringify(data.user));

			alert("Login successful");
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<form
			className='form'
			onSubmit={handleLogin}>
			<p className='title'>Login</p>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<label>
				<input
					className='input'
					type='email'
					placeholder=''
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<span>Email</span>
			</label>
			<label>
				<input
					className='input'
					type='password'
					placeholder=''
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<span>Password</span>
			</label>
			<button
				className='submit'
				type='submit'>
				Login
			</button>
			<p className='signin'>
				Don't have an account? <Link to='/signup'>Register</Link>
			</p>
		</form>
	);
};

export default Login;
