import { Animated, FlatList, View } from 'react-native';
import { BackgoundContainer, CenteredView } from '../components/common';

import { Box, RNText } from '../components/themed';

import { RootBottomStackParamList } from '../navigators/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

interface NotificationsProps {}

type Props = NativeStackScreenProps<RootBottomStackParamList, 'Notifications'>;
const Notifications = ({ navigation }: Props) => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <Box
          onPress={() =>
            navigation.navigate('RestaurantStack', {
              screen: 'RestaurantProfile',
              params: {
                id: 1,
              },
            })
          }
        >
          <RNText color="onBackground" variant="h4">
            NOTIFICATION
          </RNText>
        </Box>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Notifications;
