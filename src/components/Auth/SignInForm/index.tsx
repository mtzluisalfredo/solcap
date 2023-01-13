import { Text, Box, Flex, Button } from '@chakra-ui/react';
import { FormikProps } from 'formik';

import { Form, Input, Link } from '../../';

export interface SignInFormValuesType {
  email: string;
  password: string;
}

function SignInForm({
  formik,
  loading,
  error,
}: {
  error?: any;
  loading: boolean;
  formik: FormikProps<SignInFormValuesType>;
}) {
  return (
    <Form onSubmit={formik.handleSubmit} height='full'>
      <Flex justifyContent={{ base: 'space-between' }} flexDirection='column' flex='1' width='100%'>
        <Box>
          <Text marginBottom={{ base: '24px' }} color='mirage' variant='title'>
            Inicio de Sesión
          </Text>
          <Input
            id='email'
            name='email'
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            label='Correo Electrónico:'
            placeholder='Correo Electrónico'
            error={formik.errors.email}
            touched={formik.touched.email}
            marginBottom={{ base: '24px' }}
          />
          <Input
            id='password'
            name='password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            label='Contraseña:'
            placeholder='Contraseña'
            error={formik.errors.password}
            touched={formik.touched.password}
            marginBottom={{ base: '16px' }}
          />
          <Link href='/password-recovery'>¿Olvidó su Contraseña?</Link>
          {!!error && <Text color='red'>{error}</Text>}
        </Box>
        <Button isLoading={loading} isDisabled={loading} variant='primary' type='submit'>
          Iniciar Sesión
        </Button>
      </Flex>
    </Form>
  );
}

export default SignInForm;
