import React from 'react'
import { useFormikContext } from 'formik';
import { Button } from '@mui/material';


function Submit({ children, ...rest }) {
  const { submitForm } = useFormikContext();

  const configSubmit = {
    onClick: () => submitForm(),
    ...rest,
  };

  
  return (
    <Button {...configSubmit}>{children}</Button>
  )
}

export default Submit;