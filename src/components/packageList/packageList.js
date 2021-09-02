import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PackageItem from '../packageItem/packageItem';

const PackageList = () => {
	const userOrders = useSelector((state) => state.userOrders);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		setOrders(userOrders);
	}, [userOrders]);

	return <PackageItem list={orders} />;
};

export default PackageList;
