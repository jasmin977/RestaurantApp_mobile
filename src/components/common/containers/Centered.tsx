import { FunctionComponent, ReactNode } from 'react';
import { styled } from 'styled-components/native';

import { StyleProp, ViewStyle } from 'react-native';
export const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface ViewProps {
  viewStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const CenteredContainer: FunctionComponent<ViewProps> = ({ children, viewStyle }) => {
  return <Centered style={viewStyle}>{children}</Centered>;
};

export default CenteredContainer;
