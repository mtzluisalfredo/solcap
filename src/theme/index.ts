import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import colors from './colors';
import { variantsButtons, variantsTexts } from './variants';
import { styleInputBasic } from './variants/input';

const breakpoints = createBreakpoints({
  sm: '32em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

const themeSolidus = extendTheme({
  colors,
  breakpoints,
  styles: {
    global: () => ({
      span: {
        lineHeight: 'initial',
      },
      p: {
        lineHeight: 'initial',
      },
      body: {
        backgroundColor: 'mirage',
      },
    }),
  },

  components: {
    Text: {
      variants: variantsTexts,
    },
    Button: {
      variants: variantsButtons,
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          boxShadow: 'none',
        },
      },
    },
    InputBasic: {
      baseStyle: () => ({
        ...styleInputBasic,
      }),
    },
    Drawer: {
      sizes: {
        '2md': {
          dialog: { maxW: '397px' },
        },
      },
    },
    PinInput: {
      sizes: {
        mds: {
          borderRadius: 4,
          borderStyle: 'solid',
          borderWidth: 1,
          width: 46,
          height: 46,
        },
      },
    },
  },
  fontConfig: {
    DMSerifDisplay: {
      500: {
        normal: 'DMSerifDisplay-Regular',
        italic: 'DMSerifDisplay-Italic',
      },
    },
    Lato: {
      100: {
        normal: 'Lato-Thin',
        italic: 'Lato-ThinItalic',
      },
      300: {
        normal: 'Lato-Light',
        italic: 'Lato-LightItalic',
      },
      400: {
        normal: 'Lato-Regular',
        italic: 'Lato-Italic',
      },
      700: {
        normal: 'Lato-Bold',
        italic: 'Lato-BoldItalic',
      },
      900: {
        normal: 'Lato-Black',
        italic: 'Lato-BlackItalic',
      },
    },
  },
  fonts: {
    heading: 'DM Serif Display',
    body: 'Lato',
  },
});

export default themeSolidus;
