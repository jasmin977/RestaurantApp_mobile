import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import React, { FunctionComponent, useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen, NotificationsScreen, ScanQRScreen } from '../screens';
import { HomeIcon, LocationIcon, NotifIcon, SaveIcon } from '../assets';
import { ScanQRButton } from '../components/common';
import { useTheme } from '../hooks';
import { RNIcon } from '../components/themed';
import { Restaurant } from '../entities';
import {
  HomeStack,
  HomeStackParamList,
  IntroductionStack,
  LikedRestaurantStackParamList,
  NotificationStackParamList,
  RestaurantStackParamList,
  SavedRestaurantStack,
  SavedRestaurantStackParamList,
} from './stacks';
import { InitialContext } from '../context';
import ScanStack, { ScanStackParamList } from './stacks/Scan';

export type RootBottomStackParamList = {
  Feed: NavigatorScreenParams<HomeStackParamList>;
  RestaurantStack: NavigatorScreenParams<RestaurantStackParamList>;
  Map: undefined;
  Saved: NavigatorScreenParams<SavedRestaurantStackParamList>;
  Liked: NavigatorScreenParams<LikedRestaurantStackParamList>;
  Notifications: NavigatorScreenParams<NotificationStackParamList>;
  Settings: undefined;
  logout: undefined;
  Profile: undefined;
  ScanQR: NavigatorScreenParams<ScanStackParamList>;
  RestaurantProfile: { id: number };
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
          height: 90,
        },
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <RNIcon outline={!focused} color="onBackground" as={<HomeIcon outline={focused} />} />
          ),
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <RNIcon
              outline={!focused}
              color="onBackground"
              as={<LocationIcon outline={!focused} />}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ScanQR"
        component={ScanStack}
        options={{
          //   tabBarStyle: { display: 'none' },
          headerShown: false,
          tabBarIcon: ({ focused }) => <ScanQRButton />,
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedRestaurantStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <RNIcon outline={!focused} color="onBackground" as={<SaveIcon />} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <RNIcon outline={!focused} color="onBackground" as={<NotifIcon />} />
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
