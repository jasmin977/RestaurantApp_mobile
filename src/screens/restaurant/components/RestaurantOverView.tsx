import { View, Image } from 'react-native';
import React from 'react';
import assets from '../../../assets';
import { Avatar, AvatarGroup, Box, RNText } from '../../../components/themed';
import { ScreenHeigh, ScreenWidth } from '../../../components/common/containers/Backgound';
import { RestaurantService, ReviewService } from '../../../service';
import { useAuth, useTheme } from '../../../context';
import { scale, verticalScale } from '../../../helpers';
import LottieView from 'lottie-react-native';
import RestaurantRatingAndReviews from './sections/RestaurantRatingAndReviews';
import { Loader } from '../../../components/common';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigators/ROUTES';
import RestaurantDetails from './sections/RestaurantDetails';
import { BASE_URL } from '../../../CONSTANTS';

interface props {
  id: number | string | null;
  navigation: StackNavigationProp<RootStackParamList>;
}

const RestaurantOverView = ({ id, navigation }: props) => {
  const { theme } = useTheme();
  const { token } = useAuth();

  if (!id || restaurantLoading || reviwLoading) {
    return (
      <Box
        style={{ borderTopEndRadius: 30, borderTopStartRadius: 30 }}
        spacing={{ pt: 40 }}
        bg="background"
        justifyContent="flex-start"
        w={ScreenWidth}
        h={ScreenHeigh}
      >
        <Loader size={200} />
      </Box>
    );
  }
  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = RestaurantService.useFetchRestaurantByID(id, token);
  const {
    data: reviwData,
    isLoading: reviwLoading,
    error: reviwError,
  } = ReviewService.useFetchReviewsByRestaurantId(id, token);

  const handleViewProfile = () => {
    navigation.push('RestaurantStack', {
      screen: 'RestaurantProfile',
      params: {
        id: id,
      },
    });
  };
  const hasrestaurantData = !!restaurantData?.data;
  console.log(
    '🚀 ~ file: RestaurantOverView.tsx:60 ~ RestaurantOverView ~ hasrestaurantData:',
    hasrestaurantData
  );
  const hasrestaurantReviews = !!reviwData?.data;
  console.log(
    '🚀 ~ file: RestaurantOverView.tsx:62 ~ RestaurantOverView ~ hasrestaurantReviews:',
    hasrestaurantReviews
  );

  if (!hasrestaurantData) {
    return (
      <Box
        style={{ borderTopEndRadius: 30, borderTopStartRadius: 30 }}
        bg="background"
        justifyContent="flex-start"
        spacing={{ pt: 100 }}
        w={ScreenWidth}
        h={ScreenHeigh}
      >
        <LottieView
          autoPlay
          loop
          style={{ width: scale(100), height: verticalScale(100) }}
          source={assets.lottieFiles.SearchNotFound}
        />
        <RNText variant="body">Restaurant not found.</RNText>
      </Box>
    );
  }
  if (restaurantError || reviwError) {
    return (
      <Box
        style={{ borderTopEndRadius: 30, borderTopStartRadius: 30 }}
        bg="background"
        justifyContent="flex-start"
        w={ScreenWidth}
        h={ScreenHeigh}
      >
        <RNText variant="body">Error.</RNText>
      </Box>
    );
  }

  return (
    <View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: theme.colors.background,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Image
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            width: ScreenWidth,
            height: 250,
            borderRadius: 30,
          }}
          source={{
            uri: `http://${BASE_URL}:8000/storage/${restaurantData.data.restaurant.imageUrl}`,
          }}
        />

        <View style={{ marginTop: -100, marginHorizontal: 20, alignItems: 'center', gap: 10 }}>
          {/*  <VisitedBy /> */}
          <Box h={250} />
          <Box direction="horizontal" gap={10}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10 }}>
              <RNText spacing={{ px: 10, py: 2 }} variant="caption" color="white">
                Friends were here
              </RNText>
            </View>
            <AvatarGroup size={35} max={3}>
              <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_1.jpg`} />
              <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_2.jpg`} />
              <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_3.jpg`} />
              <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_4.jpg`} />
              <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_1.jpg`} />
            </AvatarGroup>
          </Box>
          <RestaurantDetails data={restaurantData.data.restaurant} />
        </View>

        {hasrestaurantReviews ? (
          <View style={{ flex: 1, width: '100%' }}>
            <RestaurantRatingAndReviews
              overallRating={restaurantData.data.restaurant.overallRating}
              totalReviews={restaurantData.data.restaurant.totalReviews}
              starRatingPercentages={restaurantData.data.restaurant.starRatingPercentages}
              // data={reviwData?.data[0] ?? []}
              restaurantId={id}
            />
          </View>
        ) : (
          <RNText>No reviews..</RNText>
        )}
        <Box spacing={{ pb: 30 }} onPress={() => handleViewProfile()}>
          <RNText variant="subtitle">View Profile</RNText>
        </Box>
      </View>
    </View>
  );
};

export default RestaurantOverView;
