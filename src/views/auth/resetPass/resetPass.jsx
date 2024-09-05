import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Wrapper } from '../../../assets/styles/wrappers/registerPage';
import { onRegisterShow } from '../../../redux/features/toggleSlice';
import { doApiMethod } from '../../../api/services/axios-service/axios-service';
import { errorHandler, successHandler } from '../../../util/functions';
import PopUPModel from '../../../shared/UI/popup/popUpModel';
import LoadingButton from '../../../shared/components/spinner-button/spinnerButton';

const ResetPass = () => {
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);
	const { id, resetString } = useParams();
	const nav = useNavigate();
	const regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/;
	let {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSub = async (_dataBody) => {
		setLoad(true);
		delete _dataBody.password2;
		const requestData = {
			userId: id,
			resetString,
			newPassword: _dataBody.password,
		};
		try {
			const url = '/users/resetPassword';
			const { data } = await doApiMethod(url, 'POST', requestData);
			if (data.status === 'Success') {
				successHandler(data.msg);
				nav('/');
			} else errorHandler(data.msg);
			dispatch(onRegisterShow());
			setLoad(false);
		} catch (err) {
			setLoad(false);
			errorHandler(err.response.data.msg);
		}
	};
	return (
		<PopUPModel>
			<h1 className='text-center text-5xl my-6 m-0'>Password Reset</h1>
			<Wrapper className='mb-3'>
				<div className='right w-full md:w-2/3'>
					<form onSubmit={handleSubmit(onSub)}>
						<div className='flex flex-wrap -mx-3 mb-2'>
							<div className='w-full px-3'>
								<label>Password</label>
								{/* password input */}
								<input
									{...register('password', {
										required: true,
										minLength: 6,
										maxLength: 25,
										pattern: regPassword,
									})}
									type='password'
									placeholder='******************'
								/>
								{errors.password && (
									<small>Please fill out valid password (Upper/Lowercase , Number ,Special characters)</small>
								)}
							</div>
							<div className='w-full px-3'>
								<label>Confirm Password</label>
								{/* password recheck input */}
								<input
									{...register('password2', {
										required: true,
										validate: (value) => {
											return value === getValues('password');
										},
									})}
									type='password'
									placeholder='******************'
								/>
								{errors.password2 && <small>Password dont match.</small>}
							</div>
						</div>
						<Button>
							<LoadingButton isLoading={load}>Change Password</LoadingButton>
						</Button>
					</form>
				</div>
			</Wrapper>
		</PopUPModel>
	);
};

export default ResetPass;
