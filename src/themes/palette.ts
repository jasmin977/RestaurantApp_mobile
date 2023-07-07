import Colors, { common, green, purple, red, yellow } from './colors';

const darkPalette = {
  primary: Colors.primary,
  success: green[500],
  warning: yellow[200],
  error: red[600],
  background: '#202128',
  card: '#2E2F36',
  onPrimary: common.white,
  onBackground: common.white,
  onCard: common.white,
  onError: common.white,
  black: common.black,

  white: common.white,
};

const lightPalette = {
  common: common,

  primary: Colors.primary,
  success: green[500],
  warning: yellow[200],
  error: red[600],
  background: common.white,
  card: '#F6F6F6',
  onPrimary: common.white,
  onBackground: common.black,
  onCard: common.black,
  onError: common.white,
  black: common.black,
  white: common.white,
};

export { lightPalette, darkPalette };
