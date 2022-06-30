import * as Yup from 'yup';

const signupSchema = Yup.object({
    firstName: Yup.string().trim().max(8, 'FirstName should be at most 8 char').required('Required'),
    lastName: Yup.string().trim().max(8, 'LastName should be at most 8 char').required('Required'),
    email: Yup.string().trim().email('Invalid email.').required('Required'),
    password: Yup.string().trim().min(6, 'Password should be at least 8 char').required('Required'),
    confirmPassword: Yup.string().trim().oneOf([Yup.ref('password')], 'Passwords must match').required('Passwords must match'),
})

export default signupSchema;
