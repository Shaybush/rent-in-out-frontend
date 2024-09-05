interface ICircleBadgePropsModel {
	count?: number;
}

const CircleBadge = ({ count = 0 }: ICircleBadgePropsModel) => {
	return (
		<aside className='inline-flex text-primary-color-text bg-primary-color-background text-sm rounded-full h-3 w-3 p-3 justify-center items-center font-light'>
			{count}
		</aside>
	);
};

export default CircleBadge;
