import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useReviewContext, useTheme } from '../../../context';
import { RootNavigationProps } from '../../../navigators/ROUTES';
import { StatusBar } from 'expo-status-bar';

import { BackgoundContainer, FlatlistFooter, ReviewCard } from '../../../components/common';

import HeaderComponent from './components/HeaderComp';
import ListHeaderComponent from './components/ListHeaderComp';
import { Review } from '../../../entities';

import { RestaurantService, ReviewService } from '../../../service';
import usePaginationPrimitive from '../../../hooks/usePaginationPrimitive';
import { RNText, Box } from '../../../components/themed';
import CenteredContainer from '../../../components/common/containers/Centered';
import { COLORS } from '../../../themes';

const Home = () => {
  const { reviews, setReviews } = useReviewContext();
  const {
    isLoading: reviewIsLoading,
    loadPage: loadReviewPage,
    noMoreData,
  } = usePaginationPrimitive<Review>(ReviewService.useFetchReviewByPage, reviews, setReviews);

  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = RestaurantService.useFetchRestaurants();
  const rootNavigation = useNavigation<RootNavigationProps['navigation']>();
  const { isDarkTheme } = useTheme();
  const hasrestaurantData = !!restaurantData?.data;

  if (!reviews || reviews.length === 0) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <ActivityIndicator color={COLORS.primary} size={'large'} />
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  return (
    <BackgoundContainer>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent rootNavigation={rootNavigation} />

        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: 20 }}
          ListHeaderComponent={
            restaurantLoading ? (
              <Box>
                <RNText>Loading resturants..</RNText>
              </Box>
            ) : hasrestaurantData ? (
              <ListHeaderComponent
                restaurantData={restaurantData.data}
                rootNavigation={rootNavigation}
              />
            ) : (
              <Box>
                <RNText>No resturants </RNText>
              </Box>
            )
          }
          data={reviews}
          onEndReached={noMoreData ? null : loadReviewPage}
          ListFooterComponent={
            noMoreData ? (
              <Box>
                <RNText>no more data to laod</RNText>
              </Box>
            ) : (
              <FlatlistFooter isLoading={reviewIsLoading} />
            )
          }
          onEndReachedThreshold={0}
          renderItem={({ item }: { item: Review }) => <ReviewCard {...item} />}
          keyExtractor={(item, index) => `HOME_${item.id}_${item.reviewedAt}_${index}`}
        />
      </SafeAreaView>
    </BackgoundContainer>
  );
};

export default Home;
