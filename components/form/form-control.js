import React from 'react';
import styles from './form-control.module.scss';

const FormInput = (props) => {

	const { id, label, labelClass, ...others } = props;
	return (
		<div id={id} className='wrapper'>
			<label className={labelClass}>{label}</label>
			<input {...others} />
		</div>
	)
}

export default FormInput;

export const FormSelect = (props) => {

	const { id, label, labelClass, values, ...others } = props;
	return (
		<div id={id} className='wrapper'>
			<label className={labelClass}>{label}</label>
			<select {...others}>
				{Object.keys(values).map(key => (
					<option key={key} value={key}>{values[key]}</option>
				))}
			</select>
		</div>
	)
}

export const Input = (props) => {
	const { error, ...others } = props;
	const cls = error ? `${styles.input} ${styles.error}` : styles.input;
	return (
		<div>
			<input className={cls} {...others} />
			{error && <span className={styles.errorspan}>{error}</span>}
		</div>
	)
}

export const Button = (props) => {
	const { children, className, ...others } = props;
	const cls = className ? `${styles.button} ${className}` : styles.button;
	return (
		<button className={cls} {...others}>
			{children}
		</button>
	)
}

export const CheckBox = (props) => {
	const { children, className, ...others } = props;
	const cls = className ? `${styles.check} ${className}` : styles.check;
	return (
		<label className={styles.checklabel}>
			<input type='checkbox' className={cls} {...others} />
			<span className={styles.vmiddle}>{children}</span>
		</label>
	)
}

export const TTInput = props => {
	const { desc, tooltip, labelClass, inputClass, ...others } = props;
	return (
		<label className={`${styles.customCheck} ${styles.tooltip} ${styles.top}`}>
			<input className={inputClass} {...others} />
			<span className={styles.clicked}>{desc}</span>
			<span className={styles.tooltiptext}>{tooltip}</span>
		</label>
	)
}