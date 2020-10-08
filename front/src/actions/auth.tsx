import axios from 'axios';
import { setAlert } from './alert';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

// Login User
export const login = ({ email, password }: any) => async (dispatch: any) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('http://db.api.connectclass.io/user', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
	} catch (error) {
		const errors = error.response.data.errors;

		if (errors) {
			errors.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout / Clear Profile
export const logout = () => (dispatch: any) => {
	dispatch({
		type: LOGOUT,
	});
};
