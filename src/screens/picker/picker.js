import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import openSocket from 'socket.io-client';
import StatusIndicator from '../../components/statusIndicator/statusIndicator';
import { fetchPickerOrders, updateOrderStatus } from '../../store/action-creators';
import { FETCH_PICKER_ORDERS } from '../../store/action-types';
import { getDateTime } from '../../utilities/utilities';

import './picker.css';

const Picker = () => {
	const packageList = useSelector((state) => state.packageList);
	const userId = useSelector((state) => state.id);
	const dispatch = useDispatch();

	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		document.title = 'Picker Home Page';
	}, []);

	useEffect(() => {
		const socket = openSocket('http://localhost:5000');
		socket.on('order', (data) => {
			dispatch({
				type: FETCH_PICKER_ORDERS,
				payload: {
					orders: data.orders,
				},
			});
		});
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchPickerOrders());
	}, [dispatch]);

	useEffect(() => {
		if (errorMsg.length > 0) {
			setTimeout(() => {
				setErrorMsg('');
			}, 5000);
		}
	}, [errorMsg]);

	const updateOrder = (user, id, status) => {
		dispatch(updateOrderStatus(user, id, status, userId))
			.then((res) => {})
			.catch((error) => {
				setErrorMsg(error.response.data.message);
			});
	};

	return (
		<div className='cg-picker-box'>
			<StatusIndicator />
			{errorMsg.length > 0 && (
				<Alert style={{ marginBottom: 15 }} severity='warning'>
					{errorMsg}
				</Alert>
			)}
			{packageList.length > 0 ? (
				packageList.map((row) => {
					const idClassName =
						row.status === 'New' ? 'cg-id-blue' : row.status === 'Picked' ? 'cg-id-yellow' : 'cg-id-green';
					return (
						<Card className={`cg-card ${idClassName}`}>
							<CardContent className='cg-card-content'>
								<Typography align='center' color='textSecondary'>
									Package ID
								</Typography>
								<Typography align='center' variant='body2' component='p'>
									{row.id}
								</Typography>
							</CardContent>
							<CardContent className='cg-card-content-box'>
								<CardContent className='cg-card-content'>
									<Typography align='center' color='textSecondary'>
										Pickup Place
									</Typography>
									<Typography align='center' variant='body2' component='p'>
										{row.pickupLocation}
									</Typography>
								</CardContent>
								<CardContent className='cg-card-content'>
									<Typography align='center' color='textSecondary'>
										Drop Place
									</Typography>
									<Typography align='center' variant='body2' component='p'>
										{row.dropLocation}
									</Typography>
								</CardContent>
							</CardContent>
							<CardContent className='cg-card-content-box'>
								<CardContent className='cg-card-content'>
									<Typography align='center' color='textSecondary'>
										Picked Date
									</Typography>
									<Typography align='center' variant='body2' component='p'>
										{row.pickedDate === '' ? '-' : getDateTime(row.pickedDate)}
									</Typography>
								</CardContent>
								<CardContent className='cg-card-content'>
									<Typography align='center' color='textSecondary'>
										Delivered Date
									</Typography>
									<Typography align='center' variant='body2' component='p'>
										{row.deliveredDate === '' ? '-' : getDateTime(row.deliveredDate)}
									</Typography>
								</CardContent>
							</CardContent>
							<CardActions className='cg-card-content cg-card-btn'>
								<Button
									variant='contained'
									disabled={row.status !== 'New'}
									size='small'
									color='primary'
									onClick={() => updateOrder(row.user, row.id, 'Picked')}
								>
									Pick up
								</Button>
								<Button
									variant='contained'
									size='small'
									disabled={row.status === 'New' || row.status === 'Delivered' || row.pickerId !== userId}
									color='primary'
									onClick={() => updateOrder(row.user, row.id, 'Delivered')}
								>
									Delivered
								</Button>
							</CardActions>
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

export default Picker;
