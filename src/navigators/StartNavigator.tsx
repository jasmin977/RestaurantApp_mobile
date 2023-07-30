import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppState, useAuth } from '../context';
import RootStack from './ROUTES';
import { AuthStack, OnBoardingStack } from './stacks';

const Root: FunctionComponent = props => {
  const { user } = useAuth();
  const { isInitialized } = useAppState();

  return (
    <NavigationContainer>
      {!isInitialized ? <OnBoardingStack /> : user ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Root;
