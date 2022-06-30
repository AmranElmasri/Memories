import * as Yup from 'yup';


const signinSchema = Yup.object({
    email: Yup.string().trim().email('Invalid email.').required('Required'),
    password: Yup.string().trim().min(6, 'Password should be at least 6 char').required('Required'),
})

export default signinSchema;