import React, { useCallback, useState, useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormInput, { FormSelect } from 'components/form/form-control';

import * as UserActions from 'store/actions/user'

const ProfileForm = ({ countries }) => {

	const profile = useSelector(state => state.user.profile);
	const dispatch = useDispatch();

	const [showpwd, setShowpwd] = useState(false);
	const [state, setState] = useReducer(
		(old, action) => ({ ...old, ...action }),
		{
			firstname: '',
			lastname: '',
			email: '',
			cstate: '',
			country: '',
			city: '',
			address: '',
			zipcode: '',
			phone1: '',
			phone2: '',
			oldpwd: '',
			newpwd: '',
			confirmpwd: ''
		}
	);

	const [message, setMessage] = useState({
		reset: '',
		update: ''
	});
	const [error, setError] = useState(false);

	const [busy, setBusy] = useState(false);

	useEffect(() => {
		profile && setState({
			firstname: profile.FirstName ?? '',
			lastname: profile.LastName ?? '',
			email: profile.Email ?? '',
			cstate: profile.State ?? '',
			country: profile.CountryCode ?? '',
			city: profile.City ?? '',
			address: profile.Address ?? '',
			zipcode: profile.ZipCode ?? '',
			phone1: profile.PhoneNumber ?? '',
			phone2: profile.MobileNumber ?? '',
			oldpwd: '',
			newpwd: '',
			confirmpwd: ''
		})
	}, [profile]);

	const profileChanged = useCallback(e => {
		e.preventDefault();
		setState({ [e.target.name]: e.target.value });
		setMessage({ reset: '', update: '' });
		setError(false);
	}, [])

	const toggleShow = useCallback(e => {
		e.preventDefault();
		setShowpwd(!showpwd);
	}, [showpwd]);

	const { firstname, lastname, email, cstate,
		country, city, address, zipcode, phone1, phone2,
		oldpwd, newpwd, confirmpwd } = state;

	const handleSave = async e => {
		e.preventDefault();
		setMessage({ reset: '', update: '' });

		try {
			setBusy(true);
			await dispatch(UserActions.updateProfile(
				email, firstname, lastname, profile.MemberId,
				phone1, phone2, country, address, city, cstate, zipcode
			))
			setMessage({ ...message, update: 'Profile updated' });
			setTimeout(() => setMessage({...message, update: ''}), 3000);
			setError(false);
		} catch {
			setMessage({ ...message, update: 'Profile change error' });
			setError(true);
		} finally {
			setBusy(false);
		}
	}

	const updatePassword = async e => {
		e.preventDefault();
		setMessage({ reset: '', update: '' });

		if (!oldpwd) {
			setError(true);
			setMessage({...message, reset: 'Please input your password'});
			return;
		}
		if (confirmpwd !== newpwd) {
			setError(true);
			setMessage({...message, reset: 'Password mismatch'});
			return;
		}
		if (newpwd.length < 6) {
			setError(true);
			setMessage({...message, reset: 'Password must be at least 6 characters'});
			return;
		}
		try {
			setBusy(true);
			await dispatch(UserActions.resetPassword(email, oldpwd, newpwd));
			setMessage({ ...message, reset: 'Password changed' });
			setTimeout(() => setMessage({...message, reset: ''}), 3000);
			setError(false);
		} catch {
			setMessage({ ...message, reset: 'Password reset error' });
			setError(true);
		} finally {
			setBusy(false);
		}
	}

	return (
		<form className='account-form'>
			{busy && <div className="simple-spinner"></div>}
			<FormInput
				id='firstName'
				label='First Name'
				type='text'
				name='firstname'
				value={firstname}
				onChange={profileChanged}
				placeholder='First Name'
			/>
			<FormInput
				id='lastName'
				label='Last Name'
				type='text'
				name='lastname'
				value={lastname}
				onChange={profileChanged}
				placeholder='Last Name'
			/>
			<FormInput
				id='email'
				label='Email Address'
				type='text'
				name='email'
				value={email}
				onChange={profileChanged}
				placeholder='Email Address'
			/>
			<FormSelect
				id='country'
				label='Country'
				type='text'
				name='country'
				value={country}
				values={countries}
				onChange={profileChanged}
				placeholder='Country'
			/>
			<hr />
			<FormInput
				id='state'
				label='State'
				type='text'
				name='cstate'
				value={cstate}
				onChange={profileChanged}
				placeholder='State'
			/>
			<FormInput
				id='city'
				label='City'
				type='text'
				name='city'
				value={city}
				onChange={profileChanged}
				placeholder='City'
			/>
			<FormInput
				id='address'
				label='Address'
				type='text'
				name='address'
				value={address}
				onChange={profileChanged}
				placeholder='Address'
			/>
			<FormInput
				id='zipCode'
				label='Zip Code'
				type='text'
				name='zipcode'
				value={zipcode}
				onChange={profileChanged}
				placeholder='Zip Code'
			/>
			<hr />
			<FormInput
				id='phone1'
				label='Phone 1'
				type='text'
				name='phone1'
				value={phone1}
				onChange={profileChanged}
				placeholder='Your Phone Number'
			/>
			<FormInput
				id='phone2'
				label='Phone 2'
				type='text'
				name='phone2'
				value={phone2}
				onChange={profileChanged}
				placeholder='Your Phone Number'
			/>
			<hr />
			<div className='actions'>
				<a href="#" className='update-button' onClick={handleSave}>Save Changes</a>
			</div>
			<div className={error ? 'error-msg' : 'success-msg'}>
				{message.update}
			</div>
			<hr />
			<div className='actions left'>
				<span className='chpwd-button' onClick={toggleShow}>
					Change Password&nbsp;&gt;
				</span>
			</div>
			{showpwd && (
				<>
					<FormInput
						id='oldPwd'
						label='Old Password'
						type='password'
						name='oldpwd'
						value={oldpwd}
						onChange={profileChanged}
						placeholder='Old Password'
					/>
					<FormInput
						id='newPwd'
						label='New Password'
						type='password'
						name='newpwd'
						value={newpwd}
						onChange={profileChanged}
						placeholder='New Password'
					/>
					<FormInput
						id='confirmPwd'
						label='Confirm Password'
						type='password'
						name='confirmpwd'
						value={confirmpwd}
						onChange={profileChanged}
						placeholder='Confirm Password'
					/>
					<div className='wrapper'>
						<div className='flex-end' style={{width: '100%'}}>
							<a href="#" className='update-button' onClick={updatePassword}>Change Password</a>
						</div>
					</div>
					<div className={error ? 'error-msg' : 'success-msg'} style={{textAlign: 'left'}}>
						{message.reset}
					</div>
				</>
			)}
		</form>
	)
}

export default ProfileForm
