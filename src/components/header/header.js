import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../store/action-types';

const Header = () => {
	const userName = useSelector((state) => state.email);
	const userID = useSelector((state) => state.id);

	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch({ type: LOGOUT });
	};

	return (
		<AppBar className='cg-header-appbar' position='static'>
			<Toolbar>
				<Typography className='cg-header-logo' variant='h6'>
					Easy Delivery
				</Typography>
				{userName && (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Typography className='cg-header-name' variant='h5'>
							{userID}
						</Typography>
						<Button color='inherit' onClick={onLogout}>
							Logout
						</Button>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
