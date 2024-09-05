import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../shared/components/sideBar';
import SideBarChat from '../../shared/components/sideBarChat/sideBarChat';
import Footer from './components/footer/footer';
import Header from './components/header';
import LoadingSideBar from '../../shared/components/loadingComponents/loadingSideBar/loadingSideBar';

const Layout = () => {
	let { user } = useSelector((state) => state.userSlice);
	const { loading } = useSelector((state) => state.postsSlice);
	return (
		<React.Fragment>
			<Header />
			<div className='bg-gray-100 flex'>
				<div className={`hidden ${user ? 'xl:w-2/12 xl:flex' : 'lg:w-3/12 lg:flex'}`}>
					{loading ? <LoadingSideBar barsCount={3} /> : <Sidebar />}
				</div>
				<div className={`bg-gray-100 w-full ${user ? 'lg:w-9/12 xl:w-8/12' : 'lg:w-9/12'}`}>
					<Outlet />
				</div>
				{user && (
					<div className='hidden lg:flex lg:w-3/12 xl:w-2/12'>
						<SideBarChat />
					</div>
				)}
			</div>
			<Footer className='mt-5' />
		</React.Fragment>
	);
};

export default Layout;
