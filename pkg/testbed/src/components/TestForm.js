import { Button, withForm } from '@ocm/core';
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
		},
		last_name: {
			type: 'text',
			label: 'Last name',
			placeholder: 'e.g. Doe',
		},
	},
}))(TestForm);
