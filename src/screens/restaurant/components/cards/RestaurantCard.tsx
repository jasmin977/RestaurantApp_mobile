import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Restaurant } from '../../../../entities';
import { Box, RNIcon, RNText } from '../../../../components/themed';
import { SaveIcon } from '../../../../assets';
import { scale } from '../../../../helpers';
import RatingStars from '../reviews/RatingStars';
import { RootNavigationProps } from '../../../../navigators/ROUTES';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../../CONSTANTS';

interface RestaurantCardProps {
  navigation: RootNavigationProps['navigation'];
  item: Restaurant;
}
const RestaurantCard: React.FC<RestaurantCardProps> = ({ navigation, item }) => {
  return (
    <Box
      onPress={() => {
        navigation.push('RestaurantStack', {
          screen: 'RestaurantProfile',
          params: {
            id: item.id,
          },
        });
      }}
      bg="card"
      direction="horizontal"
      flex={1}
      gap={10}
      rounded={10}
      spacing={{ p: 10 }}
    >
      <Box direction="horizontal" flex={1}>
        <Image
          source={{ uri: `http://${BASE_URL}:8000/storage/${item.imageUrl}` }}
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
          {item.streetAddress}
        </RNText>

        <RatingStars rating={item.rating} size={20} />
      </Box>
    </Box>
  );
};

export default RestaurantCard;
