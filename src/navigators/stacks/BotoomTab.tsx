import React, { FunctionComponent } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  MapScreen,
  NotificationsScreen,
  SavedRestaurantsScreen,
  ScanQRScreen,
} from '../../screens';
import { HomeIcon, LocationIcon, NotifIcon, SaveIcon } from '../../assets';
import { ScanQRButton } from '../../components/common';
import { useTheme } from '../../context';
import { RNIcon } from '../../components/themed';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Drawer from '../Drawer';

export type RootBottomStackParamList = {
  Feed: undefined;
  Map: undefined;
  Saved: undefined;
  Notifications: undefined;
  ScanQR: undefined;
};

export type TabNavigationProps = NativeStackScreenProps<RootBottomStackParamList>;

const Tab = createBottomTabNavigator<RootBottomStackParamList>();

const TabStack: FunctionComponent = () => {
  const { theme } = useTheme();
  return (
    <Drawer>
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
          component={HomeScreen}
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
          component={ScanQRScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => <ScanQRButton />,
          }}
        />

        <Tab.Screen
          name="Saved"
          component={SavedRestaurantsScreen}
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
    </Drawer>
  );
};
export default TabStack;
