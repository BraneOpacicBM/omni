import PT from 'prop-types';
import React from 'react';

import css from '../styles/button.css';
import classNames from '../utils/classNames';

export default class Button extends React.PureComponent {
	static propTypes = {
		children: PT.node,
		className: PT.string,
		primary: PT.bool,
		small: PT.bool,
		submit: PT.bool,
	};

	static defaultProps = {
		children: undefined,
		className: undefined,
		primary: false,
		small: false,
		submit: false,
	};

	render() {
		const { children, className, primary, small, submit, ...props } = this.props;

		const classes = classNames(css.button, className, {
			[css.primary]: primary,
			[css.small]: small,
		});

		return (
			<button
				{...props}
				className={classes}
				type={submit ? 'submit' : 'button'}
			>
				{children}
			</button>
		);
	}
}
