import {
	LOGIN,
	CREATE_PICKUP,
	LOGOUT,
	FETCH_USER_ORDERS,
	FETCH_PICKER_ORDERS,
} from './action-types';

const initialState = {
	id: '',
	email: '',
	isSender: false,
	userOrders: [],
	packageList: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				id: action.payload.id,
				email: action.payload.email,
				isSender: action.payload.isSender,
				userOrders: action.payload.userOrders,
				packageList: action.payload.packageList,
			};

		case LOGOUT:
			return { ...initialState };

		case CREATE_PICKUP:
			return {...state, userOrders: action.payload.orders};

		case FETCH_USER_ORDERS:
			return { ...state, userOrders: action.payload.orders };

		case FETCH_PICKER_ORDERS:
			return { ...state, packageList: action.payload.orders };

		default:
			return state;
	}
};

export default reducer;
