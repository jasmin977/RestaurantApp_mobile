import { FunctionComponent } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import { NavigatorScreenParams } from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  RestaurantStack,
  RestaurantStackParamList,
  RootBottomStackParamList,
  TabStack,
} from './stacks';

import {
  EditProfile,
  LikedRestaurantsScreen,
  ProfileScreen,
  SearchScreen,
  SettingsScreen,
} from '../screens';

export type RootStackParamList = {
  TabStack: NavigatorScreenParams<RootBottomStackParamList>;
  RestaurantStack: NavigatorScreenParams<RestaurantStackParamList>;
  Settings: undefined;
  LikedRestaurants: undefined;
  Profile?: { id: number | undefined };
  EditProfile: undefined;
  Search: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export type RootNavigationProps = NativeStackScreenProps<RootStackParamList>;
const RootStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="TabStack">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TabStack"
        component={TabStack}
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
        name="Settings"
        component={SettingsScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
        name="LikedRestaurants"
        component={LikedRestaurantsScreen}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          ...TransitionPresets.ModalTransition,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
