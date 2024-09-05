import React, { useRef, useState } from 'react';
import Search from '../../../assets/icons/search';
import { Wrapper } from '../../../assets/styles/wrappers/userSearch';
import { onSearchToggle } from '../../../redux/features/toggleSlice';
import { doGetApiMethod } from '../../../api/services/axios-service/axios-service';
import { errorHandler } from '../../../util/functions';
import PopUPModel from '../../../shared/UI/popup/popUpModel';
import NotFoundItems from '../../../shared/components/notFoundItems/notFoundItems';
import UserCard from './components/userCard';

const UserSearch = () => {
	const inpRef = useRef();
	const [searchUsersAr, setSearchUsersAr] = useState([]);

	const serachUser = async () => {
		let searchQ = inpRef.current.value;
		if (!searchQ) {
			setSearchUsersAr([]);
			return;
		}
		const url = `/users/userSearch?s=${searchQ}`;
		try {
			const { data } = await doGetApiMethod(url);
			setSearchUsersAr(data);
		} catch (err) {
			errorHandler(err.response.data.msg);
		}
	};
	return (
		<PopUPModel action={onSearchToggle}>
			<Wrapper>
				<div className='search mt-6'>
					<div className='p-2 flex flex-col items-center '>
						{/* search likes */}
						<form className='px-3 py-2 w-full'>
							<div className='relative'>
								<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
									{/* search icon */}
									<Search color='#333' width='20' height='20' />
								</div>
								<input
									onChange={serachUser}
									ref={inpRef}
									type='search'
									id='default-search'
									className='block w-full py-3 px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
									placeholder='Search'
									required
								/>
							</div>
						</form>

						<ul className='dropdown w-full px-3 flex flex-col'>
							{searchUsersAr.length > 0 ? (
								searchUsersAr?.map((item) => {
									return <UserCard key={item._id} item={item} />;
								})
							) : (
								<NotFoundItems inputRef={inpRef.current?.value} />
							)}
						</ul>
					</div>
				</div>
			</Wrapper>
		</PopUPModel>
	);
};

export default UserSearch;
