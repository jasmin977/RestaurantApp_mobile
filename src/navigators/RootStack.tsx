import { NavigationContainer } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScanQRScreen, SettingsScreen } from "../screens";
import { Palette } from "../themes";

import { HomeIcon, SettingsIcon } from "../assets";
import RestaurantStack from "./stacks/Restaurants";
import { ScanQRButton } from "../components/common";

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
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Palette.background,
          height: 80,
        },
        tabBarInactiveTintColor: Palette.text,
        tabBarActiveTintColor: Palette.text,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={RestaurantStack}
        options={{
          headerStyle: {
            backgroundColor: Palette.background,
            height: 120,
          },

          tabBarIcon: ({ focused, size, color }) => (
            <HomeIcon color={color} size={size} outline={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="ScanQR"
        component={ScanQRScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <ScanQRButton />,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
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
