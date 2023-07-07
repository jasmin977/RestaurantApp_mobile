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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../../navigators/stacks';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RestaurantStackParamList, 'RestaurantProfile'>;

const RestaurantDetails: FunctionComponent<Restaurant> = ({
  name,
  location,
  workingTime,
  description,
  rating,
  menu,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

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
            <LocationIcon />
            <RNText>{location}</RNText>
          </View>
        </View>
        <RNButton
          size="sm"
          centerIcon={<RNIcon as={<LikeIcon />} outline color="onPrimary" />}
          onPress={() => console.log('like button pressed')}
        />
      </View>
      {/** review */}
      <TouchableOpacity
        onPress={() => navigation.navigate('RestaurantReviews')}
        activeOpacity={0.5}
        style={{ alignItems: 'flex-start' }}
      >
        <Review rating={rating} detailled size={20} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <RNIcon as={<ClockIcon />} outline color="primary" />

        <RNText variant="h5">Opened Now</RNText>
        <RNText>{workingTime}</RNText>
      </View>
      <RNText>{description}</RNText>

      <MenuSection menu={menu} />
    </DetailsContainer>
  );
};

export default RestaurantDetails;
