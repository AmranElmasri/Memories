import React from 'react';
import { Form, Formik } from 'formik';

function CustomForm({ initialValues, validationSchema, onSubmit, children }) {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form> {children} </Form>
    </Formik>
  )
}
export default CustomForm;