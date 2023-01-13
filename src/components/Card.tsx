import { ReactNode } from 'react';

import { Box } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';

function Card({ children, ...props }: BoxProps & { children: ReactNode }) {
  return (
    <Box borderRadius={{ base: '8px' }} bg='white' {...props}>
      {children}
    </Box>
  );
}

export default Card;
