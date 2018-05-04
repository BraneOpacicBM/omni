import { classNames } from '@ocm/core';
import PT from 'prop-types';
import React from 'react';

import withField from './Field';

import css from '../styles/input.css';

export class InputTextarea extends React.PureComponent {
	static propTypes = {
		onChange: PT.func,
		onUpdate: PT.func.isRequired,
	};

	static defaultProps = {
		onChange: () => {},
	};

	handleChange = ev => {
		this.props.onUpdate(ev.target.value);
		this.props.onChange(ev);
	}

	render() {
		const { ...props } = this.props;
		const classes = classNames(css.input, css.inputTextarea);

		delete props.onUpdate;

		return (
			<div className={classes}>
				<pre><span>{props.value}</span><br /></pre>
				<textarea
					{...props}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default withField(InputTextarea);
