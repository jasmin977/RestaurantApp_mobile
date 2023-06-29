import { FunctionComponent } from 'react';
import {
  StackNavigationProp,
  TransitionPresets,
  TransitionSpecs,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  HomeScreen,
  RestaurantCommentScreen,
  RestaurantProfileScreen,
  RestaurantReviewsScreen,
} from '../../screens';

import { MenuIcon, NotifIcon } from '../../assets';

import { Restaurant } from '../../entities';
import { Greeting } from '../../components/common';
import { useTheme } from '../../hooks';
import { RNIcon } from '../../components/themed';
import { View } from 'react-native';

export type RestaurantStackParamList = {
  Home: undefined;
  RestaurantProfile: { restoData: Restaurant };
  RestaurantComments: undefined;
  RestaurantReviews: undefined;
};

export type RestaurantNavigationProps = StackNavigationProp<
  RestaurantStackParamList,
  'RestaurantProfile'
>;

const Stack = createStackNavigator<RestaurantStackParamList>();

const customTransition = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const HeaderLeft = () => {
  return (
    <View style={{ paddingLeft: 20 }}>
      <RNIcon outline={true} color="white">
        <MenuIcon />
      </RNIcon>
    </View>
  );
};
const RestaurantStack: FunctionComponent = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.colors.background,
            height: 120,
          },

          headerTitle: () => <Greeting mainText="Hey!👋" subText="Share your own experiences" />,
          headerLeft: () => <HeaderLeft />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="RestaurantProfile"
        component={RestaurantProfileScreen}
        options={{
          title: 'Profile',
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
