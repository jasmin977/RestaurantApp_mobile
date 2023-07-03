import { FunctionComponent } from 'react';
import {
  StackNavigationProp,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  HomeScreen,
  RestaurantCommentScreen,
  RestaurantProfileScreen,
  RestaurantReviewsScreen,
} from '../../screens';

import { Restaurant } from '../../entities';

import { useTheme } from '../../hooks';

export type RestaurantStackParamList = {
  RestaurantProfile: { restoData: Restaurant };
  RestaurantComments: undefined;
  RestaurantReviews: undefined;
};

export type RestaurantNavigationProps = StackNavigationProp<
  RestaurantStackParamList,
  'RestaurantProfile'
>;

const Stack = createStackNavigator<RestaurantStackParamList>();

const RestaurantStack: FunctionComponent = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator initialRouteName="RestaurantProfile">
      <Stack.Screen
        name="RestaurantProfile"
        component={RestaurantProfileScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen name="RestaurantComments" component={RestaurantCommentScreen} />
      <Stack.Screen name="RestaurantReviews" component={RestaurantReviewsScreen} />
    </Stack.Navigator>
  );
};

export default RestaurantStack;
