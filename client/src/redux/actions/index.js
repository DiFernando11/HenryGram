import axios from 'axios';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CREATE_USER = 'CREATE_USER';
export const LOGIN = 'LOGIN';
////CHATS
export const sendMessagesAction = (id, payload) => {
	return {
		type: SEND_MESSAGE,
		payload,
		id,
	};
};
export const createUser = (user) => {
	return async function (dispatch) {
		try {
			const result = await axios.post('http://localhost:3000/api/users', user);
			dispatch({ type: CREATE_USER, payload: result.data });
		} catch (error) {
			console.log(error);
		}
	};
};
export const loginAction = (data) => {
	return async function (dispatch) {
		try {
			const result = await axios.post('http://localhost:3000/api/users/login', data);
			console.log(result);
			dispatch({ type: LOGIN, payload: result.data });
		} catch (error) {
			console.log(error)
		}
	};
};
