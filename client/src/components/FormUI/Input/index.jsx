import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

function Input({ name, ...otherProps }) {
    const [field, meta] = useField(name);

    const inputConfig = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined',

    }

    if (meta && meta.touched && meta.error) {
        inputConfig.error = true;
        inputConfig.helperText = meta.error;
    }

    return (
        <TextField {...inputConfig} />
    )
}

export default Input;