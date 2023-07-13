import { FunctionComponent } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import { IntroductionScreen, LoginScreen, RegisterScreen } from '../../screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  RegisterScreen: undefined;
  LoginScreen: undefined;
};
export type FirstAuthStackParamList = {
  IntroductionScreen: undefined;
  RegisterScreen: undefined;
  LoginScreen: undefined;
};

const A_Stack = createStackNavigator<AuthStackParamList>();
const F_A_Stack = createStackNavigator<FirstAuthStackParamList>();

export type AuthStackProps = NativeStackScreenProps<FirstAuthStackParamList>;

const AuthStack: FunctionComponent = () => {
  return (
    <A_Stack.Navigator initialRouteName="LoginScreen">
      <A_Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <A_Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </A_Stack.Navigator>
  );
};

export default AuthStack;

export const FirstAuthStack: FunctionComponent = () => {
  return (
    <F_A_Stack.Navigator initialRouteName="IntroductionScreen">
      <F_A_Stack.Screen
        options={{
          ...TransitionPresets.ModalTransition,
          headerShown: false,
        }}
        name="IntroductionScreen"
        component={IntroductionScreen}
      />
      <F_A_Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <F_A_Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </F_A_Stack.Navigator>
  );
};
