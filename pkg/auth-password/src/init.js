import LoginPasswordForm from './components/LoginPasswordForm';
import * as epics from './epics/login';
import loginFormReducer from './reducers/loginForm';
import createGetSecret from './utils/createGetSecret';

export default function init(omni) {
	omni.auth.addProvider('password', LoginPasswordForm, createGetSecret(omni));

	Object.values(epics).forEach(epic => {
		omni.epics.push(epic);
	});

	omni.reducers.loginForm = loginFormReducer;
}
