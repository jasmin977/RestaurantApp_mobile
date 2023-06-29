import { styled } from 'styled-components/native';
import React, { FunctionComponent, ReactNode } from 'react';

import { Dimensions } from 'react-native';
import { useTheme } from '../../../hooks';

const StyledBackgoundContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding-top: 10px;
  padding-bottom: 20px;
`;

interface IProps {
  children: ReactNode;
}

const BackgoundContainer: FunctionComponent<IProps> = ({ children }) => {
  const { theme } = useTheme();

  return <StyledBackgoundContainer theme={theme}>{children}</StyledBackgoundContainer>;
};

export default BackgoundContainer;

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeigh = Dimensions.get('screen').height;
