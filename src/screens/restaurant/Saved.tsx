import { FunctionComponent } from 'react';
import { BackgoundContainer, CenteredView, Review } from '../../components/common';
import { Box, RNIcon, RNText } from '../../components/themed';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { RESTAURANTS } from '../../data';
import { Restaurant } from '../../entities';
import { RatingStars } from './components';
import { SaveIcon } from '../../assets';
import { RestaurantService } from '../../service';

interface SavedRestaurantsProps {}

const SavedRestaurants: FunctionComponent<SavedRestaurantsProps> = () => {
  const { data: restaurantData, isLoading, error } = RestaurantService.useFetchRestaurants();
  const renderNotification = ({ item }: { item: Restaurant }) => (
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

        <RNText variant="subtitle" style={{ fontSize: 15 }}>
          {item.location}
        </RNText>
        <RNText variant="caption">saved 2 weeks ago</RNText>
        <Review rating={4} />
      </Box>
    </Box>
  );
  if (isLoading) {
    return (
      <Box>
        <RNText>Loading..</RNText>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <RNText>error</RNText>
      </Box>
    );
  }

  return (
    <BackgoundContainer>
      <Box spacing={{ py: 20 }}>
        <RNText variant="subtitle" style={{ fontSize: 22 }}>
          Saved
        </RNText>
      </Box>

      <FlatList
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
        data={restaurantData.data}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
      />
    </BackgoundContainer>
  );
};

export default SavedRestaurants;
