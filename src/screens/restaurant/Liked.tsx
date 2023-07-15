import { FunctionComponent } from 'react';
import { BackgoundContainer, CenteredView, Review } from '../../components/common';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import { RESTAURANTS } from '../../data';
import { Restaurant } from '../../entities';
import { RatingStars } from './components';
import { BackIcon, LikeIcon, SaveIcon } from '../../assets';
import { RootNavigationProps } from '../../navigators/ROUTES';

interface LikedRestaurantsProps {}

const LikedRestaurants: FunctionComponent<RootNavigationProps> = ({ navigation }) => {
  const renderNotification = ({ item }: { item: Restaurant }) => (
    <Box bg="card" direction="horizontal" flex={1} gap={10} rounded={10} spacing={{ p: 10 }}>
      <Box direction="horizontal" flex={1}>
        <Image
          source={item.img}
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

  return (
    <BackgoundContainer>
      <Box
        bg="background"
        direction="horizontal"
        justifyContent="space-between"
        spacing={{ px: 20, py: 10 }}
      >
        <RNButton
          size="sm"
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
          onPress={() => navigation.goBack()}
          centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
        />
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
        data={RESTAURANTS}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
      />
    </BackgoundContainer>
  );
};

export default LikedRestaurants;
