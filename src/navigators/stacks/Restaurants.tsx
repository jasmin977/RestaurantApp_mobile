import { FunctionComponent } from "react";
import {
  StackNavigationProp,
  TransitionPresets,
  TransitionSpecs,
  createStackNavigator,
} from "@react-navigation/stack";

import {
  HomeScreen,
  RestaurantCommentScreen,
  RestaurantProfileScreen,
  RestaurantReviewsScreen,
} from "../../screens";

import { MenuIcon, NotifIcon } from "../../assets";
import { Colors } from "../../themes";

import { Restaurant } from "../../entities";
import { Greeting } from "../../components/common";

export type RestaurantStackParamList = {
  Home: undefined;
  RestaurantProfile: { restoData: Restaurant };
  RestaurantComments: undefined;
  RestaurantReviews: undefined;
};

export type RestaurantNavigationProps = StackNavigationProp<
  RestaurantStackParamList,
  "RestaurantProfile"
>;

const Stack = createStackNavigator<RestaurantStackParamList>();

const customTransition = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const RestaurantStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: Colors.BackgroundColor,
            height: 120,
          },

          headerTitle: () => (
            <Greeting mainText="Hey!👋" subText="Share your own experiences" />
          ),
          headerLeft: () => <MenuIcon />,
          headerRight: () => <NotifIcon />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="RestaurantProfile"
        component={RestaurantProfileScreen}
        options={{
          title: "Profile",
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RestaurantComments"
        component={RestaurantCommentScreen}
      />
      <Stack.Screen
        name="RestaurantReviews"
        component={RestaurantReviewsScreen}
      />
    </Stack.Navigator>
  );
};

export default RestaurantStack;
