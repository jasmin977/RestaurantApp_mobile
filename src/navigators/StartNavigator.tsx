import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppState, useAuth } from '../context';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../context';
import RootStack from './ROUTES';
import { AuthStack, OnBoardingStack } from './stacks';

const Root: FunctionComponent = props => {
  const { user } = useAuth();

  const { isInitialized } = useAppState();

  const { theme } = useTheme();

  return (
    <NavigationContainer>
      {!isInitialized ? <OnBoardingStack /> : user ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Root;
