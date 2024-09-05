import React from 'react';
import { Link } from 'react-router-dom';
import ErrorPage from '../../assets/icons/errorPage';
/** page 404 */
const Page404 = () => {
	return (
		<div>
			<div className='flex align-center justify-center mb-0 md:mb-3'>
				<ErrorPage />
			</div>
			<div className='text-center'>
				<h1 className='text-blue-400 text-lg'>Page Not Found !!!</h1>
				<span>return to </span>
				<Link to={'/'} className='text-blue-400 hover:text-blue-700'>
					Home
				</Link>
			</div>
		</div>
	);
};

export default Page404;
