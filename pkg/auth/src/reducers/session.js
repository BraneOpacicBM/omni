import { setToken, setUser } from '../actions/session';

export const initialState = {
	token: '',
	user: null,
};

export default function sessionReducer(state = initialState, action) {
	if (action.type === setToken.type) {
		return {
			...state,
			token: action.token,
		};
	}

	if (action.type === setUser.type) {
		return {
			...state,
			user: action.user,
		};
	}

	return state;
}
