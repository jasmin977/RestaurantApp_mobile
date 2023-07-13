import React from 'react';
import {
  BackgoundContainer,
  CenteredView,
  Greeting,
  RestaurantItem,
} from '../../components/common';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';
import { RootNavigationProps } from '../../navigators/RootStack';
import AnimatedHeader from '../../components/layout/AnimatedHeader&list';
import { styled } from 'styled-components/native';
import { FilterIcon, MenuIcon, SearchIcon } from '../../assets';
import { Carousel } from '../../components/layout';
import { RESTAURANTS } from '../../data';
import { StatusBar } from 'react-native';
import { useAuth } from '../../context';

interface NotificationsProps {}

const HeaderComp = () => {
  const { user } = useAuth();
  return (
    <Box bg="background">
      <Box
        w={'100%'}
        gap={10}
        direction="horizontal"
        justifyContent="flex-start"
        spacing={{ px: 20 }}
      >
        <RNIcon outline size={30} as={<MenuIcon />} />
        <Box alignItems="flex-start" spacing={{ pb: StatusBar.currentHeight, pt: 20 }}>
          <RNText color="onBackground" variant="h4">
            Hey {user?.username}!👋
          </RNText>
          <RNText color="onBackground" variant="caption">
            Share your own experiences
          </RNText>
        </Box>
      </Box>
      <Box direction="horizontal" spacing={{ px: 20, py: 10 }} gap={10}>
        <Box
          flex={1}
          bg="card"
          h={'100%'}
          justifyContent="flex-start"
          spacing={{ px: 10 }}
          rounded={8}
          direction="horizontal"
          gap={5}
        >
          <RNIcon outline as={<SearchIcon />} color="primary" />
          <RNText>search for restaurants</RNText>
        </Box>
        <RNButton
          size="sm"
          centerIcon={<RNIcon as={<FilterIcon />} outline={true} color="white" />}
          onPress={() => console.log('filter button pressed')}
        />
      </Box>
    </Box>
  );
};
const Notifications = ({ navigation }: RootNavigationProps) => {
  return (
    <BackgoundContainer>
      <AnimatedHeader
        header={<HeaderComp />}
        ListHeaderComponent={<Carousel data={RESTAURANTS} />}
      />
    </BackgoundContainer>
  );
};

export default Notifications;
