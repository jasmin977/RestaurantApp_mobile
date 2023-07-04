import { styled } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import assets, { BackIcon, RESTAURANT } from '../../assets';

import { BackgoundContainer } from '../../components/common';
import { RestaurantDetails } from '../../components/layout';
import { useTheme } from '../../hooks';
import { RNButton, RNIcon, RNText } from '../../components/themed';
import { RootBottomStackParamList } from '../../navigators/RootStack';
import { restaurants } from '../../data/restaurants';
import { Restaurant } from '../../entities';
import LoaderScreen from '../Loader';
import { RestaurantStackParamList } from '../../navigators/stacks';
import LottieView from 'lottie-react-native';
import CenteredContainer from '../../components/common/containers/Centered';

type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantProfile'>;

const RestaurantProfileScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  console.log('🚀 ~ file: RestaurantProfile.tsx:20 ~ RestaurantProfileScreen ~ id:', id);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [restaurantObject, setRestaurantObj] = useState<Restaurant>();

  const getRestaurantById = (id: number): Restaurant | undefined => {
    const restaurant = restaurants.find(restaurant => {
      return restaurant.id == id;
    });

    setRestaurantObj(restaurant);
    return restaurant;
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurantById(id);
      setIsLoading(false);
    };

    fetchRestaurant();
  }, [id]);

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
            centerIcon={
              <RNIcon outline={true} color="white">
                <BackIcon />
              </RNIcon>
            }
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

  const RestaurantImage = styled.Image`
    width: 100%;
    height: 300px;
  `;
  const StyledScrollView = styled.ScrollView`
    background-color: ${theme.colors.background};
    flex: 1;
  `;

  return (
    <StyledScrollView>
      <BackgoundContainer>
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
          centerIcon={
            <RNIcon outline={true} color="white">
              <BackIcon />
            </RNIcon>
          }
        />

        <RestaurantImage resizeMode="cover" source={restaurantObject.img} />
        {/*  <RNButton title="refresh" onPress={() => refresh()} /> */}
        <RestaurantDetails {...restaurantObject} />
      </BackgoundContainer>
    </StyledScrollView>
  );
};

export default RestaurantProfileScreen;
