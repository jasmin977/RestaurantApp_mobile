import React from 'react';

import { Animated, ImageBackground, TouchableOpacity } from 'react-native';
import { RatingStars } from '../../restaurant/components';
import { Avatar, AvatarGroup, Box, RNIcon, RNText } from '../../../components/themed';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from '../../../helpers';
import { LikeIcon } from '../../../assets';
import { LinearGradient } from 'expo-linear-gradient';
import { Restaurant } from '../../../entities';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigators/ROUTES';
import { COLORS } from '../../../themes';
import { BASE_URL } from '../../../CONSTANTS';

const RestaurantCard = ({
  item,
  index,
  boxWidth,
  onPress,
  pan,
  halfBoxDistance,
  navigation,
}: {
  item: Restaurant;
  onPress?: (data: any) => void;

  index: number;
  boxWidth: number;
  pan: Animated.ValueXY;
  halfBoxDistance: number;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  const coordinate = { latitude: item.latitude, longitude: item.longitude };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => (onPress ? onPress(coordinate) : console.log('..'))}
    >
      <Animated.View
        style={{
          transform: [
            {
              scale: pan.x.interpolate({
                inputRange: [
                  (index - 1) * boxWidth - halfBoxDistance,
                  index * boxWidth - halfBoxDistance,
                  (index + 1) * boxWidth - halfBoxDistance,
                ],
                outputRange: [0.8, 1, 0.8],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <ImageBackground
          style={{ height: verticalScale(250), width: scale(350) }}
          imageStyle={{ borderRadius: scale(20) }}
          source={{
            uri: `http://${BASE_URL}:8000/storage/${item.imageUrl}`,
          }}
        >
          <Box direction="horizontal" justifyContent="space-between" spacing={{ p: 10 }}>
            <RatingStars
              bg="card"
              rating={item.rating}
              style={{
                alignItems: 'stretch',
                borderRadius: 100,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            />
            <Box bg="background" spacing={{ p: 10 }} rounded={50}>
              <RNIcon size={25} color="primary" as={<LikeIcon />} />
            </Box>
          </Box>
          <LinearGradient
            style={{
              bottom: 0,
              position: 'absolute',
              width: '100%',
              paddingVertical: moderateVerticalScale(10),
              paddingHorizontal: moderateScale(20),
              borderBottomLeftRadius: scale(20),
              borderBottomRightRadius: scale(20),
            }}
            colors={['transparent', 'black']}
          >
            <Box alignItems="flex-start" gap={10} spacing={{ py: 20 }}>
              <Box
                direction="horizontal"
                gap={10}
                style={{ flexWrap: 'wrap' }}
                justifyContent="flex-start"
              >
                {item.tage
                  .split(',')
                  .slice(0, 2)
                  .map((item: string) => (
                    <Box
                      style={{ backgroundColor: COLORS.lightgrey }}
                      spacing={{ p: 5, px: 10 }}
                      rounded={10}
                      key={item}
                    >
                      <RNText>{item.trim()}</RNText>
                    </Box>
                  ))}
              </Box>
              <RNText color="white" variant="h3">
                {item.name}
              </RNText>
              <RNText color="white">Friends were here</RNText>
              <AvatarGroup size={35} max={3}>
                <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_1.jpg`} />
                <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_2.jpg`} />
                <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_3.jpg`} />
                <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_4.jpg`} />
                <Avatar src={`http://${BASE_URL}:8000/storage/avatars/avatar_1.jpg`} />
              </AvatarGroup>
            </Box>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
