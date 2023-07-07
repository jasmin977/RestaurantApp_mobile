import React, { useState, useRef, useEffect, ReactNode, FunctionComponent } from 'react';
import { View, Text, TouchableOpacity, Animated, FlatList, ViewStyle } from 'react-native';
import { RNIcon, RNText } from '../components/themed';
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
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks';
import { styled } from 'styled-components/native';
import { RootBottomStackParamList } from './RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from './stacks';

interface DrawerProp {
  children: ReactNode;
}

export type RootNavigationProps = NativeStackScreenProps<RootBottomStackParamList>;
const Drawer: FunctionComponent<DrawerProp> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const moveToRight = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  type NavigationProps = NativeStackScreenProps<HomeStackParamList>;

  const navigation = useNavigation<RootNavigationProps['navigation']>();

  const HomeNavigation = useNavigation<NavigationProps['navigation']>();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: isOpen
        ? { display: 'none' }
        : { backgroundColor: theme.colors.background, height: 90 },
    });
  }, [isOpen]);

  const toggleDrawer = () => {
    Animated.timing(scale, {
      toValue: isOpen ? 1 : 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(moveToRight, {
      toValue: isOpen ? 0 : 230,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const ProfileImage = styled.Image`
    width: 65px;
    height: 65px;
    border-radius: 20px;
  `;

  const ProfileContainer = styled.TouchableOpacity`
    flex-direction: row;
    gap: 7px;
    align-items: center;
  `;

  interface DrawerItemProp {
    id: keyof RootBottomStackParamList;
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
    { id: 'Liked', label: 'My Favorites', icon: <LikeIcon outline /> },
    { id: 'Settings', label: 'Settings', icon: <SettingsIcon outline /> },
  ];

  const handleDrawerItemPress = (screenName: keyof RootBottomStackParamList) => {
    if (screenName === 'Saved') {
      navigation.navigate('Saved', { screen: 'SavedRestaurants' });
    }
    if (screenName === 'Liked') {
      HomeNavigation.navigate('LikedSatck', { screen: 'LikedRestaurants' });
    }
    if (screenName === 'Feed') {
      navigation.navigate('Feed', { screen: 'Home' });
    }
    if (screenName === 'Notifications') {
      navigation.navigate('Notifications', { screen: 'NotificationsScreen' });
    }
    if (screenName === 'Settings') {
      HomeNavigation.navigate('Settings');
    }
    if (screenName === 'Profile') {
      HomeNavigation.navigate('Profile');
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
          toggleDrawer();
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
        <TouchableOpacity style={{}} onPress={toggleDrawer}>
          <RNIcon as={<CloseIcon />} outline color="white" size={40} />
        </TouchableOpacity>

        {/** profile */}
        <ProfileContainer
          activeOpacity={0.5}
          onPress={() => {
            handleDrawerItemPress('Profile');
            toggleDrawer();
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
        </ProfileContainer>

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
          onPress={toggleDrawer}
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
          borderRadius: isOpen ? 15 : 0,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 20,
              zIndex: 1,
            }}
            onPress={toggleDrawer}
          >
            <RNIcon as={<MenuIcon />} outline color="onBackground" size={30} />
          </TouchableOpacity>

          {/* Pass toggleDrawer as a prop to children */}
          {React.Children.map(children, child =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, { toggleDrawer })
              : child
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default Drawer;
