import { FunctionComponent } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import { NotificationsScreen, SavedRestaurantsScreen } from '../../screens';
import { NavigatorScreenParams } from '@react-navigation/native';
import RestaurantStack, { RestaurantStackParamList } from './Restaurants';

export type NotificationStackParamList = {
  NotificationsScreen: undefined;
  RestaurantStack: NavigatorScreenParams<RestaurantStackParamList>;
};

const Stack = createStackNavigator<NotificationStackParamList>();

const NotificationStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="NotificationsScreen">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen
        name="RestaurantStack"
        component={RestaurantStack}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStack;
