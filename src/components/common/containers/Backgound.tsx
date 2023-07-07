import { styled } from 'styled-components/native';
import React, { FunctionComponent, ReactNode } from 'react';

import { Dimensions, StatusBar } from 'react-native';
import { useTheme } from '../../../hooks';

interface IProps {
  children: ReactNode;
}

const BackgoundContainer: FunctionComponent<IProps> = ({ children }) => {
  const { theme } = useTheme();

  const StyledBackgoundContainer = styled.View`
    flex: 1;
    padding-top: ${StatusBar.currentHeight}px;
    background-color: ${theme.colors.background};
  `;

  return <StyledBackgoundContainer>{children}</StyledBackgoundContainer>;
};

export default BackgoundContainer;

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeigh = Dimensions.get('screen').height;
