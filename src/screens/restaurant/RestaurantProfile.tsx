import { styled } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import assets, {
  BackIcon,
  ClockIcon,
  LikeIcon,
  LocationIcon,
  NextIcon,
  RESTAURANT,
  peperoniPizza,
} from '../../assets';

import { BackgoundContainer, Review } from '../../components/common';
import { AnimatdeHeader, RestaurantDetails } from '../../components/layout';
import { useTheme } from '../../hooks';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';

import { Restaurant } from '../../entities';
import LoaderScreen from '../Loader';
import { RestaurantStackParamList } from '../../navigators/stacks';
import LottieView from 'lottie-react-native';
import CenteredContainer from '../../components/common/containers/Centered';
import {
  LikeButton,
  LocationMap,
  MenuSection,
  RatingStars,
  ReviewCard,
  StarPercentage,
} from './components';
import { ImageSourcePropType } from 'react-native';
import { RESTAURANTS } from '../../data';

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
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantObject, setRestaurantObj] = useState<Restaurant>();

  const getRestaurantById = (id: number): Restaurant | undefined => {
    const restaurant = RESTAURANTS.find(restaurant => {
      return restaurant.id == id;
    });

    setRestaurantObj(restaurant);
    return restaurant;
  };

  useEffect(() => {
    const fetchRestaurant = () => {
      getRestaurantById(id);

      setIsLoading(false);
    };

    fetchRestaurant();
  }, [id]);
  const StyledScrollView = styled.ScrollView`
    background-color: ${theme.colors.background};
    flex: 1;
  `;
  const DetailsContainer = styled.View`
    padding: 20px;
    width: 100%;

    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    gap: 25px;
    background-color: ${theme.colors.background};
  `;

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (!restaurantObject) {
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
    <AnimatdeHeader
      backgroundImage={restaurantObject.img}
      title={restaurantObject.name}
      rightIcon={<Box />}
      leftIcon={
        <RNButton
          size="sm"
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
          onPress={() => navigation.goBack()}
          centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
        />
      }
    >
      <StyledScrollView stickyHeaderIndices={[1, 6]}>
        {/** restaurant details */}
        <DetailsContainer>
          <Box flex={1} w={'100%'} direction="horizontal" justifyContent="space-between">
            <Box flex={1} alignItems="flex-start">
              <RNText variant="h3">{restaurantObject.name}</RNText>
              <Box direction="horizontal" gap={5}>
                <LocationIcon />
                <RNText>{restaurantObject.location}</RNText>
              </Box>
            </Box>
            <LikeButton />
          </Box>

          <Box alignItems="flex-start" onPress={() => navigation.navigate('RestaurantReviews')}>
            <Review rating={restaurantObject.rating} detailled size={20} />
          </Box>
          <Box direction="horizontal" gap={10}>
            <RNIcon as={<ClockIcon />} outline color="primary" />

            <RNText variant="h5">Opened Now</RNText>
            <RNText>{restaurantObject.workingTime}</RNText>
          </Box>
          <RNText>{restaurantObject.description}</RNText>

          <MenuSection menu={restaurantObject.menu} />
        </DetailsContainer>
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
        <Box spacing={{ py: 20 }}>
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
        <Box h={500}></Box>
      </StyledScrollView>
    </AnimatdeHeader>
  );
};

export default RestaurantProfileScreen;
