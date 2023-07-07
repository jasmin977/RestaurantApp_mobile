import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Box, RNIcon, RNText } from '../../../components/themed';
import { StarIcon } from '../../../assets';

interface RatingStarsProps {
  rating: number;
}
const RatingStars = ({ rating }: RatingStarsProps) => {
  const filledStars = Math.floor(rating);
  const outlineStars = 5 - filledStars;
  return (
    <Box direction="horizontal" gap={5}>
      {[...Array(filledStars)].map((_, index) => (
        <RNIcon key={index} outline={false} color="primary" as={<StarIcon />} />
      ))}
      {[...Array(outlineStars)].map((_, index) => (
        <RNIcon key={index} outline color="primary" as={<StarIcon />} />
      ))}
      <RNText spacing={{ pl: 10 }} variant="subtitle">
        {filledStars.toFixed(1)} out of 5
      </RNText>
    </Box>
  );
};

export default RatingStars;
