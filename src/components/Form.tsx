import { chakra } from '@chakra-ui/react';

const Form = chakra('form', {
  baseStyle: {
    display: 'flex',
    flexDir: 'column',
    alignItems: 'flex-start',
  },
});

export default Form;
