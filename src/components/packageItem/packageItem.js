import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { getDateTime } from '../../utilities/utilities';

import './packageItem.css';

const PackageItem = ({ list }) => {
	return (
		<div className='cg-card-box'>
			{list.length > 0 ? (
				list.map((row) => {
					const idClassName =
						row.status === 'New' ? 'cg-id-blue' : row.status === 'Picked' ? 'cg-id-yellow' : 'cg-id-green';
					return (
						<Card className={`cg-card ${idClassName}`}>
							<CardContent className='cg-card-content'>
								<Typography color='textSecondary'>Package ID</Typography>
								<Typography variant='body2' component='p'>
									{row.id}
								</Typography>
							</CardContent>
							<CardContent className='cg-card-content-box'>
								<CardContent className='cg-card-content'>
									<Typography color='textSecondary'>Picked Place</Typography>
									<Typography align="center" variant='body2' component='p'>
										{row.pickupLocation}
									</Typography>
								</CardContent>
								<CardContent className='cg-card-content'>
									<Typography color='textSecondary'>Drop Place</Typography>
									<Typography align="center" variant='body2' component='p'>
										{row.dropLocation}
									</Typography>
								</CardContent>
							</CardContent>
							<CardContent className='cg-card-content-box'>
								<CardContent className='cg-card-content'>
									<Typography color='textSecondary'>Picked Date</Typography>
									<Typography align="center" variant='body2' component='p'>
										{row.pickedDate === '' ? '-' : getDateTime(row.pickedDate)}
									</Typography>
								</CardContent>
								<CardContent className='cg-card-content'>
									<Typography color='textSecondary'>Delivered Date</Typography>
									<Typography align="center" variant='body2' component='p'>
										{row.deliveredDate === '' ? '-' : getDateTime(row.deliveredDate)}
									</Typography>
								</CardContent>
							</CardContent>
							<CardContent className='cg-card-content'>
								<Typography color='textSecondary'>Status</Typography>
								<Typography align="center" variant='body2' component='p'>
									{row.status}
								</Typography>
							</CardContent>
						</Card>
					);
				})
			) : (
				<Card className='cg-card'>
					<CardContent>
						<Typography align='center' color='textSecondary' gutterBottom>
							No Order Created!
						</Typography>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default PackageItem;
