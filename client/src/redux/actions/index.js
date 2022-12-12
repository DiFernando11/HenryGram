import axios from 'axios';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CREATE_USER = 'CREATE_USER';
////CHATS
export const sendMessagesAction = (id, payload) => {
	return {
		type: SEND_MESSAGE,
		payload,
		id,
	};
};
export const createUser = (user) => {
	return async (dispatch) => {
		const result = await axios.post('https://localhost:3000/api/users', user);
		dispatch({ type: CREATE_USER, payload: result });
	};
};
