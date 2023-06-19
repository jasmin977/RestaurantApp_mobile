import { NavigationContainer } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ScanQRScreen, SettingsScreen } from "../screens";
import { Palette } from "../themes";
import { ScanQRButton } from "../components";
import { HomeIcon, SettingsIcon } from "../assets";

export type RootBottomStackParamList = {
  Feed: undefined;
  Settings: undefined;
  ScanQR: undefined;
};

const Tab = createBottomTabNavigator<RootBottomStackParamList>();

const TabStack: FunctionComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,

        tabBarShowLabel: false,

        tabBarStyle: {
          elevation: 5,
          bottom: 20,
          backgroundColor: Palette.surafce,
          height: 80,
          marginHorizontal: 20,
          borderRadius: 10,
          position: "absolute",
        },
        tabBarInactiveTintColor: Palette.text,
        tabBarActiveTintColor: Palette.text,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <HomeIcon color={color} size={size} outline={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="ScanQR"
        component={ScanQRScreen}
        options={{
          tabBarIcon: ({ focused }) => <ScanQRButton />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => <SettingsIcon />,
        }}
      />
    </Tab.Navigator>
  );
};
const RootStack: FunctionComponent = (props) => {
  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  );
};

export default RootStack;
