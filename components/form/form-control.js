import React from 'react';
import styles from './form-control.module.scss';

const FromInput = (props) => {

	const { id, label, labelClass, ...others } = props;
	return (
		<div id={id} class='wrapper'>
			<label className={labelClass}>{label}</label>
			<input {...others} />
		</div>
	)
}

export default FromInput;

export const Input = (props) => {
	const { error, ...others } = props;
	return (
		<div>
			<input className={styles.input} {...others} />
			{error && <span className={styles.error}>{error}</span>}
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