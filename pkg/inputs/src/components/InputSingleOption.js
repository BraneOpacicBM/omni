import PT from 'prop-types';
import React from 'react';

import withField from './Field';

import css from '../styles/input.css';

export class InputSingleOption extends React.PureComponent {
	static propTypes = {
		name: PT.string.isRequired,
		options: PT.arrayOf(PT.shape({
			label: PT.string.isRequired,
			value: PT.string.isRequired,
		})).isRequired,
		onUpdate: PT.func.isRequired,
		value: PT.string,
	};

	static defaultProps = {
		value: '',
	};

	handleChange = ev => {
		this.props.onUpdate(ev.target.value);
	}

	handleClear = ev => {
		ev.preventDefault();
		this.props.onUpdate('');
	}

	render() {
		const { name, options, value } = this.props;

		return (
			<div>
				<fieldset className={css.options}>
					{options.map((option, i) => (
						<div key={`input-${option.value}`} className={css.option}>
							<input
								type="radio"
								checked={value === option.value}
								id={`${name}_${i}`}
								name={name}
								onChange={this.handleChange}
								value={option.value}
							/>
							<label htmlFor={`${name}_${i}`}>{option.label}</label>
						</div>
					))}
					<button
						type="button"
						className={css.clear}
						onMouseDown={this.handleClear}
						tabIndex={-1}
					>
						Clear selection
					</button>
				</fieldset>
			</div>
		);
	}
}

export default withField(InputSingleOption);
