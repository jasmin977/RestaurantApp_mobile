import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  FunctionComponent,
  ReactElement,
} from 'react';
import { View, Text, TouchableOpacity, Animated, FlatList, ViewStyle } from 'react-native';
import { Box, RNIcon, RNText } from '../components/themed';
import {
  AVATAR,
  ClockIcon,
  CloseIcon,
  HomeIcon,
  LikeIcon,
  LogoutIcon,
  MenuIcon,
  NotifIcon,
  SaveIcon,
  SettingsIcon,
} from '../assets';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAppState, useTheme } from '../context';
import { styled } from 'styled-components/native';

import { useAuth } from '../context';

import { RootNavigationProps } from './ROUTES';
import { TabNavigationProps } from './stacks/BotoomTab';
import AuthenticationService from '../service/Authentication';
import UserCache from '../cache/userCache';

interface DrawerProp {
  children: ReactNode;
}

const Drawer: FunctionComponent<DrawerProp> = ({ children }) => {
  const { isDrawerOpen, setIsDrawerOpen } = useAppState();
  const { theme } = useTheme();
  const { setUser } = useAuth();

  const moveToRight = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const rootNavigation = useNavigation<RootNavigationProps['navigation']>();

  const tabNavigation = useNavigation<TabNavigationProps['navigation']>();

  useEffect(() => {
    toggleDrawer();
  }, [isDrawerOpen]);
  const logout = () => {
    UserCache.clearUserData();
    setUser(null);
  };

  const toggleDrawer = () => {
    Animated.timing(scale, {
      toValue: !isDrawerOpen ? 1 : 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(moveToRight, {
      toValue: !isDrawerOpen ? 0 : 230,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const ProfileImage = styled.Image`
    width: 65px;
    height: 65px;
    border-radius: 20px;
  `;

  interface DrawerItemProp {
    id: string;
    label: string;
    icon: ReactNode;
  }

  const logoutItem: DrawerItemProp = {
    id: 'logout',
    label: 'Logout',
    icon: <LogoutIcon outline />,
  };
  const drawerData: DrawerItemProp[] = [
    { id: 'Feed', label: 'Home', icon: <HomeIcon outline={false} /> },
    { id: 'Notifications', label: 'Notifications', icon: <NotifIcon outline /> },
    { id: 'Saved', label: 'Saved', icon: <SaveIcon /> },
    { id: 'LikedRestaurants', label: 'My Favorites', icon: <LikeIcon outline /> },
    { id: 'Settings', label: 'Settings', icon: <SettingsIcon outline /> },
  ];

  const handleDrawerItemPress = (screenName: string) => {
    if (screenName === 'Notifications' || screenName === 'Feed' || screenName === 'Saved') {
      tabNavigation.navigate(screenName);
    } else if (
      screenName === 'Settings' ||
      screenName === 'Profile' ||
      screenName === 'LikedRestaurants'
    ) {
      rootNavigation.push(screenName);
    }
  };
  const renderDrawerItem = ({ item }: { item: DrawerItemProp }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          paddingVertical: 10,
        }}
        onPress={() => {
          handleDrawerItemPress(item.id);
          setIsDrawerOpen(!isDrawerOpen);
        }}
      >
        <RNIcon as={item.icon} outline color="white" size={25} />

        <RNText color="white" variant="body">
          {item.label}
        </RNText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.primary,
          paddingHorizontal: 30,
          paddingTop: 50,
          gap: 10,
        }}
      >
        {/** close drawer */}
        <TouchableOpacity style={{}} onPress={() => setIsDrawerOpen(!isDrawerOpen)}>
          <RNIcon as={<CloseIcon />} outline color="white" size={40} />
        </TouchableOpacity>

        {/** profile */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
          }}
          activeOpacity={0.5}
          onPress={() => {
            handleDrawerItemPress('Profile');
            setIsDrawerOpen(!isDrawerOpen);
          }}
        >
          <ProfileImage resizeMode="cover" source={AVATAR} />
          <View>
            <RNText color="white" variant="h5">
              jasmin
            </RNText>
            <RNText color="white" variant="caption">
              view your profile
            </RNText>
          </View>
        </TouchableOpacity>

        {/** drawer items */}
        <FlatList
          data={drawerData}
          renderItem={renderDrawerItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 16,
            gap: 10,
          }}
        />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            paddingHorizontal: 50,

            position: 'absolute',
            bottom: 30,
          }}
          onPress={logout}
        >
          <RNIcon as={logoutItem.icon} outline color="white" size={25} />

          <RNText color="white" variant="body">
            {logoutItem.label}
          </RNText>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,

          backgroundColor: theme.colors.background,
          transform: [{ scale: scale }, { translateX: moveToRight }],
          borderRadius: isDrawerOpen ? 15 : 0,
        }}
      >
        {/*  <TouchableOpacity
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            zIndex: 1,
            backgroundColor: theme.colors.card,
            borderRadius: 10,
            padding: 5,
          }}
          onPress={() => toggleDrawer()}
        >
          <RNIcon as={<MenuIcon />} outline color="onBackground" size={25} />
        </TouchableOpacity>
 */}
        {children}
      </Animated.View>
    </View>
  );
};

export default Drawer;
