import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import React from 'react';

const FormControlInput = ({ classname, htmlForValue, labelValue, inputType, inputValue, inputHandler }) => {
	return (
		<FormControl fullWidth className={classname} variant='filled'>
			<InputLabel htmlFor={htmlForValue}>{labelValue}</InputLabel>
			<OutlinedInput
				name={htmlForValue}
				type={inputType}
				id='standard-adornment-amount'
				value={inputValue}
				onChange={inputHandler}
			/>
		</FormControl>
	);
};

export default FormControlInput;
