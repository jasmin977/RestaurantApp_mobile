import { FunctionComponent } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import { IntroductionScreen } from '../../screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type onBoardingStackParamList = {
  IntroductionScreen: undefined;
};

const Stack = createStackNavigator<onBoardingStackParamList>();

const OnBoardingStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="IntroductionScreen">
      <Stack.Screen
        options={{
          ...TransitionPresets.ModalTransition,
          headerShown: false,
        }}
        name="IntroductionScreen"
        component={IntroductionScreen}
      />
    </Stack.Navigator>
  );
};

export default OnBoardingStack;
