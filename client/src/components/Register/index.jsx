import React, { useState } from 'react';
import { validateForm } from '../helpers/validateForm';
function Register() {
	const [form, setForm] = useState({
		name: '',
		lastname: '',
		email: '',
		password: '',
		confirm: '',
		gender: '',
	});
	const [error, setError] = useState({
		name: false,
		lastname: false,
		email: false,
		password: false,
		confirm: false,
		gender: true,
	});
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		validateForm({ [e.target.name]: e.target.value }, form, setError);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
		setForm({
			name: '',
			lastname: '',
			email: '',
			password: '',
			confirm: '',
			gender: '',
		});
		e.target.reset();
	};
	return (
		<div className="h-screen w-screen bg-background bg-cover bg-black bg-no-repeat text-black flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="w-1/3 h-[90%] flex flex-col bg-white p-5 justify-evenly rounded"
			>
				<h1 className="font-bold text-3xl font-sans mx-auto ">Register</h1>
				<label className="font-bold text-lg" htmlFor="name">
					Nombre
				</label>
				<input
					className="border border-black rounded p-1"
					type="text"
					name="name"
					onChange={handleChange}
					value={form.name}
					autoComplete="off"
				/>
				<span
					className={`${error.name ? 'text-danger' : 'text-white'} text-sm`}
				>
					No de contener numeros ni caracteres especiales
				</span>
				<label className="font-bold text-lg" htmlFor="lastname">
					Apellido
				</label>
				<input
					className="border border-black rounded p-1"
					type="text"
					name="lastname"
					onChange={handleChange}
					value={form.lastname}
					autoComplete="off"
				/>
				<span
					className={`${error.lastname ? 'text-danger' : 'text-white'} text-sm`}
				>
					No de contener numeros ni caracteres especiales
				</span>
				<label className="font-bold text-lg" htmlFor="email">
					Correo
				</label>
				<input
					className="border border-black rounded p-1"
					type="text"
					name="email"
					onChange={handleChange}
					value={form.email}
					autoComplete="off"
				/>
				<span
					className={`${error.email ? 'text-danger' : 'text-white'} text-sm`}
				>
					Use un correo válido
				</span>
				<label className="font-bold text-lg" htmlFor="password">
					Contraseña
				</label>
				<input
					className="border border-black rounded p-1"
					type="password"
					name="password"
					onChange={handleChange}
					value={form.password}
					autoComplete="off"
				/>
				<span
					className={`${error.password ? 'text-danger' : 'text-white'} text-sm`}
				>
					Debe tener al menos 8 carácteres, una mayuscula y un número
				</span>
				<label className="font-bold text-lg" htmlFor="confirm">
					Confirmar contraseña
				</label>
				<input
					className="border border-black rounded p-1"
					type="password"
					name="confirm"
					onChange={handleChange}
					value={form.confirm}
					autoComplete="off"
				/>
				<span
					className={`${error.confirm ? 'text-danger' : 'text-white'} text-sm`}
				>
					La contraseña no coincide
				</span>
				<label className="font-bold text-lg" htmlFor="gender">
					Genero
				</label>
				<select
					className="p-2 rounded bg-white border font-medium"
					name="gender"
					onChange={handleChange}
					defaultValue={'DEFAULT'}
				>
					<option disabled value="DEFAULT">
						Elige un genero...
					</option>
					<option value="male">Masculino</option>
					<option value="female">Femenino</option>
					<option value="other">Otro</option>
				</select>
				<input
					className="bg-black text-white border transition duration:200 disabled:bg-gray disabled:border-gray disabled:text-white hover:bg-blacker hover:cursor-pointer rounded w-1/3 mx-auto mt-5 py-1"
					type="submit"
					value="Enviar"
					disabled={
						error.name ||
						error.lastname ||
						error.email ||
						error.password ||
						error.confirm ||
						error.gender
							? true
							: false
					}
				/>
			</form>
		</div>
	);
}

export default Register;
