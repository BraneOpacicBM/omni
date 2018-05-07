import { Button, withForm } from '@ocm/core';
import * as validators from '@ocm/validators';
import PT from 'prop-types';
import React from 'react';

import css from '../styles/login-password-form.css';

export class LoginPasswordForm extends React.PureComponent {
	static propTypes = {
		fields: PT.objectOf(PT.func).isRequired,
		formValidate: PT.func.isRequired,
	};

	handleSubmit = ev => {
		ev.preventDefault();
		this.props.formValidate()
			.then(() => {
				console.info('Form is valid');
			})
			.catch(() => {});
	};

	render() {
		const { fields } = this.props;

		return (
			<form className={css.form} onSubmit={this.handleSubmit}>
				<fields.email />
				<fields.password />
				<Button primary submit>Login</Button>
			</form>
		);
	}
}

export default withForm(() => ({
	fields: {
		email: {
			type: 'email',
			label: 'E-mail address',
			placeholder: 'e.g. john.doe@example.com',
			validators: [
				validators.required('Please enter your e-mail address'),
			],
		},
		password: {
			type: 'password',
			label: 'Password',
			validators: [
				validators.required('Please enter your password'),
			],
		},
	},
}))(LoginPasswordForm);
