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
	return async function (dispatch) {
		try {
			const result = await axios.get('http://localhost:3000/');
			dispatch({ type: CREATE_USER, payload: result.data });
		} catch (error) {
			console.log(error);
		}
	};
};
