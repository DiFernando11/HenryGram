import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/index';

function Login() {
	const auth = useAuth();
	const [username, setUsername] = useState('');
	const navigate = useNavigate();
	const handleDataUser = (e) => {
		setUsername(e.target.value);
	};
	const handleLoginUser = (e) => {
		e.preventDefault();
		auth.login({ username });
		navigate('/home');
	};

	return (
		<div className="border border-white lg:h-1/2 h-2/3 bg-white lg:w-1/4 w-2/3 rounded flex flex-col">
			<h1 className="text-black mt-3 lg:mx-5 mx-auto lg:text-2xl text-3xl font-bold font-sans">
				Login
			</h1>
			<form className="flex flex-col lg:py-3 pt-3 font-sans" onSubmit={handleLoginUser}>
				<label className="lg:m-auto ml-9 font-bold text-xl" htmlFor="email">
					Email
				</label>
				<input
					className="border border-black w-10/12 mx-auto my-2 rounded lg:p-1 p-2"
					name="email"
					type="text"
					value={username}
					placeholder="Email..."
					onChange={(e) => handleDataUser(e)}
				/>
				<label className="lg:m-auto ml-9 font-bold text-xl" htmlFor="password">
					Contraseña
				</label>
				<input
					className="border border-black w-10/12 mx-auto my-2 rounded lg:p-1 p-2"
					name="password"
					type="text"
					value={username}
					placeholder="Contraseña..."
					onChange={(e) => handleDataUser(e)}
				/>
				<button
					className="bg-black font-bold border text-white mx-auto lg:my-2 my-5 lg:p-2 p-3 w-2/3 rounded-lg transition duration:200 hover:border-black hover:bg-blacker "
					type="submit"
				>
					Ingresar
				</button>
			</form>
			<hr className="border-black w-10/12 mx-auto" />
			<button
				onClick={() => navigate('/register')}
				className="bg-yellow font-sans font-bold border border-yellower rounded-lg lg:p-2 p-3 w-2/3 mx-auto text-black transition duration:200 lg:my-5 hover:bg-yellower mt-5"
			>
				Crear cuenta
			</button>
		</div>
	);
}

export default Login;
