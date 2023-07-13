import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack, { FirstAuthStack } from './stacks/Auth';
import { TabStack } from './RootStack';
import { useAuth } from '../context';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../context';
import RootStack from './ROUTES';

const Root: FunctionComponent = props => {
  const { user, isInitialized, isLoading } = useAuth();
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
      {!isInitialized ? <FirstAuthStack /> : user ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Root;
