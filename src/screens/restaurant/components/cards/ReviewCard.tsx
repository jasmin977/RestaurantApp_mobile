import { View, Image, ImageSourcePropType } from 'react-native';
import React, { FunctionComponent } from 'react';
import { Avatar, Box, RNText } from '../../../../components/themed';
import { AVATAR, vegyBurger } from '../../../../assets';

import { scale, timeDifference, verticalScale } from '../../../../helpers';
import { Review as ReviewModel } from '../../../../entities';
import RatingStars from '../reviews/RatingStars';

const ReviewCard = (reviw: ReviewModel) => {
  return (
    <Box flex={1} direction="horizontal" alignItems="flex-start" spacing={{ p: 20 }} gap={10}>
      <Box>
        <Avatar src={reviw.reviewedBy.profileImg} size={40} />
        <Box h={'100%'} w={7} bg="card"></Box>
      </Box>
      <Box flex={1} alignItems="stretch" gap={5} bg="card" rounded={8} spacing={{ p: 10, mt: -25 }}>
        <Box direction="horizontal" justifyContent="space-between" flex={1}>
          <RNText variant="subtitle">{reviw.reviewedBy.username}</RNText>
          <RNText variant="caption">
            {' '}
            {timeDifference(new Date(), new Date(reviw.reviewedAt))}
          </RNText>
        </Box>
        <Box alignItems="flex-start">
          <RatingStars rating={reviw.rate} allStar size={20} />
        </Box>

        {reviw.caption && <RNText variant="body">{reviw.caption}</RNText>}
        {reviw.img && (
          <Image
            source={{ uri: reviw.img }}
            resizeMode="stretch"
            style={{ width: '100%', height: verticalScale(150), borderRadius: scale(10) }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ReviewCard;
