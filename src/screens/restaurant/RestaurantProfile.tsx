import { styled } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useRef, useCallback } from 'react';
import assets, { LocationIcon, NextIcon } from '../../assets';
import { BackButton, BackgoundContainer } from '../../components/common';
import { AnimatdeHeader } from '../../components/layout';
import { useReviewContext, useTheme } from '../../context';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';
import { RestaurantStackParamList } from '../../navigators/stacks';
import { LocationMap, ReviewForm } from './components';
import { View, ScrollView } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { RestaurantService, ReviewService } from '../../service';

import CenteredContainer from '../../components/common/containers/Centered';
import LottieView from 'lottie-react-native';
import { scale, verticalScale } from '../../helpers';

import RestaurantDetails from './components/RestaurantDetails';
import RestaurantRatingAndReviews from './components/RestaurantRatingAndReviews';
type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantProfile'>;

const RestaurantProfileScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  // Fetch restaurant data and reviews data separately
  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = RestaurantService.useFetchRestaurantByID(id);
  const {
    data: reviwData,
    isLoading: reviwLoading,
    error: reviwError,
  } = ReviewService.useFetchReviewsByRestaurantId(id);
  const { reviewsByRestaurantId } = useReviewContext();

  const { theme } = useTheme();

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

  if (restaurantLoading || reviwLoading) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>loading..</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  if (restaurantError || reviwError) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>error..</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  // Check if the reviewsData and its data property exist
  // const hasReviewsData = !!reviewsData?.data;
  const hasrestaurantData = !!restaurantData?.data;

  if (!hasrestaurantData) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <BackButton onPress={() => navigation.goBack()} />
          <LottieView
            autoPlay
            loop
            style={{
              width: scale(100),
              height: verticalScale(100),
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
        backgroundImage={{ uri: restaurantData.data.img }}
        title={restaurantData.data.name}
        rightIcon={<Box />}
        leftIcon={<BackButton onPress={() => navigation.goBack()} />}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <RestaurantDetails data={restaurantData.data} navigation={navigation} />
            <RestaurantRatingAndReviews data={reviewsByRestaurantId} navigation={navigation} />
          </View>

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

            <RNText>{restaurantData.data.location}</RNText>
          </Box>
          <Box h={100}></Box>
        </ScrollView>
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
        <ReviewForm restaurant={restaurantData.data} handleSnapPress={handleSnapPress} />
      </BottomSheet>
    </View>
  );
};

export default RestaurantProfileScreen;
