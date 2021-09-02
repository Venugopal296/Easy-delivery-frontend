import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import openSocket from 'socket.io-client';
import CreatePickup from '../../components/createPickup/createPickup';
import PackageList from '../../components/packageList/packageList';
import StatusIndicator from '../../components/statusIndicator/statusIndicator';
import { fetchUserOrders } from '../../store/action-creators';
import { FETCH_USER_ORDERS } from '../../store/action-types';

import './sender.css';

const Sender = () => {
	const userId = useSelector((state) => state.id);

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = 'Sender Home Page';
	}, []);

	useEffect(() => {
		const socket = openSocket('http://localhost:5000');
		socket.on('userOrder', (data) => {
			if (data.userID === userId) {
				dispatch({
					type: FETCH_USER_ORDERS,
					payload: {
						orders: data.orders,
					},
				});
			}
		});
	}, [dispatch, userId]);

	useEffect(() => {
		dispatch(fetchUserOrders(userId));
	}, [userId, dispatch]);

	return (
		<div className='cg-sender-box'>
			<CreatePickup />
			<StatusIndicator />
			<PackageList />
		</div>
	);
};

export default Sender;
