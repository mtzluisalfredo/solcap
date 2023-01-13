import * as Yup from 'yup';

export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('No password provided'),
});
