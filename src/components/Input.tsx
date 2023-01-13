import React, { useState } from 'react';

import {
  Input as ChakraInput,
  Text,
  InputGroup,
  InputRightAddon,
  InputLeftAddon,
  useStyleConfig,
  InputRightElement,
} from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';
import { FormikTouched } from 'formik';
import { omit } from 'lodash';

type Props = InputProps & {
  justify?: string;
  width?: string | number;
  label: string;
  error?: string | string[];
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  mask?: any;
  maskChar?: any;
  beforeMaskedStateChange?: any;
  beforeMaskedValueChange?: () => any;
  leftAddon?: any;
  rightAddon?: any;
  groupAddonStyle?: any;
};

const Field = (props: Props) => {
  const {
    id,
    name,
    type,
    value,
    onChange = () => null,
    placeholder,
    label = '',
    error,
    touched = false,
    leftAddon = '',
    rightAddon = '',
    ...inputPropsMain
  } = props;
  const [show, setShow] = useState(false);

  const styles = useStyleConfig('InputBasic', {});

  const inputProps = omit(inputPropsMain, 'maskChar');

  const isTypePassword = (type || '').toLowerCase() === 'password';

  const handleClick = () => setShow(!show);

  const showPassword = show ? 'text' : 'password';

  const componentInput = (
    <ChakraInput
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={styles}
      {...inputProps}
      type={isTypePassword ? showPassword : type}
    />
  );

  return (
    <>
      <Text variant='labelInput' as='span' width='100%'>
        {label}
      </Text>
      {rightAddon || leftAddon || isTypePassword ? (
        <InputGroup variant='inputDefault'>
          {!isTypePassword && (
            <>
              {leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
              {componentInput}
              {rightAddon && (
                <InputRightAddon style={{ border: '0', padding: '0' }}>
                  {' '}
                  {rightAddon}{' '}
                </InputRightAddon>
              )}
            </>
          )}
          {!!isTypePassword && (
            <>
              {componentInput}
              <InputRightElement p='14px 12px 14px 0px' margin='auto' height='auto' width='auto'>
                <Text
                  as='span'
                  cursor='pointer'
                  color='riverBed'
                  fontSize='12px'
                  fontWeight='normal'
                  onClick={handleClick}
                >
                  {show ? 'Ocultar' : 'Mostrar'}
                </Text>
              </InputRightElement>
            </>
          )}

          {touched && error && (
            <Text as='span' position='absolute' bottom='-16px' color='red'>
              {error}
            </Text>
          )}
        </InputGroup>
      ) : (
        <>
          {componentInput}
          {touched && error && (
            <Text as='span' position='absolute' bottom='-16px' color='red'>
              {error}
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default Field;
