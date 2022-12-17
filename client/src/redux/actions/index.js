import axios from 'axios';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CREATE_USER = 'CREATE_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const VERIFY_USER_TOKEN = 'VERIFY_USER_TOKEN';
export const GET_PROFILE_FRIEND = 'GET_PROFILE_FRIEND';
export const POST_USER = 'POST_USER';
export const CLEAN_POST = 'CLEAN_POST';
////CHATS
export const sendMessagesAction = (id, payload) => {
	return {
		type: SEND_MESSAGE,
		payload,
		id,
	};
};
//USERS INFORMATION
//REGISTER
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
//LOGIN
export const loginAction = (data) => {
	return async (dispatch) => {
		try {
			const result = await axios.post(
				'http://localhost:3000/api/users/login',
				data
			);
			return dispatch({ type: LOGIN, payload: result.data });
		} catch (error) {
			return dispatch({
				type: LOGIN,
				payload: 'E-mail or password are not correct',
			});
		}
	};
};
//LOGOUT
export const logoutAction = () => {
	return { type: LOGOUT };
};
// Estado global que tiene la informacion del usuario loguiado
export const verifyUserAction = (token) => {
	return async (dispatch) => {
		try {
			const result = await axios.get(
				`http://localhost:3000/api/users/token?token=${token}`
			);
			return dispatch({ type: VERIFY_USER_TOKEN, payload: result.data });
		} catch (error) {
			console.log(error);
		}
	};
};
//USERS INFORMATION
// FRIENDS
export const getProfileFriendAction = (idUser) => {
	return async (dispatch) => {
		try {
			const result = await axios.get(
				`http://localhost:3000/api/users/id/${idUser}`
			);
			return dispatch({ type: GET_PROFILE_FRIEND, payload: result.data });
		} catch (error) {
			console.log(error);
		}
	};
};
//FRIENDS
//POST USER
export const postUser = (post) => {
	return async (dispatch) => {
		try {
			const result = await axios.post('http://localhost:3000/api/posts', post);
			dispatch({ type: POST_USER, payload: result.data });
		} catch (error) {
			console.log(error);
		}
	};
};

//CLEAN POST
export const cleanPostState = () => {
	return  {type: CLEAN_POST}
};
