import { FunctionComponent } from 'react';
import {
  StackNavigationProp,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  AddReviewScreen,
  RestaurantCommentScreen,
  RestaurantProfileScreen,
  RestaurantReviewsScreen,
} from '../../screens';

import { useTheme } from '../../hooks';

export type RestaurantStackParamList = {
  RestaurantProfile: { id: number };
  RestaurantComments: undefined;
  RestaurantReviews: undefined;
  AddReview: undefined;
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
        options={({ route }) => ({
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,

          tabBarStyle: { display: 'none' },
        })}
      />
      <Stack.Screen
        name="RestaurantComments"
        component={RestaurantCommentScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RestaurantReviews"
        component={RestaurantReviewsScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,

          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddReview"
        component={AddReviewScreen}
        options={{
          ...TransitionPresets.ModalSlideFromBottomIOS,

          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantStack;
