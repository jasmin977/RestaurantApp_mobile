import { View, Text, Image } from 'react-native';
import React from 'react';
import { Box, RNIcon, RNText } from '../../../components/themed';
import { StarIcon } from '../../../assets';
import { ScreenWidth } from '../../../components/common/containers/Backgound';
import { Coords, Restaurant } from '../../../entities';
const CARD_WIDTH = ScreenWidth * 0.8;
interface RestaurantMapCardProps {
  restaurant: Restaurant;
  goToRestaurantPosition: (coords: Coords) => void;
}

const RestaurantMapCard = ({ restaurant, goToRestaurantPosition }: RestaurantMapCardProps) => {
  return (
    <Box
      key={restaurant.description}
      onPress={() => goToRestaurantPosition(restaurant.coordinate)}
      h={150}
      w={CARD_WIDTH}
      rounded={20}
      bg="background"
      direction="horizontal"
      spacing={{ p: 20 }}
      gap={5}
    >
      <Image
        source={{ uri: restaurant.img }}
        style={{ width: CARD_WIDTH * 0.5, height: '100%', borderRadius: 10 }}
        resizeMode="cover"
      />
      <Box alignItems="flex-start" w={CARD_WIDTH * 0.4}>
        <RNText variant="body">{restaurant.name}</RNText>
        <RNText variant="caption">{restaurant.location}</RNText>
        <Box direction="horizontal">
          <RNIcon size={15} color="primary" as={<StarIcon />} />
          <RNText spacing={{ pl: 10 }} variant="body">
            {restaurant.rating.toFixed(1)} out of 5
          </RNText>
        </Box>
      </Box>
    </Box>
  );
};

export default RestaurantMapCard;
