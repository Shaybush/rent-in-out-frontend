import React from 'react';
import { Rings } from 'react-loader-spinner';

const Loader = ({ load = true, height, width, color = '#97aef8' }) => {
	return (
		<Rings
			height={height}
			width={width}
			color={color}
			radius='9'
			wrapperStyle={{}}
			wrapperclassName=''
			visible={load}
			ariaLabel='rings-loading'
		/>
	);
};

export default Loader;
