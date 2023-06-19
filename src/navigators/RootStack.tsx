import { NavigationContainer } from "@react-navigation/native";
import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, ScanQRScreen, SettingsScreen } from "../screens";
import { Palette } from "../themes";
import { Greeting, ScanQRButton } from "../components";
import { HomeIcon, MenuIcon, NotifIcon, SettingsIcon } from "../assets";

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
          headerStyle: {
            backgroundColor: Palette.background,
            height: 120,
          },
          headerTitle: () => (
            <Greeting mainText="Hey!👋" subText="Share your own experiences" />
          ),
          headerLeft: () => <MenuIcon />,
          headerRight: () => <NotifIcon />,

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
