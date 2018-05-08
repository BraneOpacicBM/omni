import { Button, withForm } from '@ocm/core';
import * as validators from '@ocm/validators';
import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { login } from '../actions/login';
import { selectLoginState } from '../selectors/login';
import css from '../styles/login-password-form.css';

export class LoginPasswordForm extends React.PureComponent {
	static propTypes = {
		dispatch: PT.func.isRequired,
		fields: PT.objectOf(PT.func).isRequired,
		formValidate: PT.func.isRequired,
		loginState: PT.shape({
			error: PT.shape({
				message: PT.string.isRequired,
				title: PT.string.isRequired,
			}),
			pending: PT.bool.isRequired,
		}).isRequired,
	};

	handleSubmit = ev => {
		const { dispatch, formValidate } = this.props;

		ev.preventDefault();
		formValidate()
			.then(values => {
				dispatch(login(values));
			})
			.catch(() => {});
	};

	render() {
		const { fields, loginState } = this.props;

		return (
			<form className={css.form} onSubmit={this.handleSubmit}>
				<fields.email />
				<fields.password />
				<footer className={css.footer}>
					<Button disabled={loginState.pending} primary submit>Login</Button>
					{loginState.error && (
						<em className={css.error}>{loginState.error.message}</em>
					)}
				</footer>
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
}))(connect(state => ({
	loginState: selectLoginState(state),
}))(LoginPasswordForm));
