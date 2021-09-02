import React from 'react';

import './statusIndicator.css';

const StatusIndicator = () => {
	return (
		<div className='cg-dot-container'>
			<div className='cg-dot-container cg-dot-box'>
				<div className='cg-dot cg-dot-blue'></div>
				New
			</div>
			<div className='cg-dot-container cg-dot-box'>
				<div className='cg-dot cg-dot-yellow'></div>
				Picked
			</div>
			<div className='cg-dot-container cg-dot-box'>
				<div className='cg-dot cg-dot-green'></div>
				Delivered
			</div>
		</div>
	);
};

export default StatusIndicator;
