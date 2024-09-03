import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { onLogout, onRegisterShow, onSearchToggle } from '../../../redux/features/toggleSlice';

//style
import { Wrapper } from '../../../assets/styles/wrappers/sideBar';

// icons import
import Dashboard from '../../../assets/icons/dashboard';
import Home from '../../../assets/icons/home';
import Notifications from '../../../assets/icons/notifications';
import Profile from '../../../assets/icons/profile';
import Search from '../../../assets/icons/search';
import SignOut from '../../../assets/icons/signOut';
import WishList from '../../../assets/icons/wishlist';
import { secret } from '../../../util/secrets';
import CircleBadge from '../circleBadge';
import { getLinks } from './sideBarProps';

const SideBar = () => {
	const dispatch = useDispatch();
	const { user, wishList } = useSelector((state) => state.userSlice);
	const isLogin = useSelector((state) => state.userSlice?.user !== null);
	const [selectedRoute, setSelectedRoute] = useState('');
	const [links] = useState(getLinks(user, isLogin, wishList));

	return (
		<Wrapper className='lg:w-2/12 z-10 p-1 top-16 -left-1 lg:fixed' aria-label='Sidebar'>
			<div className='overflow-y-auto py-4 mt-4 px-3 w-full bg-white shadow-xl rounded'>
				<ul className='space-y-2'>
					{links.map(({ to, component, text, secondComponent, spanClassName }) => {
						return (
							<Link
								className={`${selectedRoute === text && 'bg-gray-100'}`}
								key={text}
								onClick={text === 'Search' ? () => dispatch(onSearchToggle()) : () => setSelectedRoute(text)}
								to={to}
							>
								{component}
								<sapn className={spanClassName}>{text}</sapn>
								{secondComponent}
							</Link>
						);
					})}
				</ul>
				<ul className='pt-4 mt-4 space-y-2 border-t border-gray-200'>
					<li
						className='w-full p-2 rounded cursor-pointer'
						onClick={() => {
							if (isLogin) {
								localStorage.removeItem('token');
								window.open(secret.CLIENT_API_URL, '_self');
								dispatch(onLogout());
							} else {
								dispatch(onRegisterShow());
							}
						}}
					>
						<span className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100'>
							<SignOut />
							<span className='flex-1 ml-3'>{isLogin ? 'Sign Out' : 'Sign In'}</span>
						</span>
					</li>
				</ul>
			</div>
		</Wrapper>
	);
};

export default SideBar;
