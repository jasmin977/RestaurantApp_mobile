import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppState, useAuth } from '../context';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../context';
import RootStack from './ROUTES';
import { AuthStack, OnBoardingStack } from './stacks';

const Root: FunctionComponent = props => {
  const { user, isLoading } = useAuth();
  console.log('🚀 ~ file: StartNavigator.tsx:11 ~ user:', user);
  const { isInitialized } = useAppState();

  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={theme.colors.primary}></ActivityIndicator>
      </View>
    );
  }
  return (
    <NavigationContainer>
      {!isInitialized ? <OnBoardingStack /> : user ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Root;
