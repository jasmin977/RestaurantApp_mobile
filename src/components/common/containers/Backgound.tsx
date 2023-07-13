import React, { FunctionComponent, ReactNode } from 'react';
import { Dimensions, StatusBar, View } from 'react-native';
import { useTheme } from '../../../context';

import { Box } from '../../themed';

interface IProps {
  children: ReactNode;
}

const BackgoundContainer: FunctionComponent<IProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </View>
  );
};

export default BackgoundContainer;

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeigh = Dimensions.get('screen').height;
