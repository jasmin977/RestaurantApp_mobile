import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components/native';
import { LikeButton, MenuSection } from '../../screens/restaurant/components';
import Review from '../common/review/Review';
import { ClockIcon, LikeIcon, LocationIcon } from '../../assets';
import { Restaurant } from '../../entities';
import { BackgoundContainer } from '../common';
import { RNButton, RNIcon, RNText } from '../themed';
import { useTheme } from '../../hooks';

const RestaurantDetails: FunctionComponent<Restaurant> = ({
  name,
  location,
  workingTime,
  description,
  rating,
  menu,
}) => {
  const { theme } = useTheme();

  const DetailsContainer = styled.View`
    padding: 20px;
    width: 100%;
    margin-top: -30px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    gap: 25px;
    background-color: ${theme.colors.background};
  `;

  return (
    <DetailsContainer>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flex: 1 }}>
          <RNText variant="h3">{name}</RNText>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              maxWidth: '90%',
            }}
          >
            <LocationIcon color={theme.colors.text} />
            <RNText>{location}</RNText>
          </View>
        </View>
        <RNButton
          children={
            <RNIcon outline color="white" size={30}>
              <LikeIcon />
            </RNIcon>
          }
          onPress={() => console.log('like button pressed')}
        />
      </View>
      <TouchableOpacity activeOpacity={0.5} style={{ alignItems: 'flex-start' }}>
        <Review rating={rating} detailled />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <RNIcon outline color="white">
          <ClockIcon />
        </RNIcon>
        <RNText variant="h5">Opened Now</RNText>
        <RNText>{workingTime}</RNText>
      </View>
      <RNText>{description}</RNText>

      <MenuSection menu={menu} />
    </DetailsContainer>
  );
};

export default RestaurantDetails;
