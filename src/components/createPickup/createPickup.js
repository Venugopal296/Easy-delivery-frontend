import { Button, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPackagePickup } from '../../store/action-creators';
import FormControlInput from '../formControlInput/formControlInput';

import './createPickup.css';

const CreatePickup = () => {
	const userId = useSelector((state) => state.id);
	const [pickupLocation, setPickupLocation] = useState('');
	const [dropLocation, setDropLocation] = useState('');

	const dispatch = useDispatch();

	const createPickup = () => {
		if (pickupLocation.trim().length === 0 || dropLocation.trim().length === 0) {
			alert('Please enter pickup & drop adress');
			return;
		}
		dispatch(createPackagePickup(userId, pickupLocation, dropLocation));
		setPickupLocation('');
		setDropLocation('');
	};

	return (
		<div className='cg-pickup-box'>
			<Paper className='cg-pickup-paper' elevation={3}>
				<FormControlInput
					classname='cg-pickup-formcontrol'
					htmlForValue='pickupPlace'
					labelValue='Pickup Place'
					inputType='text'
					inputValue={pickupLocation}
					inputHandler={(e) => setPickupLocation(e.target.value)}
				/>

				<FormControlInput
					classname='cg-pickup-formcontrol'
					htmlForValue='dropPlace'
					labelValue='Drop Place'
					inputType='text'
					inputValue={dropLocation}
					inputHandler={(e) => setDropLocation(e.target.value)}
				/>

				<Button variant='contained' color='primary' onClick={createPickup}>
					Create
				</Button>
			</Paper>
		</div>
	);
};

export default CreatePickup;
