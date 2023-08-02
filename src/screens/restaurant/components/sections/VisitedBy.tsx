import { View, Text } from 'react-native';
import React from 'react';
import { Avatar, AvatarGroup, Box, RNText } from '../../../../components/themed';
import { ScreenWidth } from '../../../../components/common/containers/Backgound';

const VisitedBy = () => {
  return (
    <Box w={ScreenWidth} h={250} justifyContent="center">
      <Box direction="horizontal" gap={10}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
          <RNText spacing={{ px: 10, py: 2 }} variant="caption" color="white">
            Friends were here
          </RNText>
        </View>
        <AvatarGroup size={25} max={3}>
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default VisitedBy;
