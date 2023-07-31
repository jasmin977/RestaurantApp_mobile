import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Restaurant } from '../../../../entities';
import { Box, RNIcon, RNText } from '../../../../components/themed';
import { SaveIcon } from '../../../../assets';
import { scale } from '../../../../helpers';
import RatingStars from '../reviews/RatingStars';

const RestaurantCard = ({ item }: { item: Restaurant }) => {
  return (
    <Box bg="card" direction="horizontal" flex={1} gap={10} rounded={10} spacing={{ p: 10 }}>
      <Box direction="horizontal" flex={1}>
        <Image
          source={{ uri: item.img }}
          style={{ flex: 1, width: '100%', height: '100%', aspectRatio: 1, borderRadius: 10 }}
        />
      </Box>
      <Box flex={3} alignItems="flex-start">
        <Box direction="horizontal" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1} alignItems="flex-start">
            <RNText variant="h5" numberOfLines={2} ellipsizeMode="tail">
              {item.name}{' '}
            </RNText>
          </Box>
          <TouchableOpacity>
            <RNIcon color="primary" as={<SaveIcon />} />
          </TouchableOpacity>
        </Box>

        <RNText variant="subtitle" style={{ fontSize: scale(13) }}>
          {item.location}
        </RNText>
        <RNText variant="caption">saved 2 weeks ago</RNText>
        <RatingStars rating={4} size={20} />
      </Box>
    </Box>
  );
};

export default RestaurantCard;
