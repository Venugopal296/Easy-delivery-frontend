import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
	CREATE_PICKUP,
	FETCH_USER_ORDERS,
	LOGIN,
	FETCH_PICKER_ORDERS,
} from './action-types';

export const login = (userName, password, customerType) => {
	const payload = { email: userName, password, customerType };
	return (dispatch) => {
		return axios
			.post('http://localhost:5000/api/users/login', payload)
			.then((res) => {
				dispatch({
					type: LOGIN,
					payload: {
						id: res.data.id,
						email: userName,
						isSender: customerType === 'sender' ? true : false,
						userOrders: [],
						packageList: [],
					},
				});
			})
			.catch((err) => {
				throw err;
			});
	};
};

export const createPackagePickup = (user, pickupLocation, dropLocation) => {
	const payload = { user, id: uuidv4(), pickupLocation, dropLocation };
	return (dispatch) => {
		return axios
			.post('http://localhost:5000/api/sender/createOrder', payload)
			.then(({ data }) => {
				dispatch({
					type: CREATE_PICKUP,
					payload: {
						orders: data.orders,
					},
				});
			})
			.catch((err) => {
				console.log('FAILED', err);
			});
	};
};

export const fetchUserOrders = (user) => {
	return (dispatch) => {
		return axios
			.get('http://localhost:5000/api/sender/fetchOrder?id=' + user)
			.then(({ data }) => {
				dispatch({
					type: FETCH_USER_ORDERS,
					payload: {
						orders: data.orders,
					},
				});
			})
			.catch((err) => {
				console.log('FAILED');
			});
	};
};

export const fetchPickerOrders = () => {
	return (dispatch) => {
		return axios
			.get('http://localhost:5000/api/picker/fetchOrder')
			.then(({ data }) => {
				dispatch({
					type: FETCH_PICKER_ORDERS,
					payload: {
						orders: data.orders,
					},
				});
			})
			.catch((err) => {
				console.log('FAILED');
			});
	};
};

export const updateOrderStatus = (user, id, status, pickerId) => {
	const payload = { user, id, status, pickerId };
	return (dispatch) => {
		return axios
			.post('http://localhost:5000/api/picker/updateOrder', payload)
			.then(({ data }) => {
				dispatch({
					type: FETCH_PICKER_ORDERS,
					payload: {
						orders: data.orders,
					},
				});
			})
			.catch((err) => {
				throw err;
			});
	};
};
