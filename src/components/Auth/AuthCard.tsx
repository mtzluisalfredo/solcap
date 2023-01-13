import { BoxProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

import Card from '../Card';

function AuthCard({ children, ...styleProps }: { children: ReactNode } & BoxProps) {
  return (
    <Card
      marginY={{ base: '70px' }}
      padding={{ base: '58px' }}
      maxWidth='420px'
      width={{ base: '100%' }}
      marginX='auto'
      height={{ base: '748px' }}
      borderRadius={{ base: '4px' }}
      {...styleProps}
    >
      {children}
    </Card>
  );
}

export default AuthCard;
