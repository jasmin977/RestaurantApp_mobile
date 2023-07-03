import { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { IntroductionScreen } from '../../screens';

export type LikedRestaurantStackParamList = {
  IntroductionScreen: undefined;
};

const Stack = createStackNavigator<LikedRestaurantStackParamList>();

const IntroductionStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="IntroductionScreen">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="IntroductionScreen"
        component={IntroductionScreen}
      />
    </Stack.Navigator>
  );
};

export default IntroductionStack;
