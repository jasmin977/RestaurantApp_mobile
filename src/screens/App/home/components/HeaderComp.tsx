import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Box, RNButton, RNIcon } from '../../../../components/themed';
import { AVATAR, MenuIcon } from '../../../../assets';
import { RootNavigationProps } from '../../../../navigators/ROUTES';
import { useAppState, useAuth } from '../../../../context';
import { MenuButton } from '../../../../components/common';

interface HeaderComponentProps {
  rootNavigation: RootNavigationProps['navigation'];
}

const HeaderComponent = ({ rootNavigation }: HeaderComponentProps) => {
  const { user } = useAuth();
  const { isDrawerOpen, setIsDrawerOpen } = useAppState();

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
        <Image
          source={user?.profileImg ? { uri: user.profileImg } : AVATAR}
          style={{ width: 45, height: 45, borderRadius: 12 }}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default HeaderComponent;
