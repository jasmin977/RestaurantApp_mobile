import { FunctionComponent } from 'react';
import { BackButton, BackgoundContainer, CenteredView, Review } from '../../components/common';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { RESTAURANTS } from '../../data';
import { Restaurant } from '../../entities';
import { RatingStars } from './components';
import { BackIcon, LikeIcon, SaveIcon } from '../../assets';
import { RootNavigationProps } from '../../navigators/ROUTES';
import { RestaurantService } from '../../service';

interface LikedRestaurantsProps {}

const LikedRestaurants: FunctionComponent<RootNavigationProps> = ({ navigation }) => {
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
            <RNIcon color="primary" as={<LikeIcon />} />
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
    <Box>
      <RNText>Loading..</RNText>
    </Box>;
  }

  if (error) {
    <Box>
      <RNText>error</RNText>
    </Box>;
  }
  return (
    <BackgoundContainer>
      <Box
        bg="background"
        direction="horizontal"
        justifyContent="space-between"
        spacing={{ px: 20, py: 10 }}
      >
        <BackButton onPress={() => navigation.goBack()} />

        <RNText variant="subtitle" style={{ fontSize: 22 }}>
          My Favourites
        </RNText>
        <Box />
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

export default LikedRestaurants;
