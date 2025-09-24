import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppState, useAuth } from '../context';
import RootStack from './ROUTES';
import { AuthStack, OnBoardingStack } from './stacks';
import { enableFreeze } from 'react-native-screens';

const Root: FunctionComponent = props => {
  const { user, token } = useAuth();
  const { isInitialized } = useAppState();
  enableFreeze();
  return (
    <NavigationContainer>
      {!isInitialized ? <OnBoardingStack /> : user && token ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Root;
