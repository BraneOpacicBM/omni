import { Button, withForm } from '@ocm/core';
import * as validators from '@ocm/validators';
import PT from 'prop-types';
import React from 'react';

export class TestForm extends React.PureComponent {
	static propTypes = {
		fields: PT.objectOf(PT.func).isRequired,
		formValidate: PT.func.isRequired,
	};

	handleSubmit = ev => {
		ev.preventDefault();
		this.props.formValidate()
			.then(values => {
				console.info('VALID', values);
			})
			.catch(() => {});
	}

	render() {
		const { fields } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<fields.first_name />
				<fields.last_name />
				<fields.password />
				<fields.biography />
				<Button primary submit>Submit</Button>
			</form>
		);
	}
}

export default withForm(() => ({
	fields: {
		first_name: {
			type: 'text',
			name: 'name.first',
			label: 'First name',
			placeholder: 'e.g. John',
			validators: [
				validators.required('Please enter your first name'),
			],
		},
		last_name: {
			type: 'text',
			label: 'Last name',
			placeholder: 'e.g. Doe',
		},
		password: {
			type: 'password',
			label: 'Password',
			name: 'password',
			placeholder: 'e.g. correct-horse-battery-staple',
			hint: 'Maybe something that is not "password123".',
			validators: [
				validators.required('Please enter your password.'),
			],
		},
		biography: {
			type: 'textarea',
			label: 'Biography',
			name: 'biography',
			placeholder: 'e.g. I have a horse. My horse is amazing.',
			validators: [
				validators.required('Please tell us about yourself.'),
			],
		},
	},
}))(TestForm);
