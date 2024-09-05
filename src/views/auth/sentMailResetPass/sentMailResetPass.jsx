import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../assets/styles/wrappers/registerPage';
import { onLogout } from '../../../redux/features/toggleSlice';
import { doApiMethod } from '../../../api/services/axios-service/axios-service';
import { errorHandler, successHandler } from '../../../util/functions';
import { secret } from '../../../util/secrets';
import LoadingButton from '../../../shared/components/spinner-button/spinnerButton';

const SentMailResetPass = (props) => {
	const nav = useNavigate();
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);
	const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	let {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSub = async (_dataBody) => {
		setLoad(true);
		const requestData = {
			email: _dataBody.email,
			redirectUrl: `${secret.CLIENT_API_URL}/resetPassword`,
		};
		try {
			const url = '/users/requestPasswordReset';
			const { data } = await doApiMethod(url, 'POST', requestData);
			if (data.status === 'Pending') {
				successHandler('Reset request sent successfully please check your email');
				dispatch(onLogout());
				nav('/');
			} else if (data.status === 'failed') {
				errorHandler(data.message);
			}
			setLoad(false);
		} catch (err) {
			setLoad(false);
			errorHandler(err.response.data.msg);
		}
	};
	return (
		<div className='right w-full md:w-2/3'>
			<form onSubmit={handleSubmit(onSub)}>
				<div className='flex flex-wrap -mx-3 mb-2'>
					{/* email */}
					<div className='w-full px-3'>
						<label>Email</label>
						<input
							{...register('email', {
								required: true,
								minLength: 5,
								maxLength: 100,
								pattern: regEmail,
							})}
							type='email'
							placeholder='example@email.com'
						/>
						{errors.email && <small>Please fill valid email.</small>}
					</div>
				</div>
				<div className='flex flex-wrap -mx-3 mb-2'>
					{/* confirm email */}
					<div className='w-full px-3'>
						<label>Confirm Email</label>
						<input
							{...register('email2', {
								required: true,
								validate: (value) => {
									return value === getValues('email');
								},
							})}
							type='email'
							placeholder='example@email.com'
						/>
						{errors.email2 && <small>Email not match.</small>}
					</div>
				</div>
				{/* send password button submit */}
				<Button>
					<LoadingButton isLoading={load}>Send Password Reset Request</LoadingButton>
				</Button>
			</form>
			{/* navigate to sign in */}
			<span className='flex items-center justify-center'>
				Already a member ?
				<button
					type='button'
					onClick={() => {
						props.setState('signIn');
					}}
					className='ml-2 text-blue-400 hover:text-blue-700'
				>
					Login now
				</button>
			</span>
		</div>
	);
};

export default SentMailResetPass;
