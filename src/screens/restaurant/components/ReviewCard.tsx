import { View, Image, ImageSourcePropType } from 'react-native';
import React, { FunctionComponent } from 'react';
import { Box, RNText } from '../../../components/themed';
import { AVATAR, vegyBurger } from '../../../assets';
import { Review } from '../../../components/common';

interface ReviewCardProps {
  id: number;
  date: string;
  reviewedBy: string;
  description?: string;
  img?: ImageSourcePropType;
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({ date, reviewedBy, description, img }) => {
  return (
    <Box flex={1} direction="horizontal" alignItems="flex-start" spacing={{ p: 20 }} gap={10}>
      <Box>
        <Image source={AVATAR} style={{ width: 50, height: 50, borderRadius: 100 }} />
        <Box h={'100%'} w={5} bg="card"></Box>
      </Box>
      <Box flex={1} alignItems="stretch" gap={5} bg="card" rounded={8} spacing={{ p: 10, mt: -25 }}>
        <Box direction="horizontal" justifyContent="space-between" flex={1}>
          <RNText variant="subtitle">{reviewedBy}</RNText>
          <RNText variant="caption">{date}</RNText>
        </Box>
        <Review rating={4} detailled />
        {description && <RNText variant="body">{description}</RNText>}
        {img && (
          <Image
            source={img}
            resizeMode="stretch"
            style={{ width: '100%', height: 150, borderRadius: 10 }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ReviewCard;
