import { FunctionComponent } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import { NavigatorScreenParams } from '@react-navigation/native';
import RestaurantStack, { RestaurantStackParamList } from './Restaurants';
import { ScanQRScreen } from '../../screens';

export type ScanStackParamList = {
  Scan: undefined;
  RestaurantStack: NavigatorScreenParams<RestaurantStackParamList>;
};

const Stack = createStackNavigator<ScanStackParamList>();

const ScanStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="Scan">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Scan"
        component={ScanQRScreen}
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

export default ScanStack;
