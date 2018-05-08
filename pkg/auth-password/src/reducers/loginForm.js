import { login, loginError } from '../actions/login';

export const initialState = {
	error: null,
	pending: false,
};

export default function loginFormReducer(state = initialState, action) {
	if (action.type === login.type) {
		return {
			...state,
			pending: true,
		};
	}

	if (action.type === loginError.type) {
		return {
			...state,
			error: action.error,
			pending: false,
		};
	}

	return state;
}
