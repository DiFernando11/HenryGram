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
		<div className="border border-white h-1/2 bg-white w-1/6 rounded flex flex-col">
			<h1 className="text-black m-3 text-2xl font-bold">Login</h1>
			<form className="flex flex-col" onSubmit={handleLoginUser}>
				<label className="m-auto" htmlFor="email">
					Email
				</label>
				<input
					className="border border-black w-10/12 mx-auto my-2 rounded p-1"
					name="email"
					type="text"
					value={username}
					placeholder="Email..."
					onChange={(e) => handleDataUser(e)}
				/>
				<label className="m-auto" htmlFor="password">
					Contraseña
				</label>
				<input
					className="border border-black w-10/12 mx-auto my-2 rounded p-1"
					name="password"
					type="text"
					value={username}
					placeholder="Contraseña..."
					onChange={(e) => handleDataUser(e)}
				/>
				<button
					className="bg-black border text-white m-auto p-2 w-2/3 rounded-lg mt-4 transition duration:200 hover:border-black hover:bg-blacker"
					type="submit"
				>
					Ingresar
				</button>
			</form>
			<hr className="border-black w-10/12 mx-auto my-3" />
			<button
				onClick={() => navigate('/register')}
				className="bg-yellow border border-yellower rounded-lg p-2 w-2/3 mx-auto text-black transition duration:200 hover:bg-yellower"
			>
				Crear cuenta
			</button>
		</div>
	);
}

export default Login;
