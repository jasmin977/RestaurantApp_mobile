import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { Box, RNIcon, RNText } from '../../themed';
import {
  AVATAR,
  Comment,
  EllipsisIcon,
  MenuIcon,
  Share,
  ThumbDown,
  ThumbUp,
  vegyBurger,
} from '../../../assets';
import { RatingStars } from '../../../screens/restaurant/components';
import { useTheme } from '../../../context';
import { Restaurant } from '../../../entities';

export default function ReviewCard(item: Restaurant) {
  const { theme } = useTheme();
  const [isLike, setLike] = useState(false);
  const [isDilLike, setisDilLike] = useState(false);

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
          <Image source={AVATAR} style={{ width: 40, height: 40, borderRadius: 100 }} />
          <Box alignItems="flex-start" spacing={{ px: 10 }}>
            <RNText variant="h5">yasmine ab</RNText>
            <RNText variant="caption">25 min ago</RNText>
          </Box>
        </Box>
        <RNIcon color="onCard" outline as={<EllipsisIcon />} />
      </Box>

      {/** CARD CONTAINER */}
      <Box gap={15} w={'100%'} spacing={{ py: 15, px: 15 }}>
        <RNText variant="h4">Restaurant name</RNText>
        <RatingStars size={35} rating={4} />
        <RNText variant="body">
          i'm very happy with the services. ithink this is the best cafe in tunisia{' '}
        </RNText>
        <Image
          source={vegyBurger}
          resizeMode="cover"
          style={{ width: '100%', height: 100, borderRadius: 8 }}
        />
        <Box
          w={'100%'}
          direction="horizontal"
          justifyContent="space-between"
          bg="background"
          rounded={8}
          spacing={{ p: 10 }}
        >
          <Box alignItems="flex-start">
            <RNText variant="subtitle">Gategory</RNText>
            <RNText variant="caption">Food & Drink</RNText>
          </Box>
          <Box alignItems="flex-start">
            <RNText variant="subtitle">Location</RNText>
            <RNText variant="caption">Hammem sousse</RNText>
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
