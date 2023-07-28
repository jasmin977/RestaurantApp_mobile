import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Box } from '../../../../components/themed';
import { AVATAR } from '../../../../assets';
import { RootNavigationProps } from '../../../../navigators/ROUTES';

interface HeaderComponentProps {
  toggleDrawer: () => void;
  rootNavigation: RootNavigationProps['navigation'];
}

const HeaderComponent = ({ toggleDrawer, rootNavigation }: HeaderComponentProps) => {
  return (
    <Box
      bg="background"
      direction="horizontal"
      justifyContent="space-between"
      spacing={{ px: 20, py: 10 }}
    >
      {/*  <RNButton
      size="sm"
      color="card"
      centerIcon={<RNIcon as={<MenuIcon />} outline color="onBackground" size={25} />}
      onPress={toggleDrawer}
    /> */}
      <Box />
      <TouchableOpacity activeOpacity={0.8} onPress={() => rootNavigation.navigate('Profile')}>
        <Image source={AVATAR} style={{ width: 45, height: 45, borderRadius: 12 }} />
      </TouchableOpacity>
    </Box>
  );
};

export default HeaderComponent;
