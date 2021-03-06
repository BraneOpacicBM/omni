import PT from 'prop-types';
import React from 'react';

import withField from './Field';

import css from '../styles/input.css';

export class InputMultiOption extends React.PureComponent {
	static propTypes = {
		name: PT.string.isRequired,
		options: PT.arrayOf(PT.shape({
			label: PT.string.isRequired,
			value: PT.string.isRequired,
		})).isRequired,
		onUpdate: PT.func.isRequired,
		value: PT.arrayOf(PT.string),
	};

	static defaultProps = {
		value: [],
	};

	static defaultValue = [];

	handleChange = ev => {
		const { value } = this.props;
		let selected;
		if (ev.target.checked) {
			selected = [...value, ev.target.value];
		} else {
			selected = [...value];
			selected.splice(selected.indexOf(ev.target.value), 1);
		}

		this.props.onUpdate(selected);
	}

	render() {
		const { name, options, value } = this.props;

		return (
			<div>
				<fieldset className={css.options}>
					{options.map((option, i) => (
						<div key={`input-${option.value}`} className={css.option}>
							<input
								type="checkbox"
								checked={value.includes(option.value)}
								id={`${name}_${i}`}
								name={`${name}[]`}
								onChange={this.handleChange}
								value={option.value}
							/>
							<label htmlFor={`${name}_${i}`}>{option.label}</label>
						</div>
					))}
				</fieldset>
			</div>
		);
	}
}

export default withField(InputMultiOption);
