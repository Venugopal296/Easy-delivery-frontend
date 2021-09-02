import React, { useEffect, useState } from 'react';
import {
	Button,
	CircularProgress,
	FormControlLabel,
	makeStyles,
	Paper,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { login } from '../../store/action-creators';
import { blue } from '@material-ui/core/colors';

import './login.css';
import FormControlInput from '../../components/formControlInput/formControlInput';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
		display: 'flex',
		width: '100%',
	},
	buttonProgress: {
		color: blue[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

const Login = () => {
	const classes = useStyles();
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [customerType, setCustomerType] = useState('sender');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = 'Easy Delivery - Login'
	}, [])

	const onLoginSubmit = () => {
		if (userName.trim().length === 0 || password.trim().length === 0) {
			alert('Enter both Username and Password!');
			return;
		}
		setIsLoading(true);
		dispatch(login(userName, password, customerType))
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				setErrorMessage(error.response.data.message);
				setIsLoading(false);
			});
	};

	const handleChange = (event) => {
		setCustomerType(event.target.value);
	};

	return (
		<div className='cg-login-box'>
			<Paper className='cg-paper' elevation={3}>
				<FormControlInput
					classname='cg-formcontrol'
					htmlForValue='email'
					labelValue='User Name'
					inputType='email'
					inputValue={userName}
					inputHandler={(e) => setUserName(e.target.value)}
				/>

				<FormControlInput
					classname='cg-formcontrol'
					htmlForValue='password'
					labelValue='Password'
					inputType='password'
					inputValue={password}
					inputHandler={(e) => setPassword(e.target.value)}
				/>

				<RadioGroup row aria-label='Customer Type' name='customer' value={customerType} onChange={handleChange}>
					<FormControlLabel value='sender' control={<Radio />} label='Sender' />
					<FormControlLabel value='picker' control={<Radio />} label='Picker' />
				</RadioGroup>

				<div className={classes.wrapper}>
					<Button id='cg-button' variant='contained' color='primary' disabled={isLoading} onClick={onLoginSubmit}>
						LOGIN
						{isLoading && <CircularProgress size={24} disableShrink className={classes.buttonProgress} />}
					</Button>
				</div>
				{errorMessage && (
					<div>
						<Typography style={{color: 'red'}}>{errorMessage}</Typography>
					</div>
				)}
			</Paper>
		</div>
	);
};

export default Login;
