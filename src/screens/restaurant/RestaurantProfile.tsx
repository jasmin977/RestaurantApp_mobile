import { styled } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useMemo, useRef, useCallback } from 'react';
import assets, {
  BackIcon,
  ClockIcon,
  LocationIcon,
  NextIcon,
  UserIcon,
  peperoniPizza,
  rest_4,
} from '../../assets';

import { BackButton, BackgoundContainer, Review } from '../../components/common';
import { AnimatdeHeader } from '../../components/layout';
import { useTheme } from '../../context';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';

import { RestaurantStackParamList } from '../../navigators/stacks';

import {
  LikeButton,
  LocationMap,
  MenuSection,
  RatingStars,
  ReviewCard,
  ReviewForm,
  StarPercentage,
} from './components';
import { ImageSourcePropType, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { RestaurantService } from '../../service';

import CenteredContainer from '../../components/common/containers/Centered';
import LottieView from 'lottie-react-native';
type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantProfile'>;

const reviewData = [
  {
    id: 1,
    date: '2023-07-01',
    reviewedBy: 'Alice',
    description: 'I absolutely loved this product! Highly recommended.',
  },
  {
    id: 2,
    date: '2023-06-28',
    reviewedBy: 'Bob',
    description: 'Great quality and excellent customer service.',
  },
  {
    id: 3,
    date: '2023-06-30',
    reviewedBy: 'Charlie',
    description: 'The product exceeded my expectations. Well worth the price.',
    img: peperoniPizza,
  },
];
interface ReviewCardProps {
  id: number;
  date: string;
  reviewedBy: string;
  description?: string;
  img?: ImageSourcePropType;
}

const RestaurantProfileScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const { data, isLoading, error } = RestaurantService.useFetchRestaurantByID(id);

  const { theme, isDarkTheme } = useTheme();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const StyledScrollView = styled.ScrollView`
    background-color: ${theme.colors.background};
    flex: 1;
  `;

  if (isLoading) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>loading..</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }
  if (error) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>error..</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  if (!data.data) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNButton
            size="sm"
            style={{
              position: 'absolute',
              top: 40,
              left: 20,
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
            onPress={() => navigation.goBack()}
            centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
          />
          <LottieView
            autoPlay
            loop
            style={{
              width: 100,
              height: 100,
            }}
            source={assets.lottieFiles.SearchNotFound}
          />
          <RNText variant="body">Restaurant not found.</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AnimatdeHeader
        backgroundImage={data.data.img ? { uri: data.data.img } : rest_4}
        title={data.data.name}
        rightIcon={<Box />}
        leftIcon={<BackButton onPress={() => navigation.goBack()} />}
      >
        <StyledScrollView style={{ flex: 1 }}>
          {/** restaurant details */}
          <Box
            bg="background"
            spacing={{ p: 20 }}
            flex={1}
            gap={25}
            w={'100%'}
            alignItems="flex-start"
          >
            <Box flex={1} w={'100%'} direction="horizontal" justifyContent="space-between">
              <Box flex={1} alignItems="flex-start">
                <RNText variant="h3">{data.data.name}</RNText>
                <Box direction="horizontal" gap={5}>
                  <RNIcon outline as={<LocationIcon />} />

                  <RNText>{data.data.location}</RNText>
                </Box>
              </Box>
              <LikeButton />
            </Box>

            <Box alignItems="flex-start" onPress={() => navigation.navigate('RestaurantReviews')}>
              <Review rating={data.data.rating} detailled size={20} />
            </Box>
            <Box direction="horizontal" gap={10}>
              <RNIcon as={<ClockIcon />} outline color="primary" />

              <RNText variant="h5">Opened Now</RNText>
              <RNText>{data.data.workingTime}</RNText>
            </Box>
            <RNText>{data.data.description}</RNText>

            <MenuSection menu={data.data.menu} />
          </Box>
          {/** rating */}
          <Box
            bg="background"
            onPress={() => navigation.navigate('RestaurantReviews')}
            spacing={{ p: 20 }}
            alignItems="flex-start"
            direction="horizontal"
            justifyContent="space-between"
          >
            <RNText variant="subtitle">Review and ratings </RNText>
            <RNIcon outline={true} color="onBackground" as={<NextIcon />} />
          </Box>
          <Box w={'90%'} rounded={10} bg="card" spacing={{ p: 20, mx: 20 }}>
            <RatingStars rating={4} />
          </Box>
          <Box spacing={{ py: 20 }} direction="horizontal" gap={5}>
            <RNIcon outline size={20} as={<UserIcon />} />
            <RNText variant="caption">25 user ratings</RNText>
          </Box>
          <StarPercentage />

          <Box direction="vertical" spacing={{ my: 30 }}>
            {reviewData.map((item: ReviewCardProps) => (
              <ReviewCard key={`key_${item.id}`} {...item} />
            ))}
          </Box>

          {/** location */}
          <Box
            bg="background"
            spacing={{ p: 20 }}
            alignItems="flex-start"
            direction="horizontal"
            justifyContent="space-between"
          >
            <RNText variant="subtitle">Location</RNText>
            <RNIcon outline={true} color="onBackground" as={<NextIcon />} />
          </Box>
          <LocationMap id={id} />
          <Box direction="horizontal" gap={5} spacing={{ py: 20 }}>
            <RNIcon outline as={<LocationIcon />} />

            <RNText>{data.data.location}</RNText>
          </Box>
          <Box h={200}></Box>
        </StyledScrollView>
      </AnimatdeHeader>

      <Box
        spacing={{ p: 10 }}
        bg="background"
        style={{
          position: 'absolute',
          bottom: 0,

          left: 0,
          right: 0,
        }}
      >
        <RNButton
          onPress={() => handleSnapPress(1)}
          style={{ width: '100%' }}
          title="Leave a review"
        />
      </Box>

      <BottomSheet
        backgroundStyle={{ backgroundColor: theme.colors.card }}
        enablePanDownToClose
        enableOverDrag
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ReviewForm />
      </BottomSheet>
    </View>
  );
};

export default RestaurantProfileScreen;
