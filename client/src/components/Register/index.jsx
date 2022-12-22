import React, { useState } from 'react';
import { validateDisabled, validateForm } from '../helpers/validateForm';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, createUser } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
function Register() {
	const user = useSelector((state) => state.createUser);
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirm: '',
		gender: '',
	});
	const [error, setError] = useState({
		firstName: false,
		lastName: false,
		email: false,
		password: false,
		confirm: false,
		gender: true,
	});
	const [disabled, setDisabled] = useState(true);
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
		validateForm({ [e.target.name]: e.target.value }, form, setError);
		validateDisabled(form, setDisabled, { value: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createUser(form));
		Swal.fire({
			title: "Waiting for confirmation...",
			didOpen: () => {
			  Swal.showLoading();
			},
			background: '#1e1c1d',
			iconColor: "#fcd34d",
			color: "#fafbfd"
		  });
		setForm({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirm: '',
			gender: '',
		});
		e.target.reset();
	};
	const handleAlert = () => {
		Swal.fire({
			icon: "success",
			title: "Registered successfully.",
			html: '<h2>Please, check your email.</h2>',
			background: '#1e1c1d',
			iconColor: "#fcd34d",
			color: "#fafbfd"
		  }).then((response) => {
			if (response.isConfirmed) {
				dispatch(clearState());
				navigate('/')
			}
		  });
	}
	return (
		<div className="h-screen w-screen bg-background bg-cover bg-black bg-no-repeat text-black flex items-center justify-center">
			{user.firstName ? handleAlert() : null}
			<form
				onSubmit={handleSubmit}
				className="w-10/12 h-[90%] flex flex-col bg-white p-5 justify-evenly rounded lg:w-1/3"
			>
				<h1 className="font-bold text-3xl font-sans mx-auto ">Register</h1>
				<label className="font-bold text-lg" htmlFor="firstName">
					Nombre
				</label>
				<input
					className="border border-black rounded p-1"
					type="text"
					name="firstName"
					onChange={handleChange}
					value={form.name}
				/>
				<span
					className={`${
						error.firstName ? 'text-danger' : 'text-white'
					} text-sm select-none`}
				>
					No de contener numeros ni caracteres especiales
				</span>
				<label className="font-bold text-lg" htmlFor="lastName">
					Apellido
				</label>
				<input
					className="border border-black rounded p-1"
					type="text"
					name="lastName"
					onChange={handleChange}
					value={form.lastName}
				/>
				<span
					className={`text-sm select-none ${error.lastName ? 'text-danger' : 'text-white'}`}
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
				/>
				<span
					className={`${error.email ? 'text-danger' : 'text-white'} text-sm select-none`}
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
				/>
				<span
					className={`${error.password ? 'text-danger' : 'text-white'} text-sm select-none`}
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
				/>
				<span
					className={`${error.confirm ? 'text-danger' : 'text-white'} text-sm select-none`}
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
						error.firstName ||
						error.lastName ||
						error.email ||
						error.password ||
						error.confirm ||
						error.gender ||
						disabled
							? true
							: false
					}
				/>
			</form>
		</div>
	);
}

export default Register;
