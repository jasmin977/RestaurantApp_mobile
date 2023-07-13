import { FunctionComponent } from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen } from '../../screens';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  RegisterScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export type AuthStackProps = NativeStackScreenProps<AuthStackParamList>;

const AuthStack: FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
