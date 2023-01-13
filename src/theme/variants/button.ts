import { addAlpha } from '../../utils/ui';
import colors from '../colors';

export const variantsButtons = {
  primary: {
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    height: '51px',
    borderRadius: 4,
    bg: 'mirage',
    borderColor: 'mirage',
    color: 'white',
    width: { base: '100%' },
    _hover: {
      background: addAlpha(colors.mirage, 0.9),
      color: 'white',
      _disabled: {
        _hover: { background: 'mirage' },
      },
    },
    _disabled: {
      _hover: { background: 'mirage' },
    },
  },
  btnIcon: {
    width: 'auto',
    padding: 0,
    borderRadius: 2,
    backgroundColor: 'transparent',
    minWidth: 'auto',
    minHeight: 'auto',
    margin: 0,
    height: 'auto',
    _focus: {
      boxShadow: 'none',
      borderColor: 'transparent',
    },
    _hover: {
      backgroundColor: 'transparent',
    },
  },
  back: {
    height: { base: '51px' },
    borderWidth: 0,
    width: '51px',
    bg: 'gallery',
  },
};
