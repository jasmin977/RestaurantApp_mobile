import { NavigationContainer } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScanQRScreen, SettingsScreen } from '../screens';

import { HomeIcon, SaveIcon, SettingsIcon } from '../assets';
import RestaurantStack from './stacks/Restaurants';
import { ScanQRButton } from '../components/common';
import { useTheme } from '../hooks';
import { RNIcon } from '../components/themed';

export type RootBottomStackParamList = {
  Feed: undefined;
  Settings: undefined;
  ScanQR: undefined;
};

const Tab = createBottomTabNavigator<RootBottomStackParamList>();

const TabStack: FunctionComponent = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: 80,
        },
        tabBarInactiveTintColor: theme.colors.text,
        tabBarActiveTintColor: theme.colors.text,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={RestaurantStack}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
            height: 120,
          },

          tabBarIcon: ({ focused, size, color }) => (
            <RNIcon outline={!focused} color="white">
              <HomeIcon outline={focused} />
            </RNIcon>
          ),
        }}
      />

      <Tab.Screen
        name="ScanQR"
        component={ScanQRScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <ScanQRButton />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <RNIcon outline={!focused} color="white">
              <SaveIcon />
            </RNIcon>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const RootStack: FunctionComponent = props => {
  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  );
};

export default RootStack;
