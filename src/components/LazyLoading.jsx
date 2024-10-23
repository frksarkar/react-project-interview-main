import React from 'react';

const Loading = ({ text = 'Loading...' }) => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
			<p className="text-blue-500 text-xl font-semibold">{text}</p>
		</div>
	);
};

export default Loading;
