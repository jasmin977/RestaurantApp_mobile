import React from 'react';
import { BackgoundContainer } from '../../../components/common';
import { useNavigation } from '@react-navigation/native';
import { RestaurantService, ReviewService } from '../../../service';
import { RootNavigationProps } from '../../../navigators/ROUTES';
import { RNText } from '../../../components/themed';
import CenteredContainer from '../../../components/common/containers/Centered';
import HomePresentation from './HomePresentation';

const Home = () => {
  const {
    data: restaurantData,
    isLoading: restaurantIsLoading,
    error: restaurantError,
  } = RestaurantService.useFetchRestaurants();

  const {
    data: reviewData,
    isLoading: reviewIsLoading,
    error: reviewError,
  } = ReviewService.useFetchReviews();

  const rootNavigation = useNavigation<RootNavigationProps['navigation']>();

  if (reviewIsLoading || restaurantIsLoading) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>loading...</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  if (reviewError || restaurantError) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>error..</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  return (
    <HomePresentation
      reviewData={reviewData.data}
      restaurantData={restaurantData.data}
      rootNavigation={rootNavigation}
    />
  );
};

export default Home;
