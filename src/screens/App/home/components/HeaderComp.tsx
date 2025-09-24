import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Avatar, Box, RNButton, RNIcon } from '../../../../components/themed';
import { AVATAR, MenuIcon } from '../../../../assets';
import { RootNavigationProps } from '../../../../navigators/ROUTES';
import { useAppState, useAuth } from '../../../../context';
import { MenuButton } from '../../../../components/common';
import { BASE_URL } from '../../../../CONSTANTS';

interface HeaderComponentProps {
  rootNavigation: RootNavigationProps['navigation'];
}

const HeaderComponent = ({ rootNavigation }: HeaderComponentProps) => {
  const { user } = useAuth();

  return (
    <Box
      bg="background"
      direction="horizontal"
      justifyContent="space-between"
      spacing={{ px: 20, py: 10 }}
    >
      <MenuButton />
      <Box />
      <TouchableOpacity activeOpacity={0.8} onPress={() => rootNavigation.navigate('Profile')}>
        <Avatar src={`http://${BASE_URL}:8000/storage/${user?.avatar}`} size={45} />
      </TouchableOpacity>
    </Box>
  );
};

export default HeaderComponent;
