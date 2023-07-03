import { FunctionComponent } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import { SavedRestaurantsScreen } from '../../screens';
import { NavigatorScreenParams } from '@react-navigation/native';
import RestaurantStack, { RestaurantStackParamList } from './Restaurants';

export type SavedRestaurantStackParamList = {
  SavedRestaurants: undefined;
  RestaurantStack: NavigatorScreenParams<RestaurantStackParamList>;
};

const Stack = createStackNavigator<SavedRestaurantStackParamList>();

const SavedRestaurantStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="SavedRestaurants">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SavedRestaurants"
        component={SavedRestaurantsScreen}
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

export default SavedRestaurantStack;
