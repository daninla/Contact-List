import * as Yup from 'yup';

const phoneRegExp = /^\+*\d{1,4}[\d()-]+$/;

export const contactValidationSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  phone: Yup.string()
    .trim()
    .matches(phoneRegExp, 'Invalid phone number')
    .required('Phone is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
});
