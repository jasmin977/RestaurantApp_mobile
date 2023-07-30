import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context';
import { RootNavigationProps } from '../../../navigators/ROUTES';
import { Review } from '../../../entities';
import { Avatar, Box, RNIcon, RNText } from '../../../components/themed';
import { timeDifference, verticalScale } from '../../../helpers';
import { Comment, EllipsisIcon, ThumbDown, ThumbUp, Share, AVATAR } from '../../../assets';
import { RatingStars } from '../../../screens/restaurant/components';

export default function ReviewCard(item: Review) {
  const { theme } = useTheme();
  const [isLike, setLike] = useState(false);
  const [isDilLike, setisDilLike] = useState(false);
  const navigation = useNavigation<RootNavigationProps['navigation']>();

  if (!item.reviewedBy) {
    return (
      <Box>
        <RNText>Loading user data...</RNText>
      </Box>
    );
  }

  return (
    <Box bg="card" rounded={10} spacing={{ mx: 20 }}>
      {/** CARD HEADER */}
      <Box
        w={'100%'}
        justifyContent="space-between"
        direction="horizontal"
        spacing={{ py: 10, px: 15 }}
        style={{ borderBottomWidth: 1, borderColor: theme.colors.background }}
      >
        <Box direction="horizontal">
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { id: item.reviewedBy.id })}
          >
            <Avatar src={item.reviewedBy.profileImg} />
          </TouchableOpacity>
          <Box alignItems="flex-start" spacing={{ px: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile', { id: item.reviewedBy.id })}
            >
              <RNText variant="h5">{item.reviewedBy.username}</RNText>
            </TouchableOpacity>

            <RNText variant="caption">
              {timeDifference(new Date(), new Date(item.reviewedAt))}
            </RNText>
          </Box>
        </Box>
        <RNIcon color="onCard" outline as={<EllipsisIcon />} />
      </Box>

      {/** CARD CONTAINER */}
      <Box gap={15} w={'100%'} spacing={{ py: 15, px: 15 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('RestaurantStack', {
              screen: 'RestaurantProfile',
              params: {
                id: item.restaurantId.id,
              },
            });
          }}
        >
          <RNText variant="h4">{item.restaurantId.name}</RNText>
        </TouchableOpacity>
        <RatingStars size={35} rating={item.rate} />
        <RNText variant="body">{item.caption}</RNText>
        {item.img && (
          <Image
            source={{ uri: item.img }}
            resizeMode="cover"
            style={{ width: '100%', height: verticalScale(200), borderRadius: 8 }}
          />
        )}
        <Box
          w={'100%'}
          direction="horizontal"
          justifyContent="space-between"
          bg="background"
          rounded={8}
          spacing={{ px: 10, py: 5 }}
        >
          <Box alignItems="flex-start" w={'50%'}>
            <RNText variant="subtitle">Gategory</RNText>
            <RNText variant="caption">Food & Drink</RNText>
          </Box>
          <Box alignItems="flex-start" w={'50%'}>
            <RNText variant="subtitle">Location</RNText>
            <RNText variant="caption">{item.restaurantId.location}</RNText>
          </Box>
        </Box>
        <Box w={'100%'} direction="horizontal" justifyContent="space-around">
          <Box gap={10} onPress={() => setLike(!isLike)}>
            <RNIcon color={isLike ? 'primary' : 'grey.600'} as={<ThumbUp />} />
            <RNText
              color={isLike ? 'primary' : 'onCard'}
              style={{ fontWeight: 'bold' }}
              variant="caption"
            >
              20
            </RNText>
          </Box>
          <Box gap={10} onPress={() => setisDilLike(!isDilLike)}>
            <RNIcon color={isDilLike ? 'primary' : 'grey.600'} as={<ThumbDown />} />
            <RNText
              color={isDilLike ? 'primary' : 'onCard'}
              style={{ fontWeight: 'bold' }}
              variant="caption"
            >
              1
            </RNText>
          </Box>
          <Box gap={10}>
            <RNIcon color="grey.600" as={<Comment />} />
            <RNText variant="caption" style={{ fontWeight: 'bold' }}>
              8
            </RNText>
          </Box>
          <Box gap={10}>
            <RNIcon color="grey.600" as={<Share />} />
            <RNText variant="caption" style={{ fontWeight: 'bold' }}>
              3
            </RNText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
