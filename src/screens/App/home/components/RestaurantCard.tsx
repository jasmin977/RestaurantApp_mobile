import React from 'react';

import { Animated, TouchableOpacity, ImageBackground } from 'react-native';
import { RatingStars } from '../../../restaurant/components';
import { Avatar, AvatarGroup, Box, RNIcon, RNText } from '../../../../components/themed';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from '../../../../helpers';
import { LikeIcon } from '../../../../assets';
import { LinearGradient } from 'expo-linear-gradient';
import { Restaurant } from '../../../../entities';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigators/ROUTES';
import { COLORS } from '../../../../themes';
import { BASE_URL } from '../../../../CONSTANTS';

const RestaurantCard = ({
  item,
  index,
  boxWidth,
  pan,
  halfBoxDistance,
  navigation,
}: {
  item: Restaurant;
  index: number;
  boxWidth: number;
  pan: Animated.ValueXY;
  halfBoxDistance: number;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => (
  <TouchableOpacity
    onPress={() => {
      navigation.push('RestaurantStack', {
        screen: 'RestaurantProfile',
        params: {
          id: item.id,
        },
      });
    }}
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
        style={{ height: verticalScale(400), width: scale(250) }}
        imageStyle={{ borderRadius: scale(20) }}
        source={{
          uri: `http://${BASE_URL}:8000/storage/` + item.imageUrl,
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
              {item.tage &&
                item.tage.split(',').length > 0 &&
                item.tage
                  .split(',')
                  .slice(0, 2)
                  .map((tag: string) => (
                    <Box
                      style={{ backgroundColor: COLORS.lightgrey }}
                      spacing={{ p: 5, px: 10 }}
                      rounded={10}
                      key={tag}
                    >
                      <RNText color="black">{tag.trim()}</RNText>
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

export default RestaurantCard;
