import { FunctionComponent } from 'react';
import {
  StackNavigationProp,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import { LikedRestaurantsScreen } from '../../screens';
import { NavigatorScreenParams } from '@react-navigation/native';
import RestaurantStack, { RestaurantStackParamList } from './Restaurants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type LikedRestaurantStackParamList = {
  LikedRestaurants: undefined;
  RestaurantStack: NavigatorScreenParams<RestaurantStackParamList>;
};

export type LikedRestaurantNavigationProps = NativeStackScreenProps<
  LikedRestaurantStackParamList,
  'LikedRestaurants'
>;

const Stack = createStackNavigator<LikedRestaurantStackParamList>();

const LikedRestaurantStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="LikedRestaurants">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LikedRestaurants"
        component={LikedRestaurantsScreen}
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

export default LikedRestaurantStack;
