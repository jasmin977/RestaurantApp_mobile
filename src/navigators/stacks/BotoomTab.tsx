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
import { useAppState, useTheme } from '../../context';
import { Box, RNIcon, RNText } from '../../components/themed';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Drawer from '../Drawer';
import { moderateVerticalScale, verticalScale } from '../../helpers';
import { View } from 'react-native';
import { NotificationService } from '../../service';

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
  const { data: unreadnotifications, isLoading } = NotificationService.useFetchUnreadNotifcations();
  const { unreadNotif, setunreadNotif } = useAppState();

  return (
    <Drawer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            height: verticalScale(80),
          },
        }}
      >
        <Tab.Screen
          name="Feed"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <RNIcon color={focused ? 'primary' : 'grey.400'} as={<HomeIcon />} />
            ),
          }}
        />

        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ focused }) => (
              <RNIcon
                color={focused ? 'primary' : 'grey.400'}
                as={<LocationIcon outline={false} />}
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
              <RNIcon color={focused ? 'primary' : 'grey.400'} as={<SaveIcon />} />
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View>
                <RNIcon color={focused ? 'primary' : 'grey.400'} as={<NotifIcon />} />
                {unreadNotif != 0 && (
                  <Box
                    alignItems="center"
                    justifyContent="center"
                    bg="primary"
                    rounded={50}
                    w={20}
                    h={20}
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: -5,
                      borderColor: theme.colors.card,
                      borderWidth: 1,
                    }}
                  >
                    <RNText variant="caption" color="onPrimary">
                      {unreadNotif}
                    </RNText>
                  </Box>
                )}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </Drawer>
  );
};
export default TabStack;
