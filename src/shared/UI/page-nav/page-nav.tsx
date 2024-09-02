import { useEffect, useState } from 'react';
import ArrowLeft from '../../../assets/icons/arrowLeft';
import ArrowLeftFill from '../../../assets/icons/arrowLeftFill';
import ArrowRight from '../../../assets/icons/arrowRight';
import ArrowRightFill from '../../../assets/icons/arrowRightFill';
import { doGetApiMethod } from '../../../api/services/axios-service/axios-service';

interface IPageNavPropsModel {
	urlPageApi: string;
	perPage: number;
	cssClass: string;
	page: number;
	setPage: (val: number) => void;
	setIsChange: (val: boolean) => void;
}

export default function PageNav({ urlPageApi, perPage, cssClass, setPage, page, setIsChange }: IPageNavPropsModel) {
	const [pages, setPages] = useState<number>(0);
	const [overR, setOverR] = useState<boolean>(false);
	const [overL, setOverL] = useState<boolean>(false);

	useEffect(() => {
		doApi();
	}, []);

	const doApi = async () => {
		const resp = await doGetApiMethod(urlPageApi);
		const totalPages = Math.ceil(resp.data.count / perPage);
		setPages(totalPages);
	};

	return (
		<div className={cssClass}>
			<span
				className='flex font-bold text-gray-500 cursor-pointer'
				onMouseOver={() => setOverL(true)}
				onMouseLeave={() => setOverL(false)}
				onClick={() => {
					page <= 1 ? setPage(pages) : setPage(page - 1);
					setIsChange(true);
				}}
			>
				{overL ? (
					<ArrowLeftFill color='gray' className='hover:shadow' width={'32'} height={'32'} />
				) : (
					<ArrowLeft color='gray' className='hover:shadow' width={'32'} height={'32'} />
				)}
				Prev
			</span>
			<span
				className='flex font-bold text-gray-500 cursor-pointer'
				onMouseOver={() => setOverR(true)}
				onMouseLeave={() => setOverR(false)}
				onClick={() => {
					page >= pages ? setPage(1) : setPage(page + 1);
					setIsChange(true);
				}}
			>
				Next
				{overR ? (
					<ArrowRightFill color='gray' className='hover:shadow' width={'32'} height={'32'} />
				) : (
					<ArrowRight color='gray' className='hover:shadow' width={'32'} height={'32'} />
				)}
			</span>
		</div>
	);
}
