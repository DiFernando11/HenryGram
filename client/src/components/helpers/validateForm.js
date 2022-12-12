export const validateForm = (form, original, setError) => {
	if (/[^A-Za-z ]/g.test(form.name)) {
		setError((prev) => ({
			...prev,
			name: true,
		}));
	} else if (/[^A-Za-z ]/g.test(form.lastname)) {
		setError((prev) => ({
			...prev,
			lastname: true,
		}));
	} else if (form.email?.length > 0) {
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
			setError((prev) => ({
				...prev,
				email: true,
			}));
		} else {
			setError((prev) => ({
				...prev,
				email: false,
			}));
		}
	} else if (form.password?.length > 0) {
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(form.password)) {
			setError((prev) => ({
				...prev,
				password: true,
			}));
		} else {
			setError((prev) => ({
				...prev,
				password: false,
			}));
		}
	} else if (form.password?.length === 0) {
		setError((prev) => ({
			...prev,
			password: false,
		}));
	} else if (form.confirm?.length > 0) {
		if (form.confirm !== original.password) {
			setError((prev) => ({
				...prev,
				confirm: true,
			}));
		} else {
			setError((prev) => ({
				...prev,
				confirm: false,
			}));
		}
	} else if (form.gender || original.gender) {
		setError((prev) => ({
			...prev,
			gender: false,
		}));
	} else if (original.confirm?.length > 0) {
		if (original.confirm !== original.password) {
			setError((prev) => ({
				...prev,
				confirm: true,
			}));
		} else {
			setError((prev) => ({
				...prev,
				confirm: false,
			}));
		}
	} else {
		setError({
			name: false,
			lastname: false,
			email: false,
			password: false,
			confirm: false,
			gender: true,
		});
	}
};

export const validateDisabled = (
	{ name, lastname, email, password, confirm, gender },
	setDisabled,
	obj
) => {
	if (
		name.length !== 0 &&
		lastname.length !== 0 &&
		email.length !== 0 &&
		password.length !== 0 &&
		confirm.length !== 0 &&
		obj.value.length !== 0
	) {
		setDisabled(false);
	} else {
		setDisabled(true);
	}
};
