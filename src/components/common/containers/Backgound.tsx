import { styled } from 'styled-components/native';
import React, { FunctionComponent, ReactNode } from 'react';

import { Dimensions, StatusBar } from 'react-native';
import { useTheme } from '../../../context';
import Colors from '../../../themes/colors';
import { darkPalette, lightPalette } from '../../../themes';

interface IProps {
  children: ReactNode;
}

const StyledBackgoundContainer = styled.View`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  background-color: ${darkPalette.background};
`;

const BackgoundContainer: FunctionComponent<IProps> = ({ children }) => {
  return <StyledBackgoundContainer>{children}</StyledBackgoundContainer>;
};

export default BackgoundContainer;

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeigh = Dimensions.get('screen').height;
