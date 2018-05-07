import LoginPasswordForm from './components/LoginPasswordForm';

export default function init(omni) {
	omni.auth.addProvider('password', LoginPasswordForm);
}
