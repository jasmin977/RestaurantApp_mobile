import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth, useTheme } from '../../../context';
import { RootNavigationProps } from '../../../navigators/ROUTES';
import { StatusBar } from 'expo-status-bar';

import { BackgoundContainer, ReviewCard } from '../../../components/common';

import HeaderComponent from './components/HeaderComp';
import ListHeaderComponent from './components/ListHeaderComp';
import { Review } from '../../../entities';

import { RestaurantService, ReviewService } from '../../../service';
import { RNText, Box } from '../../../components/themed';
import CenteredContainer from '../../../components/common/containers/Centered';
import LoaderScreen from '../../Loader';
import { COLORS } from '../../../themes';

const Home = () => {
  const { token, user } = useAuth();

  /*   const {
    isLoading: reviewIsLoading,
    loadPage: loadReviewPage,
    noMoreData,
  } = usePaginationPrimitive<Review>(ReviewService.useFetchReviewByPage, reviews, setReviews);
 */
  const {
    data: restaurantsData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = RestaurantService.useFetchRestaurants(token);
  const {
    data: reviewsData,
    isLoading: reviewLoading,
    error: reviewError,
    isFetching,
    refetch: refteshReviews,
  } = ReviewService.useFetchReviews(token);
  const rootNavigation = useNavigation<RootNavigationProps['navigation']>();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = rootNavigation.addListener('focus', () => {
      console.log('Screen focused');
      refteshReviews;
    });

    return unsubscribe;
  }, [rootNavigation]);

  if (reviewError || restaurantError) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>error.</RNText>
          {/* <ActivityIndicator color={COLORS.primary} size={'large'} /> */}
        </CenteredContainer>
      </BackgoundContainer>
    );
  }
  if (!reviewsData) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <ActivityIndicator color={COLORS.primary} size={'large'} />
        </CenteredContainer>
      </BackgoundContainer>
    );
  }
  if (!restaurantsData) {
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
            ) : restaurantsData.data.success ? (
              <ListHeaderComponent
                restaurantData={restaurantsData.data.restaurants}
                rootNavigation={rootNavigation}
              />
            ) : (
              <Box>
                <RNText>No resturants </RNText>
              </Box>
            )
          }
          data={reviewsData?.data[0] ?? []}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refteshReviews} />}
          /*  onEndReached={noMoreData ? null : loadReviewPage}
          ListFooterComponent={
            noMoreData ? (
              <Box>
                <RNText>no more data to laod</RNText>
              </Box>
            ) : (
              <FlatlistFooter isLoading={reviewIsLoading} />
            )
          }
          onEndReachedThreshold={0} */
          renderItem={({ item }: { item: Review }) => <ReviewCard {...item} />}
          keyExtractor={(item, index) => `HOME_${item.id}_${item.created_at}_${index}`}
        />
      </SafeAreaView>
    </BackgoundContainer>
  );
};

export default Home;
