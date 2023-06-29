import { common, green, red, yellow } from './colors';

const darkPalette = {
  common: common,
  primary: '#FF9900',
  secondary: '#FCCC4F',
  info: red[600],
  success: green[500],
  warning: yellow[200],
  error: red[600],
  background: '#202128',
  surface: '#2E2F36',
  onPrimary: common.white,
  onSecondary: common.black,
  onBackground: common.white,
  onSurface: common.white,
  onError: common.white,
};

const lightPalette = {
  common: common,
  primary: red[600],
  secondary: '#FCCC4F',
  info: red[600],
  success: green[500],
  warning: yellow[200],
  error: red[600],
  background: common.white,
  surface: '#F6F6F6',
  onPrimary: common.white,
  onSecondary: common.black,
  onBackground: common.white,
  onSurface: common.black,
  onError: common.white,
};

export { lightPalette, darkPalette };
