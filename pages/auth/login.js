import React from 'react';
import Link from 'next/link';
import Layout from 'components/layout';
import { Input, Button, CheckBox } from 'components/form/form-control';

import styles from './login.module.scss';

const LoginPage = () => {

	const [state, setState] = React.useReducer((old, news) => ({ ...old, ...news }), {
		email: '',
		password: '',
		remember: false
	});

	const { email, password, remember } = state;

	const handleEmailChange = React.useCallback(e => {
		setState({ email: e.target.value });
	}, []);
	const handlePasswordChange = React.useCallback(e => {
		setState({ password: e.target.value });
	}, []);
	const handleRememberChange = React.useCallback(e => {
		setState({ remember: !remember });
	}, []);
	const handleSubmit = React.useCallback((e) => {
		e.preventDefault();
		console.log(state);
	}, [state])

	return (
		<Layout>
			<main className={styles.container}>
				<form className={styles.form}>
					<a href='/' className={styles.close}></a>
					<h1>Log in with your account</h1>
					<section className={styles.inputGroup}>
						<Input
							id='email'
							name='email'
							type='text'
							value={email}
							onChange={handleEmailChange}
							placeholder='Email Address'
							style={{ padding: '16px 24px' }}
						/>
						<Input
							id='password'
							name='password'
							type='password'
							value={password}
							onChange={handlePasswordChange}
							placeholder='Password'
							style={{ padding: '16px 24px' }}
						/>
						<CheckBox id='remember'
							name='remember'
							type='checkbox'
							value={remember}
							onChange={handleRememberChange}
						>
							Remeber Me
					</CheckBox>
					</section>
					<section className={styles.actionGroup}>
						<Button className={styles.submit} onClick={handleSubmit}>
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