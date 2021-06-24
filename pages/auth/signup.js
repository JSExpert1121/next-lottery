import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router'
import validator from 'validator';
import Layout from 'components/layout';
import { Input, Button } from 'components/form/form-control';

import * as UserActions from 'store/actions/user';

import styles from './auth.module.scss';

const SignupPage = () => {
	const [state, setState] = React.useReducer((old, news) => ({ ...old, ...news }), {
		email: { value: '', error: '' },
		password: { value: '', error: '' },
		address: { value: '', error: '' },
		firstName: { value: '', error: '' },
		lastName: { value: '', error: '' },
		phone: { value: '', error: '' },
		busy: false,
		error: ''
	});

	const { email, password, address, busy, error, firstName, lastName, phone } = state;
	const dispatch = useDispatch();
	const router = useRouter();

	const { affid } = router.query;

	const handleEmailChange = React.useCallback(e => {
		setState({
			email: {
				value: e.target.value,
				error: validator.isEmail(e.target.value) ? '' : 'invalid email address'
			}
		});
	}, []);
	const handleFnameChange = React.useCallback(e => {
		setState({
			firstName: {
				value: e.target.value,
				error: e.target.value.length >= 3 ? '' : 'length must be at least 3'
			}
		});
	}, []);
	const handleLnameChange = React.useCallback(e => {
		setState({
			lastName: {
				value: e.target.value,
				error: e.target.value.length >= 3 ? '' : 'length must be at least 3'
			}
		});
	}, []);
	const handlePasswordChange = React.useCallback(e => {
		setState({
			password: {
				value: e.target.value,
				error: e.target.value.length >= 6 ? '' : 'password length must be at least 6'
			}
		});
	}, []);
	const handleAddressChange = React.useCallback(e => {
		setState({
			address: {
				value: e.target.value,
				error: (e.target.value.length === 0 || validator.isEthereumAddress(e.target.value)) ? '' : 'invalid address'
			}
		});
	}, []);
	const handlePhoneChange = React.useCallback(e => {
		setState({
			phone: {
				value: e.target.value,
				error: (e.target.value.length === 0 || validator.isMobilePhone(e.target.value)) ? '' : 'invalid phone'
			}
		});
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setState({ busy: true });
			await dispatch(UserActions.signup(
				firstName.value,
				lastName.value,
				email.value,
				phone.value,
				password.value,
				affid ? parseInt(affid) : address.value
			));
			router.push('/');
		} catch (error) {
			setState({ busy: false, error });
		}
	};

	const enable = !email.error && !password.error && !address.error && !firstName.error && !lastName.error && !busy;
	return (
		<Layout>
			<main className={styles.container}>
				<form className={styles.form}>
					{busy && <div className="simple-spinner"></div>}
					<Link href='/'><a className={styles.close}></a></Link>
					<h1>Welcome</h1>
					{error && <section className='error-msg'>{error}</section>}
					<section className={styles.inputGroup}>
						<Input
							id='email'
							name='email'
							type='text'
							value={email.value}
							onChange={handleEmailChange}
							placeholder='Email Address'
							style={{ padding: '16px 24px' }}
							error={email.error}
						/>
						<div className={styles.flnameInput}>
							<Input
								id='fname'
								name='fname'
								type='text'
								value={firstName.value}
								onChange={handleFnameChange}
								placeholder='First name'
								style={{ padding: '16px 24px' }}
								error={firstName.error}
							/>
							<Input
								id='lname'
								name='lname'
								type='text'
								value={lastName.value}
								onChange={handleLnameChange}
								placeholder='Last name'
								style={{ padding: '16px 24px' }}
								error={lastName.error}
							/>
						</div>
						<Input
							id='password'
							name='password'
							type='password'
							value={password.value}
							onChange={handlePasswordChange}
							placeholder='Password'
							style={{ padding: '16px 24px' }}
							error={email.error}
						/>
						<Input
							id='phone'
							name='phone'
							type='phone'
							value={phone.value}
							onChange={handlePhoneChange}
							placeholder='Phone Number (optional)'
							style={{ padding: '16px 24px' }}
							error={phone.error}
						/>
						<Input
							id='address'
							name='bch-address'
							type='text'
							value={address.value}
							placeholder='BCH address (optional)'
							onChange={handleAddressChange}
							style={{ padding: '16px 24px' }}
							error={address.error}
						/>
					</section>
					<section className={styles.actionGroup}>
						<Button className='submit' onClick={handleSubmit} disabled={!enable}>
							Sign up
						</Button>
					</section>
					<section className={styles.tc}>
						<span>
							By creating a new account I accept the <Link href='/help/terms'><a className={styles.link}>terms and conditions</a></Link>, the <Link href='/help/privacy'><a className={styles.link}>privacy policy </a></Link>and confirm that I am over 18 years of age. It is an offence to gamble if under age. <Link href='/help/gamble'><a className={styles.link}>Gamble Responsibly</a></Link>.
						</span>
					</section>
					<section className={styles.actionLinks}>
						<span>
							Have an account?
							<Link href='/auth/login'>
								<a className={styles.link}>&nbsp;Log in</a>
							</Link>
						</span>
					</section>
				</form>
			</main>
		</Layout >
	)
}

export default SignupPage;