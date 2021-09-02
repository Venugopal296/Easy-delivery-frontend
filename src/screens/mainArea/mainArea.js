import React from 'react';
import { useSelector } from 'react-redux';
import Login from '../login/login';
import Picker from '../picker/picker';
import Sender from '../sender/sender';

const MainArea = () => {
	const userName = useSelector((state) => state.email);
	const isSender = useSelector((state) => state.isSender);

	return <>{!userName ? <Login /> : isSender ? <Sender /> : <Picker />}</>;
};

export default MainArea;
