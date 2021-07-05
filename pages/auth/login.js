import React, { useReducer, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Layout from 'components/layout';
import validator from 'validator';
import { Input, CheckBox, Button } from 'components/form/form-control';

import * as UserActions from 'store/actions/user';
import * as AuthActions from 'store/actions/auth';

import styles from './login.module.scss';

const LoginPage = () => {

	const [state, setState] = useReducer((old, news) => ({ ...old, ...news }), {
		email: { value: '', error: '' },
		password: { value: '', error: '' },
		remember: false,
		busy: false,
		error: ''
	});

	const { email, password, remember, error, busy } = state;
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector(state => state.user);
	const { referer } = router.query;

	useEffect(() => {
		if (user.profile) {
			router.replace(referer ? decodeURIComponent(referer) : '/');
		}
	}, [user.profile, router, referer])

	const handleEmailChange = useCallback(e => {
		setState({
			email: {
				value: e.target.value,
				error: validator.isEmail(e.target.value) ? '' : 'invalid email address'
			}
		});
	}, []);
	const handlePasswordChange = useCallback(e => {
		setState({
			password: {
				value: e.target.value,
				error: e.target.value.length >= 6 ? '' : 'password length must be at least 6'
			}
		});
	}, []);

	const handleRememberChange = useCallback(e => {
		setState({ remember: !remember });
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setState({ busy: true });
			await dispatch(UserActions.login(email.value, password.value));
			if (remember) {
				dispatch(AuthActions.saveCredentials(email.value, password.value));
			}
			router.replace(referer ? decodeURIComponent(referer) : '/');
		} catch (error) {
			setState({ busy: false, error });
		}
	}

	const enable = !email.error && !password.error && !busy && password.value.length && email.value.length;
	return (
		<Layout>
			<main className={styles.container}>
				<form className={styles.form} method='post' target='#here'>
					{busy && <div className="simple-spinner"></div>}
					<Link href='/'><a className={styles.close}></a></Link>
					<h1>Log in with your account</h1>
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
						<Input
							id='password'
							name='password'
							type='password'
							value={password.value}
							onChange={handlePasswordChange}
							placeholder='Password'
							style={{ padding: '16px 24px' }}
							error={password.error}
						/>
						<CheckBox id='remember'
							name='remember'
							type='checkbox'
							value={remember}
							onChange={handleRememberChange}
						>
							Remember Me
					</CheckBox>
					</section>
					<section className={styles.actionGroup}>
						<Button className='submit' onClick={handleSubmit} disabled={!enable}>
							Log in
						</Button>
						<section className={styles.actionLinks}>
							<Link href='/auth/reset-password'>
								<a className={styles.link}>
									Forgot password?
								</a>
							</Link>
						</section>
						<div>
							<span>Don't have an account? <Link href='/auth/signup'><a className={styles.link}>Sign up here!</a></Link></span>
						</div>
					</section>
				</form>
			</main>
		</Layout>
	)
}

export default LoginPage;