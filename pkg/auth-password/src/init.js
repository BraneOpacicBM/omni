import LoginPasswordForm from './components/LoginPasswordForm';
import * as epics from './epics/login';
import loginFormReducer from './reducers/loginForm';

export default function init(omni) {
	omni.auth.addProvider('password', LoginPasswordForm);

	Object.values(epics).forEach(epic => {
		omni.epics.push(epic);
	});

	omni.reducers.loginForm = loginFormReducer;
}
