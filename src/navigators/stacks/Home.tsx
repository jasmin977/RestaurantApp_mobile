import { FunctionComponent } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, ProfileScreen, SettingsScreen } from '../../screens';
import { NavigatorScreenParams } from '@react-navigation/native';
import RestaurantStack, { RestaurantStackParamList } from './Restaurants';
import SavedRestaurantStack, { SavedRestaurantStackParamList } from './Saved';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LikedRestaurantStack, { LikedRestaurantStackParamList } from './Liked';

export type HomeStackParamList = {
  Home: undefined;
  RestaurantStack: NavigatorScreenParams<RestaurantStackParamList>;
  LikedSatck: NavigatorScreenParams<LikedRestaurantStackParamList>;
  Settings: undefined;
  Profile: undefined;
};

export type HomeNavigationProps = NativeStackScreenProps<HomeStackParamList, 'RestaurantStack'>;

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="RestaurantStack"
        component={RestaurantStack}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="LikedSatck"
        component={LikedRestaurantStack}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
